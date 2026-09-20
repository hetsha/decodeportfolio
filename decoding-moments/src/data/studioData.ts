import { ReelItem, StoryChapter, ServiceItem, ProcessStep } from '../types';

export const HERO_REELS: ReelItem[] = [
  {
    id: 'reel-haldi',
    title: 'Haldi Vibes',
    subtitle: 'Pure Joy & Vibrant Colors',
    category: 'Celebrations',
    location: 'Jaipur Haveli',
    duration: '0:32',
    badge: 'REEL 4K',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz1PL1Op7J4AVy5kIpytqpdqSrB3vDaeiomBkhfoib9u-rfPFho2NW_Z9YSeTrHOR8MxyfQQh16kWKBh00UUaNJ8eyh6FgSy2Pvrz6-c-uaMflJ5GSBFm6WfB3FLBF6U17ZBSh-5lY3J9G_NKaJlxwx0pyPVs729vUHr2BzNh9oB-pS0y_yFnww1LZwLhXCuB-Dyok0JzSxl8_5k-UTQNJBhBaRFHbwEWfom1FnuaCWf48fabhjNe7',
    likes: 1248,
    description: 'Golden hour haldi celebration filled with marigold showers, unscripted giggles, and spontaneous dhol beats decoded live.'
  },
  {
    id: 'reel-vows',
    title: 'Royal Vows',
    subtitle: 'The Majestic Courtyard',
    category: 'Weddings',
    location: 'Udaipur Palace',
    duration: '0:45',
    badge: 'CINEMATIC 4K',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnsIlhAni59SEGDPuKrw0Vq5gIAqcwZPWTAGuZv8FtFWSQoiIAUN7WWPGhFEalDR8r-S_1yUThBjprqmIZEwsPx7EHSM04Hu8SQms4E9XnMeZLyGb84L5gCyBhk8jeCQRe-zcWvoPgy_5kygD6uo6IrW7knlNdh2fkheAlStaul5Q74nozSLG_vVm1umSH9SMzFalPSSPAkbRZmsSsdZuWoHTjG32dPsVga_QZjZWkd36xiqi10pfL',
    likes: 2190,
    description: 'A sunset pheras ritual against the tranquil Lake Pichola backdrop. High-contrast heirloom film grading.'
  },
  {
    id: 'reel-emotions',
    title: 'Pure Emotions',
    subtitle: 'Vidaai & Sacred Chants',
    category: 'Traditions',
    location: 'Rambagh Palace, Jaipur',
    duration: '0:28',
    badge: 'SAME-DAY CUT',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCCo7ZXSRSqg5YOqw_OCRs7kYHWFvDLXLOd7eKsGC4kQdaSI_f4in8SgzTb7qSq2GjuaXrP-93OF-Ggw2l8j8gbQCkdsIxEO1JwK27gjDGhIlV-DMiB9vHk3AIucA4vNCUQCN_7h-_5vCx6KEoZjaxdxYSdwPDW7zXMFJ9TDmQNQX4Md7C-E8VyNH6C2UTUgSr6izFQRzU02qnS4vr035Jo2SqXBR2nehFmscFZ1semxk0exS_9EkM',
    likes: 3410,
    description: 'The tender whisper between mother and daughter as the palanquin departs. Audio mastered directly from ceremonial chants.'
  }
];

export const CURATED_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-1',
    title: 'A Royal Beginning',
    subtitle: 'Jodhpur Heritage',
    tag: 'WEDDING STORY',
    category: 'Weddings',
    location: 'Umaid Bhawan, Jodhpur',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKXxX27VKsdJke8UX3YXFeeS-qJh7xYnNBvMXGmoykuFJqCgmWGDSu_HTK7SS15y6Ggi9zgXrXki5POp-gKGgwuYWvOK4WZ43EkmMKiAwjPnUSIVgvG2nioM6FRk1r1wALq9ng9fLTHooWLZzk4YYM3Sh_U9s3HKxrGizktKn6jFDkAf2oQPt68KS-BNXvv1q2t3BiveACm24FIj4bCoYcY2xhIp8s9x_4AJaQYKbOLZa1EMmvhKLb',
    clientName: 'Siddharth & Ananya'
  },
  {
    id: 'chapter-2',
    title: 'Haldi in Full Colour',
    subtitle: 'Same-Day Edit',
    tag: 'INSTANT REEL CREATION',
    category: 'Haldi',
    location: 'Alsisar Mahal, Shekhawati',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYAgpi2-ojsBlc7tzpMrMt75fjiGBTvf-dbIHgnaET1UDcJztDFqjC9MtxQRldMK0S87CsfAEO-Uyh8-UrQXOzxu0k5x-ccV-HTET-XX9XmM9W1tQfdrTI1oskYZ36uB0wNPUUXl6_ijW1xZ0sqJJdOrkQdnwdjg60wuZHBAwT6QDxkv_t8waOgp65d8U_izwCZuzj0yp6zNf5YRBWgot52mPOKjUxQ1XoL-BQm-9iudqAAuO5r28o',
    clientName: 'Rhea & Dev'
  },
  {
    id: 'chapter-3',
    title: 'Little Moments',
    subtitle: 'First Milestones',
    tag: 'CELEBRATIONS',
    category: 'Celebrations',
    location: 'Private Villa, Goa',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAagt5rowpRdEwWG5ZQFQFDIaaqnkAqlFJRJenQoMZt2cwXFVjw8vDpT1Ua8uro7iv3bUENJ-4c478L2T48X1tlN-XRHYqXsPE_kxSmYeqk5iiDxyDdMKJqAhE1RAAnAqXlUhxxtykrn_4i5E_uax6olJxW_-qcy2yOjbGHXu8Ny5V8NjrE7ENzraj_QhvAkMKVNbL2bndmUXyXxLisJwB8dNHtfiVEKmTcUGyekvUbzcuqNlM_Q0Gi',
    clientName: 'Aarav\'s 1st Birthday'
  },
  {
    id: 'chapter-4',
    title: 'The Eternal Courtyard',
    subtitle: 'The Rajasthan Tales',
    tag: 'HERITAGE ARCHIVES',
    category: 'Traditions',
    location: 'City Palace, Jaipur',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg5GeGsUu8FLkfYDPOzbCbey5nWVELqVnOA0QWoFqrgP10tDr3ceHd5H9j8cgn_eBvs4fiucieDYf_4r4nHINv99FEDhMgT3iyYBapkIJjI4n5PjxJDWr5nZavOwWtK2CRnp7JxYJAG5YKHcrf1dsJmFIMbtsGfM-YpsQ3oC-jXnTutK1ErlYBQpEbrwrygpXp9bAmhujpViu3kjXSR8KXE1fGdCQgsI_FH87J0ns_-_8SkS7_4CC0',
    clientName: 'Kunal & Meera'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'service-weddings',
    title: 'Weddings',
    tagline: 'Love in every frame',
    iconName: 'gem',
    turnaroundTime: 'Same Night & 14 Days',
    description: 'Comprehensive coverage tailored to modern Indian weddings. Discreet documentary storytelling capturing real tears, uninhibited joy, and timeless heirloom frames.',
    features: ['High-Dynamic Range 4K Raw Capture', 'Color Mastered for Warm Skin Tones', 'Full Ceremony & Highlights Film']
  },
  {
    id: 'service-instant',
    title: 'Instant Reels',
    tagline: 'Now. Not later.',
    iconName: 'clapperboard',
    turnaroundTime: 'Delivered in 2-3 Hours Live',
    description: 'On-ground editors work in tandem with our camera creators. While you dance to the last track, your custom graded Instagram 4K reel is already rendering on your phone.',
    features: ['Real-Time Sync with Trending Tracks', 'Optimized 9:16 Aspect Framing', 'Direct AirDrop / Cloud Delivery Link']
  },
  {
    id: 'service-celebrations',
    title: 'Celebrations',
    tagline: 'Big & small joys',
    iconName: 'sparkles',
    turnaroundTime: '24-48 Hours',
    description: 'From milestone birthdays and sangeet dance floors to intimate anniversaries. Dynamic motion that preserves the electricity of the party.',
    features: ['Cocktail & Sangeet Energy Edit', 'Guest Reactions & Candid Smiles', 'Bespoke Music Design']
  },
  {
    id: 'service-traditions',
    title: 'Traditions',
    tagline: 'Rooted in culture',
    iconName: 'landmark',
    turnaroundTime: '3-5 Days',
    description: 'Honoring centuries-old Vedic rituals, royal processions, and sacred family heirlooms with reverent, cinematic composition.',
    features: ['Pheras, Haldi & Mehendi Focus', 'Microphone Chants Preservation', 'Cinematic Drone Architectural Framing']
  },
  {
    id: 'service-experiences',
    title: 'Experiences',
    tagline: 'Brands, travel & more',
    iconName: 'compass',
    turnaroundTime: 'Flexible Scheduling',
    description: 'High-end hospitality showcases, destination retreat memoirs, and luxury lifestyle narrative campaigns.',
    features: ['Commercial Grade Lighting', 'Story-Driven Editorial Flow', 'Multi-Format Social Cutdowns']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'SHOOT',
    timing: 'Live Event (00:00 - 02:00)',
    description: 'We capture the real, unscripted moments as they unfold.',
    detail: 'Our discreet creators operate without obtrusive lights or scripted staging, catching authentic micro-expressions and high-energy celebrations.',
    iconName: 'camera'
  },
  {
    step: '02',
    title: 'CREATE',
    timing: 'On-Site Studio (+30 Mins)',
    description: 'Our on-ground creators draft viral hooks & aesthetic storylines.',
    detail: 'We curate the strongest emotional arcs, match rhythmic beats with trending licensed audio, and craft narrative tension that hooks viewers instantly.',
    iconName: 'edit-3'
  },
  {
    step: '03',
    title: 'EDIT',
    timing: 'Color Lab (+60 Mins)',
    description: 'Edited instantly with tailored audio sync and warm grading.',
    detail: 'Applying our proprietary 35mm warmth LUTs, noise reduction, and beat-accurate transitions while the festivities are in full swing.',
    iconName: 'scissors'
  },
  {
    step: '04',
    title: 'DELIVER',
    timing: 'Same-Night (+120 Mins)',
    description: 'Ready to post while the moment lives and emotion is electric.',
    detail: 'Transferred directly to your phone in pristine 4K HDR via private high-speed link so you and your guests can share before the night ends.',
    iconName: 'send'
  }
];

export const ASSET_URLS = {
  archLineArt: 'https://lh3.googleusercontent.com/aida/AEtjO1V7nQvDHSO5DQBVb_HYj9_5aaE8L6A67gzrHrYEkSACUmlnRr4LL76-ZrekT7VuOaqekgDmyvuLuYlSt5re9idI4iOMpFlauXJDddhJVYahApt-ImSm-SrDDHtlHVNjZ4asCBFAWM3cHrjqKQHdkPV2eU0TFADnQPR-JYKzoKJoCbJ1WaHkjsFiTT2oo2fVpJ7h-4GiGY1RHXvDFxMr_B_HwO16jvNuJHNxeRwtwjt5RKvE37j7FMLWHq8',
  lotusBotanical: 'https://lh3.googleusercontent.com/aida/AEtjO1WpYh2gBKpnhZRV1OtMa3-_gMuW-Wg9SpXcDtPUnYFILHSze8thwge74BJLKYmUsx24qYJhdKhjCelBIhTW39E9Qa5LxCj4yWa6IB7MCADUsL34aLfxhtOZFdIiRzsIMfW9to0oDvEFLrfTgSm627pDsJlsulZspOyFa5XDwn43AMVs_UH72RUvMvXUUTarFkuMLURAixLMqNzNrE777afzZ65l91_PQ3D0s52m91EYrWdlxSmvlsitryE',
  palaceCourtyard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg5GeGsUu8FLkfYDPOzbCbey5nWVELqVnOA0QWoFqrgP10tDr3ceHd5H9j8cgn_eBvs4fiucieDYf_4r4nHINv99FEDhMgT3iyYBapkIJjI4n5PjxJDWr5nZavOwWtK2CRnp7JxYJAG5YKHcrf1dsJmFIMbtsGfM-YpsQ3oC-jXnTutK1ErlYBQpEbrwrygpXp9bAmhujpViu3kjXSR8KXE1fGdCQgsI_FH87J0ns_-_8SkS7_4CC0',
  polaroidCouple: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCdjS_1oE0-Q2sE9vi9g9At_K-gmATEZ4jcLwa8UzQTkqgpYiKmfQsrfe3yXYMyj3BYr9oRU98cAZQ2FiCiVo98v2PnGdi5Geg0SHNayTyXgAQirdHVnCvzqtcmx2nxbMO0SVkXFJWra_nzDajSGfEI_fqDp_CzyA7WGjtMORXEWYIGHV9R-lLZNLR2osulbny7ywSn6H-E9nTXZe3aiD10HQTJrFya3KPbMl6PriJYJv_k8UO9McD',
  ceremonialDiya: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUUg7Pr49i9peU0GFECOpLLPfdlCFEr7jAfLBoUVmxDMnAsF4U9I-2koK8NvAeqG-s3iCYW_5juS3kXK34fSMKLWZWFKOAqUITOh4vU_lgWUkBOPudrE9jxSVb8Nwqom87_eft6HrHXjkf2CbXT--wBKkJI8MLNogO-YvimvtwqeCeWX4_BWUU-t3g1bVv5OSLYFR_YHpMyiep4k5DemS2inn3Yc_Z2ZoDcaLEYPILRdKzngYnmkFV'
};
