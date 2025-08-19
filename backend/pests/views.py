from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Pest, PestIdentification, Treatment, InfestationLog
from .serializers import PestSerializer, PestIdentificationSerializer, TreatmentSerializer, InfestationLogSerializer
import requests
from django.conf import settings

class PestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Pest.objects.all()
    serializer_class = PestSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=True, methods=['get'])
    def treatments(self, request, pk=None):
        pest = self.get_object()
        treatments = Treatment.objects.filter(pest=pest)
        serializer = TreatmentSerializer(treatments, many=True)
        return Response(serializer.data)

class PestIdentificationViewSet(viewsets.ModelViewSet):
    serializer_class = PestIdentificationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return PestIdentification.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        identification = serializer.save(user=self.request.user)
        # Call AI service for pest identification
        self.identify_pest(identification)
    
    def identify_pest(self, identification):
        # Call Flask AI service
        try:
            ai_service_url = 'http://localhost:5000/identify'
            files = {'image': identification.image.file}
            response = requests.post(ai_service_url, files=files)
            
            if response.status_code == 200:
                result = response.json()
                if result.get('pest_id'):
                    pest = Pest.objects.get(id=result['pest_id'])
                    identification.identified_pest = pest
                    identification.confidence_score = result.get('confidence', 0.0)
                    identification.alternative_matches = result.get('alternatives', [])
                    identification.save()
        except Exception as e:
            print(f"AI identification error: {e}")

class InfestationLogViewSet(viewsets.ModelViewSet):
    serializer_class = InfestationLogSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return InfestationLog.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def heatmap_data(self, request):
        logs = self.get_queryset().filter(
            latitude__isnull=False,
            longitude__isnull=False
        )
        data = [{
            'lat': log.latitude,
            'lng': log.longitude,
            'pest': log.pest.name,
            'severity': log.severity,
            'date': log.created_at.isoformat()
        } for log in logs]
        return Response(data)