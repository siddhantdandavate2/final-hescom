import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import kn from './locales/kn.json';
import hi from './locales/hi.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import ml from './locales/ml.json';
import gu from './locales/gu.json';
import mr from './locales/mr.json';
import bn from './locales/bn.json';
import pa from './locales/pa.json';
import or from './locales/or.json';
import as from './locales/as.json';

const resources = {
  en: { translation: en },
  kn: { translation: kn },
  hi: { translation: hi },
  ta: { translation: ta },
  te: { translation: te },
  ml: { translation: ml },
  gu: { translation: gu },
  mr: { translation: mr },
  bn: { translation: bn },
  pa: { translation: pa },
  or: { translation: or },
  as: { translation: as }
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