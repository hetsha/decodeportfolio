import { fetchAPI } from './api';
import type { ProcessStep, StrapiResponse } from '../types';

interface StrapiProcessStep {
  id: number;
  documentId: string;
  step: number;
  title: string;
  timing: string;
  description: string;
  detail: string;
  iconName: string;
}

function transformStep(strapiStep: StrapiProcessStep): ProcessStep {
  return {
    step: strapiStep.step,
    title: strapiStep.title,
    timing: strapiStep.timing || '',
    description: strapiStep.description || '',
    detail: strapiStep.detail || '',
    iconName: strapiStep.iconName || 'circle',
  };
}

export async function fetchProcessSteps(): Promise<ProcessStep[]> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiProcessStep[]>>('/process-steps', {
      'populate': '*',
      'sort': 'step:asc',
    });
    return response.data.map(transformStep);
  } catch (error) {
    console.error('Failed to fetch process steps:', error);
    return [];
  }
}
