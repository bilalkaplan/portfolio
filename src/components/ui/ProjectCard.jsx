import { FiArrowUpRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

function ProjectCard({ project, onSelect }) {
  const { language, t } = useLanguage();

  const title = language === 'en' && project.title_en ? project.title_en : project.title;
  const description =
    language === 'en' && project.description_en ? project.description_en : project.description;
  const categoryLabel = t(`projects.categories.${project.categoryKey}`) || project.category;

  const handleCardKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <article
      className="project-card"
      onClick={() => onSelect(project)}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${title} — ${t('projects.detailsBtn')}`}
    >
      <div className="project-thumb-wrap">
        <img src={project.image} alt={title} className="project-thumb" loading="lazy" />
      </div>

      <div className="project-body">
        <span className="project-kicker">
          {categoryLabel} · {project.date}
        </span>
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>

        <div className="project-tech-list">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-card-footer">
          <div className="project-card-links" onClick={(e) => e.stopPropagation()}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-pill"
              >
                <FiGithub size={14} />
                <span>{t('projects.githubBtn')}</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link-pill"
              >
                <FiExternalLink size={14} />
                <span>{t('projects.demoBtn')}</span>
              </a>
            )}
          </div>

          <span className="card-detail-hint">
            {t('projects.detailsBtn')} <FiArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
