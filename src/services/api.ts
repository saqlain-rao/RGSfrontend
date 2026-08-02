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

// Settings API
export const getSettings = async (): Promise<Settings> => {
  const { data } = await api.get('/settings');
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
  const { data } = await api.get('/team');
  return data.data;
};

// Contact API
export const submitContact = async (formData: any) => {
  const { data } = await api.post('/contact', formData);
  return data;
};
