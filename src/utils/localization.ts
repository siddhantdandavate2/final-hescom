import { useTranslation } from 'react-i18next';

// Language configuration
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', locale: 'en-US' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳', locale: 'kn-IN' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳', locale: 'hi-IN' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳', locale: 'ta-IN' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳', locale: 'te-IN' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳', locale: 'ml-IN' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳', locale: 'gu-IN' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳', locale: 'mr-IN' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳', locale: 'bn-IN' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳', locale: 'pa-IN' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳', locale: 'or-IN' },
  { code: 'as', name: 'অসমীয়া (Assamese)', flag: '🇮🇳', locale: 'as-IN' }
];

// Get locale for current language
export const getLocaleForLanguage = (languageCode: string): string => {
  const language = languages.find(lang => lang.code === languageCode);
  return language?.locale || 'en-US';
};

// Format numbers according to locale
export const formatNumber = (number: number, languageCode: string): string => {
  const locale = getLocaleForLanguage(languageCode);
  return new Intl.NumberFormat(locale).format(number);
};

// Format currency according to locale
export const formatCurrency = (amount: number, languageCode: string): string => {
  const locale = getLocaleForLanguage(languageCode);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date according to locale
export const formatDate = (date: Date | string, languageCode: string, options?: Intl.DateTimeFormatOptions): string => {
  const locale = getLocaleForLanguage(languageCode);
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  let finalOptions: Intl.DateTimeFormatOptions;
  
  if (options && (options.timeStyle || options.dateStyle)) {
    // If timeStyle or dateStyle are provided, use only the provided options
    // as they cannot be combined with individual date/time components
    finalOptions = options;
  } else {
    // Use default options and merge with any other provided options
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    finalOptions = { ...defaultOptions, ...(options || {}) };
  }
  
  return new Intl.DateTimeFormat(locale, finalOptions).format(dateObj);
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date: Date | string, languageCode: string): string => {
  const locale = getLocaleForLanguage(languageCode);
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
};

// Format percentage
export const formatPercentage = (value: number, languageCode: string): string => {
  const locale = getLocaleForLanguage(languageCode);
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value / 100);
};

// Custom hook for localized formatting
export const useLocalization = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return {
    formatNumber: (number: number) => formatNumber(number, currentLanguage),
    formatCurrency: (amount: number) => formatCurrency(amount, currentLanguage),
    formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => 
      formatDate(date, currentLanguage, options),
    formatRelativeTime: (date: Date | string) => formatRelativeTime(date, currentLanguage),
    formatPercentage: (value: number) => formatPercentage(value, currentLanguage),
    currentLanguage,
    currentLocale: getLocaleForLanguage(currentLanguage)
  };
};

// Chart formatter for Recharts
export const createChartFormatter = (languageCode: string) => {
  return {
    number: (value: number) => formatNumber(value, languageCode),
    currency: (value: number) => formatCurrency(value, languageCode),
    percentage: (value: number) => formatPercentage(value, languageCode)
  };
};