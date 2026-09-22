import { fetchAPI, getStrapiMediaUrl } from './api';
import type { StrapiResponse } from '../types';

export interface SiteSetting {
  id: number;
  documentId: string;
  section: string;
  key: string;
  value: string;
  description: string | null;
  media?: {
    id: number;
    url: string;
    name: string;
    mime: string;
  } | null;
}

export interface FormOption {
  id: number;
  documentId: string;
  group: string;
  label: string;
  value: string;
  sortOrder: number;
}

export async function fetchSiteSettings(): Promise<SiteSetting[]> {
  try {
    const response = await fetchAPI<StrapiResponse<SiteSetting[]>>('/site-settings', {
      populate: 'media',
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch site settings:', error);
    return [];
  }
}

export async function fetchSiteSettingsBySection(section: string): Promise<Record<string, string>> {
  try {
    const settings = await fetchSiteSettings();
    const result: Record<string, string> = {};
    settings
      .filter((s) => s.section === section)
      .forEach((s) => { result[s.key] = s.value; });
    return result;
  } catch (error) {
    console.error(`Failed to fetch settings for section ${section}:`, error);
    return {};
  }
}

export async function fetchNavigationLinks() {
  try {
    const response = await fetchAPI<StrapiResponse<{ label: string; href: string; sortOrder: number; isActive: boolean }[]>>(
      '/navigation-links',
      { 'sort': 'sortOrder:asc', 'filters[isActive]': 'true' }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch navigation links:', error);
    return [];
  }
}

export async function fetchSocialLinks() {
  try {
    const response = await fetchAPI<StrapiResponse<{ platform: string; url: string; iconName: string; isActive: boolean }[]>>(
      '/social-links',
      { 'filters[isActive]': 'true' }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch social links:', error);
    return [];
  }
}

export async function fetchFormOptions(group: string): Promise<FormOption[]> {
  try {
    const response = await fetchAPI<StrapiResponse<FormOption[]>>(
      '/form-options',
      { 'filters[group]': group, 'sort': 'sortOrder:asc' }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch form options for ${group}:`, error);
    return [];
  }
}
