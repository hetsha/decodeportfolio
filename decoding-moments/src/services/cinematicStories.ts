import { fetchAPI, getStrapiMediaUrl } from './api';
import type { CinematicStory, StrapiResponse } from '../types';

function isValidUrl(str: string): boolean {
  if (!str) return false;
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function transformCinematicStory(raw: any): CinematicStory {
  const coverImageMedia = raw.coverImage;
  const videoMedia = raw.video;

  let coverUrl = raw.coverImageUrl || '';
  if (coverImageMedia?.url) {
    coverUrl = getStrapiMediaUrl(coverImageMedia.url).replace(/ /g, '%20');
  }
  if (!isValidUrl(coverUrl)) {
    coverUrl = '';
  }

  let videoUrl = '';
  if (videoMedia?.url) {
    videoUrl = getStrapiMediaUrl(videoMedia.url).replace(/ /g, '%20');
  }

  return {
    id: String(raw.id),
    documentId: raw.documentId,
    sectionLabel: raw.sectionLabel || 'THE STORY OF TODAY',
    headline: raw.headline || '',
    description: raw.description || '',
    coverImageUrl: coverUrl,
    coverImage: coverImageMedia || null,
    videoUrl: videoUrl,
    video: videoMedia || null,
    watermarkLeft: raw.watermarkLeft || '',
    watermarkRight: raw.watermarkRight || '',
    playLabel: raw.playLabel || 'Play Cinematic Film',
    showreelCta: raw.showreelCta || 'WATCH SHOWREEL',
    showreelDuration: raw.showreelDuration || '',
    category: raw.category || 'Weddings',
    sortOrder: raw.sortOrder || 0,
    isActive: raw.isActive !== false,
  };
}

export async function fetchCinematicStories(): Promise<CinematicStory[]> {
  try {
    const response = await fetchAPI<StrapiResponse<any[]>>('/cinematic-stories', {
      'sort': 'sortOrder:asc',
      'filters[isActive]': 'true',
      'populate': '*',
    });
    return response.data.map(transformCinematicStory);
  } catch (error) {
    console.error('Failed to fetch cinematic stories:', error);
    return [];
  }
}
