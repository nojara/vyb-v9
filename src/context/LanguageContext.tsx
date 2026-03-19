import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'ar';

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'en', toggle: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = () => setLang(l => (l === 'en' ? 'ar' : 'en'));
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
