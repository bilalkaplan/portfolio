import { useLanguage } from '../../context/LanguageContext';

function LanguageSwitcher() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      className="control-btn lang-switcher"
      onClick={toggleLanguage}
      aria-label={t('language.switchLabel')}
      title={t('language.switchLabel')}
    >
      <span className={language === 'tr' ? 'lang-active' : 'lang-inactive'}>TR</span>
      <span className="lang-divider">/</span>
      <span className={language === 'en' ? 'lang-active' : 'lang-inactive'}>EN</span>
    </button>
  );
}

export default LanguageSwitcher;
