import { useLanguage } from '../../context/LanguageContext';
import ContactForm from '../ui/ContactForm';
import SocialLinks from '../ui/SocialLinks';
import profile from '../../data/profile.json';

function Contact() {
  const { language, t } = useLanguage();
  const locationText = language === 'en' ? profile.location_en : profile.location;

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="folio-stage">
        <div className="paper-folio">
          <div className="contact-grid">
            <aside className="contact-info-col">
              <h2 className="folio-heading">{t('contact.infoTitle')}</h2>

              <div className="contact-channels">
                <a href={`mailto:${profile.email}`} className="contact-channel-item">
                  <span className="channel-label">{t('contact.emailLabel')}</span>
                  <span className="channel-value">{profile.email}</span>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="contact-channel-item"
                >
                  <span className="channel-label">{t('contact.phoneLabel')}</span>
                  <span className="channel-value">{profile.phone}</span>
                </a>

                <div className="contact-channel-item">
                  <span className="channel-label">{t('contact.locationLabel')}</span>
                  <span className="channel-value">{locationText}</span>
                </div>
              </div>

              <div className="contact-social-block">
                <h3>{t('contact.socialTitle')}</h3>
                <SocialLinks showLabels />
                <p className="contact-note">{t('contact.responseNote')}</p>
              </div>
            </aside>

            <div>
              <h2 className="folio-heading">{t('contact.form.title')}</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
