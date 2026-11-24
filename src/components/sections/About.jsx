import { FiDownload, FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import profile from '../../data/profile.json';

function About() {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>{t('about.title')}</h1>
          <p>{t('about.subtitle')}</p>
        </div>
      </section>

      <section className="folio-stage">
        <div className="paper-folio">
          {/* Biography & Sidebar */}
          <div className="folio-section">
            <div className="about-top-grid">
              <aside>
                <img
                  src={profile.avatar}
                  alt={t('hero.photoAlt')}
                  className="about-photo"
                />
                <div className="about-meta-list">
                  <div>
                    <span className="about-meta-label">{t('about.locationLabel')}</span>
                    <span className="about-meta-value">
                      {isEn ? profile.location_en : profile.location}
                    </span>
                  </div>
                  <div>
                    <span className="about-meta-label">{t('about.birthPlaceLabel')}</span>
                    <span className="about-meta-value">{profile.birthPlace}</span>
                  </div>
                  <div>
                    <span className="about-meta-label">{t('about.emailLabel')}</span>
                    <a href={`mailto:${profile.email}`} className="about-meta-value">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <a
                  href={profile.cvFile}
                  download="Bilal_Kocakaplan_CV.pdf"
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  <FiDownload size={14} />
                  <span>{t('about.downloadCV')}</span>
                </a>
              </aside>

              <div>
                <h2 className="folio-heading">{t('about.bioTitle')}</h2>
                <p className="about-bio-text">{isEn ? profile.bio_en : profile.bio}</p>

                <div className="conference-note">
                  <span className="timeline-period">
                    {t('about.conferenceTitle')} ·{' '}
                    {isEn ? profile.conference.date_en : profile.conference.date}
                  </span>
                  <h4>{isEn ? profile.conference.title_en : profile.conference.title_tr}</h4>
                  <p>{isEn ? profile.conference.event_en : profile.conference.event_tr}</p>
                  <a
                    href={profile.conference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    <span>{t('about.conferenceLink')}</span>
                    <FiExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="folio-section">
            <div className="editorial-two-col">
              <div>
                <h2 className="folio-heading">{t('about.educationTitle')}</h2>
                <div className="timeline-list">
                  {profile.education.map((edu) => (
                    <div key={edu.school} className="timeline-item">
                      <span className="timeline-period">
                        {isEn ? edu.period_en : edu.period} · {isEn ? edu.level_en : edu.level}
                      </span>
                      <h3 className="timeline-title">
                        {isEn ? edu.degree_en : edu.degree}
                      </h3>
                      <p className="timeline-org">
                        {isEn ? edu.school_en : edu.school}
                      </p>
                      <p className="timeline-desc">
                        {isEn ? edu.description_en : edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="folio-heading">{t('about.experienceTitle')}</h2>
                <div className="timeline-list">
                  {profile.experience.map((exp) => (
                    <div key={exp.company} className="timeline-item">
                      <span className="timeline-period">
                        {isEn ? exp.period_en : exp.period} · {exp.location}
                      </span>
                      <h3 className="timeline-title">
                        {isEn ? exp.role_en : exp.role}
                      </h3>
                      <p className="timeline-org">{exp.company}</p>
                      <ul className="bullet-list">
                        {(isEn ? exp.highlights_en : exp.highlights_tr).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Volunteering & Leadership */}
          <div className="folio-section">
            <h2 className="folio-heading">{t('about.volunteeringTitle')}</h2>
            <div className="entries-list-2">
              {profile.volunteering.map((vol) => (
                <div key={vol.organization} className="entry-item">
                  <span className="timeline-period">
                    {isEn ? vol.period_en : vol.period}
                  </span>
                  <h4>{vol.organization}</h4>
                  <p className="timeline-org">{isEn ? vol.role_en : vol.role}</p>
                  <p>{isEn ? vol.description_en : vol.description_tr}</p>
                </div>
              ))}
            </div>
          </div>

          {/* International Experience (Erasmus+) */}
          <div className="folio-section">
            <h2 className="folio-heading">{t('about.internationalTitle')}</h2>
            <div className="entries-list-3">
              {profile.international.map((item) => (
                <div key={item.title} className="entry-item">
                  <span className="timeline-period">
                    {isEn ? item.period_en : item.period} ·{' '}
                    {isEn ? item.location_en : item.location_tr}
                  </span>
                  <h4>{item.title}</h4>
                  <p>{isEn ? item.summary_en : item.summary_tr}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Hobbies */}
          <div className="folio-section">
            <div className="editorial-two-col">
              <div>
                <h2 className="folio-heading">{t('about.certificationsTitle')}</h2>
                <div className="cert-list">
                  {profile.certifications.map((cert) => (
                    <div key={cert.name_en} className="cert-row">
                      <div>
                        <div className="cert-name">
                          {isEn ? cert.name_en : cert.name_tr}
                        </div>
                        <div className="cert-issuer">{cert.issuer}</div>
                      </div>
                      <span className="cert-date">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="folio-heading">{t('about.hobbiesTitle')}</h2>
                <div className="timeline-list">
                  {profile.hobbies.map((hobby) => (
                    <div key={hobby.title_en} className="entry-item">
                      <h4>{isEn ? hobby.title_en : hobby.title_tr}</h4>
                      <p>{isEn ? hobby.desc_en : hobby.desc_tr}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
