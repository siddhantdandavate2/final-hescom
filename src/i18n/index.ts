import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files - ONLY English and Kannada
import en from './locales/en.json';
import kn from './locales/kn.json';

const resources = {
  en: { translation: en },
  kn: { translation: kn }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('msefc-language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;