import { useTranslation } from 'react-i18next';

// Language configuration - ONLY English and Kannada
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', locale: 'en-IN' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳', locale: 'kn-IN' }
];

// Get locale for current language
export const getLocaleForLanguage = (languageCode: string): string => {
  const language = languages.find(lang => lang.code === languageCode);
  return language?.locale || 'en-IN';
};

// Format numbers according to Indian locale
export const formatNumber = (number: number, languageCode?: string): string => {
  const locale = getLocaleForLanguage(languageCode || 'en');
  return new Intl.NumberFormat(locale).format(number);
};

// Format currency according to Indian locale - ALWAYS INR
export const formatCurrency = (amount: number, languageCode?: string): string => {
  const locale = getLocaleForLanguage(languageCode || 'en');
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date according to locale
export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions, languageCode?: string): string => {
  const locale = getLocaleForLanguage(languageCode || 'en');
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
export const formatRelativeTime = (date: Date | string, languageCode?: string): string => {
  const locale = getLocaleForLanguage(languageCode || 'en');
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
export const formatPercentage = (value: number, languageCode?: string): string => {
  const locale = getLocaleForLanguage(languageCode || 'en');
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
      formatDate(date, options, currentLanguage),
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