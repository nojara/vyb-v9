import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SLIDES } from '@/data/slides';

interface TopNavProps {
  activeId: string;
  palette: { bg: string; primary: string; text: string; accent: string };
  onNavigate?: (slideId: string) => void;
}

/** Key navigation anchors mapped to slide IDs */
const NAV_SECTIONS = [
  { label: 'About', id: 'S02' },
  { label: 'Format', id: 'S05' },
  { label: 'Distribution', id: 'S18' },
  { label: 'Artists', id: 'S28' },
  { label: 'Partners', id: 'S27' },
  { label: 'Contact', id: 'S34' },
];

const TopNav = ({ activeId, palette }: TopNavProps) => {
  const { lang, toggle } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSlide = (slideId: string) => {
    const el = document.querySelector(`[data-slide-id="${slideId}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 pointer-events-none flex items-center justify-center px-2 md:px-4 mt-4 md:mt-6 pt-[env(safe-area-inset-top)]"
      style={{ zIndex: 'var(--z-chrome)' }}
      role="banner"
    >
      <nav
        aria-label="Main navigation"
        className="relative w-full max-w-7xl px-3 py-1.5 md:px-6 md:py-3 flex justify-between items-center pointer-events-auto rounded-full nav-glass transition-all duration-700"
        style={{ color: '#FFFFFF' }}
      >
        {/* Left: Nojara logo — clickable to scroll to top */}
        <button
          onClick={scrollToTop}
          className="flex-shrink-0 flex items-center cursor-pointer"
          aria-label="Scroll to top"
        >
          <img
            src="https://static.wixstatic.com/media/227dff_d4d02dbb309a4982990c4a17aadfe4b2~mv2.png"
            alt="Nojara"
            className="h-3 md:h-5 w-auto object-contain"
            style={{ filter: `brightness(0) invert(1) drop-shadow(0 0 8px ${palette.primary})` }}
          />
        </button>

        {/* Center: Mobily — clickable to scroll to top */}
        <button
          onClick={scrollToTop}
          className="flex-shrink-0 flex justify-center mx-2 md:mx-4 cursor-pointer"
          aria-label="Scroll to top"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Mobily_Logo.svg/960px-Mobily_Logo.svg.png"
            alt="Mobily"
            className="h-6 md:h-10 w-auto object-contain"
            style={{ filter: `brightness(0) invert(1) drop-shadow(0 0 8px ${palette.primary})` }}
          />
        </button>

        {/* Right: Elevate + Language toggle + Hamburger */}
        <div className="flex-shrink-0 flex items-center gap-2 md:gap-4">
          <img
            src="https://elevate-it.com/wp-content/uploads/2024/10/Elvete-logo-2-2048x333.png"
            alt="Elevate"
            className="h-2 md:h-4 w-auto object-contain"
            style={{ filter: `brightness(0) invert(1) drop-shadow(0 0 8px ${palette.primary})` }}
          />

          {/* Language toggle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            className="flex items-center rounded-full border px-1.5 md:px-2 py-0.5 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ borderColor: palette.primary }}
          >
            <span
              className="vyb-ui-mono text-[9px] md:text-[10px] font-bold px-1 md:px-1.5 py-0.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: lang === 'en' ? palette.primary : 'transparent',
                color: lang === 'en' ? palette.bg : `${palette.text}88`,
              }}
            >
              EN
            </span>
            <span
              className="vyb-ui-mono text-[9px] md:text-[10px] font-bold px-1 md:px-1.5 py-0.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: lang === 'ar' ? palette.primary : 'transparent',
                color: lang === 'ar' ? palette.bg : `${palette.text}88`,
              }}
            >
              AR
            </span>
          </motion.button>

          {/* Hamburger menu */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open navigation menu"
            className="flex items-center justify-center w-8 h-8 rounded-full border cursor-pointer"
            style={{ borderColor: `${palette.primary}55` }}
          >
            {menuOpen ? <X size={14} /> : <Menu size={14} />}
          </motion.button>
        </div>
      </nav>

      {/* Dropdown navigation menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full mt-2 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 pointer-events-auto rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(0, 0, 0, 0.92)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              minWidth: '200px',
            }}
          >
            {NAV_SECTIONS.map((section, i) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSlide(section.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="w-full text-left px-6 py-3 vyb-ui-mono text-[11px] transition-colors hover:bg-white/10"
                style={{
                  color: activeId === section.id ? palette.primary : 'rgba(255,255,255,0.6)',
                  borderBottom: i < NAV_SECTIONS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                {section.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopNav;
