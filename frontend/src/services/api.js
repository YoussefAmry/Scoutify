import { auth } from '../config/firebase';

const API_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
};

// Helper function to make authenticated requests
const authenticatedRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
};

// Auth API
export const createUserProfile = async (userData) => {
  return authenticatedRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const updateUserProfile = async (userData) => {
  return authenticatedRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};

// Users API
export const getUsers = async () => {
  return authenticatedRequest('/users');
};

export const getUserById = async (userId) => {
  return authenticatedRequest(`/users/${userId}`);
};

// Clubs API
export const getClubs = async () => {
  return authenticatedRequest('/clubs');
};

export const getClubById = async (clubId) => {
  return authenticatedRequest(`/clubs/${clubId}`);
};

// Opportunities API
export const getOpportunities = async () => {
  return authenticatedRequest('/opportunities');
};

export const createOpportunity = async (opportunityData) => {
  return authenticatedRequest('/opportunities', {
    method: 'POST',
    body: JSON.stringify(opportunityData),
  });
};

export const getOpportunityById = async (opportunityId) => {
  return authenticatedRequest(`/opportunities/${opportunityId}`);
};

export const updateOpportunity = async (opportunityId, opportunityData) => {
  return authenticatedRequest(`/opportunities/${opportunityId}`, {
    method: 'PUT',
    body: JSON.stringify(opportunityData),
  });
};

export const applyToOpportunity = async (opportunityId) => {
  return authenticatedRequest(`/opportunities/${opportunityId}/apply`, {
    method: 'POST',
  });
};

// Notifications API
export const getNotifications = async () => {
  return authenticatedRequest('/notifications');
};

export const markNotificationAsRead = async (notificationId) => {
  return authenticatedRequest(`/notifications/${notificationId}/read`, {
    method: 'PUT',
  });
};

export const markAllNotificationsAsRead = async () => {
  return authenticatedRequest('/notifications/read-all', {
    method: 'PUT',
  });
}; 