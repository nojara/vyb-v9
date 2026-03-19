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
  S32: { logoUrl: '' }, // El Batron logo — URL to be provided
  S34: { bgVideo: '', bgImage: '' }, // Thank-you media — URL to be provided
};

/** Logos config — fill in URLs when available */
export const LOGOS = {
  elevate: '', // Elevate logo URL
  nojara: '', // Nojara logo URL
  mobily: '', // Mobily logo URL
};
