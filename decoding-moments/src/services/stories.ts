import { fetchAPI, getStrapiMediaUrl } from './api';
import type { StoryChapter, StrapiResponse } from '../types';

interface StrapiChapter {
  id: number;
  documentId: string;
  title: string;
  subtitle: string;
  tag: string;
  category: string;
  location: string;
  clientName?: string;
  coverUrl?: string;
  instagramUrl?: string;
  coverImage?: {
    url: string;
    alternativeText?: string;
  } | null;
  polaroidImage?: {
    url: string;
    alternativeText?: string;
  } | null;
  video?: {
    url: string;
    alternativeText?: string;
  } | null;
}

function transformChapter(strapiChapter: StrapiChapter): StoryChapter {
  return {
    id: strapiChapter.documentId,
    documentId: strapiChapter.documentId,
    title: strapiChapter.title,
    subtitle: strapiChapter.subtitle || '',
    tag: strapiChapter.tag || '',
    category: strapiChapter.category || '',
    location: strapiChapter.location || '',
    clientName: strapiChapter.clientName,
    imageUrl: (strapiChapter.coverImage?.url
      ? getStrapiMediaUrl(strapiChapter.coverImage.url)
      : strapiChapter.coverUrl)
      || `https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg`,
    polaroidImageUrl: strapiChapter.polaroidImage?.url
      ? getStrapiMediaUrl(strapiChapter.polaroidImage.url)
      : undefined,
    videoUrl: strapiChapter.video?.url
      ? getStrapiMediaUrl(strapiChapter.video.url)
      : undefined,
    instagramUrl: strapiChapter.instagramUrl || undefined,
  };
}

export async function fetchChapters(): Promise<StoryChapter[]> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiChapter[]>>('/story-chapters', {
      'populate': '*',
      'sort': 'createdAt:desc',
    });
    return response.data.map(transformChapter);
  } catch (error) {
    console.error('Failed to fetch chapters:', error);
    return [];
  }
}

export async function fetchChapterById(documentId: string): Promise<StoryChapter | null> {
  try {
    const response = await fetchAPI<StrapiResponse<StrapiChapter[]>>(`/story-chapters`, {
      'filters[documentId]': documentId,
      'populate': '*',
    });
    if (response.data.length === 0) return null;
    return transformChapter(response.data[0]);
  } catch (error) {
    console.error('Failed to fetch chapter:', error);
    return null;
  }
}
