import { fetchAPI } from './api';
import type { ServiceItem, StrapiResponse } from '../types';

interface StrapiService {
  id: number;
  documentId: string;
  title: string;
  tagline: string;
  iconName: string;
  turnaroundTime: string;
  description: string;
  features: string[] | Record<string, unknown>;
}

function transformService(strapiService: StrapiService): ServiceItem {
  let features: string[] = [];
  if (Array.isArray(strapiService.features)) {
    features = strapiService.features.map(String);
  } else if (typeof strapiService.features === 'object' && strapiService.features !== null) {
    features = Object.values(strapiService.features).map(String);
  }

  return {
    id: strapiService.documentId,
    documentId: strapiService.documentId,
    title: strapiService.title,
    tagline: strapiService.tagline || '',
    iconName: strapiService.iconName || 'sparkles',
    turnaroundTime: strapiService.turnaroundTime || '',
    description: strapiService.description || '',
    features,
  };
}

export async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiService[]>>('/services', {
      'populate': '*',
      'sort': 'createdAt:asc',
    });
    return response.data.map(transformService);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return [];
  }
}
