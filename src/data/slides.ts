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
  // ═══ S01 — OPENING ═══
  {
    id: 'S01', section: 'Opening', layout: 'heroCenter', theme: 'heroDark',
    headline: 'Mobily Vyb',
    subheadline: 'Inspiring everyday moments of delight through music.',
    body: ['2 artists. 20 super fans. 1 new track.'],
    bgVideo: 'https://video.wixstatic.com/video/227dff_7f7c423a84884c0a867fc981370f9f93/720p/mp4/file.mp4',
    textBlocks: [
      { type: 'headline', content: 'Mobily Vyb', motion: 'heroLift' },
      { type: 'subheader', content: 'Inspiring everyday moments of delight through music.', motion: 'blurResolve' },
      { type: 'caption', content: '↓ SCROLL TO EXPLORE', motion: 'spotlightFade' },
    ],
  },

  // ═══ S02 — OPENING DETAIL ═══
  {
    id: 'S02', section: 'Opening', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_1d33f15c8a944a9d8d7b1678fa0d43a2~mv2.png',
    headline: 'Mobily Vyb',
    body: [
      'A Mobily music format where artists and fans create a song together, live.',
      'Each episode is built as a moment of delight: unexpected, social, emotional, and made to spread.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Opening', motion: 'spotlightFade' },
      { type: 'headline', content: 'Mobily Vyb', motion: 'maskReveal' },
      { type: 'body', content: 'A Mobily music format where artists and fans create a song together, live.', motion: 'editorialSweep' },
    ],
  },

  // ═══ S03 — WHY THIS MATTERS ═══
  {
    id: 'S03', section: 'Why This Matters', layout: 'manifesto', theme: 'darkEditorial',
    headline: 'WHY THIS MATTERS',
    bgImage: 'https://static.wixstatic.com/media/227dff_f00889dcf0e1443185e8ba399fcc7d80~mv2.gif',
    body: [
      'Young audiences no longer want to stand outside culture and watch it happen.',
      'They want: access, participation, proximity, a role in the story.',
      'At the same time, brands are fighting for relevance in a space that moves fast and forgets faster.',
      'Mobily can answer both problems with one move: not by sponsoring music culture from a distance, but by building a format that creates it.',
    ],
    textBlocks: [
      { type: 'headline', content: 'WHY THIS MATTERS', motion: 'statementDrop' },
      { type: 'body', content: 'Young audiences no longer want to stand outside culture and watch it happen.', motion: 'editorialSweep' },
    ],
  },

  // ═══ S04 — BRAND PURPOSE ═══
  {
    id: 'S04', section: 'Brand Purpose', layout: 'editorialLeft', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_9ce0fae6211841f99404991888b212aa~mv2.png',
    headline: 'INSPIRING EVERYDAY MOMENTS OF DELIGHT',
    subheadline: 'Mobily\'s brand purpose turned into experience.',
    body: [
      'Music is one of the clearest ways to deliver that promise. It lives in daily routines, friendships, fandom, identity, and self-expression.',
      'Mobily Vyb turns that purpose into a branded entertainment experience.',
      'Each episode becomes a designed moment of delight: a new encounter, a live collaboration, a fresh track, and a story people want to share.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Brand Purpose', motion: 'spotlightFade' },
      { type: 'headline', content: 'INSPIRING EVERYDAY MOMENTS OF DELIGHT', motion: 'heroLift' },
      { type: 'body', content: 'Music is one of the clearest ways to deliver that promise.', motion: 'cascadeUp' },
    ],
  },

  // ═══ S05 — COMMUNICATION OBJECTIVE ═══
  {
    id: 'S05', section: 'Communication Objective', layout: 'cardGrid', theme: 'lime',
    bgImage: 'https://static.wixstatic.com/media/227dff_67840e3bd3034422baf0278d10610704~mv2.png',
    headline: 'WHAT THIS PROJECT MUST ACHIEVE',
    subheadline: 'Strengthening Mobily\'s brand equity.',
    pillars: [
      { title: 'Youth Culture', text: 'Showing that Mobily genuinely understands youth culture and entertainment.' },
      { title: 'Music & Talent', text: 'Demonstrating deep understanding of music and emerging talent.' },
      { title: 'Present, Not Late', text: 'Mobily is not trying to join the scene late. Mobily understands where the scene is going.' },
      { title: 'Next Generation', text: 'Mobily becomes a brand that feels present in the passions, habits, and creative energy of the next generation.' },
    ],
    textBlocks: [
      { type: 'kicker', content: 'Communication Objective', motion: 'spotlightFade' },
      { type: 'headline', content: 'WHAT THIS PROJECT MUST ACHIEVE', motion: 'maskReveal' },
    ],
  },

  // ═══ S06 — TARGET AUDIENCE ═══
  {
    id: 'S06', section: 'Target Audience', layout: 'editorialSplit', theme: 'coral',
    bgImage: 'https://static.wixstatic.com/media/227dff_9e3a3910636d4b2885a15a4f9d75cffd~mv2.png',
    headline: 'TARGET AUDIENCE',
    pillars: [
      { title: 'Primary', text: 'Young people aged 16–30 deeply engaged with music, artists, social platforms, fashion, and entertainment culture.' },
      { title: 'Secondary', text: 'Mobily subscribers, fans of featured artists, aspiring singers, writers, rappers, creators, and wider lifestyle audiences.' },
    ],
    body: [
      'The most committed fans are often more than fans. Many of them are future creators in disguise.',
      'They do not just want to follow culture. They want a way into it.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Target Audience', motion: 'spotlightFade' },
      { type: 'headline', content: 'TARGET AUDIENCE', motion: 'maskReveal' },
    ],
  },

  // ═══ S07 — THE BIG IDEA ═══
  {
    id: 'S07', section: 'The Big Idea', layout: 'manifesto', theme: 'heroDark',
    bgImage: 'https://static.wixstatic.com/media/227dff_7cc0ed1746294df4a9985b7fc3f03df6~mv2.gif',
    headline: 'A MUSIC STUDIO WHERE ARTISTS AND FANS BUILD A SONG TOGETHER',
    body: [
      'Mobily creates a music studio format that brings together: 2 artists from different genres or worlds, 20 carefully selected super fans, 1 live co-creation process, 1 brand-new song.',
      'Inside the studio, fans are not treated as background. They become part of the making. They react, suggest, challenge, shape, and contribute to the creative journey.',
      'The episode ends with the first live performance of the new track.',
      'This is not a filmed rehearsal. This is not a backstage interview. This is a real act of creation.',
    ],
    textBlocks: [
      { type: 'headline', content: 'A MUSIC STUDIO WHERE ARTISTS AND FANS BUILD A SONG TOGETHER', motion: 'statementDrop' },
      { type: 'body', content: 'Mobily creates a music studio format.', motion: 'blurResolve' },
    ],
  },

  // ═══ S08 — THE EPISODE FORMULA ═══
  {
    id: 'S08', section: 'Episode Formula', layout: 'timeline', theme: 'darkEditorial',
    headline: 'THE EPISODE FORMULA',
    subheadline: 'Every episode follows one simple structure.',
    timeline: [
      { time: '01', title: 'TWO ARTISTS ARRIVE', text: 'From different musical worlds.' },
      { time: '02', title: 'KNOWN TRACKS', text: 'Each performs one known track.' },
      { time: '03', title: 'SUPER FANS JOIN', text: 'Ten super fans from each artist join the experience.' },
      { time: '04', title: 'INTO THE STUDIO', text: 'Everyone moves into the studio space.' },
      { time: '05', title: 'CO-CREATE', text: 'Together, they shape one brand-new song.' },
      { time: '06', title: 'FIRST PERFORMANCE', text: 'The episode closes with its first-ever live performance.' },
    ],
    body: [
      'Core formula: 2 artists, 20 super fans, 1 secret studio, 1 new song, 1 final live performance.',
      'It is simple enough to understand immediately, and rich enough to generate strong content at every stage.',
    ],
    textBlocks: [
      { type: 'headline', content: 'THE EPISODE FORMULA', motion: 'heroLift' },
      { type: 'subheader', content: 'Every episode follows one simple structure.', motion: 'blurResolve' },
    ],
  },

  // ═══ S09 — WHY THE FORMAT WORKS ═══
  {
    id: 'S09', section: 'Why It Works', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_5aa87a74e9734134a83f55cb45aaaedd~mv2.png',
    headline: 'WHY THE FORMAT WORKS',
    body: [
      'Most branded music content is passive. An artist performs. A camera records it. The audience scrolls past it.',
      'Vyb works because it changes the role of the audience. Fans do not sit outside the experience. They affect it.',
      'They influence: lyrics, beat direction, mood, hooks, pace, energy.',
      'That shift creates something more valuable than content alone. It creates emotional ownership. People care more when they help shape the outcome.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Why It Works', motion: 'spotlightFade' },
      { type: 'headline', content: 'WHY THE FORMAT WORKS', motion: 'heroLift' },
      { type: 'body', content: 'Most branded music content is passive.', motion: 'cascadeUp' },
    ],
  },

  // ═══ S10 — THE SECRET SESSION ═══
  {
    id: 'S10', section: 'The Secret Session', layout: 'editorialLeft', theme: 'heroDark',
    bgImage: 'https://static.wixstatic.com/media/227dff_f00889dcf0e1443185e8ba399fcc7d80~mv2.gif',
    headline: 'THE SECRET SESSION',
    body: [
      'Every episode takes place inside a secret Mobily studio environment. The location is private. Access is limited. The experience is earned.',
      'That gives the format stronger tension: anticipation before the event, exclusivity during the event, curiosity after the event.',
      'The feeling is part listening session, part backstage pass, part creative lab.',
      'It gives Mobily a premium entertainment language without losing youth energy.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Secret Session', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE SECRET SESSION', motion: 'maskReveal' },
    ],
  },

  // ═══ S11 — HOST OPTION 01: TEMSAH ═══
  {
    id: 'S11', section: 'Host Option 01', layout: 'portraitSplit', theme: 'teal',
    headline: 'TEMSAH',
    subheadline: 'The satirist.',
    image: 'https://yt3.googleusercontent.com/ytc/AIdro_mLlnH3iqTmQjUKtDEh3EndCV3dgC4o-sJxiTbT71rfOfU=s800-c-k-c0x00ffffff-no-rj',
    body: [
      'Temsah brings a sharp comic voice that already belongs to the region\'s internet culture. He is valuable because he can turn observation into humor without making the format feel superficial.',
      'What he brings: immediate cultural recognition, strong YouTube-era credibility, a sharp social-first tone, humor that makes the format feel current.',
      'His role in Vyb: Temsah can open the world of the show, guide viewers into the format, and make the audience feel that the experience belongs to their generation. He gives Vyb a host with rhythm, wit, and recall.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Host Option 01', motion: 'spotlightFade' },
      { type: 'headline', content: 'TEMSAH', motion: 'heroLift' },
      { type: 'subheader', content: 'The satirist.', motion: 'blurResolve' },
    ],
  },

  // ═══ S12 — HOST OPTION 02: ABU HAMDAN ═══
  {
    id: 'S12', section: 'Host Option 02', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_265294f1ab0d4ceb877bed522d0324c1~mv2.png',
    headline: 'ABU HAMDAN',
    subheadline: 'The producer.',
    body: [
      'Abu Hamdan brings authority. He understands artists, music-making, and how to move between credibility and accessibility.',
      'What he brings: strong music production credibility, trust with artists, weight inside the industry, the ability to guide the session with substance.',
      'His role in Vyb: Abu Hamdan makes the format feel serious where it should feel serious. He can help lead the creative process, frame the collaboration, and connect major artists with younger, digital-native audiences in a believable way. He gives Vyb gravitas.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Host Option 02', motion: 'spotlightFade' },
      { type: 'headline', content: 'ABU HAMDAN', motion: 'heroLift' },
      { type: 'subheader', content: 'The producer.', motion: 'diagIn' },
    ],
  },

  // ═══ S13 — HOST OPTION 03: MOAYAD ═══
  {
    id: 'S13', section: 'Host Option 03', layout: 'editorialLeft', theme: 'cyan',
    headline: 'MOAYAD',
    subheadline: 'The creator.',
    body: [
      'Moayad feels native to the speed and tone of social culture. He brings conversational energy and the feeling of being inside the group chat, not outside it.',
      'What he brings: digital-native fluency, strong social presence, quick banter, a lighter more reactive screen energy.',
      'His role in Vyb: Moayad can translate the format for a younger audience in a way that feels natural, informal, and highly shareable. He makes the show easier to enter, easier to clip, and easier to circulate. He gives Vyb momentum.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Host Option 03', motion: 'spotlightFade' },
      { type: 'headline', content: 'MOAYAD', motion: 'heroLift' },
      { type: 'subheader', content: 'The creator.', motion: 'blurResolve' },
    ],
  },

  // ═══ S14 — FASHION INTEGRATION ═══
  {
    id: 'S14', section: 'Fashion Integration', layout: 'editorialSplit', theme: 'coral',
    bgImage: 'https://static.wixstatic.com/media/227dff_9e3a3910636d4b2885a15a4f9d75cffd~mv2.png',
    headline: 'FASHION INTEGRATION',
    subheadline: 'Music is the entry point. Style is the amplifying layer.',
    pillars: [
      { title: 'Visual Identity', text: 'Artist styling, fashion details, wardrobe partnerships, and visual contrast between featured artists.' },
      { title: 'Culture Property', text: 'Fan looks that reflect community and subculture. This makes the project feel broader than music alone — a youth culture property.' },
    ],
    body: [
      'The music gives it emotional depth. The fashion gives it visual memory.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Fashion Integration', motion: 'spotlightFade' },
      { type: 'headline', content: 'FASHION INTEGRATION', motion: 'maskReveal' },
    ],
  },

  // ═══ S15 — THE MECHANISM ═══
  {
    id: 'S15', section: 'The Mechanism', layout: 'cardGrid', theme: 'darkEditorial',
    bgImage: 'https://static.wixstatic.com/media/227dff_1d33f15c8a944a9d8d7b1678fa0d43a2~mv2.png',
    headline: 'THE MECHANISM',
    subheadline: 'The project works through three layers.',
    pillars: [
      { title: 'The Studio', text: 'A Mobily-built creative environment where music is made, filmed, and turned into premium content.' },
      { title: 'Social Media', text: 'A living digital layer that builds anticipation, reveals talent, extends the story, and keeps each episode active beyond the shoot itself.' },
      { title: 'Competition', text: 'A fan-entry mechanism that gives young people a real chance to move from audience to participant.' },
    ],
    body: [
      'This is where the project becomes bigger than a show. It becomes a system.',
      'A young AI digital human can also support the format as a digital layer across social, web, and onboarding touchpoints.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'The Mechanism', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE MECHANISM', motion: 'maskReveal' },
    ],
  },

  // ═══ S16 — SOCIAL MEDIA JOURNEY ═══
  {
    id: 'S16', section: 'Social Media Journey', layout: 'timeline', theme: 'teal',
    headline: 'SOCIAL MEDIA JOURNEY',
    subheadline: 'The social layer should not document the show. It should expand the show.',
    timeline: [
      { time: 'BEFORE', title: 'BUILD ANTICIPATION', text: 'Artist reveal, fan call-outs, entry competition, clues, countdowns, and teaser assets.' },
      { time: 'DURING', title: 'CAPTURE MOMENTS', text: 'Live-feeling snippets, fan reactions, artist moments, studio tension, creative breakthroughs.' },
      { time: 'AFTER', title: 'EXTEND THE STORY', text: 'Song release, performance edits, music video, short-form cutdowns, winner reveal, follow-up storytelling.' },
    ],
    body: [
      'Each stage must create a reason to return, comment, share, and follow the story forward.',
    ],
    textBlocks: [
      { type: 'headline', content: 'SOCIAL MEDIA JOURNEY', motion: 'heroLift' },
      { type: 'subheader', content: 'The social layer should not document the show. It should expand the show.', motion: 'blurResolve' },
    ],
  },

  // ═══ S17 — EMERGING ARTIST OPPORTUNITY ═══
  {
    id: 'S17', section: 'Emerging Artist', layout: 'editorialLeft', theme: 'lime',
    bgImage: 'https://static.wixstatic.com/media/227dff_5aa87a74e9734134a83f55cb45aaaedd~mv2.png',
    headline: 'EMERGING ARTIST OPPORTUNITY',
    subheadline: 'From entertainment brand to talent enabler.',
    body: [
      'At the end of each episode, one fan is selected as the emerging artist winner. This changes the meaning of participation.',
      'Fans are not only entering for access. They are entering for possibility.',
      'The selected winner receives: a professionally produced EP (3 to 9 tracks), artist development support, and a launch pathway through Mobily Vyb.',
      'Not only showcasing culture. Helping build its next chapter.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Emerging Artist', motion: 'spotlightFade' },
      { type: 'headline', content: 'EMERGING ARTIST OPPORTUNITY', motion: 'heroLift' },
    ],
  },

  // ═══ S18 — DELIVERABLES PER EPISODE ═══
  {
    id: 'S18', section: 'Deliverables', layout: 'metricsGrid', theme: 'analytics',
    headline: 'DELIVERABLES PER EPISODE',
    subheadline: 'The value is in the full output stack.',
    stats: [
      { value: '1', label: 'Original song' },
      { value: '1', label: 'Music video' },
      { value: '2', label: 'Solo artist performances' },
      { value: '1', label: 'Final collaboration performance' },
      { value: '1', label: 'Behind-the-scenes film' },
      { value: '30–50', label: 'Social clips' },
    ],
    body: [
      'Plus 20+ TikTok and Snapchat assets, 1 competition campaign, and 1 winner story.',
    ],
    textBlocks: [
      { type: 'headline', content: 'DELIVERABLES PER EPISODE', motion: 'heroLift' },
      { type: 'subheader', content: 'The value is in the full output stack.', motion: 'diagIn' },
    ],
  },

  // ═══ S19 — SEASON DELIVERABLES ═══
  {
    id: 'S19', section: 'Season Output', layout: 'metricsGrid', theme: 'lime',
    bgImage: 'https://static.wixstatic.com/media/227dff_5aa87a74e9734134a83f55cb45aaaedd~mv2.png',
    headline: '10-EPISODE SEASON',
    subheadline: 'Mobily owns a growing entertainment library.',
    stats: [
      { value: '10', label: 'Episodes' },
      { value: '10', label: 'Original songs' },
      { value: '10', label: 'Music videos' },
      { value: '30', label: 'Live performances' },
      { value: '300–500', label: 'Short-form assets' },
      { value: '10', label: 'Emerging artists discovered' },
    ],
    body: [
      'Songs, visuals, artist collaborations, fan stories, and a repeatable branded format with long-term value.',
    ],
    textBlocks: [
      { type: 'headline', content: '10-EPISODE SEASON', motion: 'statementDrop' },
      { type: 'subheader', content: 'Mobily owns a growing entertainment library.', motion: 'editorialSweep' },
    ],
  },

  // ═══ S20 — HOW SUCCESS WILL BE MEASURED ═══
  {
    id: 'S20', section: 'Success Metrics', layout: 'cardGrid', theme: 'analytics',
    bgImage: 'https://static.wixstatic.com/media/227dff_2c54b8b40c4c40a7b112871a3119f28f~mv2.png',
    headline: 'HOW SUCCESS WILL BE MEASURED',
    pillars: [
      { title: 'Brand Metrics', text: 'Affinity, relevance, youth connection, association with music and entertainment.' },
      { title: 'Content Metrics', text: 'Views, watch time, shares, saves, streams.' },
      { title: 'Participation Metrics', text: 'Entries, submissions, fan engagement, repeat interaction, community growth.' },
    ],
    body: [
      'Success is not only about reach. It is about proving that Mobily can create a branded experience that young people actively want to enter.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Success Metrics', motion: 'spotlightFade' },
      { type: 'headline', content: 'HOW SUCCESS WILL BE MEASURED', motion: 'maskReveal' },
    ],
  },

  // ═══ S21 — SUGGESTED ARTIST PAIRINGS ═══
  {
    id: 'S21', section: 'Artist Pairings', layout: 'editorialLeft', theme: 'blue',
    bgImage: 'https://static.wixstatic.com/media/227dff_265294f1ab0d4ceb877bed522d0324c1~mv2.png',
    headline: 'SUGGESTED ARTIST PAIRINGS',
    subheadline: 'Contrast creates curiosity. Curiosity creates conversation. Conversation creates content.',
    body: [
      'The format becomes stronger when the pairing creates contrast.',
      'Examples: rap + pop, Khaleeji + alternative, mainstream + underground, Saudi + regional.',
      'The pairings should feel deliberately unexpected, but creatively believable. That tension is what makes the final collaboration worth watching.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Artist Pairings', motion: 'spotlightFade' },
      { type: 'headline', content: 'SUGGESTED ARTIST PAIRINGS', motion: 'heroLift' },
    ],
  },

  // ═══ S22 — WHY MOBILY SHOULD OWN THIS ═══
  {
    id: 'S22', section: 'Ownership', layout: 'manifesto', theme: 'heroDark',
    bgImage: 'https://static.wixstatic.com/media/227dff_7cc0ed1746294df4a9985b7fc3f03df6~mv2.gif',
    headline: 'WHY MOBILY SHOULD OWN THIS',
    body: [
      'This should not be framed as another sponsorship. It should be framed as a Mobily-owned entertainment property.',
      'Mobily owns: the format, the studio world, the content system, the music outputs, the audience relationship, the cultural memory attached to the project.',
      'That makes Vyb more strategic than a campaign. A campaign ends. A property compounds.',
    ],
    textBlocks: [
      { type: 'headline', content: 'WHY MOBILY SHOULD OWN THIS', motion: 'statementDrop' },
      { type: 'body', content: 'A campaign ends. A property compounds.', motion: 'editorialSweep' },
    ],
  },

  // ═══ S23 — THE LONG-TERM VISION ═══
  {
    id: 'S23', section: 'Long-Term Vision', layout: 'editorialSplit', theme: 'teal',
    bgImage: 'https://static.wixstatic.com/media/227dff_9ce0fae6211841f99404991888b212aa~mv2.png',
    headline: 'THE LONG-TERM VISION',
    subheadline: 'Mobily becomes the brand that helps organize, shape, and grow music culture.',
    pillars: [
      { title: 'Scale', text: 'Multiple seasons, more genres, city-based editions, live audience events, new artist pipelines.' },
      { title: 'Platform', text: 'Brand and fashion collaborations, a permanent entertainment platform, AI digital human layer across the Vyb ecosystem.' },
    ],
    body: [
      'The long-term ambition is clear: Mobily becomes the brand that does not just appear in music culture. Mobily helps organize it, shape it, and grow it.',
    ],
    textBlocks: [
      { type: 'kicker', content: 'Long-Term Vision', motion: 'spotlightFade' },
      { type: 'headline', content: 'THE LONG-TERM VISION', motion: 'maskReveal' },
    ],
  },

  // ═══ S24 — CLOSING ═══
  {
    id: 'S24', section: 'Closing', layout: 'closing', theme: 'heroDark',
    headline: 'Mobily Vyb',
    bgVideo: 'https://video.wixstatic.com/video/227dff_c261b2ce87fd489e9dc47a2e67dbe3f4/1080p/mp4/file.mp4',
    subheadline: 'Where fans stop watching and start creating.',
    body: [
      'A Mobily format built around: access, participation, music, discovery, delight.',
      '2 artists. 20 super fans. 1 new track.',
    ],
    textBlocks: [
      { type: 'headline', content: 'Mobily Vyb', motion: 'heroLift' },
      { type: 'subheader', content: 'Where fans stop watching and start creating.', motion: 'blurResolve' },
      { type: 'caption', content: '2 artists. 20 super fans. 1 new track.', motion: 'ctaBreathe' },
    ],
  },
];

// ─── Compute slides with palette from theme map ───
export const SLIDES: ComputedSlide[] = RAW_SLIDES.map((slide) => ({
  ...slide,
  palette: slideThemeMap[slide.theme].palette,
}));
