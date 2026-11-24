import { useEffect } from 'react';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

function Modal({ project, onClose }) {
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const title = language === 'en' && project.title_en ? project.title_en : project.title;
  const details =
    language === 'en'
      ? project.details_en || project.description_en
      : project.details_tr || project.description;
  const highlights = language === 'en' ? project.highlights_en : project.highlights_tr;
  const role = language === 'en' ? project.role_en : project.role_tr;
  const categoryLabel = t(`projects.categories.${project.categoryKey}`) || project.category;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label={t('projects.modal.close')}
        >
          <FiX />
        </button>

        <img src={project.image} alt={title} className="modal-cover" />

        <div className="modal-content">
          <div className="modal-meta-row">
            <span>{categoryLabel}</span>
            {project.date && (
              <span>
                · {t('projects.modal.year')}: {project.date}
              </span>
            )}
            {role && (
              <span>
                · {role}
              </span>
            )}
          </div>

          <h2 id="project-modal-title" className="modal-title">
            {title}
          </h2>

          <h4 className="modal-section-label">{t('projects.modal.overview')}</h4>
          <p className="modal-description">{details}</p>

          {highlights && highlights.length > 0 && (
            <>
              <h4 className="modal-section-label">{t('projects.modal.highlights')}</h4>
              <ul className="bullet-list">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          <h4 className="modal-section-label">{t('projects.modal.technologies')}</h4>
          <div className="project-tech-list">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="modal-actions">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FiGithub size={17} />
                <span>{t('projects.modal.viewCode')}</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FiExternalLink size={17} />
                <span>{t('projects.modal.liveDemo')}</span>
              </a>
            )}
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              {t('projects.modal.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
