import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ComputedSlide } from '@/data/slides';
import MotionBlock from '@/components/MotionBlock';
import SlideBackground from '@/components/SlideBackground';
import { useTranslatedSlide } from '@/hooks/useTranslatedSlide';
import { useLanguage } from '@/context/LanguageContext';
import { formatText } from '@/utils/formatText';

const TableSlide = ({ slide: rawSlide, index }: { slide: ComputedSlide; index: number }) => {
  const slide = useTranslatedSlide(rawSlide);
  const { lang } = useLanguage();
  const { palette } = slide;
  const tableRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(tableRef, { once: true, margin: '-10%' });

  // Detect summary rows (TOTAL lines)
  const isSummaryRow = (row: string[]) =>
    row[0]?.toUpperCase().startsWith('TOTAL') || row[0]?.toUpperCase().startsWith('SEASON');

  return (
    <div
      className="relative w-full h-full flex items-center px-4 md:px-24 pt-20 pb-16 overflow-y-auto md:overflow-visible"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <SlideBackground bgImage={slide.bgImage} videoSrc={slide.bgVideo} index={index} textColor={palette.text} />

      <div ref={tableRef} className="relative z-10 w-full max-w-6xl">
        {slide.headline && (
          <MotionBlock motionKey="maskReveal" delay={0}>
            <h2 className="vyb-section-title mb-3" style={{ color: palette.primary }}>
              {formatText(slide.headline)}
            </h2>
          </MotionBlock>
        )}

        {slide.subheadline && (
          <MotionBlock motionKey="blurResolve" delay={0.1}>
            <p className="vyb-subtitle opacity-70 mb-4" style={{ color: palette.text }}>
              {slide.subheadline}
            </p>
          </MotionBlock>
        )}

        {slide.body?.map((para, i) => (
          <MotionBlock key={i} motionKey="editorialSweep" delay={0.15 + i * 0.1}>
            <p className="vyb-body opacity-60 max-w-3xl mb-6" style={{ color: palette.text }}>
              {formatText(para)}
            </p>
          </MotionBlock>
        ))}

        {slide.tableData && (
          <div className="grid grid-cols-1 gap-2 md:gap-3">
            {/* Header row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid gap-2 md:gap-4 px-3 md:px-5 py-2"
              style={{
                gridTemplateColumns: `1fr ${slide.tableData.headers.length > 2 ? '60px' : '80px'} ${slide.tableData.headers.length > 2 ? '1fr' : ''}`,
              }}
            >
              {slide.tableData.headers.map((h, i) => (
                <span key={i} className="vyb-label opacity-40" style={{ color: palette.primary }}>
                  {h}
                </span>
              ))}
            </motion.div>

            {/* Data rows as cards */}
            {slide.tableData.rows.map((row, ri) => {
              const isSummary = isSummaryRow(row);
              return (
                <motion.div
                  key={ri}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + ri * 0.06 }}
                  className={`grid gap-2 md:gap-4 px-3 md:px-5 py-2.5 md:py-3 rounded-xl border transition-colors duration-300 ${
                    isSummary ? 'border-opacity-40' : 'hover:border-opacity-30'
                  }`}
                  style={{
                    gridTemplateColumns: `1fr ${row.length > 2 ? '60px' : '80px'} ${row.length > 2 ? '1fr' : ''}`,
                    borderColor: isSummary ? `${palette.primary}40` : `${palette.primary}12`,
                    background: isSummary ? `${palette.primary}08` : `${palette.primary}03`,
                  }}
                >
                  {row.map((cell, ci) => (
                    <span
                      key={ci}
                      className={`${ci === 0 ? 'vyb-body-sm' : ci === 1 ? 'vyb-metric text-[var(--fs-body)] font-[var(--fw-metric)]' : 'vyb-body-sm opacity-60'} ${
                        isSummary && ci === 0 ? 'font-[var(--fw-body-strong)]' : ''
                      }`}
                      style={{
                        color: ci === 1 ? palette.primary : palette.text,
                        fontFamily: ci === 1 ? 'var(--font-mono)' : undefined,
                        opacity: ci === 0 ? (isSummary ? 1 : 0.85) : undefined,
                      }}
                    >
                      {cell}
                    </span>
                  ))}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableSlide;
