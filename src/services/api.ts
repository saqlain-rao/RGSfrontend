/// <reference types="vite/client" />
import axios from 'axios';
import { Project, Service, Settings, Testimonial, TeamMember } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getSettings = async (): Promise<Settings> => {
  const { data } = await api.get('/settings');
  // settings array returns 0 index
  return data.data[0];
};

export const createSettings = async (settingsData: Partial<Settings>): Promise<Settings> => {
  const { data } = await api.post('/settings', settingsData);
  return data.data;
};

export const updateSettings = async (id: string, settingsData: Partial<Settings>): Promise<Settings> => {
  const { data } = await api.put(`/settings/${id}`, settingsData);
  return data.data;
};

// Projects API
export const getProjects = async (): Promise<Project[]> => {
  const { data } = await api.get('/projects');
  return data.data;
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const { data } = await api.get('/projects?featured=true');
  return data.data;
};

// Services API
export const getServices = async (): Promise<Service[]> => {
  const { data } = await api.get('/services');
  return data.data;
};

// Testimonials API
export const getTestimonials = async (): Promise<Testimonial[]> => {
  const { data } = await api.get('/testimonials');
  return data.data;
};

// Team API
export const getTeam = async (): Promise<TeamMember[]> => {
  const { data } = await api.get('/teams');
  return data.data;
};

// Blogs API
export const getBlogs = async (): Promise<any[]> => {
  const { data } = await api.get('/blogs');
  return data.data;
};

export const getBlogBySlug = async (slug: string): Promise<any> => {
  const { data } = await api.get(`/blogs/slug/${slug}`);
  return data.data;
};

// Contact API
export const submitContact = async (formData: any) => {
  const { data } = await api.post('/contactmessages', formData);
  return data;
};
