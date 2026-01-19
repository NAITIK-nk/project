const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Make authenticated API request
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // If unauthorized, clear auth and redirect to login
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return response;
};

// API helper functions
export const api = {
  get: async <T = unknown>(endpoint: string): Promise<T> => {
    const res = await apiRequest(endpoint, { method: 'GET' });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || res.statusText || 'API GET request failed');
    }
    return (await res.json()) as T;
  },

  post: <T = unknown>(endpoint: string, data?: T) =>
    apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  put: <T = unknown>(endpoint: string, data?: T) =>
    apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: <T = unknown>(endpoint: string, data?: T) => {
    const options: RequestInit = { method: 'DELETE' };
    if (data) {
      options.body = JSON.stringify(data);
    }
    return apiRequest(endpoint, options);
  },
  patch: <T = unknown>(endpoint: string, data?: T) =>
    apiRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

