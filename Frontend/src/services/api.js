import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Product API functions
export const productAPI = {
  // Get all products
  getAll: () => api.get('/product/list'),
  
  // Create new product
  create: (productData) => api.post('/product/create', productData),
  
  // Update product
  update: (id, productData) => api.put(`/product/update/${id}`, productData),
  
  // Delete product
  delete: (id) => api.delete(`/product/delete/${id}`),
};

// User API functions
export const userAPI = {
  // Login
  login: (credentials) => api.post('/user/login', credentials),
  
  // Register
  register: (userData) => api.post('/user/register', userData),
};

export default api;
