import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import SocialLinks from '../ui/SocialLinks';
import ProjectCard from '../ui/ProjectCard';
import Modal from '../ui/Modal';
import profile from '../../data/profile.json';
import projects from '../../data/projects.json';

function Hero() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState(null);

  const interests = t('hero.interestsList');
  const educationItems = t('hero.educationItems');
  const featuredProjects = projects.filter((item) => item.isFeatured).slice(0, 4);

  return (
    <>
      <section className="hero-banner">
        <div className="container">
          <div className="hero-academic-grid">
            {/* Left Profile Column */}
            <div className="hero-profile-col">
              <div className="avatar-circle-wrap">
                <img
                  src={profile.avatar}
                  alt={t('hero.photoAlt')}
                  className="avatar-circle"
                />
              </div>

              <h2 className="hero-profile-name">{profile.name}</h2>
              <p className="hero-profile-role">{t('hero.role')}</p>
              <p className="hero-profile-inst">{t('hero.institution')}</p>

              <SocialLinks variant="minimal" />
            </div>

            {/* Right Bio, CV, Interests & Education Column */}
            <div className="hero-bio-col">
              <h1>{t('hero.greeting')}</h1>
              <p className="hero-bio-text">{t('hero.summary')}</p>

              <div className="hero-actions">
                <a
                  href={profile.cvFile}
                  download="Bilal_Kocakaplan_CV.pdf"
                  className="btn btn-banner"
                >
                  <FiDownload size={15} />
                  <span>{t('hero.downloadCV')}</span>
                </a>
              </div>

              <div className="hero-subgrid">
                <div className="hero-subcol">
                  <h2>{t('hero.interestsHeading')}</h2>
                  <ul className="hero-interests-list">
                    {Array.isArray(interests) &&
                      interests.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <div className="hero-subcol">
                  <h2>{t('hero.educationHeading')}</h2>
                  <ul className="hero-edu-list">
                    {Array.isArray(educationItems) &&
                      educationItems.map((edu) => (
                        <li key={edu.title} className="hero-edu-item">
                          <FaGraduationCap className="hero-edu-icon" aria-hidden="true" />
                          <div>
                            <div className="hero-edu-title">{edu.title}</div>
                            <div className="hero-edu-org">{edu.org}</div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Framed Editorial Folio over Monet's Painting */}
      <section className="folio-stage">
        <div className="paper-folio">
          <div className="folio-header-row">
            <div>
              <h2>{t('hero.featuredTitle')}</h2>
              <p>{t('hero.featuredSubtitle')}</p>
            </div>
            <Link to="/projeler" className="text-link">
              <span>{t('hero.allProjects')}</span>
              <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

export default Hero;
