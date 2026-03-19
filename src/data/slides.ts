// ─── 36-SLIDE MANIFEST (v2 — with theme + motion keys) ───
import type { MotionKey } from '@/motion/vybMotion';
import type { ThemeKey } from '@/theme/slideTheme';
import { slideThemeMap } from '@/theme/slideTheme';

// ─── Layout types ───
export type LayoutKey =
  | 'heroCenter'
  | 'editorialLeft'
  | 'editorialSplit'
  | 'cardGrid'
  | 'manifesto'
  | 'timeline'
  | 'metricsGrid'
  | 'portraitSplit'
  | 'table'
  | 'closing'
  | 'artistGrid'
  | 'artistStats';

// ─── Sub-types ───
export interface Pillar { title: string; text: string }
export interface Stat { value: string; label: string }
export interface TimelineEntry { time: string; title: string; text: string }

export interface TextBlock {
  type: 'kicker' | 'headline' | 'subheader' | 'body' | 'metric' | 'caption';
  content: string;
  motion: MotionKey;
}

export interface MediaItem {
  type: 'vertical' | 'square' | 'chart';
  videoSrc?: string;
  startTime?: number;
  endTime?: number;
  label?: string;
}

export interface ArtistEntry {
  name: string;
  tiktok?: string;
  youtube?: string;
  instagram?: string;
}

export interface SlideData {
  id: string;
  section: string;
  layout: LayoutKey;
  theme: ThemeKey;
  headline?: string;
  subheadline?: string;
  body?: string[];
  pillars?: Pillar[];
  stats?: Stat[];
  timeline?: TimelineEntry[];
  tableData?: { headers: string[]; rows: string[][] };
  image?: string;
  bgImage?: string;
  bgVideo?: string;
  media?: MediaItem[];
  artistData?: ArtistEntry[];
  textBlocks: TextBlock[];
}

// ─── Computed type (adds palette for TopNav/BottomPagination/CerebroWidget compat) ───
export interface ComputedSlide extends SlideData {
  palette: { bg: string; primary: string; accent: string; text: string };
}

// ─── Legacy compat exports ───
export type SlideLayout = LayoutKey;
export type MediaPlaceholder = { type: 'vertical' | 'square' | 'chart'; count: number; label?: string };
export type TableData = { headers: string[]; rows: string[][] };
export type SectionData = { id: string; title: string; subtitle: string; takeaway: string; bullets: string[] };
export type ComputedSectionData = SectionData & { bgColor: string; textColor: string; layoutMode: number; parallaxStrength: number; textVariant: string };
export const COMPUTED_SECTIONS: ComputedSectionData[] = [];
export const textVariants: Record<string, unknown> = {};

// ─── RAW SLIDE DATA ───
const RAW_SLIDES: SlideData[] = [
  // S01: HERO
  {
    id: 'S01', section: 'Hero', layout: 'heroCenter', theme: 'heroDark',
    headline: 'VYB LIVE SESSIONS',
    subheadline: 'The sound of regional energy.',
    body: ['MOBILY × NOJARA STUDIOS × ELEVATE'],
    bgVideo: 'https://video.wixstatic.com/video/227dff_7f7c423a84884c0a867fc981370f9f93/720p/mp4/file.mp4',
    textBlocks: [
      { type: 'headline', content: 'VYB LIVE SESSIONS', motion: 'heroLift' },
      { type: 'subheader', content: 'The sound of regional energy.', motion: 'blurResolve' },
      { type: 'caption', content: '↓ SCROLL TO EXPLORE', motion: 'spotlightFade' },
    ],
  },

  // S02: Introduction
  {
    id: 'S02', section: 'Introduction', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_1d33f15c8a944a9d8d7b1678fa0d43a2~mv2.png',
    headline: 'VYB LIVE SESSIONS',
    subheadline: 'A new cultural platform built for the pace, taste, and behavior of Saudi youth.',
    body: [
      'VYB is not a campaign title. It is a shift in role.',
      'It marks the point where Mobily stops acting only as infrastructure and starts building cultural presence.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Introduction', motion: 'spotlightFade' },
      { type: 'headline', content: 'VYB LIVE SESSIONS', motion: 'maskReveal' },
      { type: 'subheader', content: 'A new cultural platform built for the pace, taste, and behavior of Saudi youth.', motion: 'diagIn' },
      { type: 'body', content: 'VYB is not a campaign title. It is a shift in role.', motion: 'editorialSweep' },
      { type: 'body', content: 'It marks the point where Mobily stops acting only as infrastructure and starts building cultural presence.', motion: 'paragraphUnfold' },
    ],
  },

  // S03
  {
    id: 'S03', section: 'Introduction', layout: 'manifesto', theme: 'darkEditorial',
    headline: 'NOT ANOTHER SPONSORSHIP',
    bgImage: 'https://static.wixstatic.com/media/227dff_f00889dcf0e1443185e8ba399fcc7d80~mv2.gif',
    body: [
      'Not another sponsorship layer. Not another branded content burst.',
      'A long-term music and IP platform designed to move Mobily from utility to relevance.',
      'Empowering Saudi youth through culture, music, and connected experiences.',
    ],
    textBlocks: [
      { type: 'headline', content: 'NOT ANOTHER SPONSORSHIP', motion: 'statementDrop' },
      { type: 'body', content: 'Not another sponsorship layer. Not another branded content burst.', motion: 'editorialSweep' },
      { type: 'body', content: 'A long-term music and IP platform designed to move Mobily from utility to relevance.', motion: 'paragraphUnfold' },
      { type: 'body', content: 'Empowering Saudi youth through culture, music, and connected experiences.', motion: 'blurResolve' },
    ],
  },

  // S04
  {
    id: 'S04', section: 'Introduction', layout: 'editorialLeft', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_9ce0fae6211841f99404991888b212aa~mv2.png',
    headline: 'WHAT IS VYB LIVE SESSIONS?',
    subheadline: 'A premium live music platform with cultural and commercial purpose.',
    body: [
      'Built to capture the raw energy of the most exciting artists across Saudi Arabia and the wider region.',
      'VYB Live Sessions takes the intimacy of globally recognized live-session formats and rebuilds it for this market, this audience, and this behavior pattern.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Introduction', motion: 'spotlightFade' },
      { type: 'headline', content: 'WHAT IS VYB LIVE SESSIONS?', motion: 'heroLift' },
      { type: 'subheader', content: 'A premium live music platform with cultural and commercial purpose.', motion: 'blurResolve' },
      { type: 'body', content: 'Built to capture the raw energy of the most exciting artists across Saudi Arabia and the wider region.', motion: 'cascadeUp' },
    ],
  },

  // S05
  {
    id: 'S05', section: 'Introduction', layout: 'cardGrid', theme: 'lime',
    bgImage: 'https://static.wixstatic.com/media/227dff_67840e3bd3034422baf0278d10610704~mv2.png',
    headline: 'THE FORMAT DIFFERENCE',
    pillars: [
      { title: 'More Local', text: 'Rooted in Saudi sonic identity and regional talent' },
      { title: 'More Cinematic', text: 'Production values that rival global benchmarks' },
      { title: 'More Connected', text: 'Digital-first ecosystem for performance, identity, and community' },
      { title: 'More Ownable', text: 'A regional live-session format that turns Saudi sound into branded cultural capital' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'Introduction', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE FORMAT DIFFERENCE', motion: 'maskReveal' },
    ],
  },

  // S06
  {
    id: 'S06', section: 'Our Approach', layout: 'manifesto', theme: 'darkEditorial',
    headline: 'YOUTH CONTENT SHOULD FEEL CLOSE, NOT MANUFACTURED.',
    bgImage: 'https://static.wixstatic.com/media/227dff_7cc0ed1746294df4a9985b7fc3f03df6~mv2.gif',
    subheadline: 'Current, human, and emotionally legible from the first frame.',
    body: [
      'We do not build youth-facing content from a distance.',
      'We build content that feels culturally near, emotionally clear, and native to the audience it is speaking to.',
    ],
    textBlocks: [
      { type: 'headline', content: 'YOUTH CONTENT SHOULD FEEL CLOSE, NOT MANUFACTURED.', motion: 'statementDrop' },
      { type: 'subheader', content: 'Current, human, and emotionally legible from the first frame.', motion: 'blurResolve' },
      { type: 'body', content: 'We do not build youth-facing content from a distance.', motion: 'editorialSweep' },
    ],
  },

  // S07
  {
    id: 'S07', section: 'Our Approach', layout: 'cardGrid', theme: 'cyan',
    bgImage: 'https://static.wixstatic.com/media/227dff_64bf7700de0a434abd77e0c1cc8f16e5~mv2.png',
    headline: 'THE EDITORIAL COMPASS',
    pillars: [
      { title: 'Clarity', text: 'Over corporate language' },
      { title: 'Taste', text: 'Over noise' },
      { title: 'Emotional Relevance', text: 'Before commercial messaging' },
      { title: 'Useful Content', text: 'Not just visible content' },
    ],
    body: ['The result is a tone of voice that feels modern, youthful, and modest — without losing sharpness.'],
    textBlocks: [
      { type: 'kicker', content: 'Our Approach', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE EDITORIAL COMPASS', motion: 'maskReveal' },
    ],
  },

  // S08
  {
    id: 'S08', section: 'Brand Purpose', layout: 'editorialLeft', theme: 'heroDark',
    headline: 'THE CULTURAL APEX',
    subheadline: 'From infrastructure provider to cultural architect.',
    bgImage: 'https://static.wixstatic.com/media/227dff_f00889dcf0e1443185e8ba399fcc7d80~mv2.gif',
    body: [
      "Mobily's next decade cannot be built on network speed alone. It has to be built on emotional ownership.",
      "Saudi Arabia's entertainment economy has expanded rapidly since Vision 2030. The audience is here. The appetite is real. The cultural momentum is already moving.",
    ],
    textBlocks: [
      { type: 'kicker', content: 'Brand Purpose', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE CULTURAL APEX', motion: 'heroLift' },
      { type: 'subheader', content: 'From infrastructure provider to cultural architect.', motion: 'diagIn' },
      { type: 'body', content: "Mobily's next decade cannot be built on network speed alone. It has to be built on emotional ownership.", motion: 'editorialSweep' },
    ],
  },

  // S09
  {
    id: 'S09', section: 'Brand Purpose', layout: 'editorialSplit', theme: 'coral',
    bgImage: 'https://static.wixstatic.com/media/227dff_9e3a3910636d4b2885a15a4f9d75cffd~mv2.png',
    headline: 'TWO FORCES',
    pillars: [
      { title: 'The Empowerment Mandate', text: "VYB aligns Mobily directly with Saudi youth ambition — one of the defining forces behind the Kingdom's cultural transformation." },
      { title: 'The Emotional Economy', text: 'When Mobily becomes part of the music a generation grows up with, it stops being a service. It becomes a memory.' },
    ],
    body: [
      'Saudi youth are not waiting for culture to arrive. They are already building it.',
      'VYB is how Mobily enters that story in a meaningful, lasting way.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Brand Purpose', motion: 'spotlightFade' },
      { type: 'headline', content: 'TWO FORCES', motion: 'maskReveal' },
    ],
  },

  // S10
  {
    id: 'S10', section: 'Brand Objective', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_5aa87a74e9734134a83f55cb45aaaedd~mv2.png',
    headline: 'THE BUSINESS OF VYB',
    subheadline: 'Four levers. One compounding system.',
    body: [
      'This is not philanthropy. Every creative decision inside VYB is tied to a business outcome.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Brand Objective', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE BUSINESS OF VYB', motion: 'heroLift' },
      { type: 'subheader', content: 'Four levers. One compounding system.', motion: 'blurResolve' },
    ],
  },

  // S11
  {
    id: 'S11', section: 'Brand Objective', layout: 'cardGrid', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_37e27698acdf4f32b4a34235dcd0bdd7~mv2.png',
    headline: 'THE FOUR LEVERS',
    pillars: [
      { title: 'Retention & Loyalty', text: 'Exclusive content, live sessions, and zero-rated streaming strengthen subscriber stickiness.' },
      { title: 'Perception & Positioning', text: 'A generation that associates Mobily with emerging regional music does not compare it like a utility.' },
      { title: 'Platform & 5G Integration', text: "Every stream, vote, session, and interaction becomes a behavioral entry point into Mobily's digital product ecosystem." },
      { title: 'Ecosystem & IP Value', text: 'Media consumption creates royalties. Royalties support new production.' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'Brand Objective', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE FOUR LEVERS', motion: 'maskReveal' },
    ],
  },

  // S12
  {
    id: 'S12', section: 'Brand Objective', layout: 'manifesto', theme: 'darkEditorial',
    headline: 'THE COMPOUNDING LOGIC',
    bgImage: 'https://static.wixstatic.com/media/227dff_c6707a4cc79147a6886b042b59c01c17~mv2.gif',
    body: [
      'Content drives attention, attention drives usage, usage strengthens the platform, and the platform keeps generating cultural and commercial value.',
    ],
    textBlocks: [
      { type: 'headline', content: 'THE COMPOUNDING LOGIC', motion: 'statementDrop' },
      { type: 'body', content: 'Content drives attention, attention drives usage, usage strengthens the platform, and the platform keeps generating cultural and commercial value.', motion: 'paragraphUnfold' },
    ],
  },

  // S13
  {
    id: 'S13', section: 'Market Opportunity', layout: 'metricsGrid', theme: 'analytics',
    headline: 'THE WINDOW IS OPEN',
    subheadline: 'Saudi Arabia is not becoming a music market. It already is one.',
    stats: [
      { value: '60%', label: 'of Saudi Arabia is under 30' },
      { value: '$4.96B', label: 'projected Saudi music streaming market by 2031' },
      { value: '25.5%', label: 'CAGR — one of the fastest growth trajectories' },
      { value: '5–7%', label: 'current Saudi audience share for top regional artists' },
    ],
    textBlocks: [
      { type: 'headline', content: 'THE WINDOW IS OPEN', motion: 'heroLift' },
      { type: 'subheader', content: 'Saudi Arabia is not becoming a music market. It already is one.', motion: 'blurResolve' },
    ],
  },

  // S14
  {
    id: 'S14', section: 'Market Opportunity', layout: 'editorialLeft', theme: 'heroDark',
    headline: 'THE UNTAPPED VOID',
    subheadline: 'The space no one has claimed. Yet.',
    bgImage: 'https://static.wixstatic.com/media/227dff_f00889dcf0e1443185e8ba399fcc7d80~mv2.gif',
    body: [
      'No regional platform has built a credible, artist-first, production-led music content vertical at scale.',
      'Globally, formats like Tiny Desk, COLORS, and Boiler Room have already proven the model. The Middle East still lacks its own definitive equivalent.',
      'The window is open, but it will not stay open.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Market Opportunity', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE UNTAPPED VOID', motion: 'maskReveal' },
      { type: 'subheader', content: 'The space no one has claimed. Yet.', motion: 'diagIn' },
      { type: 'body', content: 'No regional platform has built a credible, artist-first, production-led music content vertical at scale.', motion: 'editorialSweep' },
    ],
  },

  // S15 — WHAT WE PRODUCE (THE SYSTEM)
  {
    id: 'S15', section: 'The System', layout: 'metricsGrid', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_5aa87a74e9734134a83f55cb45aaaedd~mv2.png',
    headline: 'THIS IS NOT ONE SHOW. IT\'S A SYSTEM.',
    subheadline: 'VYB doesn\'t create one piece of content. It creates a full stream of music and media.',
    stats: [
      { value: '10', label: 'Full episodes' },
      { value: '30+', label: 'Songs' },
      { value: '15+', label: 'Music videos' },
      { value: '120', label: 'Content pieces' },
    ],
    body: ['One system. Constant output.'],
    textBlocks: [
      { type: 'headline', content: "THIS IS NOT ONE SHOW. IT'S A SYSTEM.", motion: 'statementDrop' },
      { type: 'subheader', content: "VYB doesn't create one piece of content. It creates a full stream of music and media.", motion: 'editorialSweep' },
    ],
  },

  // S16 — WHERE IT LIVES (SNAPCHAT FIRST)
  {
    id: 'S16', section: 'Distribution', layout: 'editorialLeft', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_0f003effe5f140e9886753aabc8d4859~mv2.png',
    headline: 'BUILT FOR SNAPCHAT. EXTENDED EVERYWHERE ELSE.',
    subheadline: 'Snapchat is the main platform for VYB.',
    body: [
      'It\'s where youth already are. It\'s fast, visual, and daily. It turns content into habit.',
      'Episodes → hero content. Clips → daily Snapchat stories. Engagement → replies, shares, interaction.',
      'Other platforms support. Snapchat leads.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Distribution', motion: 'spotlightFade' },
      { type: 'headline', content: 'BUILT FOR SNAPCHAT. EXTENDED EVERYWHERE ELSE.', motion: 'heroLift' },
      { type: 'subheader', content: 'Snapchat is the main platform for VYB.', motion: 'blurResolve' },
      { type: 'body', content: "It's where youth already are. It's fast, visual, and daily.", motion: 'cascadeUp' },
    ],
  },

  // S17 — TOTAL CONTENT OUTPUT
  {
    id: 'S17', section: 'Content Output', layout: 'cardGrid', theme: 'lime',
    bgImage: 'https://static.wixstatic.com/media/227dff_67840e3bd3034422baf0278d10610704~mv2.png',
    headline: '120+ CONTENT PIECES FROM ONE SEASON.',
    pillars: [
      { title: 'Hero Content', text: '10 full episodes' },
      { title: 'Music Content', text: '30 songs (3 per episode) + 10 collaboration tracks' },
      { title: 'Video Content', text: '20 performance videos + 10 collaboration videos' },
      { title: 'Short Content', text: '80–120 short clips: highlights, quotes, reactions, BTS moments' },
    ],
    body: [
      'Winner Content: 3-track EP, 1 music video, 30+ social clips.',
      'One system → content every day.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Content Output', motion: 'spotlightFade' },
      { type: 'headline', content: '120+ CONTENT PIECES FROM ONE SEASON.', motion: 'maskReveal' },
    ],
  },

  // S18 — HOW EACH EPISODE CREATES CONTENT
  {
    id: 'S18', section: 'Content Output', layout: 'metricsGrid', theme: 'cyan',
    bgImage: 'https://static.wixstatic.com/media/227dff_2c54b8b40c4c40a7b112871a3119f28f~mv2.png',
    headline: 'ONE EPISODE CREATES MANY PIECES.',
    subheadline: 'We don\'t create once. We create continuously.',
    stats: [
      { value: '1', label: 'Full show' },
      { value: '2', label: 'Performances' },
      { value: '1', label: 'Collaboration' },
      { value: '10+', label: 'Short clips + BTS' },
    ],
    textBlocks: [
      { type: 'headline', content: 'ONE EPISODE CREATES MANY PIECES.', motion: 'heroLift' },
      { type: 'subheader', content: "We don't create once. We create continuously.", motion: 'diagIn' },
    ],
  },

  // S19 — THE MUSIC OUTPUT
  {
    id: 'S19', section: 'Music Output', layout: 'editorialLeft', theme: 'darkEditorial',
    bgImage: 'https://static.wixstatic.com/media/227dff_c6707a4cc79147a6886b042b59c01c17~mv2.gif',
    headline: 'EVERY EPISODE CREATES REAL MUSIC.',
    subheadline: 'Each episode produces 3 songs. 10 episodes = 30 songs.',
    body: [
      '1 track from Artist A. 1 track from Artist B. 1 collaboration track.',
      'That\'s 3 songs per episode. Season total: 10 episodes = 30 songs.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Music Output', motion: 'spotlightFade' },
      { type: 'headline', content: 'EVERY EPISODE CREATES REAL MUSIC.', motion: 'maskReveal' },
      { type: 'subheader', content: 'Each episode produces 3 songs. 10 episodes = 30 songs.', motion: 'editorialSweep' },
    ],
  },

  // S20 — THE WINNER IDEA
  {
    id: 'S20', section: 'Winner Concept', layout: 'manifesto', theme: 'heroDark',
    bgImage: 'https://static.wixstatic.com/media/227dff_7cc0ed1746294df4a9985b7fc3f03df6~mv2.gif',
    headline: 'WE DON\'T JUST SHOW TALENT. WE GROW IT.',
    subheadline: 'From the audience, we discover new artists.',
    body: [
      'One artist becomes the winner.',
      'Mobily supports them to build their career.',
    ],
    textBlocks: [
      { type: 'headline', content: "WE DON'T JUST SHOW TALENT. WE GROW IT.", motion: 'statementDrop' },
      { type: 'subheader', content: 'From the audience, we discover new artists.', motion: 'blurResolve' },
      { type: 'body', content: 'Mobily supports them to build their career.', motion: 'paragraphUnfold' },
    ],
  },

  // S20a — HOW WE FIND THE WINNER
  {
    id: 'S20a', section: 'Winner Concept', layout: 'editorialLeft', theme: 'coral',
    bgImage: 'https://static.wixstatic.com/media/227dff_9e3a3910636d4b2885a15a4f9d75cffd~mv2.png',
    headline: 'THE AUDIENCE HELPS CHOOSE.',
    subheadline: 'Artists join by posting on Snapchat, TikTok, and Instagram.',
    body: [
      'We track: views, shares, engagement.',
      'Snapchat is key — it becomes the main signal of real audience interest.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Winner Concept', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE AUDIENCE HELPS CHOOSE.', motion: 'heroLift' },
      { type: 'subheader', content: 'Artists join by posting on Snapchat, TikTok, and Instagram.', motion: 'cascadeUp' },
    ],
  },

  // S20b — FROM MANY TO ONE
  {
    id: 'S20b', section: 'Winner Concept', layout: 'cardGrid', theme: 'analytics',
    bgImage: 'https://static.wixstatic.com/media/227dff_37e27698acdf4f32b4a34235dcd0bdd7~mv2.png',
    headline: 'CLEAR SELECTION PROCESS.',
    subheadline: 'Audience behavior drives the decision.',
    pillars: [
      { title: 'Top 20', text: 'Review' },
      { title: 'Top 10', text: 'Studio audition' },
      { title: 'Top 5', text: 'Featured on platform' },
      { title: 'Final 1', text: 'Winner' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'Winner Concept', motion: 'spotlightFade' },
      { type: 'headline', content: 'CLEAR SELECTION PROCESS.', motion: 'maskReveal' },
    ],
  },

  // S20c — WHAT THE WINNER GETS
  {
    id: 'S20c', section: 'Winner Package', layout: 'metricsGrid', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_265294f1ab0d4ceb877bed522d0324c1~mv2.png',
    headline: 'A REAL OPPORTUNITY.',
    subheadline: 'We turn talent into a real artist.',
    stats: [
      { value: '3', label: 'Professionally produced songs' },
      { value: '1', label: 'Music video' },
      { value: '∞', label: 'Full promotion and release' },
    ],
    textBlocks: [
      { type: 'headline', content: 'A REAL OPPORTUNITY.', motion: 'statementDrop' },
      { type: 'subheader', content: 'We turn talent into a real artist.', motion: 'blurResolve' },
    ],
  },

  // S20d — THE EP (3 SONGS)
  {
    id: 'S20d', section: 'Winner Package', layout: 'editorialLeft', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_9ce0fae6211841f99404991888b212aa~mv2.png',
    headline: 'BUILDING A REAL MUSIC PROJECT.',
    subheadline: 'The winner records 3 original tracks with top producers in a professional studio.',
    body: [
      'Result: A real, publishable EP.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Winner Package', motion: 'spotlightFade' },
      { type: 'headline', content: 'BUILDING A REAL MUSIC PROJECT.', motion: 'heroLift' },
      { type: 'subheader', content: 'The winner records 3 original tracks with top producers in a professional studio.', motion: 'editorialSweep' },
    ],
  },

  // S20e — THE MUSIC VIDEO
  {
    id: 'S20e', section: 'Winner Package', layout: 'editorialLeft', theme: 'lime',
    bgImage: 'https://static.wixstatic.com/media/227dff_8d9ea8c2a77f4e7698223d26742970c3~mv2.png',
    headline: 'MAKING THE ARTIST VISIBLE.',
    subheadline: 'Video drives discovery.',
    body: [
      'We produce 1 cinematic music video, optimized for YouTube + Snapchat.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Winner Package', motion: 'spotlightFade' },
      { type: 'headline', content: 'MAKING THE ARTIST VISIBLE.', motion: 'maskReveal' },
      { type: 'subheader', content: 'Video drives discovery.', motion: 'diagIn' },
    ],
  },

  // S20f — CONTENT AROUND THE WINNER
  {
    id: 'S20f', section: 'Winner Package', layout: 'cardGrid', theme: 'cyan',
    bgImage: 'https://static.wixstatic.com/media/227dff_64bf7700de0a434abd77e0c1cc8f16e5~mv2.png',
    headline: 'WE BUILD A FULL STORY.',
    subheadline: 'The artist grows fast.',
    pillars: [
      { title: 'BTS Clips', text: 'Behind-the-scenes content' },
      { title: 'Short Videos', text: 'Short vertical videos' },
      { title: 'Daily Content', text: 'Daily Snapchat content' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'Winner Package', motion: 'spotlightFade' },
      { type: 'headline', content: 'WE BUILD A FULL STORY.', motion: 'heroLift' },
    ],
  },

  // S20g — WHERE THE MUSIC GOES
  {
    id: 'S20g', section: 'Distribution', layout: 'cardGrid', theme: 'darkEditorial',
    bgImage: 'https://static.wixstatic.com/media/227dff_1d33f15c8a944a9d8d7b1678fa0d43a2~mv2.png',
    headline: 'DISTRIBUTION EVERYWHERE.',
    pillars: [
      { title: 'Spotify', text: 'Global streaming' },
      { title: 'Anghami', text: 'Regional streaming' },
      { title: 'Apple Music', text: 'Premium streaming' },
      { title: 'YouTube', text: 'Video & audio streaming' },
    ],
    body: [
      'Plus: exclusive drops on Mobily. Heavy presence on Snapchat.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Distribution', motion: 'spotlightFade' },
      { type: 'headline', content: 'DISTRIBUTION EVERYWHERE.', motion: 'maskReveal' },
      { type: 'body', content: 'Plus: exclusive drops on Mobily. Heavy presence on Snapchat.', motion: 'cascadeUp' },
    ],
  },

  // S20h — HOW THE SYSTEM KEEPS WORKING
  {
    id: 'S20h', section: 'The Loop', layout: 'manifesto', theme: 'heroDark',
    bgVideo: 'https://video.wixstatic.com/video/227dff_7f7c423a84884c0a867fc981370f9f93/720p/mp4/file.mp4',
    headline: 'A LOOP, NOT A CAMPAIGN.',
    body: [
      'Episode drops → Content spreads (Snapchat first) → Audience reacts → New talent appears → New music is created.',
      'Then it repeats.',
    ],
    textBlocks: [
      { type: 'headline', content: 'A LOOP, NOT A CAMPAIGN.', motion: 'statementDrop' },
      { type: 'body', content: 'Episode drops → Content spreads → Audience reacts → New talent appears → New music is created.', motion: 'editorialSweep' },
      { type: 'body', content: 'Then it repeats.', motion: 'paragraphUnfold' },
    ],
  },

  // S20i — WHY THIS LOOP IS POWERFUL
  {
    id: 'S20i', section: 'The Loop', layout: 'editorialLeft', theme: 'coral',
    bgImage: 'https://static.wixstatic.com/media/227dff_f00889dcf0e1443185e8ba399fcc7d80~mv2.gif',
    headline: 'GROWTH BUILDS ON ITSELF.',
    subheadline: 'The platform grows naturally.',
    body: [
      'More content → more views. More views → more artists. More artists → better content.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Loop', motion: 'spotlightFade' },
      { type: 'headline', content: 'GROWTH BUILDS ON ITSELF.', motion: 'heroLift' },
      { type: 'subheader', content: 'The platform grows naturally.', motion: 'blurResolve' },
      { type: 'body', content: 'More content → more views. More views → more artists. More artists → better content.', motion: 'cascadeUp' },
    ],
  },

  // S20j — HOW IT CONNECTS TO MOBILY
  {
    id: 'S20j', section: 'Mobily Integration', layout: 'cardGrid', theme: 'analytics',
    bgImage: 'https://static.wixstatic.com/media/227dff_9de2bdedd40e46e99c87ab46bff5f421~mv2.png',
    headline: 'BUILT INTO MOBILY.',
    pillars: [
      { title: 'Watch', text: 'Stream live sessions' },
      { title: 'Vote', text: 'Support favorite artists' },
      { title: 'Stream', text: 'Access music library' },
      { title: 'Exclusives', text: 'Subscriber-only content' },
    ],
    body: ['All inside Mobily\'s ecosystem.'],
    textBlocks: [
      { type: 'kicker', content: 'Mobily Integration', motion: 'spotlightFade' },
      { type: 'headline', content: 'BUILT INTO MOBILY.', motion: 'maskReveal' },
    ],
  },

  // S20k — WHAT USERS ACTUALLY DO
  {
    id: 'S20k', section: 'Mobily Integration', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_5aa87a74e9734134a83f55cb45aaaedd~mv2.png',
    headline: 'FROM PASSIVE TO ACTIVE.',
    subheadline: 'Daily engagement.',
    body: [
      'Users: watch on Snapchat, vote in the app, share content, discover artists.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Mobily Integration', motion: 'spotlightFade' },
      { type: 'headline', content: 'FROM PASSIVE TO ACTIVE.', motion: 'heroLift' },
      { type: 'subheader', content: 'Daily engagement.', motion: 'diagIn' },
      { type: 'body', content: 'Users: watch on Snapchat, vote in the app, share content, discover artists.', motion: 'cascadeUp' },
    ],
  },

  // S20l — CONTENT LEVELS
  {
    id: 'S20l', section: 'Content Structure', layout: 'cardGrid', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_37e27698acdf4f32b4a34235dcd0bdd7~mv2.png',
    headline: 'CONTENT FOR EVERY MOMENT.',
    pillars: [
      { title: 'Top Tier', text: 'Episodes + music videos' },
      { title: 'Mid Tier', text: 'Performances + collaborations' },
      { title: 'Daily', text: 'Snapchat clips, BTS, reactions' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'Content Structure', motion: 'spotlightFade' },
      { type: 'headline', content: 'CONTENT FOR EVERY MOMENT.', motion: 'heroLift' },
    ],
  },

  // S20m — WHY THIS MATTERS FOR MOBILY
  {
    id: 'S20m', section: 'Mobily Integration', layout: 'manifesto', theme: 'yellow',
    bgImage: 'https://static.wixstatic.com/media/227dff_9ce0fae6211841f99404991888b212aa~mv2.png',
    headline: 'FROM NETWORK TO CULTURE.',
    subheadline: 'This helps Mobily: keep users longer, increase app usage, build emotional connection.',
    body: [
      'VYB transforms Mobily from a network provider into a cultural platform.',
    ],
    textBlocks: [
      { type: 'headline', content: 'FROM NETWORK TO CULTURE.', motion: 'statementDrop' },
      { type: 'subheader', content: 'This helps Mobily: keep users longer, increase app usage, build emotional connection.', motion: 'editorialSweep' },
      { type: 'body', content: 'VYB transforms Mobily from a network provider into a cultural platform.', motion: 'paragraphUnfold' },
    ],
  },

  // S21
  {
    id: 'S21', section: 'Show Format', layout: 'timeline', theme: 'darkEditorial',
    headline: 'ENGINEERED FOR DEPTH',
    subheadline: 'The Episode Structure: Part I',
    timeline: [
      { time: '0:00 – 3:00', title: 'THE ARRIVAL', text: 'A cinematic cold open rooted in Riyadh. Architectural context. Mood. Entry.' },
      { time: '3:00 – 10:00', title: 'PERFORMANCE I', text: 'Unfiltered performance of original catalog. Captured with intimacy, sound fidelity, and minimal interruption.' },
      { time: '10:00 – 15:00', title: 'THE DIALOGUE', text: 'A raw conversation about process, identity, influence, and what drives their VYB.' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'Show Format', motion: 'spotlightFade' },
      { type: 'headline', content: 'ENGINEERED FOR DEPTH', motion: 'heroLift' },
    ],
  },

  // S22
  {
    id: 'S22', section: 'Show Format', layout: 'timeline', theme: 'analytics',
    headline: 'THE CREATIVE PEAK',
    subheadline: 'The Episode Structure: Part II',
    timeline: [
      { time: '15:00 – 20:00', title: 'PERFORMANCE II', text: 'A signature closer, exclusive arrangement, or cross-artist collaboration.' },
      { time: '20:00 – 22:00', title: 'THE DIGITAL OUTRO', text: 'A clean bridge into the Mobily ecosystem — subscriber-only drops, bonus content, community prompts.' },
    ],
    body: ['Optional Social Extension: Snaplive Segment — A real-time fan engagement layer on Snapchat.'],
    textBlocks: [
      { type: 'kicker', content: 'Show Format', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE CREATIVE PEAK', motion: 'maskReveal' },
    ],
  },

  // S23
  {
    id: 'S23', section: 'The Host', layout: 'portraitSplit', theme: 'heroDark',
    headline: 'AL TEMSAH',
    subheadline: 'بنفسه',
    body: [
      'Al Temsah is not a celebrity attachment. He is a format stabilizer — and Mobily is making his comeback possible.',
      "His role is not decorative. With Mobily driving Al Temsah's comeback, he helps the platform land faster, feel familiar, and scale culturally from day one.",
    ],
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_mLlnH3iqTmQjUKtDEh3EndCV3dgC4o-sJxiTbT71rfOfU=s800-c-k-c0x00ffffff-no-rj',
    media: [{ type: 'square', videoSrc: 'https://www.youtube.com/watch?v=d93ksd8hG_0', startTime: 0 }],
    textBlocks: [
      { type: 'kicker', content: 'The Host', motion: 'spotlightFade' },
      { type: 'headline', content: 'AL TEMSAH', motion: 'heroLift' },
      { type: 'subheader', content: 'بنفسه', motion: 'blurResolve' },
    ],
  },

  // S24
  {
    id: 'S24', section: 'The Host', layout: 'cardGrid', theme: 'teal',
    headline: 'AL TEMSAH VALUE',
    media: [{ type: 'square', videoSrc: 'https://www.youtube.com/watch?v=scgLuWbr7rw', startTime: 5, endTime: 10 }],
    pillars: [
      { title: 'Institutional Credibility', text: "His presence signals that the platform is serious, and Mobily's backing amplifies that signal." },
      { title: 'Cultural Range', text: 'He can hold a conversation that makes sense to both a Tier 1 regional artist and a 19-year-old discovering music online.' },
      { title: 'Distribution Value', text: 'His social behavior already travels. Audiences share his clips and catchphrases across platforms.' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Host', motion: 'spotlightFade' },
      { type: 'headline', content: 'AL TEMSAH VALUE', motion: 'maskReveal' },
    ],
  },

  // S25
  {
    id: 'S25', section: 'Media Partner', layout: 'editorialLeft', theme: 'yellow',
    headline: 'BILLBOARD ARABIA',
    subheadline: 'Chart authority aligned with regional cultural legitimacy.',
    media: [{ type: 'vertical', videoSrc: 'https://video.wixstatic.com/video/227dff_e9c487c7d0964487a941066f2d479676/720p/mp4/file.mp4' }],
    body: [
      'Billboard Arabia as official media partner adds more than visibility. It adds signal value.',
      'When an artist moves through VYB and is covered by Billboard Arabia, the platform stops reading like an experiment and starts reading like an institution.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Media Partner', motion: 'spotlightFade' },
      { type: 'headline', content: 'BILLBOARD ARABIA', motion: 'heroLift' },
      { type: 'subheader', content: 'Chart authority aligned with regional cultural legitimacy.', motion: 'diagIn' },
    ],
  },

  // S25b: ARTIST ROSTER GRID
  {
    id: 'S25b', section: 'The Ecosystem', layout: 'artistGrid' as LayoutKey, theme: 'darkEditorial' as ThemeKey,
    headline: 'THE ARTIST ROSTER',
    subheadline: '18 voices shaping the sound of a generation.',
    bgImage: 'https://static.wixstatic.com/media/227dff_67840e3bd3034422baf0278d10610704~mv2.png',
    artistData: [
      { name: 'ASAYEL', tiktok: 'https://www.tiktok.com/@beasayel', youtube: 'https://youtube.com/@beasayel', instagram: 'https://www.instagram.com/beasayel' },
      { name: 'NIFO', tiktok: 'https://www.tiktok.com/@i.nifo', youtube: 'https://youtube.com/@nifo1', instagram: 'https://www.instagram.com/nifo7' },
      { name: 'BLVXB', tiktok: 'https://www.tiktok.com/@blvxb', youtube: 'https://youtube.com/@blvxb', instagram: 'https://www.instagram.com/blvxb' },
      { name: 'JARA', tiktok: 'https://www.tiktok.com/@jaraonthebeat', youtube: 'https://youtube.com/@theycallmejara', instagram: 'https://www.instagram.com/theycallmejara' },
      { name: 'ALYOUNG', tiktok: 'https://www.tiktok.com/@alyoungofficial', youtube: 'https://youtube.com/channel/UCul2rHiPF0yt6Nzr_bUsiww', instagram: 'https://www.instagram.com/alyoung187' },
      { name: 'دحمز', tiktok: 'https://www.tiktok.com/@d7zmusic', youtube: 'https://youtube.com/@d7mez', instagram: 'https://www.instagram.com/d7mez' },
      { name: 'الشيخ', tiktok: 'https://www.tiktok.com/@itsalshaikh', youtube: 'https://youtube.com/@itsalshaikh', instagram: 'https://www.instagram.com/itsalshaikh' },
      { name: 'THE DO', youtube: 'https://youtube.com/@thedo-', instagram: 'https://www.instagram.com/official_thedo' },
      { name: 'S6ONER', tiktok: 'https://www.tiktok.com/@s6oner', youtube: 'https://youtube.com/@s6oner', instagram: 'https://www.instagram.com/s6oner' },
      { name: 'LELE CRI', tiktok: 'https://www.tiktok.com/@lelecry', youtube: 'https://youtube.com/@lelecri', instagram: 'https://www.instagram.com/lelecri666' },
      { name: "KAY'O", tiktok: 'https://www.tiktok.com/@goolwallaii', youtube: 'https://youtube.com/@goolwallai', instagram: 'https://www.instagram.com/goolwallai' },
      { name: 'MOHAMAD MEM', tiktok: 'https://www.tiktok.com/@memgovt', youtube: 'https://youtube.com/@memgoat', instagram: 'https://www.instagram.com/memgovt' },
      { name: 'لورد عمر', tiktok: 'https://www.tiktok.com/@lord0mar966', youtube: 'https://youtube.com/@lordomar966', instagram: 'https://www.instagram.com/lord0mar966' },
      { name: 'حيدر منديلا', tiktok: 'https://www.tiktok.com/@mvndila', youtube: 'https://youtube.com/@mvndila', instagram: 'https://www.instagram.com/mvndila' },
      { name: 'TAGEEL', tiktok: 'https://www.tiktok.com/@ta8eel', youtube: 'https://youtube.com/@ta8eel', instagram: 'https://www.instagram.com/ta8eel' },
      { name: 'KHALZ', tiktok: 'https://www.tiktok.com/@realkhalz', youtube: 'https://youtube.com/@khalzmusic', instagram: 'https://www.instagram.com/realkhalz' },
      { name: 'ALI', tiktok: 'https://www.tiktok.com/@alig_aka_lls', youtube: 'https://youtube.com/@alig.x', instagram: 'https://www.instagram.com/aligxrap' },
      { name: 'SEECOO', tiktok: 'https://www.tiktok.com/@seecoo94', youtube: 'https://youtube.com/@seecoo', instagram: 'https://www.instagram.com/seecoo94' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Ecosystem', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE ARTIST ROSTER', motion: 'maskReveal' },
      { type: 'subheader', content: '18 voices shaping the sound of a generation.', motion: 'blurResolve' },
    ],
  },

  // S25c: PLATFORM PRESENCE STATS
  {
    id: 'S25c', section: 'The Ecosystem', layout: 'artistStats' as LayoutKey, theme: 'analytics' as ThemeKey,
    headline: 'PLATFORM PRESENCE',
    subheadline: 'Cross-platform reach powering cultural distribution.',
    stats: [
      { value: '18', label: 'Artists' },
      { value: '3', label: 'Platforms' },
      { value: '53', label: 'Active Channels' },
    ],
    textBlocks: [
      { type: 'headline', content: 'PLATFORM PRESENCE', motion: 'heroLift' },
      { type: 'subheader', content: 'Cross-platform reach powering cultural distribution.', motion: 'blurResolve' },
    ],
  },

  // S26
  {
    id: 'S26', section: 'The Ecosystem', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_265294f1ab0d4ceb877bed522d0324c1~mv2.png',
    headline: 'TIER 1 ICONS',
    subheadline: 'Immediate gravity. Immediate reach. Immediate asset value.',
    body: [
      'Tier 1 artists give VYB instant scale. Their role is to establish platform legitimacy, generate immediate attention, seed the first wave of catalog value, and create cross-border cultural reach from day one.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Ecosystem', motion: 'spotlightFade' },
      { type: 'headline', content: 'TIER 1 ICONS', motion: 'maskReveal' },
      { type: 'subheader', content: 'Immediate gravity. Immediate reach. Immediate asset value.', motion: 'blurResolve' },
    ],
  },

  // S27
  {
    id: 'S27', section: 'The Ecosystem', layout: 'editorialSplit', theme: 'darkEditorial',
    headline: 'TIER 2 PIONEERS',
    subheadline: 'Street credibility. Engineered cultural moments.',
    pillars: [
      { title: 'Subcultural Legitimacy', text: 'Names tastemakers follow before the broader market catches up' },
      { title: 'Future Upside', text: 'Discovery value and credibility with younger audiences' },
    ],
    body: [
      'Tier 1 gives VYB scale. Tier 2 gives it spine.',
      'That combination is what makes the ecosystem feel real rather than assembled.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Ecosystem', motion: 'spotlightFade' },
      { type: 'headline', content: 'TIER 2 PIONEERS', motion: 'maskReveal' },
    ],
  },

  // S28
  {
    id: 'S28', section: 'Content Engine', layout: 'metricsGrid', theme: 'lime',
    headline: 'THE VYB CONTENT ENGINE',
    subheadline: 'A year-round music content system.',
    stats: [
      { value: '10', label: 'Flagship VYB Live Sessions episodes' },
      { value: '77', label: 'Audio tracks' },
      { value: '15', label: 'Music videos' },
      { value: '6', label: 'Concerts' },
    ],
    body: ['Plus 1 national talent discovery contest, 1 artist development sequel format, 1 annual VYB festival, and 50+ digital assets.'],
    textBlocks: [
      { type: 'headline', content: 'THE VYB CONTENT ENGINE', motion: 'heroLift' },
      { type: 'subheader', content: 'A year-round music content system.', motion: 'blurResolve' },
    ],
  },

  // S29
  {
    id: 'S29', section: 'Content Engine', layout: 'cardGrid', theme: 'cyan',
    headline: 'CONTENT ARCHITECTURE',
    subheadline: 'One production system feeding every platform at once.',
    pillars: [
      { title: 'Long-form', text: 'Viewing' },
      { title: 'Social', text: 'Clipping' },
      { title: 'Audio', text: 'Streaming' },
      { title: 'Live', text: 'Experiences' },
    ],
    body: ['Every output has a role. Nothing exists as filler.'],
    textBlocks: [
      { type: 'kicker', content: 'Content Engine', motion: 'spotlightFade' },
      { type: 'headline', content: 'CONTENT ARCHITECTURE', motion: 'maskReveal' },
    ],
  },

  // S30
  {
    id: 'S30', section: 'Deliverables', layout: 'editorialLeft', theme: 'heroDark',
    headline: 'THE VYB CONTENT MACHINE',
    subheadline: 'One seasonal cycle. Long shelf life. Ongoing relevance.',
    bgImage: 'https://static.wixstatic.com/media/227dff_7cc0ed1746294df4a9985b7fc3f03df6~mv2.gif',
    body: [
      'Mindshare is not won with one launch. It is maintained through rhythm.',
      'VYB is designed to stay visible across the full year through a rolling content calendar built from one coherent ecosystem.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Deliverables', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE VYB CONTENT MACHINE', motion: 'heroLift' },
      { type: 'subheader', content: 'One seasonal cycle. Long shelf life. Ongoing relevance.', motion: 'diagIn' },
    ],
  },

  // S31
  {
    id: 'S31', section: 'Deliverables', layout: 'editorialLeft', theme: 'blue',
    headline: 'CONTENT PILLARS',
    subheadline: 'The media stack in one view.',
    body: [
      'The value of Season 1 is not only what it does in the launch window. It is the library it leaves behind.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Deliverables', motion: 'spotlightFade' },
      { type: 'headline', content: 'CONTENT PILLARS', motion: 'maskReveal' },
      { type: 'subheader', content: 'The media stack in one view.', motion: 'blurResolve' },
    ],
  },

  // S32
  {
    id: 'S32', section: 'Deliverables', layout: 'metricsGrid', theme: 'analytics',
    headline: 'REACH BENCHMARKS',
    stats: [
      { value: '66.7M', label: 'Average reach for audio tracks' },
      { value: '27M', label: 'Average reach for music videos' },
      { value: '37.7M', label: 'Average digital content reach' },
      { value: '250K', label: 'Event footprint benchmark' },
    ],
    textBlocks: [
      { type: 'headline', content: 'REACH BENCHMARKS', motion: 'heroLift' },
    ],
  },

  // S33
  {
    id: 'S33', section: 'Deliverables', layout: 'table', theme: 'darkEditorial',
    headline: 'ASSET MATRIX',
    tableData: {
      headers: ['Asset Pillar', 'Qty', 'Role'],
      rows: [
        ['Flagship Live-Session Episodes', '10', 'Anchor content for cultural storytelling'],
        ['Audio Tracks', '77', 'DSP value, long-tail monetization'],
        ['Music Videos', '15', 'Visual discovery, search value'],
        ['Talent Discovery Contest', '1', 'National talent pipeline'],
        ['Level Up / Development Format', '1', 'Artist growth continuity'],
        ['Concerts', '6', 'On-ground brand value'],
        ['Festival', '1', 'Annual cultural culmination'],
        ['Digital Assets', '50+', 'Social distribution, BTS, cutdowns'],
      ],
    },
    textBlocks: [
      { type: 'headline', content: 'ASSET MATRIX', motion: 'maskReveal' },
    ],
  },

  // S34
  {
    id: 'S34', section: 'Cultural Guardianship', layout: 'editorialLeft', theme: 'teal',
    headline: 'EL BATRON',
    subheadline: 'The cultural infrastructure behind VYB.',
    media: [{ type: 'vertical', videoSrc: 'https://video.wixstatic.com/video/227dff_3bf9e45aa372453e82efbba8f008bcb7/720p/mp4/file.mp4' }],
    body: [
      'Founded by Tarek Nojara in 2019, El Batron is not background support. It is the operational spine of the artist ecosystem.',
      'Its value is practical: artist trust, A&R intelligence, subcultural fluency, mentorship, development structure, and credibility.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Cultural Guardianship', motion: 'spotlightFade' },
      { type: 'headline', content: 'EL BATRON', motion: 'heroLift' },
      { type: 'subheader', content: 'The cultural infrastructure behind VYB.', motion: 'diagIn' },
    ],
  },

  // S35
  {
    id: 'S35', section: 'Cultural Guardianship', layout: 'editorialSplit', theme: 'coral',
    headline: 'HIGH-PRODUCTION VISIONS',
    subheadline: 'Artist-first. Production-serious. Culturally exact.',
    pillars: [
      { title: 'The Engine', text: "El Batron's model is built around long-term artist and IP value, not short release cycles." },
      { title: 'The Vision', text: 'Bring authentic Middle Eastern sound and culture to a wider stage.' },
    ],
    bgImage: 'https://static.wixstatic.com/media/227dff_c6707a4cc79147a6886b042b59c01c17~mv2.gif',
    media: [{ type: 'square', videoSrc: 'https://video.wixstatic.com/video/227dff_bc15c39ed67f4e988bac494e452ac0a8/720p/mp4/file.mp4' }],
    body: ['VYB is the vehicle. El Batron is the engine.'],
    textBlocks: [
      { type: 'kicker', content: 'Cultural Guardianship', motion: 'spotlightFade' },
      { type: 'headline', content: 'HIGH-PRODUCTION VISIONS', motion: 'maskReveal' },
    ],
  },

  // S36: CONCLUSION
  {
    id: 'S36', section: 'Conclusion', layout: 'closing', theme: 'heroDark',
    headline: 'VYB LIVE SESSIONS',
    bgVideo: 'https://video.wixstatic.com/video/227dff_c261b2ce87fd489e9dc47a2e67dbe3f4/1080p/mp4/file.mp4',
    subheadline: 'The sound of regional energy.',
    body: [
      'Mobily × Nojara Studios × Elevate',
      'The cultural platform Saudi Arabia has been waiting for.',
    ],
    textBlocks: [
      { type: 'headline', content: 'VYB LIVE SESSIONS', motion: 'heroLift' },
      { type: 'subheader', content: 'The sound of regional energy.', motion: 'blurResolve' },
      { type: 'caption', content: 'Mobily × Nojara Studios × Elevate', motion: 'ctaBreathe' },
    ],
  },
];

// ─── Compute slides with palette from theme map ───
export const SLIDES: ComputedSlide[] = RAW_SLIDES.map((slide) => ({
  ...slide,
  palette: slideThemeMap[slide.theme].palette,
}));
