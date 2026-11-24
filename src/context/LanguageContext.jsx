import { createContext, useContext, useEffect, useState } from 'react';
import tr from '../data/locales/tr.json';
import en from '../data/locales/en.json';

const translations = { tr, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage === 'tr' || savedLanguage === 'en' ? savedLanguage : 'tr';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'tr' ? 'en' : 'tr'));
  };

  const translate = (key) => {
    const keys = key.split('.');
    let result = translations[language];

    for (const part of keys) {
      if (result && Object.prototype.hasOwnProperty.call(result, part)) {
        result = result[part];
      } else {
        return key;
      }
    }

    return result;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translate,
        translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
