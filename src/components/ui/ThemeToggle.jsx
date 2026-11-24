import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      className="control-btn"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.toLight') : t('theme.toDark')}
      title={isDark ? t('theme.toLight') : t('theme.toDark')}
    >
      {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
    </button>
  );
}

export default ThemeToggle;
