export interface SlideAsset {
  bgVideo?: string;
  bgImage?: string;
  mobileBg?: string;
  logoUrl?: string;
}

export const SLIDE_ASSETS: Record<string, SlideAsset> = {
  S01: { bgVideo: '', bgImage: '', mobileBg: '' },
  S13: { bgVideo: '' },
  S14: { bgVideo: '' },
  S24: { bgVideo: '', bgImage: '' }, // Closing media
};

/** Logos config — fill in URLs when available */
export const LOGOS = {
  nojara: '', // Nojara Studios logo URL
  nojara: '', // Nojara logo URL
  mobily: '', // Mobily logo URL
};
