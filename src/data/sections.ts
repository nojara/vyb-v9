export type SlideType = 'headline' | 'subheader' | 'body';

export type SlideData = {
  id: string;
  chapter: string;
  text: string;
  type: SlideType;
  motion: string;
  transition: string;
  interaction: string;
};

export type ComputedSlideData = SlideData & {
  bgColor: string;
  textColor: string;
  parallaxStrength: number;
};

// Chapter color themes - cinematic editorial palette
const CHAPTER_COLORS: Record<string, { bg: string; text: string }> = {
  'INTRODUCTION (1/2)': { bg: '#0000FF', text: '#FFFFFF' },
  'INTRODUCTION (2/2)': { bg: '#0A0A0A', text: '#FFFFFF' },
  'OUR APPROACH': { bg: '#1A1A1A', text: '#A9ED3D' },
  'BRAND PURPOSE': { bg: '#081910', text: '#FFFFFF' },
  'BRAND OBJECTIVE': { bg: '#0D0D2B', text: '#FFFFFF' },
  'MARKET OPPORTUNITY': { bg: '#121212', text: '#34CD3F' },
};

const PARALLAX_STRENGTHS = [150, -100, 200, -200, 100, 80, -50, 120, -150, 180, -80, 100, -120, 160, -180, 90, -90, 130, -160, 110];

const RAW_SLIDES: SlideData[] = [
  // ─── INTRODUCTION (1/2) ───
  { id: 's01', chapter: 'INTRODUCTION (1/2)', text: 'VYB LIVE SESSIONS', type: 'headline', motion: 'staggeredWords', transition: 'opacityDissolve', interaction: 'letterSpacingHover' },
  { id: 's02', chapter: 'INTRODUCTION (1/2)', text: 'The sound of regional energy.', type: 'headline', motion: 'maskRevealLR', transition: 'slideRight', interaction: 'mouseParallax' },
  { id: 's03', chapter: 'INTRODUCTION (1/2)', text: 'A new cultural platform built for the pace, taste, and behavior of Saudi youth.', type: 'subheader', motion: 'floatUp', transition: 'fadeOverlay', interaction: 'brightnessHover' },
  { id: 's04', chapter: 'INTRODUCTION (1/2)', text: 'VYB is not a campaign title. It is a shift in role.', type: 'body', motion: 'typeIn', transition: 'editorialFade', interaction: 'underlineSweep' },
  { id: 's05', chapter: 'INTRODUCTION (1/2)', text: 'It marks the point where Mobily stops acting only as infrastructure and starts building cultural presence.', type: 'body', motion: 'splitLineReveal', transition: 'verticalMask', interaction: 'bgTintIncrease' },
  { id: 's06', chapter: 'INTRODUCTION (1/2)', text: 'Not another sponsorship layer. Not another branded content burst.', type: 'body', motion: 'staggeredCascade', transition: 'slideUp', interaction: 'parallaxDepth' },
  { id: 's07', chapter: 'INTRODUCTION (1/2)', text: 'A long-term music and IP platform designed to move Mobily from utility to relevance.', type: 'body', motion: 'centerScaleReveal', transition: 'blurToFocus', interaction: 'glowUnderline' },
  { id: 's08', chapter: 'INTRODUCTION (1/2)', text: 'Empowering Saudi youth through culture, music, and connected experiences.', type: 'body', motion: 'radialReveal', transition: 'dissolve', interaction: 'ambientGlow' },

  // ─── INTRODUCTION (2/2) ───
  { id: 's09', chapter: 'INTRODUCTION (2/2)', text: 'WHAT IS VYB LIVE SESSIONS?', type: 'headline', motion: 'verticalLift', transition: 'cinematicFade', interaction: 'accentColorHover' },
  { id: 's10', chapter: 'INTRODUCTION (2/2)', text: 'A premium live music platform with cultural and commercial purpose.', type: 'subheader', motion: 'lineByLineSlide', transition: 'staggeredFade', interaction: 'underlineGrow' },
  { id: 's11', chapter: 'INTRODUCTION (2/2)', text: 'Built to capture the raw energy of the most exciting artists across Saudi Arabia and the wider region.', type: 'body', motion: 'waveReveal', transition: 'blurRemoval', interaction: 'scrollMotionShift' },
  { id: 's12', chapter: 'INTRODUCTION (2/2)', text: 'VYB Live Sessions takes the intimacy of globally recognized live-session formats and rebuilds it for this market, this audience, and this behavior pattern.', type: 'body', motion: 'paragraphStep', transition: 'slidingMask', interaction: 'cursorHighlight' },
  { id: 's13', chapter: 'INTRODUCTION (2/2)', text: 'More local. More cinematic. More connected. More ownable.', type: 'body', motion: 'wordBounce', transition: 'snapFade', interaction: 'sequentialGlow' },
  { id: 's14', chapter: 'INTRODUCTION (2/2)', text: 'Designed for a digital-first ecosystem where performance, identity, community, and distribution all live in the same system.', type: 'body', motion: 'depthReveal', transition: 'zoomOutCenter', interaction: 'bgParallax' },
  { id: 's15', chapter: 'INTRODUCTION (2/2)', text: 'A regional live-session format that turns Saudi sound into branded cultural capital.', type: 'body', motion: 'spotlightReveal', transition: 'fadeToBlack', interaction: 'spotlightPointer' },

  // ─── OUR APPROACH ───
  { id: 's16', chapter: 'OUR APPROACH', text: 'YOUTH CONTENT SHOULD FEEL CLOSE, NOT MANUFACTURED.', type: 'headline', motion: 'staggeredWords', transition: 'darkFade', interaction: 'cursorTilt' },
  { id: 's17', chapter: 'OUR APPROACH', text: 'Current, human, and emotionally legible from the first frame.', type: 'subheader', motion: 'floatUp', transition: 'fadeBlur', interaction: 'microGlow' },
  { id: 's18', chapter: 'OUR APPROACH', text: 'We do not build youth-facing content from a distance.', type: 'body', motion: 'splitLineReveal', transition: 'maskWipe', interaction: 'contrastHover' },
  { id: 's19', chapter: 'OUR APPROACH', text: 'We build content that feels culturally near, emotionally clear, and native to the audience it is speaking to.', type: 'body', motion: 'staggeredCascade', transition: 'dissolve', interaction: 'gentleParallax' },
  { id: 's20', chapter: 'OUR APPROACH', text: 'Clarity over corporate language.', type: 'body', motion: 'centerScaleReveal', transition: 'opacityFade', interaction: 'underlineSweep' },
  { id: 's21', chapter: 'OUR APPROACH', text: 'Taste over noise.', type: 'body', motion: 'floatUp', transition: 'dissolve', interaction: 'accentShift' },
  { id: 's22', chapter: 'OUR APPROACH', text: 'Emotional relevance before commercial messaging.', type: 'body', motion: 'maskRevealLR', transition: 'blurToFocus', interaction: 'glowHighlight' },
  { id: 's23', chapter: 'OUR APPROACH', text: 'Useful content, not just visible content.', type: 'body', motion: 'depthReveal', transition: 'maskExpand', interaction: 'bgTintShift' },
  { id: 's24', chapter: 'OUR APPROACH', text: 'The result is a tone of voice that feels modern, youthful, and modest — without losing sharpness.', type: 'body', motion: 'paragraphStep', transition: 'dissolve', interaction: 'cursorDepth' },

  // ─── BRAND PURPOSE ───
  { id: 's25', chapter: 'BRAND PURPOSE', text: 'THE CULTURAL APEX', type: 'headline', motion: 'centerScaleReveal', transition: 'darkDissolve', interaction: 'ambientGlow' },
  { id: 's26', chapter: 'BRAND PURPOSE', text: 'From infrastructure provider to cultural architect.', type: 'subheader', motion: 'diagonalEntrance', transition: 'gradientReveal', interaction: 'weightHover' },
  { id: 's27', chapter: 'BRAND PURPOSE', text: 'Mobily\'s next decade cannot be built on network speed alone. It has to be built on emotional ownership.', type: 'body', motion: 'twoPhaseReveal', transition: 'depthFade', interaction: 'pointerParallax' },
  { id: 's28', chapter: 'BRAND PURPOSE', text: 'Saudi Arabia\'s entertainment economy has expanded rapidly since Vision 2030. The audience is here. The appetite is real. The cultural momentum is already moving.', type: 'body', motion: 'staggeredCascade', transition: 'blurRemoval', interaction: 'cursorHighlight' },
  { id: 's29', chapter: 'BRAND PURPOSE', text: 'The Empowerment Mandate — VYB aligns Mobily directly with Saudi youth ambition — one of the defining forces behind the Kingdom\'s cultural transformation.', type: 'body', motion: 'radialReveal', transition: 'radialFade', interaction: 'underlineExpand' },
  { id: 's30', chapter: 'BRAND PURPOSE', text: 'The Emotional Economy — When Mobily becomes part of the music a generation grows up with, it stops being a service. It becomes a memory.', type: 'body', motion: 'centerScaleReveal', transition: 'layeredFade', interaction: 'bgGlow' },
  { id: 's31', chapter: 'BRAND PURPOSE', text: 'Saudi youth are not waiting for culture to arrive. They are already building it.', type: 'body', motion: 'verticalLift', transition: 'verticalFade', interaction: 'spotlightPointer' },
  { id: 's32', chapter: 'BRAND PURPOSE', text: 'VYB is how Mobily enters that story in a meaningful, lasting way.', type: 'body', motion: 'floatUp', transition: 'dissolve', interaction: 'underlineSweep' },

  // ─── BRAND OBJECTIVE ───
  { id: 's33', chapter: 'BRAND OBJECTIVE', text: 'THE BUSINESS OF VYB', type: 'headline', motion: 'verticalLift', transition: 'gradientOverlay', interaction: 'letterSpacingHover' },
  { id: 's34', chapter: 'BRAND OBJECTIVE', text: 'Four levers. One compounding system.', type: 'subheader', motion: 'staggeredWords', transition: 'opacityFade', interaction: 'wordGlow' },
  { id: 's35', chapter: 'BRAND OBJECTIVE', text: 'This is not philanthropy. Every creative decision inside VYB is tied to a business outcome.', type: 'body', motion: 'splitLineReveal', transition: 'slidingMask', interaction: 'microParallax' },
  { id: 's36', chapter: 'BRAND OBJECTIVE', text: 'Retention & Loyalty — Exclusive content, live sessions, and zero-rated streaming strengthen subscriber stickiness.', type: 'body', motion: 'maskRevealLR', transition: 'dissolve', interaction: 'accentUnderline' },
  { id: 's37', chapter: 'BRAND OBJECTIVE', text: 'Perception & Positioning — A generation that associates Mobily with emerging regional music does not compare it like a utility.', type: 'body', motion: 'floatUp', transition: 'blurRemoval', interaction: 'brightnessHover' },
  { id: 's38', chapter: 'BRAND OBJECTIVE', text: 'Platform & 5G Integration — Every stream, vote, session, and interaction becomes a behavioral entry point into Mobily\'s digital product ecosystem.', type: 'body', motion: 'staggeredWords', transition: 'layeredFade', interaction: 'cursorHighlight' },
  { id: 's39', chapter: 'BRAND OBJECTIVE', text: 'Ecosystem & IP Value — Media consumption creates royalties. Royalties support new production.', type: 'body', motion: 'radialReveal', transition: 'zoomFade', interaction: 'accentGlow' },
  { id: 's40', chapter: 'BRAND OBJECTIVE', text: 'Content drives attention, attention drives usage, usage strengthens the platform, and the platform keeps generating cultural and commercial value.', type: 'body', motion: 'paragraphStep', transition: 'fadeToBlack', interaction: 'underlinePath' },

  // ─── MARKET OPPORTUNITY ───
  { id: 's41', chapter: 'MARKET OPPORTUNITY', text: 'THE WINDOW IS OPEN', type: 'headline', motion: 'centerScaleReveal', transition: 'cinematicFade', interaction: 'shadowHover' },
  { id: 's42', chapter: 'MARKET OPPORTUNITY', text: 'Saudi Arabia is not becoming a music market. It already is one.', type: 'subheader', motion: 'verticalLift', transition: 'maskWipe', interaction: 'microTilt' },
  { id: 's43', chapter: 'MARKET OPPORTUNITY', text: 'The data does not suggest a future opportunity. It confirms a present one.', type: 'body', motion: 'twoPhaseReveal', transition: 'dissolve', interaction: 'underlineHighlight' },
  { id: 's44', chapter: 'MARKET OPPORTUNITY', text: '60% of Saudi Arabia is under 30.', type: 'body', motion: 'counterAnimation', transition: 'scaleFade', interaction: 'numberGlow' },
  { id: 's45', chapter: 'MARKET OPPORTUNITY', text: '$4.96B projected Saudi music streaming market by 2031.', type: 'body', motion: 'counterAnimation', transition: 'zoomFade', interaction: 'currencyHighlight' },
  { id: 's46', chapter: 'MARKET OPPORTUNITY', text: '25.5% CAGR — one of the fastest growth trajectories in the category.', type: 'body', motion: 'floatUp', transition: 'gradientFade', interaction: 'arrowIndicator' },
  { id: 's47', chapter: 'MARKET OPPORTUNITY', text: '5–7% current Saudi audience share for top regional artists.', type: 'body', motion: 'maskRevealLR', transition: 'dissolve', interaction: 'barExpand' },
  { id: 's48', chapter: 'MARKET OPPORTUNITY', text: 'The home market is still underserved relative to its cultural weight. That gap is the opening.', type: 'body', motion: 'centerScaleReveal', transition: 'fadeToBlack', interaction: 'bgGlow' },
];

export const COMPUTED_SLIDES: ComputedSlideData[] = RAW_SLIDES.map((slide, i) => {
  const colors = CHAPTER_COLORS[slide.chapter] || { bg: '#0A0A0A', text: '#FFFFFF' };
  return {
    ...slide,
    bgColor: colors.bg,
    textColor: colors.text,
    parallaxStrength: PARALLAX_STRENGTHS[i % PARALLAX_STRENGTHS.length],
  };
});

// Legacy exports for compatibility
export type MediaPlaceholder = { type: 'vertical' | 'square' | 'chart'; count: number; label?: string; videoSrc?: string; startTime?: number };
export type TableData = { headers: string[]; rows: string[][] };
export type SectionData = { id: string; title: string; subtitle: string; takeaway: string; bullets: string[]; media?: MediaPlaceholder[]; table?: TableData; bgImage?: string; customLayout?: string; textColorOverride?: string; layoutModeOverride?: number };
export type ComputedSectionData = SectionData & { bgColor: string; textColor: string; layoutMode: number; parallaxStrength: number; textVariant: string };
export const COMPUTED_SECTIONS: ComputedSectionData[] = [];

export const textVariants: Record<string, any> = {
  fadeUp: { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any } } },
  slideIn: { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any } } },
  reveal: { hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 }, visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any } } },
  scaleUp: { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any } } },
};
