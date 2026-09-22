// Strapi API response wrapper
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi media type
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: Record<string, { url: string; width: number; height: number }> | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReelItem {
  id: string;
  documentId?: string;
  title: string;
  subtitle: string;
  category: 'Weddings' | 'Celebrations' | 'Traditions' | 'Brands' | 'Travel';
  location: string;
  duration: string;
  badge: string;
  posterUrl: string;
  video?: StrapiMedia | null;
  posterImage?: StrapiMedia | null;
  aspectRatio?: string;
  likes: number;
  description: string;
  instagramUrl?: string;
  instagramPostId?: string;
  status?: string;
}

export interface StoryChapter {
  id: string;
  documentId?: string;
  title: string;
  subtitle: string;
  tag: string;
  category: string;
  location: string;
  imageUrl: string;
  polaroidImageUrl?: string;
  videoUrl?: string;
  instagramUrl?: string;
  coverImage?: StrapiMedia | null;
  clientName?: string;
  status?: string;
}

export interface ServiceItem {
  id: string;
  documentId?: string;
  title: string;
  tagline: string;
  iconName: string;
  description: string;
  turnaroundTime: string;
  features: string[];
}

export interface ProcessStep {
  step: string | number;
  title: string;
  description: string;
  timing: string;
  detail: string;
  iconName: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
}

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  sortOrder: number;
  isActive: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  iconName: string;
  isActive: boolean;
}

export interface CinematicStory {
  id: string;
  documentId?: string;
  sectionLabel: string;
  headline: string;
  description: string;
  coverImageUrl: string;
  coverImage?: StrapiMedia | null;
  videoUrl: string;
  video?: StrapiMedia | null;
  watermarkLeft: string;
  watermarkRight: string;
  playLabel: string;
  showreelCta: string;
  showreelDuration: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  destination: string;
  eventDate: string;
  guestCount: string;
  servicesNeeded: string[];
  notes: string;
}
