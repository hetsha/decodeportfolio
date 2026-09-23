import type { Core } from '@strapi/strapi';
import { sendToCrm } from './api/inquiry/services/crm-webhook';

const seedData = {
  reels: [
    {
      title: 'Haldi Vibes',
      subtitle: 'Pure Joy & Vibrant Colors',
      category: 'Celebrations' as const,
      location: 'Jaipur Haveli',
      duration: '0:32',
      badge: 'REEL 4K',
      likes: 1248,
      description: 'Golden hour haldi celebration filled with marigold showers, unscripted giggles, and spontaneous dhol beats decoded live.',
      posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz1PL1Op7J4AVy5kIpytqpdqSrB3vDaeiomBkhfoib9u-rfPFho2NW_Z9YSeTrHOR8MxyfQQh16kWKBh00UUaNJ8eyh6FgSy2Pvrz6-c-uaMflJ5GSBFm6WfB3FLBF6U17ZBSh-5lY3J9G_NKaJlxwx0pyPVs729vUHr2BzNh9oB-pS0y_yFnww1LZwLhXCuB-Dyok0JzSxl8_5k-UTQNJBhBaRFHbwEWfom1FnuaCWf48fabhjNe7',
    },
    {
      title: 'Royal Vows',
      subtitle: 'The Majestic Courtyard',
      category: 'Weddings' as const,
      location: 'Udaipur Palace',
      duration: '0:45',
      badge: 'CINEMATIC 4K',
      likes: 2190,
      description: 'A sunset pheras ritual against the tranquil Lake Pichola backdrop. High-contrast heirloom film grading.',
      posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnsIlhAni59SEGDPuKrw0Vq5gIAqcwZPWTAGuZv8FtFWSQoiIAUN7WWPGhFEalDR8r-S_1yUThBjprqmIZEwsPx7EHSM04Hu8SQms4E9XnMeZLyGb84L5gCyBhk8jeCQRe-zcWvoPgy_5kygD6uo6IrW7knlNdh2fkheAlStaul5Q74nozSLG_vVm1umSH9SMzFalPSSPAkbRZmsSsdZuWoHTjG32dPsVga_QZjZWkd36xiqi10pfL',
    },
    {
      title: 'Pure Emotions',
      subtitle: 'Vidaai & Sacred Chants',
      category: 'Traditions' as const,
      location: 'Rambagh Palace, Jaipur',
      duration: '0:28',
      badge: 'SAME-DAY CUT',
      likes: 3410,
      description: 'The tender whisper between mother and daughter as the palanquin departs. Audio mastered directly from ceremonial chants.',
      posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCCo7ZXSRSqg5YOqw_OCRs7kYHWFvDLXLOd7eKsGC4kQdaSI_f4in8SgzTb7qSq2GjuaXrP-93OF-Ggw2l8j8gbQCkdsIxEO1JwK27gjDGhIlV-DMiB9vHk3AIucA4vNCUQCN_7h-_5vCx6KEoZjaxdxYSdwPDW7zXMFJ9TDmQNQX4Md7C-E8VyNH6C2UTUgSr6izFQRzU02qnS4vr035Jo2SqXBR2nehFmscFZ1semxk0exS_9EkM',
    },
  ],
  storyChapters: [
    {
      title: 'A Royal Beginning',
      subtitle: 'Jodhpur Heritage',
      tag: 'WEDDING STORY',
      category: 'Weddings',
      location: 'Umaid Bhawan, Jodhpur',
      clientName: 'Siddharth & Ananya',
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKXxX27VKsdJke8UX3YXFeeS-qJh7xYnNBvMXGmoykuFJqCgmWGDSu_HTK7SS15y6Ggi9zgXrXki5POp-gKGgwuYWvOK4WZ43EkmMKiAwjPnUSIVgvG2nioM6FRk1r1wALq9ng9fLTHooWLZzk4YYM3Sh_U9s3HKxrGizktKn6jFDkAf2oQPt68KS-BNXvv1q2t3BiveACm24FIj4bCoYcY2xhIp8s9x_4AJaQYKbOLZa1EMmvhKLb',
      instagramUrl: 'https://www.instagram.com/decoding.moments/',
    },
    {
      title: 'Haldi in Full Colour',
      subtitle: 'Same-Day Edit',
      tag: 'INSTANT REEL CREATION',
      category: 'Haldi',
      location: 'Alsisar Mahal, Shekhawati',
      clientName: 'Rhea & Dev',
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYAgpi2-ojsBlc7tzpMrMt75fjiGBTvf-dbIHgnaET1UDcJztDFqjC9MtxQRldMK0S87CsfAEO-Uyh8-UrQXOzxu0k5x-ccV-HTET-XX9XmM9W1tQfdrTI1oskYZ36uB0wNPUUXl6_ijW1xZ0sqJJdOrkQdnwdjg60wuZHBAwT6QDxkv_t8waOgp65d8U_izwCZuzj0yp6zNf5YRBWgot52mPOKjUxQ1XoL-BQm-9iudqAAuO5r28o',
      instagramUrl: 'https://www.instagram.com/decoding.moments/',
    },
    {
      title: 'Little Moments',
      subtitle: 'First Milestones',
      tag: 'CELEBRATIONS',
      category: 'Celebrations',
      location: 'Private Villa, Goa',
      clientName: "Aarav's 1st Birthday",
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAagt5rowpRdEwWG5ZQFQFDIaaqnkAqlFJRJenQoMZt2cwXFVjw8vDpT1Ua8uro7iv3bUENJ-4c478L2T48X1tlN-XRHYqXsPE_kxSmYeqk5iiDxyDdMKJqAhE1RAAnAqXlUhxxtykrn_4i5E_uax6olJxW_-qcy2yOjbGHXu8Ny5V8NjrE7ENzraj_QhvAkMKVNbL2bndmUXyXxLisJwB8dNHtfiVEKmTcUGyekvUbzcuqNlM_Q0Gi',
      instagramUrl: 'https://www.instagram.com/decoding.moments/',
    },
    {
      title: 'The Eternal Courtyard',
      subtitle: 'Heritage archives',
      tag: 'HERITAGE ARCHIVES',
      category: 'Traditions',
      location: 'City Palace, Jaipur',
      clientName: 'Kunal & Meera',
      coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg5GeGsUu8FLkfYDPOzbCbey5nWVELqVnOA0QWoFqrgP10tDr3ceHd5H9j8cgn_eBvs4fiucieDYf_4r4nHINv99FEDhMgT3iyYBapkIJjI4n5PjxJDWr5nZavOwWtK2CRnp7JxYJAG5YKHcrf1dsJmFIMbtsGfM-YpsQ3oC-jXnTutK1ErlYBQpEbrwrygpXp9bAmhujpViu3kjXSR8KXE1fGdCQgsI_FH87J0ns_-_8SkS7_4CC0',
      instagramUrl: 'https://www.instagram.com/decoding.moments/',
    },
  ],
  services: [
    { title: 'Weddings', tagline: 'Every vow, every tear, every smile', iconName: 'gem', turnaroundTime: 'Same Night & 14 Days', description: 'Complete wedding cinematography from ceremony to reception.', features: ['Pre-wedding shoots', 'Ceremony coverage', 'Same-night highlight reel', 'Full cinematic film'] },
    { title: 'Instant Reels', tagline: 'Live. Create. Deliver.', iconName: 'clapperboard', turnaroundTime: 'Delivered in 2-3 Hours Live', description: 'Real-time reel creation during your event.', features: ['On-site studio setup', 'Live editing', 'Same-day delivery', 'Social media optimized'] },
    { title: 'Celebrations', tagline: 'Making moments timeless', iconName: 'sparkles', turnaroundTime: '24-48 Hours', description: 'Birthday parties, anniversaries, and milestone events.', features: ['Event highlights', 'Candid moments', 'Family portraits', 'Digital gallery'] },
    { title: 'Traditions', tagline: 'Preserving heritage through stories', iconName: 'landmark', turnaroundTime: '3-5 Days', description: 'Cultural ceremonies and traditional celebrations.', features: ['Cultural documentation', 'Ritual coverage', 'Heritage storytelling', 'Archival quality'] },
    { title: 'Experiences', tagline: 'Beyond the ordinary', iconName: 'compass', turnaroundTime: 'Flexible Scheduling', description: 'Travel shoots, destination events, and unique experiences.', features: ['Location scouting', 'Travel coordination', 'Multi-day coverage', 'Drone footage'] },
  ],
  processSteps: [
    { step: 1, title: 'SHOOT', timing: 'Live Event (00:00 - 02:00)', description: 'Our team captures every moment with professional equipment.', detail: 'Multi-camera setup, professional audio, and cinematic lighting.', iconName: 'camera' },
    { step: 2, title: 'CREATE', timing: 'On-Site Studio (+30 Mins)', description: 'Raw footage is immediately transferred and organized.', detail: 'Instant backup, clip selection, and rough assembly.', iconName: 'edit-3' },
    { step: 3, title: 'EDIT', timing: 'Color Lab (+60 Mins)', description: 'Professional color grading and editing.', detail: 'Cinematic color correction, sound design, and visual effects.', iconName: 'scissors' },
    { step: 4, title: 'DELIVER', timing: 'Same-Night (+120 Mins)', description: 'Your reel is ready to share with the world.', detail: 'Final render, quality check, and instant delivery.', iconName: 'send' },
  ],
  cinematicStories: [
    {
      sectionLabel: 'THE STORY OF TODAY',
      headline: 'Some moments happen once.',
      description: 'From the loudest celebrations to the quietest emotions, we turn real moments into stories worth reliving. Unstaged tears, sudden bursts of laughter, and sacred traditions decoded into immortal cinematic relics.',
      coverImageUrl: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg',
      watermarkLeft: 'THE RAJASTHAN TALES',
      watermarkRight: 'Jaipur 2024',
      playLabel: 'Play Cinematic Film',
      showreelCta: 'WATCH SHOWREEL',
      showreelDuration: '3 MIN 24 SEC • 4K',
      category: 'Weddings' as const,
      sortOrder: 1,
      isActive: true,
    },
    {
      sectionLabel: 'GOLDEN RITUALS',
      headline: 'Colors that speak louder than words.',
      description: 'The haldi ceremony is an explosion of yellow — marigold showers, turmeric paste, and unbridled joy. We capture the raw energy of this sacred ritual in vibrant 4K.',
      coverImageUrl: 'https://images.pexels.com/photos/2693526/pexels-photo-2693526.jpeg',
      watermarkLeft: 'GOLDEN HOUR STUDIOS',
      watermarkRight: 'Jaipur 2024',
      playLabel: 'Play Cinematic Film',
      showreelCta: 'WATCH SHOWREEL',
      showreelDuration: '2 MIN 48 SEC • 4K',
      category: 'Haldi' as const,
      sortOrder: 2,
      isActive: true,
    },
    {
      sectionLabel: 'LIVE CELEBRATIONS',
      headline: 'Every beat tells a story.',
      description: 'Sangeet nights and grand celebrations deserve more than just recording. We decode the rhythm, the dance, the spontaneous moments into cinematic memories.',
      coverImageUrl: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
      watermarkLeft: 'CELEBRATION ARCHIVES',
      watermarkRight: 'Udaipur 2024',
      playLabel: 'Play Cinematic Film',
      showreelCta: 'WATCH SHOWREEL',
      showreelDuration: '3 MIN 12 SEC • 4K',
      category: 'Celebrations' as const,
      sortOrder: 3,
      isActive: true,
    },
    {
      sectionLabel: 'HERITAGE ARCHIVES',
      headline: 'Centuries of tradition, one frame at a time.',
      description: 'From sacred pheras to ancestral customs, we preserve traditions through an observant documentary lens — honoring every ritual with the gravity it deserves.',
      coverImageUrl: 'https://images.pexels.com/photos/2693526/pexels-photo-2693526.jpeg',
      watermarkLeft: 'HERITAGE FILMS',
      watermarkRight: 'Jodhpur 2024',
      playLabel: 'Play Cinematic Film',
      showreelCta: 'WATCH SHOWREEL',
      showreelDuration: '4 MIN 05 SEC • 4K',
      category: 'Traditions' as const,
      sortOrder: 4,
      isActive: true,
    },
  ],
  siteSettings: [
    // --- general ---
    { section: 'general', key: 'whatsapp_number', value: '919313457713', description: 'WhatsApp business number with country code' },
    { section: 'general', key: 'whatsapp_message', value: 'Hello Decoding Moments Studio! I would like to inquire about commissioning storytellers for an upcoming celebration.', description: 'Default WhatsApp message' },
    { section: 'general', key: 'client_count_target', value: '500', description: 'Target client count for the counter animation' },
    { section: 'general', key: 'client_count_start', value: '420', description: 'Starting client count for animation' },
    { section: 'general', key: 'instagram_username', value: 'decoding.moments', description: 'Instagram handle' },
    { section: 'general', key: 'copyright_year', value: '2024', description: 'Footer copyright year' },
    // --- assets ---
    { section: 'assets', key: 'asset_palace_courtyard', value: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg', description: 'Palace courtyard background image' },
    { section: 'assets', key: 'asset_polaroid_couple', value: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg', description: 'Polaroid couple accent image' },
    { section: 'assets', key: 'asset_ceremonial_diya', value: 'https://images.pexels.com/photos/2693526/pexels-photo-2693526.jpeg', description: 'Ceremonial diya background image' },
    // --- hero ---
    { section: 'hero', key: 'typing_lines', value: 'More than memories.|Stories that live on.', description: 'Typewriter animation lines (pipe-separated)' },
    { section: 'hero', key: 'tagline_words', value: 'CAPTURE|CREATE|RELIVE', description: 'Rotating tagline words (pipe-separated)' },
    { section: 'hero', key: 'headline_line1', value: 'DECODING', description: 'Main headline line 1' },
    { section: 'hero', key: 'headline_line2', value: 'MOMENTS', description: 'Main headline line 2' },
    { section: 'hero', key: 'description', value: 'Every moment has a story. We make sure it lives forever.', description: 'Hero description paragraph' },
    { section: 'hero', key: 'cta_label', value: 'EXPLORE OUR WORK', description: 'Hero CTA button label' },
    { section: 'hero', key: 'scroll_label', value: 'Scroll Down', description: 'Scroll indicator label' },
    { section: 'hero', key: 'categories', value: 'All|Weddings|Celebrations|Traditions|Haldi', description: 'Category filter pills (pipe-separated)' },
    // --- cinematic-story ---
    { section: 'cinematic-story', key: 'section_label', value: 'THE STORY OF TODAY', description: 'Section label above headline' },
    { section: 'cinematic-story', key: 'headline', value: 'Some moments happen once.', description: 'Main headline' },
    { section: 'cinematic-story', key: 'description', value: 'From the loudest celebrations to the quietest emotions, we turn real moments into stories worth reliving. Unstaged tears, sudden bursts of laughter, and sacred traditions decoded into immortal cinematic relics.', description: 'Description paragraph' },
    { section: 'cinematic-story', key: 'watermark_left', value: 'THE RAJASTHAN TALES', description: 'Bottom left watermark' },
    { section: 'cinematic-story', key: 'watermark_right', value: 'Jaipur 2024', description: 'Bottom right watermark' },
    { section: 'cinematic-story', key: 'play_label', value: 'Play Cinematic Film', description: 'Hover play button label' },
    { section: 'cinematic-story', key: 'showreel_cta', value: 'WATCH SHOWREEL', description: 'Showreel button label' },
    { section: 'cinematic-story', key: 'showreel_duration', value: '3 MIN 24 SEC • 4K', description: 'Showreel duration text' },
    { section: 'cinematic-story', key: 'categories', value: 'All|Weddings|Celebrations|Traditions|Haldi', description: 'Category pills (pipe-separated)' },
    // --- instant-reels ---
    { section: 'instant-reels', key: 'section_label', value: 'OUR SIGNATURE SERVICE', description: 'Section label' },
    { section: 'instant-reels', key: 'headline', value: 'Instant Reels', description: 'Section headline' },
    { section: 'instant-reels', key: 'description', value: "Your event is happening now. Your content shouldn't arrive weeks later. We film, color grade, curate music, and deliver Instagram-ready 4K reels while your guests are still on the dance floor.", description: 'Description paragraph' },
    { section: 'instant-reels', key: 'cta_label', value: 'KNOW MORE', description: 'CTA button label' },
    // --- featured-stories ---
    { section: 'featured-stories', key: 'section_label', value: 'A FEW STORIES', description: 'Section label' },
    { section: 'featured-stories', key: 'headline', value: 'Curated Chapters', description: 'Section headline' },
    { section: 'featured-stories', key: 'decorative_line1', value: 'Real People', description: 'Cursive decorative text line 1' },
    { section: 'featured-stories', key: 'decorative_line2', value: 'Real Stories.', description: 'Cursive decorative text line 2' },
    { section: 'featured-stories', key: 'polaroid_caption', value: 'Forever & Ever', description: 'Polaroid caption text' },
    { section: 'featured-stories', key: 'categories', value: 'All|Weddings|Celebrations|Traditions|Haldi', description: 'Category filter (pipe-separated)' },
    // --- cta ---
    { section: 'cta', key: 'headline_line1', value: 'YOUR MOMENT', description: 'CTA headline line 1' },
    { section: 'cta', key: 'headline_line2', value: 'DESERVES A STORY.', description: 'CTA headline line 2' },
    { section: 'cta', key: 'description', value: "Let's create something beautiful together. Reach out to check our dates and commission our on-ground storytellers for your celebrations.", description: 'Description paragraph' },
    { section: 'cta', key: 'primary_cta', value: 'PLAN YOUR STORY', description: 'Primary CTA button label' },
    { section: 'cta', key: 'secondary_cta', value: 'WHATSAPP US', description: 'Secondary CTA button label' },
    { section: 'cta', key: 'signoff', value: 'Good Stories Never End', description: 'Decorative sign-off text' },
    // --- footer ---
    { section: 'footer', key: 'brand_name', value: 'DECODING MOMENTS', description: 'Brand name in footer' },
    { section: 'footer', key: 'brand_subtitle', value: 'CONTENT CREATION STUDIO', description: 'Studio subtitle in footer' },
    { section: 'footer', key: 'tagline', value: 'Turning Moments Into Memories', description: 'Footer tagline' },
    { section: 'footer', key: 'copyright', value: '© {year} Decoding Moments Studio. All rights reserved.', description: 'Copyright text ({year} is replaced at runtime)' },
    // --- header ---
    { section: 'header', key: 'cta_label', value: 'PLAN YOUR STORY', description: 'Header CTA button label (desktop)' },
    { section: 'header', key: 'mobile_cta_label', value: 'Start Story Consultation', description: 'Header CTA button label (mobile)' },
    // --- showreel-modal ---
    { section: 'showreel-modal', key: 'title', value: 'The Rajasthan Tales', description: 'Showreel modal title' },
    { section: 'showreel-modal', key: 'subtitle', value: 'Master Showreel • Jaipur 2024 • 4K DCI', description: 'Showreel modal subtitle' },
    { section: 'showreel-modal', key: 'watermark', value: 'DM STUDIOS • ARCHIVES', description: 'Watermark text' },
    { section: 'showreel-modal', key: 'quality_badge', value: '4K UHD', description: 'Quality badge label' },
    { section: 'showreel-modal', key: 'chapter1', value: 'The Arrival at Amber', description: 'Chapter 1 title' },
    { section: 'showreel-modal', key: 'chapter2', value: 'Golden Haldi Rituals', description: 'Chapter 2 title' },
    { section: 'showreel-modal', key: 'chapter3', value: 'Sangeet Celebration', description: 'Chapter 3 title' },
    { section: 'showreel-modal', key: 'chapter4', value: 'Sunset Courtyard Pheras', description: 'Chapter 4 title' },
    // --- reel-modal ---
    { section: 'reel-modal', key: 'studio_label', value: 'Studio Master', description: 'Studio label text' },
    { section: 'reel-modal', key: 'audio_label', value: 'Original Sound (48kHz)', description: 'Audio info label' },
    // --- story-chapter-modal ---
    { section: 'story-chapter-modal', key: 'location_label', value: 'Jaipur Season Archive', description: 'Location/date label' },
    { section: 'story-chapter-modal', key: 'technical_spec', value: '4K DCI • 10-bit 4:2:2 Color Science', description: 'Technical spec label' },
    { section: 'story-chapter-modal', key: 'body_paragraph1', value: 'Every celebration possesses an unrepeatable frequency. In this chapter, our on-ground crew followed an observational documentary approach—refusing scripted poses to honor the spontaneous glances, unexpected outbursts of joy, and century-old customs.', description: 'First body paragraph' },
    { section: 'story-chapter-modal', key: 'body_paragraph2', value: 'Color graded with warm amber highlights and creamy shadows to recreate the tactile aesthetic of vintage 35mm motion picture stock, synchronized live to curated acoustic instruments.', description: 'Second body paragraph' },
    { section: 'story-chapter-modal', key: 'social_proof', value: 'Loved by over 2,400 community members', description: 'Social proof text' },
    { section: 'story-chapter-modal', key: 'close_label', value: 'Close', description: 'Close button label' },
    { section: 'story-chapter-modal', key: 'cta_label', value: 'Book Similar Coverage', description: 'CTA button label' },
    // --- golden-scroll ---
    { section: 'golden-scroll', key: 'section_home', value: 'Prologue|Hero Reels', description: 'Home section label|sublabel' },
    { section: 'golden-scroll', key: 'section_about', value: 'Cinema|The Philosophy', description: 'About section label|sublabel' },
    { section: 'golden-scroll', key: 'section_services', value: 'Craft|Our Services', description: 'Services section label|sublabel' },
    { section: 'golden-scroll', key: 'section_work', value: 'Stories|Curated Chapters', description: 'Work section label|sublabel' },
    { section: 'golden-scroll', key: 'section_instant_reels', value: 'Instant|24hr Delivery', description: 'Instant Reels section label|sublabel' },
    { section: 'golden-scroll', key: 'section_contact', value: 'Commission|Book Dates', description: 'Contact section label|sublabel' },
    // --- services ---
    { section: 'services', key: 'section_label', value: 'WHAT WE CREATE', description: 'Section label' },
    { section: 'services', key: 'headline_line1', value: 'Different Stories.', description: 'Headline line 1' },
    { section: 'services', key: 'headline_line2', value: 'Same Emotions.', description: 'Headline line 2' },
    { section: 'services', key: 'explore_label', value: 'Explore Details →', description: 'Hover cue text' },
    { section: 'services', key: 'blueprint_label', value: 'Service Blueprint', description: 'Modal section label' },
    { section: 'services', key: 'turnaround_label', value: 'Turnaround:', description: 'Turnaround info label' },
    { section: 'services', key: 'included_label', value: "What's Included:", description: 'Included items label' },
    { section: 'services', key: 'close_label', value: 'Close', description: 'Close button label' },
    { section: 'services', key: 'book_cta', value: 'Book This Service', description: 'Book CTA button label' },
  ],
  formOptions: [
    // --- event_types ---
    { group: 'event_types', label: 'Weddings', value: 'Weddings', sortOrder: 1 },
    { group: 'event_types', label: 'Haldi & Mehendi', value: 'Haldi & Mehendi', sortOrder: 2 },
    { group: 'event_types', label: 'Sangeet & Reception', value: 'Sangeet & Reception', sortOrder: 3 },
    { group: 'event_types', label: 'Instant Reels', value: 'Instant Reels', sortOrder: 4 },
    { group: 'event_types', label: 'Milestone Celebrations', value: 'Milestone Celebrations', sortOrder: 5 },
    { group: 'event_types', label: 'Brand & Editorial', value: 'Brand & Editorial', sortOrder: 6 },
    // --- destinations ---
    { group: 'destinations', label: 'Jaipur', value: 'Jaipur', sortOrder: 1 },
    { group: 'destinations', label: 'Udaipur', value: 'Udaipur', sortOrder: 2 },
    { group: 'destinations', label: 'Jodhpur', value: 'Jodhpur', sortOrder: 3 },
    { group: 'destinations', label: 'Delhi NCR', value: 'Delhi NCR', sortOrder: 4 },
    { group: 'destinations', label: 'Goa', value: 'Goa', sortOrder: 5 },
    { group: 'destinations', label: 'Mumbai', value: 'Mumbai', sortOrder: 6 },
    { group: 'destinations', label: 'International Destination', value: 'International Destination', sortOrder: 7 },
    { group: 'destinations', label: 'Other Heritage City', value: 'Other Heritage City', sortOrder: 8 },
    // --- services_form ---
    { group: 'services_form', label: 'Instant Reels (Same-Day Delivery)', value: 'Instant Reels (Same-Day Delivery)', sortOrder: 1 },
    { group: 'services_form', label: '4K Cinematic Highlights Film', value: '4K Cinematic Highlights Film', sortOrder: 2 },
    { group: 'services_form', label: 'Full Ceremony Documentary', value: 'Full Ceremony Documentary', sortOrder: 3 },
    { group: 'services_form', label: 'Drone Aerial Architecture', value: 'Drone Aerial Architecture', sortOrder: 4 },
    { group: 'services_form', label: 'Dedicated Social Story Creator', value: 'Dedicated Social Story Creator', sortOrder: 5 },
  ],
  navigationLinks: [
    { label: 'Home', href: '#home', sortOrder: 1, isActive: true },
    { label: 'About', href: '#about', sortOrder: 2, isActive: true },
    { label: 'Services', href: '#services', sortOrder: 3, isActive: true },
    { label: 'Work', href: '#work', sortOrder: 4, isActive: true },
    { label: 'Instant Reels', href: '#instant-reels', sortOrder: 5, isActive: true },
    { label: 'Contact', href: '#contact', sortOrder: 6, isActive: true },
  ],
  socialLinks: [
    { platform: 'Instagram', url: 'https://www.instagram.com/decoding.moments', iconName: 'instagram', isActive: true },
    { platform: 'YouTube', url: 'https://www.youtube.com/@DecodingMoments', iconName: 'youtube', isActive: true },
    { platform: 'Facebook', url: 'https://www.facebook.com/DecodingMoments', iconName: 'facebook', isActive: true },
  ],
};

async function seedDatabase(strapi: Core.Strapi) {
  const existingReels = await strapi.documents('api::reel.reel').findMany({ limit: 1 });
  if (existingReels.length > 0) {
    strapi.log.info('Data already seeded, skipping...');
    return;
  }

  strapi.log.info('Seeding initial data...');

  for (const reel of seedData.reels) {
    const entry = await strapi.documents('api::reel.reel').create({ data: reel });
    await strapi.documents('api::reel.reel').publish({ documentId: entry.documentId });
  }
  strapi.log.info(`Seeded ${seedData.reels.length} reels`);

  for (const chapter of seedData.storyChapters) {
    const entry = await strapi.documents('api::story-chapter.story-chapter').create({ data: chapter });
    await strapi.documents('api::story-chapter.story-chapter').publish({ documentId: entry.documentId });
  }
  strapi.log.info(`Seeded ${seedData.storyChapters.length} story chapters`);

  for (const service of seedData.services) {
    const entry = await strapi.documents('api::service.service').create({ data: service });
    await strapi.documents('api::service.service').publish({ documentId: entry.documentId });
  }
  strapi.log.info(`Seeded ${seedData.services.length} services`);

  for (const step of seedData.processSteps) {
    const entry = await strapi.documents('api::process-step.process-step').create({ data: step });
    await strapi.documents('api::process-step.process-step').publish({ documentId: entry.documentId });
  }
  strapi.log.info(`Seeded ${seedData.processSteps.length} process steps`);

  for (const story of seedData.cinematicStories) {
    const entry = await strapi.documents('api::cinematic-story.cinematic-story').create({ data: story });
    await strapi.documents('api::cinematic-story.cinematic-story').publish({ documentId: entry.documentId });
  }
  strapi.log.info(`Seeded ${seedData.cinematicStories.length} cinematic stories`);

  for (const setting of seedData.siteSettings) {
    await strapi.documents('api::site-setting.site-setting').create({ data: setting });
  }
  strapi.log.info(`Seeded ${seedData.siteSettings.length} site settings`);

  for (const option of seedData.formOptions) {
    await strapi.documents('api::form-option.form-option').create({ data: option });
  }
  strapi.log.info(`Seeded ${seedData.formOptions.length} form options`);

  for (const link of seedData.navigationLinks) {
    await strapi.documents('api::navigation-link.navigation-link').create({ data: link });
  }
  strapi.log.info(`Seeded ${seedData.navigationLinks.length} navigation links`);

  for (const link of seedData.socialLinks) {
    await strapi.documents('api::social-link.social-link').create({ data: link });
  }
  strapi.log.info(`Seeded ${seedData.socialLinks.length} social links`);

  strapi.log.info('Seeding complete!');
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedDatabase(strapi);

    strapi.db.lifecycles.subscribe({
      models: ['api::inquiry.inquiry'],
      async afterCreate(event) {
        const { result } = event;
        strapi.log.info(`New inquiry created: ${result.fullName}`);
        await sendToCrm({
          event: 'inquiry.create',
          model: 'inquiry',
          entry: result,
          timestamp: new Date().toISOString(),
        });
      },
    });

    strapi.log.info('Decoding Moments CMS ready');
  },
};
