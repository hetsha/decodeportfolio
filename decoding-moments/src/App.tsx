import { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CinematicStorySection } from './components/CinematicStorySection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedStoriesSection } from './components/FeaturedStoriesSection';
import { GrandCtaSection } from './components/GrandCtaSection';
import { MainFooter } from './components/MainFooter';
import { ReelModal } from './components/ReelModal';
import { ShowreelModal } from './components/ShowreelModal';
import { PlanStoryModal } from './components/PlanStoryModal';
import { LogoIntroOverlay } from './components/LogoIntroOverlay';
import { GoldenScrollSpine } from './components/GoldenScrollSpine';
import { ReelItem, StoryChapter, StrapiMedia } from './types';

const chapterToReel = (c: StoryChapter): ReelItem => ({
  id: c.id,
  documentId: c.documentId,
  title: c.title,
  subtitle: c.subtitle,
  category: c.category as ReelItem['category'],
  location: c.location,
  duration: '',
  badge: c.tag,
  posterUrl: c.imageUrl,
  video: c.videoUrl ? ({ url: c.videoUrl } as unknown as StrapiMedia) : null,
  likes: 1200,
  description: c.subtitle,
  instagramUrl: c.instagramUrl,
});

function AppContent() {
  const { reels, chapters, cinematicStories, settings, sections, navLinks, socialLinks, formOptions } = useData();

  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [activeReelList, setActiveReelList] = useState<ReelItem[]>([]);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string>('Weddings');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  const matchesFilter = (category: string) =>
    !selectedCategoryFilter ||
    selectedCategoryFilter === 'All' ||
    category.toLowerCase() === selectedCategoryFilter.toLowerCase();

  const scopedReels = () => {
    if (!selectedCategoryFilter || selectedCategoryFilter === 'All') return reels;
    return reels.filter((r) => matchesFilter(r.category));
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsIntroOpen(true);
  };

  const openReelFromList = (list: ReelItem[], reelId: string) => {
    const safeList = list.length > 0 ? list : [];
    setActiveReelList(safeList);
    const target = safeList.find((r) => r.id === reelId) || safeList[0] || null;
    setSelectedReel(target);
  };

  const handleSelectHeroReel = (reel: ReelItem) => {
    const list = scopedReels();
    openReelFromList(list, reel.id);
  };

  const handleNextReel = () => {
    if (!selectedReel) return;
    const list = activeReelList.length > 0 ? activeReelList : scopedReels();
    if (list.length <= 1) return;
    const currentIndex = list.findIndex((r) => r.id === selectedReel.id);
    if (currentIndex === -1) {
      setSelectedReel(list[0]);
      return;
    }
    const nextIndex = (currentIndex + 1) % list.length;
    setSelectedReel(list[nextIndex] ?? list[0]);
  };

  const handlePrevReel = () => {
    if (!selectedReel) return;
    const list = activeReelList.length > 0 ? activeReelList : scopedReels();
    if (list.length <= 1) return;
    const currentIndex = list.findIndex((r) => r.id === selectedReel.id);
    if (currentIndex === -1) {
      setSelectedReel(list[0]);
      return;
    }
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    setSelectedReel(list[prevIndex] ?? list[0]);
  };

  const handleOpenChapterAsReel = (chapter: StoryChapter) => {
    const filtered = chapters
      .filter((c) => matchesFilter(c.category))
      .map(chapterToReel);
    const list = filtered.length > 0 ? filtered : [chapterToReel(chapter)];
    openReelFromList(list, chapter.id);
  };

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedBookingService(serviceName);
    }
    setIsBookingOpen(true);
  };

  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(settings.whatsappMessage);
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleFilterCategory = (cat: string) => {
    setSelectedCategoryFilter(cat);
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sharedCategories = reels.length === 0 && chapters.length === 0
    ? undefined
    : ['All', ...new Set([...reels.map((r) => r.category), ...chapters.map((c) => c.category)].filter(Boolean))];

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#171614] relative selection:bg-[#B68A55] selection:text-white">
      <div aria-hidden="true" className="tactile-grain-overlay" />

      <LogoIntroOverlay
        isOpen={isIntroOpen}
        onComplete={() => setIsIntroOpen(false)}
      />

      <GoldenScrollSpine onReplayIntro={handleReplayIntro} section={sections['golden-scroll']} />

      {!isIntroOpen && (
        <Header
          onOpenBooking={() => handleOpenBooking()}
          navLinks={navLinks}
          section={sections['header']}
        />
      )}

      <main>
        <div className="relative">
          <HeroSection
            onSelectReel={handleSelectHeroReel}
            onFilterCategory={handleFilterCategory}
            introComplete={!isIntroOpen}
            reels={reels}
            section={sections['hero']}
            categories={sharedCategories}
          />

          <CinematicStorySection
            onOpenShowreel={() => setIsShowreelOpen(true)}
            assetUrl={settings.assetPalaceCourtyard}
            section={sections['cinematic-story']}
            cinematicStories={cinematicStories}
          />
        </div>

        <ServicesSection />

        <FeaturedStoriesSection
          onOpenStoryChapter={handleOpenChapterAsReel}
          onFilterChange={setSelectedCategoryFilter}
          selectedFilter={selectedCategoryFilter}
          chapters={chapters}
          section={sections['featured-stories']}
          categories={sharedCategories}
        />

        <GrandCtaSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenWhatsApp={handleOpenWhatsApp}
          assetUrl={settings.assetCeremonialDiya}
          section={sections['cta']}
        />
      </main>

      <MainFooter socialLinks={socialLinks} copyrightYear={settings.copyrightYear} section={sections['footer']} />

      <ReelModal
        reel={selectedReel}
        reels={activeReelList.length > 0 ? activeReelList : scopedReels()}
        onClose={() => {
          setSelectedReel(null);
          setActiveReelList([]);
        }}
        onNext={handleNextReel}
        onPrev={handlePrevReel}
        section={sections['reel-modal']}
        instagramProfileUrl={socialLinks.find((l) => l.platform.toLowerCase() === 'instagram')?.url}
      />

      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        assetUrl={settings.assetPalaceCourtyard}
        section={sections['showreel-modal']}
      />

      <PlanStoryModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={preselectedBookingService}
        formOptions={formOptions}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
