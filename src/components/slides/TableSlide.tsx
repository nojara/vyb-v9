import { motion } from 'motion/react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import MediaPlaceholder from '@/components/MediaPlaceholder';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const TableSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;

  return (
    <div className="relative w-full h-full flex items-center px-4 md:px-24 pt-20 pb-16 overflow-y-auto md:overflow-visible" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
        <div>
          {slide.headline && (
            <MotionBlock motionKey="maskReveal" delay={0}>
              <motion.h2
                className="vyb-section-title mb-10"
                style={{ color: palette.primary }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                {formatText(slide.headline)}
              </motion.h2>
            </MotionBlock>
          )}

          {slide.tableData && (
            <MotionBlock motionKey="cascadeUp" delay={0.2}>
              <div className="overflow-x-auto rounded-[var(--vyb-radius-card)] border" style={{ borderColor: `${palette.primary}22` }}>
                <table className="w-full text-left">
                  <thead>
                    <tr style={{ backgroundColor: `${palette.primary}12` }}>
                      {slide.tableData.headers.map((h, i) => (
                        <th key={i} className="vyb-label px-3 md:px-6 py-3 md:py-4 whitespace-nowrap" style={{ color: palette.primary }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slide.tableData.rows.map((row, ri) => (
                      <motion.tr
                        key={ri}
                        className="border-t"
                        style={{ borderColor: `${palette.primary}11` }}
                        whileHover={{ backgroundColor: `${palette.primary}08` }}
                        transition={{ duration: 0.2 }}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`px-3 md:px-6 py-2 md:py-3 whitespace-nowrap ${ci === 0 ? 'vyb-body-sm font-[var(--fw-body-strong)]' : 'vyb-body-sm opacity-70'}`}
                            style={{ color: palette.text, fontFamily: ci === 1 ? 'var(--font-mono)' : undefined }}
                          >
                            {cell}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </MotionBlock>
          )}
        </div>

        {/* Side media */}
        <div className="hidden lg:flex flex-col items-center pt-16">
          <MediaPlaceholder
            style="square"
            accentColor={palette.primary}
            textColor={palette.text}
            label="ASSETS"
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
};

export default TableSlide;
