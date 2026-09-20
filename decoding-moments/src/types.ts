export interface ReelItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Weddings' | 'Celebrations' | 'Traditions' | 'Brands' | 'Travel';
  location: string;
  duration: string;
  badge: string;
  posterUrl: string;
  aspectRatio?: string;
  likes: number;
  description: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  category: string;
  location: string;
  imageUrl: string;
  clientName?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  description: string;
  turnaroundTime: string;
  features: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  timing: string;
  detail: string;
  iconName: string;
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
