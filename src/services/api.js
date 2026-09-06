import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_BASE_URL = 'https://bionetindia.org/api'; // Replace with your actual API URL

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - logout user
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    }

    return Promise.reject(error);
  }
);

// Authentication APIs
export const login = async (emailOrPhone, password) => {
  try {
    const response = await api.post('/auth/login', {
      emailOrPhone,
      password,
    });

    console.log('LOGIN RESPONSE =>', response.data);

    // Correct response structure
    const { token, user } = response.data.data;

    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    return { token, user };
  } catch (error) {
    console.log(
      'LOGIN ERROR =>',
      error.response?.data || error.message
    );

    throw error;
  }
};

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};


// ==========================
// REGISTER API
// ==========================


export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('user');
};

// Biodiversity APIs

export const createBiodiversityEntry = async (entryData) => {
  try {
    const formData = new FormData();

    // ======================
    // REQUIRED FIELDS
    // ======================
    formData.append(
      "commonName",
      entryData.commonName || "Neem"
    );

    // MUST MATCH ENUM
    formData.append(
      "category",
      entryData.category || "Flora"
    );

    formData.append(
      "gramPanchayat",
      entryData.gramPanchayat || "Test GP"
    );

    // ======================
    // OPTIONAL FIELDS
    // ======================
    formData.append(
      "scientificName",
      entryData.scientificName || "Azadirachta indica"
    );

    formData.append(
      "localName",
      entryData.localName || "Neem Tree"
    );

    formData.append(
      "habitat",
      entryData.habitat || "Forest"
    );

    formData.append(
      "description",
      entryData.description || "Test Description"
    );

    // ======================
    // LOCATION
    // BACKEND COMPATIBLE
    // ======================

    const latitude =
      entryData?.location?.coordinates?.[0] || 25.6;

    const longitude =
      entryData?.location?.coordinates?.[1] || 85.1;

    formData.append("location[type]", "Point");

    formData.append(
      "location[coordinates][]",
      String(latitude)
    );

    formData.append(
      "location[coordinates][]",
      String(longitude)
    );

    formData.append(
      "locationAccuracy",
      String(entryData.locationAccuracy || 10)
    );

    // ======================
    // PHOTOS
    // ======================
    if (entryData.photos?.length > 0) {
      entryData.photos.forEach((uri, index) => {
        formData.append("photos", {
          uri,
          type: "image/jpeg",
          name: `photo_${index}.jpg`,
        });
      });
    }

    // ======================
    // AUDIO
    // ======================
    if (entryData.audioUri) {
      formData.append("audio", {
        uri: entryData.audioUri,
        type: "audio/m4a",
        name: "audio.m4a",
      });
    }

    console.log("🚀 SENDING DATA");

    const response = await api.post(
      "/biodiversity",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ SUCCESS =>", response.data);

    return response.data;

  } catch (error) {
    console.log(
      "❌ ERROR =>",
      error.response?.data || error.message
    );

    throw error;
  }
};


export const getBiodiversityEntries = async (filters) => {
  try {

    const response = await api.get(
      '/biodiversity',
      {
        params: filters,
      }
    );

    console.log(
      "BIODIVERSITY API RESPONSE =>",
      response.data
    );

    // RETURN ARRAY ONLY
    return response.data.data || [];

  } catch (error) {

    console.log(
      "BIODIVERSITY API ERROR =>",
      error.response?.data || error.message
    );

    return [];
  }
};

export const getBiodiversityEntry = async (id) => {
  const response = await api.get(`/biodiversity/${id}`);
  return response.data;
};

export const updateBiodiversityEntry = async (id, data) => {
  const response = await api.put(`/biodiversity/${id}`, data);
  return response.data;
};

export const deleteBiodiversityEntry = async (id) => {
  const response = await api.delete(`/biodiversity/${id}`);
  return response.data;
};


export const getStats = async (userId) => {
  try {

    console.log("📡 FETCHING STATS");

    // OVERVIEW API
    const statsResponse = await api.get(
      '/stats/overview'
    );

    // BIODIVERSITY LIST API
    const biodiversityResponse = await api.get(
      '/biodiversity'
    );

    const statsData =
      statsResponse.data.data;

    const biodiversityEntries =
      biodiversityResponse.data.data || [];

    console.log(
      "BIODIVERSITY ENTRIES =>",
      biodiversityEntries
    );

    // =========================
    // TOTAL ENTRIES
    // =========================

    const totalEntries =
      statsData.totalBiodiversity || 0;

    // =========================
    // MY ENTRIES
    // =========================

    const myEntries =
      biodiversityEntries.filter(
        item =>
          item.observedBy?._id === userId
      ).length;

    // =========================
    // APPROVED
    // =========================

    const approved =
      biodiversityEntries.filter(
        item =>
          item.validationStatus ===
          'Approved'
      ).length;

    // =========================
    // PENDING
    // =========================

    const pending =
      biodiversityEntries.filter(
        item =>
          item.validationStatus ===
          'Pending'
      ).length;

    return {
      totalEntries,
      myEntries,
      approved,
      pending,
    };

  } catch (error) {

    console.log(
      "❌ STATS API ERROR =>",
      error.response?.data || error.message
    );

    return {
      totalEntries: 0,
      myEntries: 0,
      approved: 0,
      pending: 0,
    };
  }
};

// Traditional Knowledge APIs
export const createTraditionalKnowledge = async (data) => {
  const response = await api.post('/traditional-knowledge', data);
  return response.data;
};

export const getTraditionalKnowledge = async (filters) => {
  const response = await api.get('/traditional-knowledge', {
    params: filters,
  });

  return response.data;
};

// Agro-Biodiversity APIs
export const createAgroBiodiversity = async (data) => {
  const response = await api.post('/agro-biodiversity', data);
  return response.data;
};

export const getAgroBiodiversity = async (filters) => {
  const response = await api.get('/agro-biodiversity', {
    params: filters,
  });

  return response.data;
};

// Validation APIs
export const getPendingValidations = async () => {
  const response = await api.get('/validation/pending');
  return response.data;
};

export const validateEntry = async (entryId, status, comments) => {
  const response = await api.post(`/validation/${entryId}`, {
    status,
    comments,
  });

  return response.data;
};

// Sync API for offline entries
export const syncOfflineEntries = async (entries) => {
  const response = await api.post('/sync/entries', {
    entries,
  });

  return response.data;
};

// Export default instance
export default api;