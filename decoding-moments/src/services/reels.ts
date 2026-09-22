import { fetchAPI, getStrapiMediaUrl } from './api';
import type { ReelItem, StrapiResponse } from '../types';

interface StrapiReel {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  duration: string;
  badge: string;
  likes: number;
  description: string;
  instagramUrl?: string;
  instagramPostId?: string;
  posterUrl?: string;
  posterImage?: {
    url: string;
    alternativeText?: string;
  } | null;
  video?: {
    url: string;
  } | null;
}

function isValidUrl(str: string): boolean {
  try {
    return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/');
  } catch {
    return false;
  }
}

function transformReel(strapiReel: StrapiReel): ReelItem {
  const posterFromMedia = strapiReel.posterImage?.url
    ? getStrapiMediaUrl(strapiReel.posterImage.url)
    : '';

  return {
    id: strapiReel.documentId,
    documentId: strapiReel.documentId,
    title: strapiReel.title,
    subtitle: strapiReel.subtitle || '',
    category: strapiReel.category as ReelItem['category'],
    location: strapiReel.location || '',
    duration: strapiReel.duration || '',
    badge: strapiReel.badge || '',
    posterUrl: (strapiReel.posterUrl && isValidUrl(strapiReel.posterUrl))
      ? strapiReel.posterUrl
      : posterFromMedia,
    video: strapiReel.video ? { ...strapiReel.video, url: getStrapiMediaUrl(strapiReel.video.url) } as any : null,
    posterImage: strapiReel.posterImage ? { ...strapiReel.posterImage, url: getStrapiMediaUrl(strapiReel.posterImage.url) } as any : null,
    likes: strapiReel.likes || 0,
    description: strapiReel.description || '',
    instagramUrl: strapiReel.instagramUrl,
    instagramPostId: strapiReel.instagramPostId,
  };
}

export async function fetchReels(): Promise<ReelItem[]> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiReel[]>>('/reels', {
      'populate': '*',
      'sort': 'createdAt:desc',
    });
    return response.data.map(transformReel);
  } catch (error) {
    console.error('Failed to fetch reels:', error);
    return [];
  }
}

export async function fetchReelById(documentId: string): Promise<ReelItem | null> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiReel[]>>(`/reels`, {
      'filters[documentId]': documentId,
      'populate': '*',
    });
    if (response.data.length === 0) return null;
    return transformReel(response.data[0]);
  } catch (error) {
    console.error('Failed to fetch reel:', error);
    return null;
  }
}
