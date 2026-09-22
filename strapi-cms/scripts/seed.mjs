const BASE = 'http://localhost:1337';

async function getToken() {
  const res = await fetch(`${BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'hetshah6315@gmail.com', password: 'admin@123' }),
  });
  const data = await res.json();
  return data.data?.token;
}

async function createAndPublish(uid, entry, token) {
  const createRes = await fetch(`${BASE}/content-manager/collection-types/${uid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data: entry }),
  });
  const created = await createRes.json();
  if (!created.data?.documentId) {
    console.error(`Failed to create ${uid}:`, JSON.stringify(created));
    return null;
  }
  const docId = created.data.documentId;

  const pubRes = await fetch(`${BASE}/content-manager/collection-types/${uid}/${docId}/actions/publish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (pubRes.ok) {
    console.log(`  ✓ Created & published: ${entry.title || entry.key || docId}`);
  } else {
    console.log(`  ✓ Created (publish failed): ${entry.title || entry.key || docId}`);
  }
  return docId;
}

async function createOnly(uid, entry, token) {
  const createRes = await fetch(`${BASE}/content-manager/collection-types/${uid}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ data: entry }),
  });
  const created = await createRes.json();
  if (!created.data?.documentId) {
    console.error(`Failed to create ${uid}:`, JSON.stringify(created));
    return null;
  }
  console.log(`  ✓ Created: ${entry.title || entry.key || entry.platform || created.data.documentId}`);
  return created.data.documentId;
}

const reels = [
  {
    title: 'Haldi Vibes',
    subtitle: 'Pure Joy & Vibrant Colors',
    category: 'Celebrations',
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
    category: 'Weddings',
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
    category: 'Traditions',
    location: 'Rambagh Palace, Jaipur',
    duration: '0:28',
    badge: 'SAME-DAY CUT',
    likes: 3410,
    description: 'The tender whisper between mother and daughter as the palanquin departs. Audio mastered directly from ceremonial chants.',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCCo7ZXSRSqg5YOqw_OCRs7kYHWFvDLXLOd7eKsGC4kQdaSI_f4in8SgzTb7qSq2GjuaXrP-93OF-Ggw2l8j8gbQCkdsIxEO1JwK27gjDGhIlV-DMiB9vHk3AIucA4vNCUQCN_7h-_5vCx6KEoZjaxdxYSdwPDW7zXMFJ9TDmQNQX4Md7C-E8VyNH6C2UTUgSr6izFQRzU02qnS4vr035Jo2SqXBR2nehFmscFZ1semxk0exS_9EkM',
  },
];

const storyChapters = [
  {
    title: 'A Royal Beginning',
    subtitle: 'Jodhpur Heritage',
    tag: 'WEDDING STORY',
    category: 'Weddings',
    location: 'Umaid Bhawan, Jodhpur',
    clientName: 'Siddharth & Ananya',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKXxX27VKsdJke8UX3YXFeeS-qJh7xYnNBvMXGmoykuFJqCgmWGDSu_HTK7SS15y6Ggi9zgXrXki5POp-gKGgwuYWvOK4WZ43EkmMKiAwjPnUSIVgvG2nioM6FRk1r1wALq9ng9fLTHooWLZzk4YYM3Sh_U9s3HKxrGizktKn6jFDkAf2oQPt68KS-BNXvv1q2t3BiveACm24FIj4bCoYcY2xhIp8s9x_4AJaQYKbOLZa1EMmvhKLb',
  },
  {
    title: 'Haldi in Full Colour',
    subtitle: 'Same-Day Edit',
    tag: 'INSTANT REEL CREATION',
    category: 'Haldi',
    location: 'Alsisar Mahal, Shekhawati',
    clientName: 'Rhea & Dev',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYAgpi2-ojsBlc7tzpMrMt75fjiGBTvf-dbIHgnaET1UDcJztDFqjC9MtxQRldMK0S87CsfAEO-Uyh8-UrQXOzxu0k5x-ccV-HTET-XX9XmM9W1tQfdrTI1oskYZ36uB0wNPUUXl6_ijW1xZ0sqJJdOrkQdnwdjg60wuZHBAwT6QDxkv_t8waOgp65d8U_izwCZuzj0yp6zNf5YRBWgot52mPOKjUxQ1XoL-BQm-9iudqAAuO5r28o',
  },
  {
    title: 'Little Moments',
    subtitle: 'First Milestones',
    tag: 'CELEBRATIONS',
    category: 'Celebrations',
    location: 'Private Villa, Goa',
    clientName: "Aarav's 1st Birthday",
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAagt5rowpRdEwWG5ZQFQFDIaaqnkAqlFJRJenQoMZt2cwXFVjw8vDpT1Ua8uro7iv3bUENJ-4c478L2T48X1tlN-XRHYqXsPE_kxSmYeqk5iiDxyDdMKJqAhE1RAAnAqXlUhxxtykrn_4i5E_uax6olJxW_-qcy2yOjbGHXu8Ny5V8NjrE7ENzraj_QhvAkMKVNbL2bndmUXyXxLisJwB8dNHtfiVEKmTcUGyekvUbzcuqNlM_Q0Gi',
  },
  {
    title: 'The Eternal Courtyard',
    subtitle: 'Heritage archives',
    tag: 'HERITAGE ARCHIVES',
    category: 'Traditions',
    location: 'City Palace, Jaipur',
    clientName: 'Kunal & Meera',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg5GeGsUu8FLkfYDPOzbCbey5nWVELqVnOA0QWoFqrgP10tDr3ceHd5H9j8cgn_eBvs4fiucieDYf_4r4nHINv99FEDhMgT3iyYBapkIJjI4n5PjxJDWr5nZavOwWtK2CRnp7JxYJAG5YKHcrf1dsJmFIMbtsGfM-YpsQ3oC-jXnTutK1ErlYBQpEbrwrygpXp9bAmhujpViu3kjXSR8KXE1fGdCQgsI_FH87J0ns_-_8SkS7_4CC0',
  },
];

const services = [
  { title: 'Weddings', tagline: 'Every vow, every tear, every smile', iconName: 'gem', turnaroundTime: 'Same Night & 14 Days', description: 'Complete wedding cinematography from ceremony to reception.', features: ['Pre-wedding shoots', 'Ceremony coverage', 'Same-night highlight reel', 'Full cinematic film'] },
  { title: 'Instant Reels', tagline: 'Live. Create. Deliver.', iconName: 'clapperboard', turnaroundTime: 'Delivered in 2-3 Hours Live', description: 'Real-time reel creation during your event.', features: ['On-site studio setup', 'Live editing', 'Same-day delivery', 'Social media optimized'] },
  { title: 'Celebrations', tagline: 'Making moments timeless', iconName: 'sparkles', turnaroundTime: '24-48 Hours', description: 'Birthday parties, anniversaries, and milestone events.', features: ['Event highlights', 'Candid moments', 'Family portraits', 'Digital gallery'] },
  { title: 'Traditions', tagline: 'Preserving heritage through stories', iconName: 'landmark', turnaroundTime: '3-5 Days', description: 'Cultural ceremonies and traditional celebrations.', features: ['Cultural documentation', 'Ritual coverage', 'Heritage storytelling', 'Archival quality'] },
  { title: 'Experiences', tagline: 'Beyond the ordinary', iconName: 'compass', turnaroundTime: 'Flexible Scheduling', description: 'Travel shoots, destination events, and unique experiences.', features: ['Location scouting', 'Travel coordination', 'Multi-day coverage', 'Drone footage'] },
];

const processSteps = [
  { step: 1, title: 'SHOOT', timing: 'Live Event (00:00 - 02:00)', description: 'Our team captures every moment with professional equipment.', detail: 'Multi-camera setup, professional audio, and cinematic lighting.', iconName: 'camera' },
  { step: 2, title: 'CREATE', timing: 'On-Site Studio (+30 Mins)', description: 'Raw footage is immediately transferred and organized.', detail: 'Instant backup, clip selection, and rough assembly.', iconName: 'edit-3' },
  { step: 3, title: 'EDIT', timing: 'Color Lab (+60 Mins)', description: 'Professional color grading and editing.', detail: 'Cinematic color correction, sound design, and visual effects.', iconName: 'scissors' },
  { step: 4, title: 'DELIVER', timing: 'Same-Night (+120 Mins)', description: 'Your reel is ready to share with the world.', detail: 'Final render, quality check, and instant delivery.', iconName: 'send' },
];

const siteSettings = [
  { key: 'whatsapp_number', value: '919313457713', description: 'WhatsApp business number with country code' },
  { key: 'whatsapp_message', value: 'Hello Decoding Moments Studio! I would like to inquire about commissioning storytellers for an upcoming celebration.', description: 'Default WhatsApp message' },
  { key: 'client_count_target', value: '500', description: 'Target client count for the counter animation' },
  { key: 'client_count_start', value: '420', description: 'Starting client count for animation' },
  { key: 'asset_palace_courtyard', value: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg', description: 'Palace courtyard background image' },
  { key: 'asset_polaroid_couple', value: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg', description: 'Polaroid couple accent image' },
  { key: 'asset_ceremonial_diya', value: 'https://images.pexels.com/photos/2693526/pexels-photo-2693526.jpeg', description: 'Ceremonial diya background image' },
  { key: 'instagram_username', value: 'decoding.moments', description: 'Instagram handle' },
  { key: 'copyright_year', value: '2024', description: 'Footer copyright year' },
];

const navigationLinks = [
  { label: 'Home', href: '#home', sortOrder: 1, isActive: true },
  { label: 'About', href: '#about', sortOrder: 2, isActive: true },
  { label: 'Services', href: '#services', sortOrder: 3, isActive: true },
  { label: 'Work', href: '#work', sortOrder: 4, isActive: true },
  { label: 'Instant Reels', href: '#instant-reels', sortOrder: 5, isActive: true },
  { label: 'Contact', href: '#contact', sortOrder: 6, isActive: true },
];

const socialLinks = [
  { platform: 'Instagram', url: 'https://www.instagram.com/decoding.moments', iconName: 'instagram', isActive: true },
  { platform: 'YouTube', url: 'https://www.youtube.com/@DecodingMoments', iconName: 'youtube', isActive: true },
  { platform: 'Facebook', url: 'https://www.facebook.com/DecodingMoments', iconName: 'facebook', isActive: true },
];

async function main() {
  console.log('Seeding Decoding Moments CMS...\n');

  const token = await getToken();
  if (!token) {
    console.error('Failed to get admin token. Make sure Strapi is running and admin account exists.');
    process.exit(1);
  }

  console.log('Reels:');
  for (const r of reels) await createAndPublish('api::reel.reel', r, token);

  console.log('\nStory Chapters:');
  for (const c of storyChapters) await createAndPublish('api::story-chapter.story-chapter', c, token);

  console.log('\nServices:');
  for (const s of services) await createAndPublish('api::service.service', s, token);

  console.log('\nProcess Steps:');
  for (const s of processSteps) await createAndPublish('api::process-step.process-step', s, token);

  console.log('\nSite Settings:');
  for (const s of siteSettings) await createOnly('api::site-setting.site-setting', s, token);

  console.log('\nNavigation Links:');
  for (const l of navigationLinks) await createOnly('api::navigation-link.navigation-link', l, token);

  console.log('\nSocial Links:');
  for (const l of socialLinks) await createOnly('api::social-link.social-link', l, token);

  console.log('\n✓ Seeding complete!');
}

main().catch(console.error);
