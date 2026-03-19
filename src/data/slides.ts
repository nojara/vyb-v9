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
  // ═══ S01 — HERO ═══
  {
    id: 'S01', section: 'Phygital music experiences', layout: 'heroCenter', theme: 'heroDark',
    headline: 'Vyb LIVE SESSIONS',
    subheadline: 'The sound of regional energy.',
    body: ['MOBILY × NOJARA STUDIOS × ELEVATE'],
    bgVideo: 'https://video.wixstatic.com/video/227dff_7f7c423a84884c0a867fc981370f9f93/720p/mp4/file.mp4',
    textBlocks: [
      { type: 'headline', content: 'Vyb LIVE SESSIONS', motion: 'heroLift' },
      { type: 'subheader', content: 'The sound of regional energy.', motion: 'blurResolve' },
      { type: 'caption', content: '↓ SCROLL TO EXPLORE', motion: 'spotlightFade' },
    ],
  },

  // ═══ S02 — WHAT IS Vyb? ═══
  {
    id: 'S02', section: 'Introduction (1/3)', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_1d33f15c8a944a9d8d7b1678fa0d43a2~mv2.png',
    headline: 'Vyb LIVE SESSIONS',
    body: [
      'Vyb is not a show about music. It is a show that makes music — in real time, with real people, in front of a camera.',
      'Two artists. Twenty fans. One secret venue. One night where a track that does not yet exist gets made, performed, and released to the world.',
      'Vyb is where Mobily stops carrying culture and starts creating it.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Introduction (1/3)', motion: 'spotlightFade' },
      { type: 'headline', content: 'Vyb LIVE SESSIONS', motion: 'maskReveal' },
      { type: 'body', content: 'Vyb is not a show about music. It is a show that makes music — in real time, with real people, in front of a camera.', motion: 'editorialSweep' },
      { type: 'body', content: 'Two artists. Twenty fans. One secret venue.', motion: 'paragraphUnfold' },
    ],
  },

  // ═══ S03 — THE SIMPLE IDEA ═══
  {
    id: 'S03', section: 'Introduction (2/3)', layout: 'manifesto', theme: 'darkEditorial',
    headline: 'NOT ANOTHER SPONSORSHIP',
    bgImage: 'https://static.wixstatic.com/media/227dff_f00889dcf0e1443185e8ba399fcc7d80~mv2.gif',
    body: [
      'Not another branded content burst. Not another logo on a concert banner.',
      'Vyb is a long-term music and IP platform built to move Mobily from a utility provider to a cultural force.',
      'Think of how Red Bull doesn\'t just sponsor extreme sports — it owns the space entirely.',
      'Vyb does the same for Arab music.',
      'Mobily becomes the platform that discovers artists, makes music with fans, and owns the content it creates. Every track. Every session. Every season.',
    ],
    textBlocks: [
      { type: 'headline', content: 'NOT ANOTHER SPONSORSHIP', motion: 'statementDrop' },
      { type: 'body', content: 'Not another branded content burst. Not another logo on a concert banner.', motion: 'editorialSweep' },
      { type: 'body', content: 'Vyb does the same for Arab music.', motion: 'paragraphUnfold' },
    ],
  },

  // ═══ S04 — WHAT ACTUALLY HAPPENS ═══
  {
    id: 'S04', section: 'Introduction (3/3)', layout: 'editorialLeft', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_9ce0fae6211841f99404991888b212aa~mv2.png',
    headline: 'WHAT IS Vyb LIVE SESSIONS?',
    body: [
      'A secret gig. Two artists from different sounds. Twenty of their biggest fans — ten per artist — selected from their real audiences online.',
      'Nobody knows exactly what\'s going to happen.',
      'The artists perform. Then they all move to a studio built inside the same venue. Together — artists and fans — they make a new track. In the room. Live.',
      'At the end of the episode, both artists return to the stage and perform the track they just created with those twenty people. For the first time. Ever.',
      'That\'s Vyb.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Introduction (3/3)', motion: 'spotlightFade' },
      { type: 'headline', content: 'WHAT IS Vyb LIVE SESSIONS?', motion: 'heroLift' },
      { type: 'body', content: 'A secret gig. Two artists from different sounds.', motion: 'cascadeUp' },
    ],
  },

  // ═══ S05 — THE FORMAT DIFFERENCE ═══
  {
    id: 'S05', section: 'The Format Difference', layout: 'cardGrid', theme: 'lime',
    bgImage: 'https://static.wixstatic.com/media/227dff_67840e3bd3034422baf0278d10610704~mv2.png',
    headline: 'THE FORMAT DIFFERENCE',
    pillars: [
      { title: 'More Intimate', text: 'Not a stadium show. Not a rehearsed studio session. A closed, real creative moment between artists and the twenty fans who love them most.' },
      { title: 'More Real', text: 'The track performed at the end of the episode did not exist when the night began. What you watch actually happened.' },
      { title: 'More Connected', text: 'The twenty fans are not the audience. They are co-creators. Their opinions, their energy, and their ideas are inside the music.' },
      { title: 'More Ownable', text: 'Every session produces a track that Mobily co-owns. Not a sponsorship fee. An IP asset that earns forever.' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Format Difference', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE FORMAT DIFFERENCE', motion: 'maskReveal' },
    ],
  },

  // ═══ S06 — THE BRAND CASE ═══
  {
    id: 'S06', section: 'Our Approach', layout: 'manifesto', theme: 'darkEditorial',
    headline: 'YOUTH CONTENT SHOULD FEEL CLOSE, NOT MANUFACTURED.',
    bgImage: 'https://static.wixstatic.com/media/227dff_7cc0ed1746294df4a9985b7fc3f03df6~mv2.gif',
    body: [
      'We do not build youth-facing content from a distance.',
      'We build content that feels culturally near, emotionally clear, and native to the audience it is speaking to.',
      'Vyb is not scripted entertainment. It is captured reality — and that is what travels on Snapchat, TikTok, and every platform that rewards authenticity over production polish.',
    ],
    textBlocks: [
      { type: 'headline', content: 'YOUTH CONTENT SHOULD FEEL CLOSE, NOT MANUFACTURED.', motion: 'statementDrop' },
      { type: 'body', content: 'We do not build youth-facing content from a distance.', motion: 'editorialSweep' },
      { type: 'body', content: 'Vyb is not scripted entertainment. It is captured reality.', motion: 'paragraphUnfold' },
    ],
  },

  // ═══ S07 — THE BUSINESS CASE ═══
  {
    id: 'S07', section: 'Brand Purpose', layout: 'editorialLeft', theme: 'heroDark',
    headline: 'THE CULTURAL APEX',
    subheadline: 'From infrastructure provider to cultural architect.',
    bgImage: 'https://static.wixstatic.com/media/227dff_f00889dcf0e1443185e8ba399fcc7d80~mv2.gif',
    body: [
      'Mobily\'s next decade cannot be built on network speed alone. It has to be built on emotional ownership.',
      'Saudi Arabia\'s entertainment economy has expanded rapidly since Vision 2030. The audience is here. The appetite is real. The cultural momentum is already moving.',
      'The question is not whether this platform will exist. It will. The question is whether Mobily builds it — or watches someone else do it first.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Brand Purpose', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE CULTURAL APEX', motion: 'heroLift' },
      { type: 'subheader', content: 'From infrastructure provider to cultural architect.', motion: 'diagIn' },
      { type: 'body', content: 'Mobily\'s next decade cannot be built on network speed alone.', motion: 'editorialSweep' },
    ],
  },

  // ═══ S08 — TWO FORCES ═══
  {
    id: 'S08', section: 'Brand Purpose (2/2)', layout: 'editorialSplit', theme: 'coral',
    bgImage: 'https://static.wixstatic.com/media/227dff_9e3a3910636d4b2885a15a4f9d75cffd~mv2.png',
    headline: 'TWO FORCES',
    pillars: [
      { title: 'The Empowerment Mandate', text: 'Vyb aligns Mobily directly with Saudi youth ambition — one of the defining forces behind the Kingdom\'s cultural transformation.' },
      { title: 'The Emotional Economy', text: 'When Mobily becomes part of the music a generation grows up with, it stops being a service. It becomes a memory.' },
    ],
    body: [
      'Saudi youth are not waiting for culture to arrive. They are already building it.',
      'Vyb is how Mobily enters that story in a meaningful, lasting way.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Brand Purpose (2/2)', motion: 'spotlightFade' },
      { type: 'headline', content: 'TWO FORCES', motion: 'maskReveal' },
    ],
  },

  // ═══ S09 — THE BUSINESS OF Vyb ═══
  {
    id: 'S09', section: 'Brand Objective (1/2)', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_5aa87a74e9734134a83f55cb45aaaedd~mv2.png',
    headline: 'THE BUSINESS OF Vyb',
    subheadline: 'Four levers. One compounding system.',
    body: [
      'This is not philanthropy. Every creative decision inside Vyb is tied to a business outcome.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Brand Objective (1/2)', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE BUSINESS OF Vyb', motion: 'heroLift' },
      { type: 'subheader', content: 'Four levers. One compounding system.', motion: 'blurResolve' },
    ],
  },

  // ═══ S10 — THE FOUR LEVERS ═══
  {
    id: 'S10', section: 'Brand Objective (2/2)', layout: 'cardGrid', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_37e27698acdf4f32b4a34235dcd0bdd7~mv2.png',
    headline: 'THE FOUR LEVERS',
    pillars: [
      { title: 'Retention & Loyalty', text: 'Exclusive content, live sessions, and zero-rated streaming strengthen subscriber stickiness.' },
      { title: 'Perception & Positioning', text: 'A generation that associates Mobily with emerging regional music does not compare it like a utility.' },
      { title: 'Platform & 5G Integration', text: 'Every stream, vote, session, and interaction becomes a behavioral entry point into Mobily\'s digital product ecosystem.' },
      { title: 'Ecosystem & IP Value', text: 'Media consumption creates royalties. Royalties support new production. The platform funds itself as it grows.' },
    ],
    body: [
      'Content drives attention. Attention drives usage. Usage strengthens the platform. And the platform keeps generating cultural and commercial value.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Brand Objective (2/2)', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE FOUR LEVERS', motion: 'maskReveal' },
    ],
  },

  // ═══ S11 — THE MARKET ═══
  {
    id: 'S11', section: 'Market Opportunity (1/2)', layout: 'metricsGrid', theme: 'analytics',
    headline: 'THE WINDOW IS OPEN',
    subheadline: 'Saudi Arabia is not becoming a music market. It already is one.',
    stats: [
      { value: '60%', label: 'of Saudi Arabia is under 30' },
      { value: '$4.96B', label: 'projected Saudi music streaming market by 2031 — ↑ 25.5% CAGR' },
      { value: '25.5%', label: 'CAGR — one of the fastest growth trajectories globally' },
      { value: '5–7%', label: 'current Saudi audience share for top regional artists — the home market is structurally underserved' },
    ],
    textBlocks: [
      { type: 'headline', content: 'THE WINDOW IS OPEN', motion: 'heroLift' },
      { type: 'subheader', content: 'Saudi Arabia is not becoming a music market. It already is one.', motion: 'blurResolve' },
    ],
  },

  // ═══ S12 — THE VOID ═══
  {
    id: 'S12', section: 'Market Opportunity (2/2)', layout: 'editorialLeft', theme: 'heroDark',
    headline: 'THE UNTAPPED VOID',
    subheadline: 'The space no one has claimed. Yet.',
    bgImage: 'https://static.wixstatic.com/media/227dff_f00889dcf0e1443185e8ba399fcc7d80~mv2.gif',
    body: [
      'No regional platform has built a credible, artist-first, production-led music content vertical at scale.',
      'Globally, formats like Tiny Desk, COLORS, and Boiler Room have already proven the model. The Middle East still lacks its own definitive equivalent.',
      'The window is open. But it will not stay open.',
      'Every month without Vyb is a month that makes it easier for Spotify, YouTube, or a global entertainment player to move first.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Market Opportunity (2/2)', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE UNTAPPED VOID', motion: 'maskReveal' },
      { type: 'subheader', content: 'The space no one has claimed. Yet.', motion: 'diagIn' },
      { type: 'body', content: 'No regional platform has built a credible, artist-first, production-led music content vertical at scale.', motion: 'editorialSweep' },
    ],
  },

  // ═══ S13 — THE EPISODE (CORE) ═══
  {
    id: 'S13', section: 'The Idea (1/3)', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_265294f1ab0d4ceb877bed522d0324c1~mv2.png',
    headline: 'ONE NIGHT. ONE TRACK. ONE EPISODE.',
    body: [
      'Here is what happens in every Vyb episode.',
      '➊ TWO ARTISTS are invited to a secret venue. They come from different sounds and styles. They do not know what they are about to make together.',
      '➋ TWENTY SUPERFANS arrive. Ten are from Artist A\'s audience. Ten are from Artist B\'s audience. They were selected because they are the most passionate, creative followers online.',
      '➌ BOTH ARTISTS PERFORM SOLO. Each one performs their own music on stage — for the twenty fans sitting in front of them. Close. No barrier. No crowd noise.',
      '➍ EVERYONE MOVES TO THE STUDIO. Artists and fans together. They sit in a co-creation studio space built inside the same venue. The fans give opinions. The artists try ideas. A producer guides the room. Together, they build one new track.',
      '➎ THE TRACK IS PERFORMED LIVE. Both artists return to the stage. They perform the track that was just made — for the twenty people who helped create it. First time. Only time. Unrepeatable.',
      '➏ THE EPISODE IS RELEASED. The full night is captured on camera. Edited into a 26-minute film. Distributed on Snapchat first, then everywhere else.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Idea (1/3)', motion: 'spotlightFade' },
      { type: 'headline', content: 'ONE NIGHT. ONE TRACK. ONE EPISODE.', motion: 'heroLift' },
      { type: 'body', content: 'Here is what happens in every Vyb episode.', motion: 'cascadeUp' },
    ],
  },

  // ═══ S14 — THE EPISODE STRUCTURE ═══
  {
    id: 'S14', section: 'The Idea (2/3) — Show Format', layout: 'timeline', theme: 'darkEditorial',
    headline: 'ENGINEERED FOR DEPTH',
    subheadline: '26 minutes. Five acts. One unrepeatable night.',
    timeline: [
      { time: '0:00 – 2:00', title: 'THE ARRIVAL', text: 'Cinematic cold open. The venue. The city. The artists arriving to a space where twenty fans are already waiting — not knowing what is about to be made.' },
      { time: '2:00 – 8:00', title: 'PERFORMANCE I — ARTIST A', text: 'Six minutes. Solo. Raw. Intimate. The twenty fans are not an audience. They are witnesses at close range.' },
      { time: '8:00 – 14:00', title: 'PERFORMANCE II — ARTIST B', text: 'Same format. Same energy. The room now holds both sonic worlds. The creative tension has already started.' },
      { time: '14:00 – 21:00', title: 'THE CO-CREATION SESSION', text: 'Both artists move to the studio space. Twenty fans move with them. Seven minutes of real-time music-making. Fan opinions shape the track direction.' },
      { time: '21:00 – 24:00', title: 'THE PREMIERE PERFORMANCE', text: 'Back on stage. The track that did not exist two hours ago is performed live, for the first time, for the people who helped build it.' },
      { time: '24:00 – 26:00', title: 'THE REVEAL', text: 'The fan whose creative contribution was most significant is named. They leave not as an audience member — but as the artist Mobily is investing in next.' },
    ],
    body: ['Total runtime: 26 minutes'],
    textBlocks: [
      { type: 'kicker', content: 'The Idea (2/3) — Show Format', motion: 'spotlightFade' },
      { type: 'headline', content: 'ENGINEERED FOR DEPTH', motion: 'heroLift' },
      { type: 'subheader', content: '26 minutes. Five acts. One unrepeatable night.', motion: 'blurResolve' },
    ],
  },

  // ═══ S15 — THE CO-CREATION SPACE ═══
  {
    id: 'S15', section: 'The Idea (3/3) — The Studio', layout: 'editorialSplit', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_9ce0fae6211841f99404991888b212aa~mv2.png',
    headline: 'PHYGITAL REIMAGINED',
    subheadline: 'Where the music gets made.',
    pillars: [
      { title: 'The Stage', text: 'Where artists perform solo. Intimate. Cinematic. No crowd noise. Just the artist and twenty people who know every lyric.' },
      { title: 'The Studio', text: 'Where music gets made together. A purpose-built co-creation space inside the same venue. Studio equipment. Real microphones. A working producer. The twenty fans are in the room.' },
    ],
    body: [
      'The physical venue at KAFD Riyadh functions simultaneously as a performance space, a broadcast hub, and a content factory.',
      'What happens here is the episode. What comes out of here is the music. What Mobily owns from here is everything.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Idea (3/3) — The Studio', motion: 'spotlightFade' },
      { type: 'headline', content: 'PHYGITAL REIMAGINED', motion: 'maskReveal' },
      { type: 'subheader', content: 'Where the music gets made.', motion: 'blurResolve' },
    ],
  },

  // ═══ S16 — THE HOST ═══
  {
    id: 'S16', section: 'The Host (1/2)', layout: 'portraitSplit', theme: 'heroDark',
    headline: 'AL TEMSAH',
    subheadline: 'بنفسه',
    body: [
      'Al Temsah is not a celebrity attachment. He is a format stabilizer — and Mobily is making his comeback possible.',
      'His role inside Vyb is specific. He is in the co-creation room. He reads the energy between artists and fans. He keeps the session honest. He ensures something real gets made.',
      'His comeback, powered by Mobily, is itself the first Vyb story the world will follow.',
    ],
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_mLlnH3iqTmQjUKtDEh3EndCV3dgC4o-sJxiTbT71rfOfU=s800-c-k-c0x00ffffff-no-rj',
    media: [{ type: 'square', videoSrc: 'https://www.youtube.com/watch?v=d93ksd8hG_0', startTime: 0 }],
    textBlocks: [
      { type: 'kicker', content: 'The Host (1/2)', motion: 'spotlightFade' },
      { type: 'headline', content: 'AL TEMSAH', motion: 'heroLift' },
      { type: 'subheader', content: 'بنفسه', motion: 'blurResolve' },
    ],
  },

  // ═══ S17 — HOST VALUE ═══
  {
    id: 'S17', section: 'The Host (2/2)', layout: 'cardGrid', theme: 'teal',
    headline: 'AL TEMSAH VALUE',
    media: [{ type: 'square', videoSrc: 'https://www.youtube.com/watch?v=scgLuWbr7rw', startTime: 5, endTime: 10 }],
    pillars: [
      { title: 'Institutional Credibility', text: 'His presence signals the platform is serious. Mobily\'s backing amplifies that signal.' },
      { title: 'Cultural Range', text: 'He can hold a conversation that makes sense to both a Tier 1 regional artist and a 19-year-old discovering music online.' },
      { title: 'Distribution Value', text: 'His social behavior already travels. Audiences share his clips across platforms. Everything he touches on Snapchat spreads.' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Host (2/2)', motion: 'spotlightFade' },
      { type: 'headline', content: 'AL TEMSAH VALUE', motion: 'maskReveal' },
    ],
  },

  // ═══ S18 — BUILT FOR SNAPCHAT ═══
  {
    id: 'S18', section: 'Distribution (1/2)', layout: 'editorialLeft', theme: 'cyan',
    bgImage: 'https://static.wixstatic.com/media/227dff_0f003effe5f140e9886753aabc8d4859~mv2.png',
    headline: 'BUILT FOR SNAPCHAT. EXTENDED EVERYWHERE ELSE.',
    body: [
      'Snapchat is the primary platform for Vyb.',
      'It is where youth already are. It is fast, visual, and daily. It turns content into habit.',
      'The secret-gig format was made for Snapchat. Nobody in that room knew what was going to happen. The audience watching at home doesn\'t either. That energy travels.',
      'Full episodes → hero content on YouTube + Mobily. Co-creation moments → the most shared clips. Performance clips → daily Snapchat stories. Behind-the-scenes → ongoing fan connection. Winner reveal → a cultural moment.',
      'Other platforms support. Snapchat leads.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Distribution (1/2)', motion: 'spotlightFade' },
      { type: 'headline', content: 'BUILT FOR SNAPCHAT. EXTENDED EVERYWHERE ELSE.', motion: 'heroLift' },
      { type: 'body', content: 'Snapchat is the primary platform for Vyb.', motion: 'cascadeUp' },
    ],
  },

  // ═══ S19 — ONE EPISODE OUTPUT ═══
  {
    id: 'S19', section: 'Distribution (2/2)', layout: 'metricsGrid', theme: 'analytics',
    bgImage: 'https://static.wixstatic.com/media/227dff_2c54b8b40c4c40a7b112871a3119f28f~mv2.png',
    headline: 'ONE EPISODE CREATES MANY PIECES.',
    subheadline: 'We don\'t create once. We create continuously.',
    stats: [
      { value: '5', label: 'Video assets — 1 full episode + 2 solo captures + 1 co-creation + 1 premiere film' },
      { value: '3', label: 'Audio tracks — Artist A solo + Artist B solo + collaboration track' },
      { value: '4', label: 'Social assets — short clips optimized for Snapchat, TikTok, Reels' },
      { value: '12', label: 'Total per episode — assets + audio tracks' },
    ],
    textBlocks: [
      { type: 'headline', content: 'ONE EPISODE CREATES MANY PIECES.', motion: 'heroLift' },
      { type: 'subheader', content: "We don't create once. We create continuously.", motion: 'diagIn' },
    ],
  },

  // ═══ S20 — THE SEASON TOTAL ═══
  {
    id: 'S20', section: 'The Content Engine', layout: 'metricsGrid', theme: 'lime',
    bgImage: 'https://static.wixstatic.com/media/227dff_5aa87a74e9734134a83f55cb45aaaedd~mv2.png',
    headline: 'THIS IS NOT ONE SHOW. IT\'S A SYSTEM.',
    subheadline: '10 episodes. Constant output. All year.',
    stats: [
      { value: '10', label: 'Full episodes' },
      { value: '33', label: 'Audio tracks (30 from episodes + 3 from winner EP)' },
      { value: '41', label: 'Video assets (20 solo + 10 collab + 10 premiere + 1 winner MV)' },
      { value: '110+', label: 'Total content pieces across the season' },
    ],
    textBlocks: [
      { type: 'headline', content: "THIS IS NOT ONE SHOW. IT'S A SYSTEM.", motion: 'statementDrop' },
      { type: 'subheader', content: '10 episodes. Constant output. All year.', motion: 'editorialSweep' },
    ],
  },

  // ═══ S21 — THE WINNER ═══
  {
    id: 'S21', section: 'Winner Concept (1/3)', layout: 'manifesto', theme: 'heroDark',
    bgImage: 'https://static.wixstatic.com/media/227dff_7cc0ed1746294df4a9985b7fc3f03df6~mv2.gif',
    headline: 'WE DON\'T JUST SHOW TALENT. WE DISCOVER IT IN THE ROOM.',
    body: [
      'The twenty fans invited to each Vyb episode are not random.',
      'They are the most creatively engaged followers of each artist — selected based on their content, their platform behaviour, and their music passion.',
      'In the co-creation session, they do not sit and watch. They give ideas. They suggest lyrics. They react to what works and what doesn\'t. Their opinions are inside the final track.',
      'From every episode, we capture who contributed most. Across the full season — 200 fans across 10 episodes — one person stands out.',
      'That person does not leave as a fan. They leave as the artist Mobily is building next.',
    ],
    textBlocks: [
      { type: 'headline', content: "WE DON'T JUST SHOW TALENT. WE DISCOVER IT IN THE ROOM.", motion: 'statementDrop' },
      { type: 'body', content: 'The twenty fans invited to each Vyb episode are not random.', motion: 'blurResolve' },
    ],
  },

  // ═══ S22 — HOW WE FIND THE WINNER ═══
  {
    id: 'S22', section: 'Winner Concept (2/3)', layout: 'cardGrid', theme: 'coral',
    bgImage: 'https://static.wixstatic.com/media/227dff_9e3a3910636d4b2885a15a4f9d75cffd~mv2.png',
    headline: 'THE AUDIENCE HELPS CHOOSE.',
    subheadline: 'Clear selection funnel.',
    pillars: [
      { title: '200', text: 'Fans attend across 10 episodes' },
      { title: '20', text: 'Shortlisted after session contribution review' },
      { title: '5', text: 'Publicly featured in content' },
      { title: '1', text: 'Confirmed season winner' },
    ],
    body: [
      'Artists submit their top fans from Snapchat, TikTok, and Instagram. We look at: views, shares, creative engagement, and music content. 10 per artist. 20 per episode. Selected, not random.',
      'Creative contribution in the co-creation session is the primary signal. Artist and producer assessment from inside the room. Final selection confirmed by the production team.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Winner Concept (2/3)', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE AUDIENCE HELPS CHOOSE.', motion: 'maskReveal' },
    ],
  },

  // ═══ S23 — WHAT THE WINNER GETS ═══
  {
    id: 'S23', section: 'Winner Concept (3/3)', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_265294f1ab0d4ceb877bed522d0324c1~mv2.png',
    headline: 'A REAL OPPORTUNITY. NOT JUST EXPOSURE.',
    body: [
      'Mobily funds and produces a complete artist launch package.',
      'THE EP — 3 original tracks. Recorded professionally in a real studio. 3–5 days of production sessions. 2–3 top-tier producers involved. Studio-grade mastering for DSP release.',
      'THE MUSIC VIDEO — 1 cinematic film. Full production. Shot in 1–2 days. Optimized for YouTube and Snapchat. Released as the official winner announcement film.',
      'THE LAUNCH PACKAGE — 20 assets: 1 winner reveal film, 1 official music video, 3 teaser clips, 5 BTS behind-the-scenes videos, 10 short vertical clips for Snapchat and social.',
      'THE DISTRIBUTION — Spotify, Anghami, Apple Music, YouTube. Exclusive first window on Mobily\'s platform. Heavy Snapchat presence throughout launch.',
      'The winner is not promoted. They are built.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Winner Concept (3/3)', motion: 'spotlightFade' },
      { type: 'headline', content: 'A REAL OPPORTUNITY. NOT JUST EXPOSURE.', motion: 'heroLift' },
      { type: 'body', content: 'Mobily funds and produces a complete artist launch package.', motion: 'cascadeUp' },
    ],
  },

  // ═══ S24 — WHERE THE MUSIC GOES ═══
  {
    id: 'S24', section: 'Distribution (Audio)', layout: 'cardGrid', theme: 'darkEditorial',
    bgImage: 'https://static.wixstatic.com/media/227dff_1d33f15c8a944a9d8d7b1678fa0d43a2~mv2.png',
    headline: 'DISTRIBUTION EVERYWHERE.',
    pillars: [
      { title: 'Snapchat', text: 'Primary discovery and daily content platform' },
      { title: 'Spotify', text: 'Global streaming' },
      { title: 'Anghami', text: 'Regional streaming' },
      { title: 'Apple Music', text: 'Premium streaming' },
    ],
    body: [
      'All 33 season tracks are released across all platforms. Mobily holds co-ownership on every audio master. Every stream is a royalty. Every royalty supports the next season.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Distribution (Audio)', motion: 'spotlightFade' },
      { type: 'headline', content: 'DISTRIBUTION EVERYWHERE.', motion: 'maskReveal' },
    ],
  },

  // ═══ S25 — THE LOOP ═══
  {
    id: 'S25', section: 'The Loop', layout: 'manifesto', theme: 'heroDark',
    bgVideo: 'https://video.wixstatic.com/video/227dff_7f7c423a84884c0a867fc981370f9f93/720p/mp4/file.mp4',
    headline: 'A LOOP, NOT A CAMPAIGN.',
    body: [
      'Episode drops on Snapchat. Fans watch and want to be in the next one. They submit content to become selected fans. That content signals who the next participants are.',
      'The next episode is made with better, more committed fans. Better music gets created. Better music drives more streams. More streams fund the next season.',
      'Season 2 launches with a larger, warmer audience than Season 1 ever had. Then it repeats.',
      'Content brings people. People create value. Value grows the platform. The platform never stops.',
    ],
    textBlocks: [
      { type: 'headline', content: 'A LOOP, NOT A CAMPAIGN.', motion: 'statementDrop' },
      { type: 'body', content: 'Episode drops on Snapchat. Fans watch and want to be in the next one.', motion: 'editorialSweep' },
      { type: 'body', content: 'The platform never stops.', motion: 'paragraphUnfold' },
    ],
  },

  // ═══ S26 — MOBILY INTEGRATION ═══
  {
    id: 'S26', section: 'Built Into Mobily', layout: 'cardGrid', theme: 'analytics',
    bgImage: 'https://static.wixstatic.com/media/227dff_9de2bdedd40e46e99c87ab46bff5f421~mv2.png',
    headline: 'BUILT INTO MOBILY.',
    pillars: [
      { title: 'Watch', text: 'Stream full episodes and live session content' },
      { title: 'Vote', text: 'Help select the season winner from session footage' },
      { title: 'Stream', text: 'Access all 33 tracks through the Mobily music ecosystem' },
      { title: 'Exclusives', text: 'Subscriber-only early access to episodes and winner reveal' },
    ],
    body: [
      'The co-creation format gives Mobily something no other telecom has: a platform where its users are not spectators. They are participants in the cultural process.',
      'Watch. Vote. Stream. Share. Repeat.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Built Into Mobily', motion: 'spotlightFade' },
      { type: 'headline', content: 'BUILT INTO MOBILY.', motion: 'maskReveal' },
    ],
  },

  // ═══ S27 — MEDIA PARTNER ═══
  {
    id: 'S27', section: 'Media Partner', layout: 'editorialLeft', theme: 'yellow',
    headline: 'BILLBOARD ARABIA',
    subheadline: 'Chart authority aligned with regional cultural legitimacy.',
    media: [{ type: 'vertical', videoSrc: 'https://video.wixstatic.com/video/227dff_e9c487c7d0964487a941066f2d479676/720p/mp4/file.mp4' }],
    body: [
      'Billboard Arabia as official media partner adds more than visibility. It adds signal value.',
      'When an artist moves through Vyb and is covered by Billboard Arabia, the platform stops reading like an experiment and starts reading like an institution.',
      'This is not logo placement. It is cultural validation with global chart-language relevance.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Media Partner', motion: 'spotlightFade' },
      { type: 'headline', content: 'BILLBOARD ARABIA', motion: 'heroLift' },
      { type: 'subheader', content: 'Chart authority aligned with regional cultural legitimacy.', motion: 'diagIn' },
    ],
  },

  // ═══ S28 — THE ARTIST ROSTER ═══
  {
    id: 'S28', section: 'The Ecosystem (1/3)', layout: 'artistGrid' as LayoutKey, theme: 'darkEditorial' as ThemeKey,
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
      { type: 'kicker', content: 'The Ecosystem (1/3)', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE ARTIST ROSTER', motion: 'maskReveal' },
      { type: 'subheader', content: '18 voices shaping the sound of a generation.', motion: 'blurResolve' },
    ],
  },

  // ═══ S28b — PLATFORM PRESENCE STATS ═══
  {
    id: 'S28b', section: 'The Ecosystem (1/3)', layout: 'artistStats' as LayoutKey, theme: 'analytics' as ThemeKey,
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

  // ═══ S29 — TIER 1 ICONS ═══
  {
    id: 'S29', section: 'The Ecosystem (2/3)', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_265294f1ab0d4ceb877bed522d0324c1~mv2.png',
    headline: 'TIER 1 ICONS',
    subheadline: 'Immediate gravity. Immediate reach. Immediate asset value.',
    body: [
      'Tier 1 artists give Vyb instant scale. Their role is to establish platform legitimacy, generate immediate attention, seed the first wave of catalog value, and create cross-border cultural reach from day one.',
      'The platform is not simply buying visibility. It is building an asset base with recognized artists at the top of the system.',
      'Each Tier 1 artist brings an established fanbase to the superfan selection pool — meaning the twenty fans per episode are already activated, passionate audiences who care deeply about the music being made.',
      'Featured: ALYOUNG / KHALZ / ASAYEL / S6ONER / LELE CRI',
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Ecosystem (2/3)', motion: 'spotlightFade' },
      { type: 'headline', content: 'TIER 1 ICONS', motion: 'maskReveal' },
      { type: 'subheader', content: 'Immediate gravity. Immediate reach. Immediate asset value.', motion: 'blurResolve' },
    ],
  },

  // ═══ S30 — TIER 2 PIONEERS ═══
  {
    id: 'S30', section: 'The Ecosystem (3/3)', layout: 'editorialSplit', theme: 'darkEditorial',
    headline: 'TIER 2 PIONEERS',
    subheadline: 'Street credibility. Engineered cultural moments.',
    pillars: [
      { title: 'Subcultural Legitimacy', text: 'Names tastemakers follow before the broader market catches up.' },
      { title: 'Future Upside', text: 'Discovery value and credibility with younger audiences.' },
    ],
    body: [
      'Tier 1 gives Vyb scale. Tier 2 gives it spine.',
      'That combination is what makes the ecosystem feel real rather than assembled.',
      'Featured: NIFO / BLVXB / JARA / دحمز / الشيخ / THE DO / KAY\'O / MOHAMAD MEM / لورد عمر / حيدر منديلا / TAGEEL / ALI / SEECOO',
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Ecosystem (3/3)', motion: 'spotlightFade' },
      { type: 'headline', content: 'TIER 2 PIONEERS', motion: 'maskReveal' },
    ],
  },

  // ═══ S31 — FULL DELIVERABLES TABLE ═══
  {
    id: 'S31', section: 'Content Pillars — Asset Matrix', layout: 'table', theme: 'darkEditorial',
    headline: 'CONTENT PILLARS',
    subheadline: 'The media stack in one view.',
    body: [
      'The value of Season 1 is not only what it does in the launch window. It is the library it leaves behind.',
    ],
    tableData: {
      headers: ['Asset Pillar', 'Qty', 'Derivation & Role'],
      rows: [
        ['Flagship Episodes', '10', '10 × 1 | 26-min anchor content'],
        ['Artist Solo Tracks', '20', '10 ep × 2 artists | DSP catalogue'],
        ['Collaboration Tracks', '10', '10 ep × 1 | Co-created, co-owned IP'],
        ['Winner EP Tracks', '3', '1 winner × 3 | Artist development'],
        ['TOTAL AUDIO', '33', '20 + 10 + 3'],
        ['Solo Performance Films', '20', '10 ep × 2 | Visual catalogue'],
        ['Collaboration Films', '10', '10 ep × 1 | Most shareable format'],
        ['Premiere Performance Films', '10', '10 ep × 1 | Cultural record'],
        ['Winner Music Video', '1', '1 × 1 | Hero winner asset'],
        ['TOTAL VIDEO', '41', '20 + 10 + 10 + 1'],
        ['Short Clips (Snapchat)', '40', '10 ep × 4 | Daily social distribution'],
        ['Winner Package Assets', '20', 'MV + reveal + BTS + teasers + verticals'],
        ['TOTAL SHORT CONTENT', '60', '40 + 20'],
        ['SEASON TOTAL', '110+', 'Full season content system'],
      ],
    },
    textBlocks: [
      { type: 'headline', content: 'CONTENT PILLARS', motion: 'maskReveal' },
      { type: 'subheader', content: 'The media stack in one view.', motion: 'blurResolve' },
    ],
  },

  // ═══ S32 — EL BATRON ═══
  {
    id: 'S32', section: 'Cultural Guardianship (1/2)', layout: 'editorialLeft', theme: 'teal',
    headline: 'EL BATRON',
    subheadline: 'The cultural infrastructure behind Vyb.',
    media: [{ type: 'vertical', videoSrc: 'https://video.wixstatic.com/video/227dff_3bf9e45aa372453e82efbba8f008bcb7/720p/mp4/file.mp4' }],
    body: [
      'Founded by Tarek Nojara in 2019, El Batron is not background support. It is the operational spine of the artist ecosystem.',
      'Its value is practical: artist trust, A&R intelligence, subcultural fluency, mentorship, development structure, and credibility with the underground and emerging scene.',
      'El Batron is the reason the right 18 artists are in the room. And the reason those artists trust the format enough to create something real inside it.',
      'El Batron\'s relationship with the regional music underground was not bought. It was built over five years. That is Vyb\'s unfair advantage on day one.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Cultural Guardianship (1/2)', motion: 'spotlightFade' },
      { type: 'headline', content: 'EL BATRON', motion: 'heroLift' },
      { type: 'subheader', content: 'The cultural infrastructure behind Vyb.', motion: 'diagIn' },
    ],
  },

  // ═══ S33 — HIGH-PRODUCTION VISIONS ═══
  {
    id: 'S33', section: 'Cultural Guardianship (2/2)', layout: 'editorialSplit', theme: 'coral',
    headline: 'HIGH-PRODUCTION VISIONS',
    subheadline: 'Artist-first. Production-serious. Culturally exact.',
    pillars: [
      { title: 'The Engine', text: 'El Batron\'s model is built around long-term artist and IP value, not short release cycles.' },
      { title: 'The Vision', text: 'Bring authentic Middle Eastern sound and culture to a wider stage.' },
    ],
    bgImage: 'https://static.wixstatic.com/media/227dff_c6707a4cc79147a6886b042b59c01c17~mv2.gif',
    media: [{ type: 'square', videoSrc: 'https://video.wixstatic.com/video/227dff_bc15c39ed67f4e988bac494e452ac0a8/720p/mp4/file.mp4' }],
    body: ['Vyb is the vehicle. El Batron is the engine.'],
    textBlocks: [
      { type: 'kicker', content: 'Cultural Guardianship (2/2)', motion: 'spotlightFade' },
      { type: 'headline', content: 'HIGH-PRODUCTION VISIONS', motion: 'maskReveal' },
    ],
  },

  // ═══ S34 — CLOSING HERO ═══
  {
    id: 'S34', section: 'Conclusion', layout: 'closing', theme: 'heroDark',
    headline: 'Vyb LIVE SESSIONS',
    bgVideo: 'https://video.wixstatic.com/video/227dff_c261b2ce87fd489e9dc47a2e67dbe3f4/1080p/mp4/file.mp4',
    subheadline: 'The sound of regional energy.',
    body: [
      'Mobily × Nojara Studios × Elevate',
      'The cultural platform Saudi Arabia has been waiting for.',
    ],
    textBlocks: [
      { type: 'headline', content: 'Vyb LIVE SESSIONS', motion: 'heroLift' },
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
