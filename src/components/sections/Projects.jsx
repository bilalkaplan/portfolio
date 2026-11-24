import { useMemo, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ProjectCard from '../ui/ProjectCard';
import Modal from '../ui/Modal';
import projectsData from '../../data/projects.json';

const CATEGORY_KEYS = ['all', 'ai', 'frontend', 'database', 'systems'];

function Projects() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projectsData.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet);
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.categoryKey === selectedCategory;
      const matchesTech =
        selectedTech === 'all' || project.technologies.includes(selectedTech);

      return matchesCategory && matchesTech;
    });
  }, [selectedCategory, selectedTech]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedTech('all');
  };

  const hasActiveFilter = selectedCategory !== 'all' || selectedTech !== 'all';

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>{t('projects.title')}</h1>
          <p>{t('projects.subtitle')}</p>
        </div>
      </section>

      <section className="folio-stage">
        <div className="paper-folio">
          <div className="projects-filter-bar">
            <div className="filter-tabs" style={{ marginBottom: 0 }}>
              {CATEGORY_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`filter-pill ${selectedCategory === key ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(key)}
                >
                  {t(`projects.categories.${key}`)}
                </button>
              ))}
            </div>

            <div className="tech-filter-row" aria-label={t('projects.techFilterLabel')}>
              <button
                type="button"
                className={`tech-pill ${selectedTech === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedTech('all')}
              >
                {t('projects.all')}
              </button>
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  className={`tech-pill ${selectedTech === tech ? 'active' : ''}`}
                  onClick={() =>
                    setSelectedTech((prev) => (prev === tech ? 'all' : tech))
                  }
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-meta-bar">
            <span>
              <strong>{filteredProjects.length}</strong> {t('projects.resultCount')}
            </span>
            {hasActiveFilter && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleResetFilters}
              >
                {t('projects.resetFilters')}
              </button>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setActiveProject}
                />
              ))}
            </div>
          ) : (
            <div className="empty-projects-box">
              <p>{t('projects.emptyState')}</p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleResetFilters}
              >
                {t('projects.resetFilters')}
              </button>
            </div>
          )}
        </div>
      </section>

      <Modal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}

export default Projects;
