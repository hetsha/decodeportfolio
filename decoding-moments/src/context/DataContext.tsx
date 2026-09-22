import React, { createContext, useContext } from 'react';
import type { ReelItem, StoryChapter, ServiceItem, ProcessStep, CinematicStory } from '../types';
import { useReels } from '../hooks/useReels';
import { useChapters } from '../hooks/useChapters';
import { useServices } from '../hooks/useServices';
import { useProcessSteps } from '../hooks/useProcessSteps';
import { useCinematicStories } from '../hooks/useCinematicStories';
import { useSiteSettings, type SectionContent, type SectionMedia, type FormOption } from '../hooks/useSiteSettings';

interface DataContextType {
  reels: ReelItem[];
  chapters: StoryChapter[];
  services: ServiceItem[];
  steps: ProcessStep[];
  cinematicStories: CinematicStory[];
  settings: {
    whatsappNumber: string;
    whatsappMessage: string;
    clientCountTarget: number;
    clientCountStart: number;
    assetPalaceCourtyard: string;
    assetPolaroidCouple: string;
    assetCeremonialDiya: string;
    instagramUsername: string;
    copyrightYear: string;
  };
  sections: Record<string, SectionContent>;
  sectionMedia: Record<string, SectionMedia>;
  navLinks: { label: string; href: string }[];
  socialLinks: { platform: string; url: string; iconName: string }[];
  formOptions: Record<string, FormOption[]>;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { reels, loading: reelsLoading } = useReels();
  const { chapters, loading: chaptersLoading } = useChapters();
  const { services, loading: servicesLoading } = useServices();
  const { steps, loading: stepsLoading } = useProcessSteps();
  const { stories: cinematicStories, loading: cinematicLoading } = useCinematicStories();
  const { settings, sections, sectionMedia, navLinks, socialLinks, formOptions, loading: settingsLoading } = useSiteSettings();

  const loading = reelsLoading || chaptersLoading || servicesLoading || stepsLoading || cinematicLoading || settingsLoading;

  return (
    <DataContext.Provider
      value={{
        reels,
        chapters,
        services,
        steps,
        cinematicStories,
        settings,
        sections,
        sectionMedia,
        navLinks,
        socialLinks,
        formOptions,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
