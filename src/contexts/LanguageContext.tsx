
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    nearestOffice: 'Nearest Office',
    complaintTracker: 'Complaint Tracker',
    payBill: 'Pay Bill',
    documentVault: 'Document Vault',
    solarPumpStatus: 'Solar Pump Status',
    usefulLinks: 'Useful Links',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    
    // Dashboard
    welcome: 'Welcome to MSEFC Portal',
    totalTheftCases: 'Total Theft Cases',
    resolutionRate: 'Resolution Rate',
    revenueRecovered: 'Revenue Recovered',
    detectionAccuracy: 'Detection Accuracy',
    
    // Common
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    download: 'Download',
    upload: 'Upload',
    
    // Bills
    currentBill: 'Current Bill',
    billAmount: 'Bill Amount',
    dueDate: 'Due Date',
    payNow: 'Pay Now',
    viewBill: 'View Bill',
    downloadBill: 'Download Bill',
    
    // Complaints
    newComplaint: 'New Complaint',
    complaintId: 'Complaint ID',
    status: 'Status',
    priority: 'Priority',
    description: 'Description',
    
    // Cities
    bengaluru: 'Bengaluru',
    mysuru: 'Mysuru',
    hubli: 'Hubli',
    mangalore: 'Mangalore',
    belagavi: 'Belagavi',
    gulbarga: 'Gulbarga',
    davangere: 'Davangere',
    ballari: 'Ballari',
    
    // Chatbot
    chatbotWelcome: 'Hello! How can I help you today?',
    chatbotPlaceholder: 'Type your message or ask about bills, complaints, payments...',
    
    // AI Forecasting
    aiForecasting: 'AI Forecasting - Next 6 Months',
    predictedTheft: 'Predicted Theft Cases',
    threatLevel: 'Threat Level',
    confidence: 'Confidence',
    
    // Notifications
    notifications: 'Notifications',
    billDue: 'Bill Due',
    complaintResolved: 'Complaint Resolved',
    systemMaintenance: 'System Maintenance'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    nearestOffice: 'निकटतम कार्यालय',
    complaintTracker: 'शिकायत ट्रैकर',
    payBill: 'बिल भुगतान',
    documentVault: 'दस्तावेज़ वॉल्ट',
    solarPumpStatus: 'सोलर पंप स्थिति',
    usefulLinks: 'उपयोगी लिंक',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    
    welcome: 'MSEFC पोर्टल में आपका स्वागत है',
    totalTheftCases: 'कुल चोरी के मामले',
    resolutionRate: 'समाधान दर',
    revenueRecovered: 'राजस्व वसूली',
    detectionAccuracy: 'पहचान सटीकता',
    
    search: 'खोजें',
    filter: 'फ़िल्टर',
    export: 'निर्यात',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    view: 'देखें',
    download: 'डाउनलोड',
    upload: 'अपलोड',
    
    currentBill: 'वर्तमान बिल',
    billAmount: 'बिल राशि',
    dueDate: 'देय तिथि',
    payNow: 'अभी भुगतान करें',
    viewBill: 'बिल देखें',
    downloadBill: 'बिल डाउनलोड करें',
    
    bengaluru: 'बेंगलुरु',
    mysuru: 'मैसूर',
    hubli: 'हुबली',
    mangalore: 'मंगलौर',
    
    chatbotWelcome: 'नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?',
    chatbotPlaceholder: 'अपना संदेश टाइप करें या बिल, शिकायत, भुगतान के बारे में पूछें...',
    
    aiForecasting: 'AI पूर्वानुमान - अगले 6 महीने',
    predictedTheft: 'अनुमानित चोरी के मामले',
    threatLevel: 'खतरे का स्तर',
    confidence: 'विश्वसनीयता',
    
    notifications: 'सूचनाएं',
    billDue: 'बिल देय',
    complaintResolved: 'शिकायत हल हो गई',
    systemMaintenance: 'सिस्टम रखरखाव'
  },
  kn: {
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    nearestOffice: 'ಹತ್ತಿರದ ಕಚೇರಿ',
    complaintTracker: 'ದೂರು ಟ್ರ್ಯಾಕರ್',
    payBill: 'ಬಿಲ್ ಪಾವತಿ',
    documentVault: 'ದಾಖಲೆ ವಾಲ್ಟ್',
    solarPumpStatus: 'ಸೌರ ಪಂಪ್ ಸ್ಥಿತಿ',
    usefulLinks: 'ಉಪಯುಕ್ತ ಲಿಂಕ್‌ಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    logout: 'ಲಾಗ್‌ಔಟ್',
    
    welcome: 'MSEFC ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ',
    totalTheftCases: 'ಒಟ್ಟು ಕಳ್ಳತನ ಪ್ರಕರಣಗಳು',
    resolutionRate: 'ಪರಿಹಾರ ದರ',
    revenueRecovered: 'ಆದಾಯ ವಸೂಲಾತಿ',
    detectionAccuracy: 'ಪತ್ತೆಹಚ್ಚುವಿಕೆ ನಿಖರತೆ',
    
    search: 'ಹುಡುಕಿ',
    filter: 'ಫಿಲ್ಟರ್',
    export: 'ರಫ್ತು',
    submit: 'ಸಲ್ಲಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    save: 'ಉಳಿಸಿ',
    delete: 'ಅಳಿಸಿ',
    edit: 'ಸಂಪಾದಿಸಿ',
    view: 'ವೀಕ್ಷಿಸಿ',
    download: 'ಡೌನ್‌ಲೋಡ್',
    upload: 'ಅಪ್‌ಲೋಡ್',
    
    currentBill: 'ಪ್ರಸ್ತುತ ಬಿಲ್',
    billAmount: 'ಬಿಲ್ ಮೊತ್ತ',
    dueDate: 'ಕೊನೆಯ ದಿನಾಂಕ',
    payNow: 'ಈಗ ಪಾವತಿಸಿ',
    viewBill: 'ಬಿಲ್ ವೀಕ್ಷಿಸಿ',
    downloadBill: 'ಬಿಲ್ ಡೌನ್‌ಲೋಡ್',
    
    bengaluru: 'ಬೆಂಗಳೂರು',
    mysuru: 'ಮೈಸೂರು',
    hubli: 'ಹುಬ್ಳಿ',
    mangalore: 'ಮಂಗಳೂರು',
    
    chatbotWelcome: 'ನಮಸ್ಕಾರ! ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    chatbotPlaceholder: 'ನಿಮ್ಮ ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಬಿಲ್, ದೂರು, ಪಾವತಿಗಳ ಬಗ್ಗೆ ಕೇಳಿ...',
    
    aiForecasting: 'AI ಮುನ್ಸೂಚನೆ - ಮುಂದಿನ 6 ತಿಂಗಳುಗಳು',
    predictedTheft: 'ಅಂದಾಜು ಕಳ್ಳತನ ಪ್ರಕರಣಗಳು',
    threatLevel: 'ಬೆದರಿಕೆ ಮಟ್ಟ',
    confidence: 'ವಿಶ್ವಾಸಾರ್ಹತೆ',
    
    notifications: 'ಸೂಚನೆಗಳು',
    billDue: 'ಬಿಲ್ ಪಾವತಿ ದಿನಾಂಕ',
    complaintResolved: 'ದೂರು ಪರಿಹರಿಸಲಾಗಿದೆ',
    systemMaintenance: 'ಸಿಸ್ಟಂ ನಿರ್ವಹಣೆ'
  },
  ta: { 
    dashboard: 'டாஷ்போர்டு', 
    welcome: 'MSEFC போர்ட்டலுக்கு வரவேற்கிறோம்',
    payBill: 'பில் செலுத்துங்கள்',
    viewBill: 'பில் பார்க்கவும்',
    chatbotWelcome: 'வணக்கம்! இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?'
  },
  te: { 
    dashboard: 'డాష్‌బోర్డ్', 
    welcome: 'MSEFC పోర్టల్‌కు స్వాగతం',
    payBill: 'బిల్ చెల్లించండి',
    viewBill: 'బిల్ చూడండి',
    chatbotWelcome: 'నమస్కారం! ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?'
  },
  ml: { 
    dashboard: 'ഡാഷ്‌ബോർഡ്', 
    welcome: 'MSEFC പോർട്ടലിലേക്ക് സ്വാഗതം',
    payBill: 'ബിൽ അടയ്ക്കുക',
    viewBill: 'ബിൽ കാണുക',
    chatbotWelcome: 'നമസ്കാരം! ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?'
  },
  gu: { 
    dashboard: 'ડેશબોર્ડ', 
    welcome: 'MSEFC પોર્ટલમાં આપનું સ્વાગત છે',
    payBill: 'બિલ ચૂકવો',
    viewBill: 'બિલ જુઓ',
    chatbotWelcome: 'નમસ્તે! આજે હું તમારી કેવી રીતે મદદ કરી શકું?'
  },
  mr: { 
    dashboard: 'डॅशबोर्ड', 
    welcome: 'MSEFC पोर्टलमध्ये आपले स्वागत आहे',
    payBill: 'बिल भरा',
    viewBill: 'बिल पहा',
    chatbotWelcome: 'नमस्कार! आज मी तुमची कशी मदत करू शकतो?'
  },
  bn: { 
    dashboard: 'ড্যাশবোর্ড', 
    welcome: 'MSEFC পোর্টালে আপনাকে স্বাগতম',
    payBill: 'বিল পরিশোধ করুন',
    viewBill: 'বিল দেখুন',
    chatbotWelcome: 'নমস্কার! আজ আমি আপনাকে কিভাবে সাহায্য করতে পারি?'
  },
  pa: { 
    dashboard: 'ਡੈਸ਼ਬੋਰਡ', 
    welcome: 'MSEFC ਪੋਰਟਲ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    payBill: 'ਬਿੱਲ ਦਾ ਭੁਗਤਾਨ',
    viewBill: 'ਬਿੱਲ ਵੇਖੋ',
    chatbotWelcome: 'ਸਤ ਸ਼੍ਰੀ ਅਕਾਲ! ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?'
  },
  or: { 
    dashboard: 'ଡ୍ୟାସବୋର୍ଡ', 
    welcome: 'MSEFC ପୋର୍ଟାଲକୁ ସ୍ୱାଗତ',
    payBill: 'ବିଲ୍ ପେମେଣ୍ଟ',
    viewBill: 'ବିଲ୍ ଦେଖନ୍ତୁ',
    chatbotWelcome: 'ନମସ୍କାର! ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?'
  },
  as: { 
    dashboard: 'ডেচব\'ৰ্ড', 
    welcome: 'MSEFC প\'ৰ্টেললৈ আপোনাক স্বাগতম',
    payBill: 'বিল পৰিশোধ',
    viewBill: 'বিল চাওক',
    chatbotWelcome: 'নমস্কাৰ! আজি মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?'
  },
  ur: { 
    dashboard: 'ڈیش بورڈ', 
    welcome: 'MSEFC پورٹل میں خوش آمدید',
    payBill: 'بل ادا کریں',
    viewBill: 'بل دیکھیں',
    chatbotWelcome: 'السلام علیکم! آج میں آپ کی کیسے مدد کر سکتا ہوں؟'
  },
  sd: { 
    dashboard: 'ڊيش بورڊ', 
    welcome: 'MSEFC پورٽل ۾ ڀليڪار',
    payBill: 'بل ادا ڪريو',
    viewBill: 'بل ڏسو',
    chatbotWelcome: 'سلام عليڪم! اڄ مان توھان جي ڪيئن مدد ڪري سگھان ٿو؟'
  },
  ne: { 
    dashboard: 'ड्यासबोर्ड', 
    welcome: 'MSEFC पोर्टलमा तपाईंलाई स्वागत छ',
    payBill: 'बिल तिर्नुहोस्',
    viewBill: 'बिल हेर्नुहोस्',
    chatbotWelcome: 'नमस्ते! आज म तपाईंलाई कसरी मद्दत गर्न सक्छु?'
  },
  kok: { 
    dashboard: 'डॅशबोर्ड', 
    welcome: 'MSEFC पोर्टलांत तुमकां येवकार',
    payBill: 'बिल भरात',
    viewBill: 'बिल पळयात',
    chatbotWelcome: 'नमस्कार! आयज हांव तुमकां कशें आदार करूं येतां?'
  },
  mni: { 
    dashboard: 'ডেচব\'ৰ্ড', 
    welcome: 'MSEFC প\'ৰ্টেল দা তরঙা ওইরক্কনি',
    payBill: 'বিল পৈখত্লক্কো',
    viewBill: 'বিল য়েঙবা',
    chatbotWelcome: 'খুরুমজরি! ৱাৰি এই মতুং দা অয়া কেমদৌরিবগে?'
  },
  sa: { 
    dashboard: 'नियन्त्रण-पट्टः', 
    welcome: 'MSEFC पोर्टले स्वागतम्',
    payBill: 'देयकं प्रदत्तव्यम्',
    viewBill: 'देयकं पश्यतु',
    chatbotWelcome: 'नमस्ते! अद्य अहं भवतः कथं साहाय्यं करोमि?'
  },
  mai: { 
    dashboard: 'डेशबोर्ड', 
    welcome: 'MSEFC पोर्टलमे अहाँक स्वागत अछि',
    payBill: 'बिल भुगतान करू',
    viewBill: 'बिल देखू',
    chatbotWelcome: 'नमस्कार! आइ हम अहाँक कोना मदति करि सकैत छी?'
  },
  bh: { 
    dashboard: 'डैशबोर्ड', 
    welcome: 'MSEFC पोर्टल में रउआ के स्वागत बा',
    payBill: 'बिल के भुगतान करीं',
    viewBill: 'बिल देखीं',
    chatbotWelcome: 'नमस्कार! आज हम रउआ के कइसे मदद कर सकीं?'
  },
  sat: { 
    dashboard: 'ᱰᱮᱥᱵᱚᱨᱰ', 
    welcome: 'MSEFC ᱯᱚᱨᱴᱟᱞ ᱨᱮ ᱟᱢᱟᱜ ᱥᱟᱹᱜᱩᱱ',
    payBill: 'ᱵᱤᱞ ᱮᱢ',
    viewBill: 'ᱵᱤᱞ ᱧᱮᱞ ᱢᱮ',
    chatbotWelcome: 'ᱡᱚᱦᱟᱨ! ᱱᱤᱛ ᱤᱧ ᱟᱢᱟᱜ ᱪᱮᱫ ᱞᱮᱠᱟᱛᱮ ᱜᱚᱲᱚ ᱮᱢ ᱫᱟᱲᱮᱭᱟᱜ?'
  },
  doi: { 
    dashboard: 'डेशबोर्ड', 
    welcome: 'MSEFC पोर्टल में तुहाड़ा स्वागत हैं',
    payBill: 'बिल दा भुगतान',
    viewBill: 'बिल वेखो',
    chatbotWelcome: 'नमस्कार! अज्ज मैं तुसां दी किंज मदद करी सकदा हां?'
  }
};

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া (Assamese)', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو (Urdu)', flag: '🇮🇳' },
  { code: 'sd', name: 'سنڌي (Sindhi)', flag: '🇮🇳' },
  { code: 'ne', name: 'नेपाली (Nepali)', flag: '🇳🇵' },
  { code: 'kok', name: 'कोंकणी (Konkani)', flag: '🇮🇳' },
  { code: 'mni', name: 'মেইতেই (Manipuri)', flag: '🇮🇳' },
  { code: 'sa', name: 'संस्कृत (Sanskrit)', flag: '🇮🇳' },
  { code: 'mai', name: 'मैथिली (Maithili)', flag: '🇮🇳' },
  { code: 'bh', name: 'भोजपुरी (Bhojpuri)', flag: '🇮🇳' },
  { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)', flag: '🇮🇳' },
  { code: 'doi', name: 'डोगरी (Dogri)', flag: '🇮🇳' }
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('msefc-language', lang);
    
    // Add visual feedback
    const root = document.documentElement;
    root.style.setProperty('--language-transition', 'all 0.3s ease');
  };

  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage as keyof typeof translations];
    return langTranslations?.[key as keyof typeof langTranslations] || 
           translations.en[key as keyof typeof translations.en] || 
           key;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('msefc-language');
    if (savedLang) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t }}>
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
