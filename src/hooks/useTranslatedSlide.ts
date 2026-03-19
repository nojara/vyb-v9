import { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ComputedSlide } from '@/data/slides';
import { AR_TRANSLATIONS } from '@/data/translations-ar';

/** Returns a slide with text fields swapped to the active language */
export const useTranslatedSlide = (slide: ComputedSlide): ComputedSlide => {
  const { lang } = useLanguage();

  return useMemo(() => {
    if (lang === 'en') return slide;
    const t = AR_TRANSLATIONS[slide.id];
    if (!t) return slide;

    return {
      ...slide,
      section: t.section ?? slide.section,
      headline: t.headline ?? slide.headline,
      subheadline: t.subheadline ?? slide.subheadline,
      body: t.body ?? slide.body,
      pillars: t.pillars ?? slide.pillars,
      stats: t.stats ?? slide.stats,
      timeline: t.timeline ?? slide.timeline,
      tableData: t.tableData ?? slide.tableData,
    };
  }, [lang, slide]);
};
