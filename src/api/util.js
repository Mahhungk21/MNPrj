import axios from 'axios';
import { LOGIN } from './url';

const instance = axios.create({
  baseURL: '',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function lưu access token vào localStorage
export const setLocalAccessToken = (token) => {
  window.localStorage.setItem('accessToken', token);
}

// Function lấy access token từ localStorage
const getLocalAccessToken = () => {
  return window.localStorage.getItem('accessToken');
}

export const refreshToken = async () => {
  try {
    const response = await instance.post(LOGIN, {
      refreshToken: window.localStorage.getItem('refreshToken'),
    });
    console.log('refreshToken response:', response);
    setLocalAccessToken(response.data.accessToken);
    window.localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
}

// Add a request interceptor
instance.interceptors.request.use(
  (request) => {
    
    if (!request.url.includes('/authorization/login')) {
      const token = getLocalAccessToken();
      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
      } else {
        throw new Error('No access token found');
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshToken();
        setLocalAccessToken(newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (error) {
        console.error('Failed to refresh token', error);
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
        window.location.href = '/';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
