import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';

interface TopNavProps {
  activeId: string;
  palette: { bg: string; primary: string; text: string; accent: string };
}

const TopNav = ({ activeId, palette }: TopNavProps) => {
  const { lang, toggle } = useLanguage();
  const filterClass = 'brightness-0 invert';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[200] pointer-events-none flex items-center justify-center px-2 md:px-4 mt-4 md:mt-6 pt-[env(safe-area-inset-top)]"
      role="banner"
    >
      <nav
        aria-label="Main navigation"
        className="relative w-full max-w-7xl px-3 py-1.5 md:px-6 md:py-3 flex justify-between items-center pointer-events-auto rounded-full nav-glass transition-all duration-700"
        style={{ color: '#FFFFFF' }}
      >
        {/* Left: Nojara logo */}
        <div className="flex-shrink-0 flex items-center">
          <img
            src="https://static.wixstatic.com/media/227dff_d4d02dbb309a4982990c4a17aadfe4b2~mv2.png"
            alt="Nojara"
            className={`h-3 md:h-5 w-auto object-contain ${filterClass}`}
            style={{ filter: `brightness(0) invert(1) drop-shadow(0 0 8px ${palette.primary})` }}
          />
        </div>

        {/* Center: Mobily */}
        <div className="flex-shrink-0 flex justify-center mx-2 md:mx-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Mobily_Logo.svg/960px-Mobily_Logo.svg.png"
            alt="Mobily"
            className="h-6 md:h-10 w-auto object-contain"
            style={{ filter: `brightness(0) invert(1) drop-shadow(0 0 8px ${palette.primary})` }}
          />
        </div>

        {/* Right: Elevate logo + EN/AR toggle */}
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
            className="ml-auto flex items-center rounded-full border px-1.5 md:px-2 py-0.5 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ borderColor: palette.primary }}
          >
            <span
              className="vyb-ui-mono text-[9px] md:text-[10px] font-bold px-1 md:px-1.5 py-0.5 rounded-full transition-all duration-300"
              aria-hidden="true"
              style={{
                backgroundColor: lang === 'en' ? palette.primary : 'transparent',
                color: lang === 'en' ? palette.bg : `${palette.text}88`,
              }}
            >
              EN
            </span>
            <span
              className="vyb-ui-mono text-[9px] md:text-[10px] font-bold px-1 md:px-1.5 py-0.5 rounded-full transition-all duration-300"
              aria-hidden="true"
              style={{
                backgroundColor: lang === 'ar' ? palette.primary : 'transparent',
                color: lang === 'ar' ? palette.bg : `${palette.text}88`,
              }}
            >
              AR
            </span>
          </motion.button>
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
