import { useState, useEffect } from 'react';
import { fetchSiteSettings, fetchNavigationLinks, fetchSocialLinks, fetchFormOptions } from '../services/settings';
import { getStrapiMediaUrl } from '../services/api';

export interface SiteSettings {
  whatsappNumber: string;
  whatsappMessage: string;
  clientCountTarget: number;
  clientCountStart: number;
  assetPalaceCourtyard: string;
  assetPolaroidCouple: string;
  assetCeremonialDiya: string;
  instagramUsername: string;
  copyrightYear: string;
}

export interface SectionContent {
  [key: string]: string;
}

export interface SectionMedia {
  [key: string]: string;
}

const EMPTY_SETTINGS: SiteSettings = {
  whatsappNumber: '',
  whatsappMessage: '',
  clientCountTarget: 0,
  clientCountStart: 0,
  assetPalaceCourtyard: '',
  assetPolaroidCouple: '',
  assetCeremonialDiya: '',
  instagramUsername: '',
  copyrightYear: '',
};

const SETTINGS_MAP: Record<string, keyof SiteSettings> = {
  whatsapp_number: 'whatsappNumber',
  whatsapp_message: 'whatsappMessage',
  client_count_target: 'clientCountTarget',
  client_count_start: 'clientCountStart',
  asset_palace_courtyard: 'assetPalaceCourtyard',
  asset_polaroid_couple: 'assetPolaroidCouple',
  asset_ceremonial_diya: 'assetCeremonialDiya',
  instagram_username: 'instagramUsername',
  copyright_year: 'copyrightYear',
};

export interface FormOption {
  label: string;
  value: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(EMPTY_SETTINGS);
  const [sections, setSections] = useState<Record<string, SectionContent>>({});
  const [sectionMedia, setSectionMedia] = useState<Record<string, SectionMedia>>({});
  const [navLinks, setNavLinks] = useState<{ label: string; href: string }[]>([]);
  const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string; iconName: string }[]>([]);
  const [formOptions, setFormOptions] = useState<Record<string, FormOption[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const [rawSettings, rawNavLinks, rawSocialLinks, eventTypes, destinations, servicesForm] = await Promise.all([
          fetchSiteSettings(),
          fetchNavigationLinks(),
          fetchSocialLinks(),
          fetchFormOptions('event_types'),
          fetchFormOptions('destinations'),
          fetchFormOptions('services_form'),
        ]);

        if (!cancelled) {
          const newSettings = { ...EMPTY_SETTINGS };
          const newSections: Record<string, SectionContent> = {};
          const newMedia: Record<string, SectionMedia> = {};

          rawSettings.forEach((s) => {
            const key = SETTINGS_MAP[s.key];
            if (key) {
              if (typeof EMPTY_SETTINGS[key] === 'number') {
                (newSettings as any)[key] = parseInt(s.value, 10) || 0;
              } else {
                (newSettings as any)[key] = s.value || '';
              }
            }
            if (s.section) {
              if (!newSections[s.section]) newSections[s.section] = {};
              newSections[s.section][s.key] = s.value;
              if (s.media?.url) {
                if (!newMedia[s.section]) newMedia[s.section] = {};
                newMedia[s.section][s.key] = getStrapiMediaUrl(s.media.url);
              }
            }
          });

          setSettings(newSettings);
          setSections(newSections);
          setSectionMedia(newMedia);

          if (rawNavLinks.length > 0) setNavLinks(rawNavLinks);
          if (rawSocialLinks.length > 0) setSocialLinks(rawSocialLinks);

          setFormOptions({
            event_types: eventTypes.map((o) => ({ label: o.label, value: o.value })),
            destinations: destinations.map((o) => ({ label: o.label, value: o.value })),
            services_form: servicesForm.map((o) => ({ label: o.label, value: o.value })),
          });
        }
      } catch (err) {
        // API unavailable — settings stay empty
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { settings, sections, sectionMedia, navLinks, socialLinks, formOptions, loading };
}

/** Helper: get a pipe-separated array from section content */
export function pipeArray(section: SectionContent | undefined, key: string): string[] {
  if (!section || !section[key]) return [];
  return section[key].split('|').map((s) => s.trim()).filter(Boolean);
}
