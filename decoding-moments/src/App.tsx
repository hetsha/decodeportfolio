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
import { StoryChapterModal } from './components/StoryChapterModal';
import { LogoIntroOverlay } from './components/LogoIntroOverlay';
import { GoldenScrollSpine } from './components/GoldenScrollSpine';
import { ReelItem, StoryChapter } from './types';

function AppContent() {
  const { reels, chapters, services, cinematicStories, settings, sections, navLinks, socialLinks, formOptions } = useData();

  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string>('Weddings');
  const [selectedChapter, setSelectedChapter] = useState<StoryChapter | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsIntroOpen(true);
  };

  const handleNextReel = () => {
    if (!selectedReel) return;
    const currentIndex = reels.findIndex((r) => r.id === selectedReel.id);
    const nextIndex = (currentIndex + 1) % reels.length;
    setSelectedReel(reels[nextIndex]);
  };

  const handlePrevReel = () => {
    if (!selectedReel) return;
    const currentIndex = reels.findIndex((r) => r.id === selectedReel.id);
    const prevIndex = (currentIndex - 1 + reels.length) % reels.length;
    setSelectedReel(reels[prevIndex]);
  };

  const handleNextChapter = () => {
    if (!selectedChapter) return;
    const idx = chapters.findIndex((c) => c.id === selectedChapter.id);
    const nextIdx = (idx + 1) % chapters.length;
    setSelectedChapter(chapters[nextIdx]);
  };

  const handlePrevChapter = () => {
    if (!selectedChapter) return;
    const idx = chapters.findIndex((c) => c.id === selectedChapter.id);
    const prevIdx = (idx - 1 + chapters.length) % chapters.length;
    setSelectedChapter(chapters[prevIdx]);
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
            onSelectReel={(reel) => setSelectedReel(reel)}
            onFilterCategory={handleFilterCategory}
            introComplete={!isIntroOpen}
            reels={reels}
            section={sections['hero']}
          />

          <CinematicStorySection
            onOpenShowreel={() => setIsShowreelOpen(true)}
            assetUrl={settings.assetPalaceCourtyard}
            section={sections['cinematic-story']}
            cinematicStories={cinematicStories}
          />
        </div>

        <ServicesSection
          onSelectServiceForBooking={(serviceTitle) => handleOpenBooking(serviceTitle)}
          services={services}
          section={sections['services']}
        />

        <FeaturedStoriesSection
          onOpenStoryChapter={(chapter) => setSelectedChapter(chapter)}
          selectedFilter={selectedCategoryFilter}
          chapters={chapters}
          section={sections['featured-stories']}
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
        onClose={() => setSelectedReel(null)}
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

      <StoryChapterModal
        chapter={selectedChapter}
        chapters={chapters}
        onClose={() => setSelectedChapter(null)}
        onNext={handleNextChapter}
        onPrev={handlePrevChapter}
        section={sections['story-chapter-modal']}
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
