import React, { createContext, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from '@/utils/localization';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, options?: any) => string;
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('msefc-language', lang);
    
    // Add visual feedback for language change
    const root = document.documentElement;
    root.style.setProperty('--language-transition', 'all 0.3s ease');
    
    // Update document direction for RTL languages if needed
    document.dir = ['ar', 'he', 'fa'].includes(lang) ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('msefc-language');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage: i18n.language, 
      changeLanguage, 
      t,
      languages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};