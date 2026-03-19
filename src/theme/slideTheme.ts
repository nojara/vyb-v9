export type ThemeKey =
  | 'heroDark'
  | 'blue'
  | 'yellow'
  | 'teal'
  | 'lime'
  | 'cyan'
  | 'coral'
  | 'darkEditorial'
  | 'analytics';

export interface ThemeTokens {
  bgClass: string;
  textClass: string;
  subClass: string;
  cardClass: string;
  lineClass: string;
  /** Hex colors for inline style compatibility (TopNav, BottomPagination, CerebroWidget) */
  palette: {
    bg: string;
    primary: string;
    accent: string;
    text: string;
  };
}

export const slideThemeMap: Record<ThemeKey, ThemeTokens> = {
  heroDark: {
    bgClass: 'bg-[radial-gradient(circle_at_50%_20%,rgba(41,200,232,.18),transparent_25%),linear-gradient(180deg,#0B0E0C_0%,#101B3D_100%)]',
    textClass: 'text-white',
    subClass: 'text-white/78',
    cardClass: 'border-white/10 bg-white/[0.08]',
    lineClass: 'bg-white/14',
    palette: { bg: '#0B0E0C', primary: '#A9ED3D', accent: '#E42217', text: '#FFFFFF' },
  },
  blue: {
    bgClass: 'bg-[linear-gradient(135deg,#0000FF_0%,#101B8C_100%)]',
    textClass: 'text-white',
    subClass: 'text-white/78',
    cardClass: 'border-white/10 bg-white/10',
    lineClass: 'bg-white/14',
    palette: { bg: '#0000FF', primary: '#FFFFFF', accent: '#A9ED3D', text: '#FFFFFF' },
  },
  yellow: {
    bgClass: 'bg-[linear-gradient(135deg,#FFFF00_0%,#F1DD33_100%)]',
    textClass: 'text-neutral-950',
    subClass: 'text-neutral-950/75',
    cardClass: 'border-black/10 bg-white/30',
    lineClass: 'bg-neutral-950/18',
    palette: { bg: '#FFFF00', primary: '#0A0A0A', accent: '#0000FF', text: '#0A0A0A' },
  },
  teal: {
    bgClass: 'bg-[linear-gradient(135deg,#3CB46A_0%,#1A7A3D_100%)]',
    textClass: 'text-white',
    subClass: 'text-white/80',
    cardClass: 'border-white/10 bg-white/10',
    lineClass: 'bg-white/14',
    palette: { bg: '#3CB46A', primary: '#FFFFFF', accent: '#A9ED3D', text: '#FFFFFF' },
  },
  lime: {
    bgClass: 'bg-[linear-gradient(135deg,#37E749_0%,#28B838_100%)]',
    textClass: 'text-neutral-950',
    subClass: 'text-neutral-950/76',
    cardClass: 'border-black/10 bg-white/24',
    lineClass: 'bg-neutral-950/18',
    palette: { bg: '#37E749', primary: '#0A0A0A', accent: '#0000FF', text: '#0A0A0A' },
  },
  cyan: {
    bgClass: 'bg-[linear-gradient(135deg,#39C8CE_0%,#1A8A9A_100%)]',
    textClass: 'text-white',
    subClass: 'text-white/82',
    cardClass: 'border-white/10 bg-white/10',
    lineClass: 'bg-white/14',
    palette: { bg: '#39C8CE', primary: '#FFFFFF', accent: '#A9ED3D', text: '#FFFFFF' },
  },
  coral: {
    bgClass: 'bg-[linear-gradient(135deg,#F04C63_0%,#7C1E42_100%)]',
    textClass: 'text-white',
    subClass: 'text-white/82',
    cardClass: 'border-white/10 bg-white/10',
    lineClass: 'bg-white/14',
    palette: { bg: '#F04C63', primary: '#FFFFFF', accent: '#FFD700', text: '#FFFFFF' },
  },
  darkEditorial: {
    bgClass: 'bg-[linear-gradient(180deg,#0B0E0C_0%,#14162A_100%)]',
    textClass: 'text-white',
    subClass: 'text-white/76',
    cardClass: 'border-white/10 bg-white/[0.08]',
    lineClass: 'bg-white/12',
    palette: { bg: '#0B0E0C', primary: '#E0E0E0', accent: '#A9ED3D', text: '#FFFFFF' },
  },
  analytics: {
    bgClass: 'bg-[linear-gradient(180deg,#07111f_0%,#0B0E0C_100%)]',
    textClass: 'text-white',
    subClass: 'text-white/76',
    cardClass: 'border-[#39C8CE]/15 bg-white/[0.08]',
    lineClass: 'bg-[#39C8CE]/18',
    palette: { bg: '#07111f', primary: '#39C8CE', accent: '#A9ED3D', text: '#FFFFFF' },
  },
};
