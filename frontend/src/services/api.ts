import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const pestAPI = {
  identifyPest: (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post('/pest-identifications/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  getPests: () => api.get('/pests/'),
  getTreatments: (pestId: number) => api.get(`/pests/${pestId}/treatments/`),
  
  logInfestation: (data: any) => api.post('/infestation-logs/', data),
  getInfestationLogs: () => api.get('/infestation-logs/'),
  getHeatmapData: () => api.get('/infestation-logs/heatmap_data/'),
  
  requestService: (data: any) => api.post('/service-requests/', data),
  getServiceProviders: () => api.get('/service-providers/'),
};

export default api;