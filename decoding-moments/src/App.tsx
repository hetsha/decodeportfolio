import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CinematicStorySection } from './components/CinematicStorySection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedStoriesSection } from './components/FeaturedStoriesSection';
import { InstantReelsProcessSection } from './components/InstantReelsProcessSection';
import { GrandCtaSection } from './components/GrandCtaSection';
import { MainFooter } from './components/MainFooter';
import { ReelModal } from './components/ReelModal';
import { ShowreelModal } from './components/ShowreelModal';
import { PlanStoryModal } from './components/PlanStoryModal';
import { StoryChapterModal } from './components/StoryChapterModal';
import { LogoIntroOverlay } from './components/LogoIntroOverlay';
import { GoldenScrollSpine } from './components/GoldenScrollSpine';
import { ElasticSectionTransition } from './components/ElasticSectionTransition';
import { HERO_REELS } from './data/studioData';
import { ReelItem, StoryChapter } from './types';

export default function App() {
  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string>('Weddings');
  const [selectedChapter, setSelectedChapter] = useState<StoryChapter | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Trigger replay of logo intro
  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsIntroOpen(true);
  };

  // Next / Prev Reel navigation in ReelModal
  const handleNextReel = () => {
    if (!selectedReel) return;
    const currentIndex = HERO_REELS.findIndex((r) => r.id === selectedReel.id);
    const nextIndex = (currentIndex + 1) % HERO_REELS.length;
    setSelectedReel(HERO_REELS[nextIndex]);
  };

  const handlePrevReel = () => {
    if (!selectedReel) return;
    const currentIndex = HERO_REELS.findIndex((r) => r.id === selectedReel.id);
    const prevIndex = (currentIndex - 1 + HERO_REELS.length) % HERO_REELS.length;
    setSelectedReel(HERO_REELS[prevIndex]);
  };

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setPreselectedBookingService(serviceName);
    }
    setIsBookingOpen(true);
  };

  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(
      'Hello Decoding Moments Studio! I would like to inquire about commissioning storytellers for an upcoming celebration.'
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
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
      {/* Full-Bleed Tactile Fine Paper & Film Grain Overlay */}
      <div aria-hidden="true" className="tactile-grain-overlay" />

      {/* Opening Animation: The Logo Creates The Website */}
      <LogoIntroOverlay
        isOpen={isIntroOpen}
        onComplete={() => setIsIntroOpen(false)}
      />

      {/* Golden Scroll Spine & Navigation Companion */}
      <GoldenScrollSpine onReplayIntro={handleReplayIntro} />

      {/* Main Sticky Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
      />

      <main>
        {/* Hero Section with 3 Layered Vertical 4K Reels */}
        <HeroSection
          onSelectReel={(reel) => setSelectedReel(reel)}
          onFilterCategory={handleFilterCategory}
        />

        {/* Elastic Spring Transition: Hero → Cinematic */}
        <ElasticSectionTransition
          topColor="#F5EFE6"
          bottomColor="#0D0D0B"
        />

        {/* Dark Ambient Cinematic Story Section ("Some moments happen once.") */}
        <CinematicStorySection
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onSelectCategory={handleFilterCategory}
        />

        {/* Services Section ("Different Stories. Same Emotions.") */}
        <ServicesSection
          onSelectServiceForBooking={(serviceTitle) => handleOpenBooking(serviceTitle)}
        />

        {/* Featured Stories Section ("Curated Chapters") */}
        <FeaturedStoriesSection
          onOpenStoryChapter={(chapter) => setSelectedChapter(chapter)}
          selectedFilter={selectedCategoryFilter}
        />

        {/* Instant Reels Process Pipeline ("01 SHOOT, 02 CREATE, 03 EDIT, 04 DELIVER") */}
        <InstantReelsProcessSection
          onOpenBooking={() => handleOpenBooking('Instant Reels')}
        />

        {/* Grand CTA Section ("YOUR MOMENT DESERVES A STORY.") */}
        <GrandCtaSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenWhatsApp={handleOpenWhatsApp}
        />
      </main>

      {/* Studio Footer */}
      <MainFooter />

      {/* Interactive 9:16 Vertical Reel Player Modal */}
      <ReelModal
        reel={selectedReel}
        onClose={() => setSelectedReel(null)}
        onNext={handleNextReel}
        onPrev={handlePrevReel}
      />

      {/* Interactive Master 16:9 4K Showreel Player Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* Interactive Date & Package Consultation Modal */}
      <PlanStoryModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={preselectedBookingService}
      />

      {/* Story Chapter Details Modal */}
      <StoryChapterModal
        chapter={selectedChapter}
        onClose={() => setSelectedChapter(null)}
        onOpenBooking={() => handleOpenBooking()}
      />
    </div>
  );
}
