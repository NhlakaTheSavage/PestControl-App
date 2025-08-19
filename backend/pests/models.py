from django.db import models
from django.contrib.auth.models import User

class PestCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Pest(models.Model):
    name = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=100, blank=True)
    category = models.ForeignKey(PestCategory, on_delete=models.CASCADE)
    description = models.TextField()
    common_locations = models.TextField()
    danger_level = models.CharField(max_length=20, choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('extreme', 'Extreme')
    ])
    image = models.ImageField(upload_to='pest_images/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class PestIdentification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='identification_images/')
    identified_pest = models.ForeignKey(Pest, on_delete=models.SET_NULL, null=True, blank=True)
    confidence_score = models.FloatField(default=0.0)
    alternative_matches = models.JSONField(default=list)
    location = models.CharField(max_length=200, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Identification by {self.user.username} - {self.created_at}"

class Treatment(models.Model):
    pest = models.ForeignKey(Pest, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=50, choices=[
        ('diy', 'DIY Solution'),
        ('eco', 'Eco-Friendly'),
        ('chemical', 'Chemical Treatment'),
        ('professional', 'Professional Required')
    ])
    description = models.TextField()
    instructions = models.TextField()
    safety_precautions = models.TextField()
    effectiveness_rating = models.IntegerField(default=1)
    cost_estimate = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return f"{self.name} for {self.pest.name}"

class InfestationLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pest = models.ForeignKey(Pest, on_delete=models.CASCADE)
    location = models.CharField(max_length=200)
    severity = models.CharField(max_length=20, choices=[
        ('minor', 'Minor'),
        ('moderate', 'Moderate'),
        ('severe', 'Severe')
    ])
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='infestation_logs/', blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    treatment_applied = models.ForeignKey(Treatment, on_delete=models.SET_NULL, null=True, blank=True)
    resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.pest.name} at {self.location} - {self.created_at}"