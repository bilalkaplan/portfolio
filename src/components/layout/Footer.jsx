import { useLanguage } from '../../context/LanguageContext';
import SocialLinks from '../ui/SocialLinks';
import profile from '../../data/profile.json';

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-meta">
          <span>
            © {CURRENT_YEAR} {profile.name}. {t('footer.rights')}
          </span>
          <span className="footer-artwork">{t('footer.artworkCredit')}</span>
        </div>

        <SocialLinks />
      </div>
    </footer>
  );
}

export default Footer;
