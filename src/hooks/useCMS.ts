import { useQuery } from '@tanstack/react-query';
import { getSettings, getProjects, getFeaturedProjects, getServices, getTestimonials, getTeam } from '../services/api';

export const useSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: getFeaturedProjects,
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });
};

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
  });
};

export const useTeam = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: getTeam,
  });
};
