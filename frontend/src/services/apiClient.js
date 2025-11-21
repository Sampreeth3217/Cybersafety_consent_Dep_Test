import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

/**
 * Axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request interceptor to add auth token
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('managerToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error
      return Promise.reject({
        message: error.response.data.message || 'Server error',
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0
      });
    } else {
      // Error in request setup
      return Promise.reject({
        message: error.message || 'Request failed',
        status: 0
      });
    }
  }
);

/**
 * Submit consent record
 */
export const submitConsent = async (data) => {
  return apiClient.post('/consent', data);
};

/**
 * Manager login
 */
export const managerLogin = async (credentials) => {
  const response = await apiClient.post('/manager/login', credentials);
  if (response.success && response.token) {
    localStorage.setItem('managerToken', response.token);
  }
  return response;
};

/**
 * Manager logout
 */
export const managerLogout = () => {
  localStorage.removeItem('managerToken');
};

/**
 * Check if manager is authenticated
 */
export const isManagerAuthenticated = () => {
  return !!localStorage.getItem('managerToken');
};

/**
 * Verify manager token
 */
export const verifyManagerToken = async () => {
  try {
    return await apiClient.get('/manager/verify');
  } catch (error) {
    managerLogout();
    throw error;
  }
};

/**
 * Search consent record by token
 */
export const searchConsentByToken = async (token) => {
  return apiClient.get(`/manager/consent/${token}`);
};

export default apiClient;
