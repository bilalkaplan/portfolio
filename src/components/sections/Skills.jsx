import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SkillBar from '../ui/SkillBar';
import skillsData from '../../data/skills.json';

function Skills() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const isEn = language === 'en';
  const softSkills = t('skills.softSkills');

  const visibleCategories =
    activeCategory === 'all'
      ? skillsData
      : skillsData.filter((group) => group.category === activeCategory);

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>{t('skills.title')}</h1>
          <p>{t('skills.subtitle')}</p>
        </div>
      </section>

      <section className="folio-stage">
        <div className="paper-folio">
          <div className="folio-section">
            <div className="filter-tabs" role="tablist" aria-label={t('skills.title')}>
              <button
                type="button"
                className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                {t('skills.allCategories')}
              </button>

              {skillsData.map((group) => (
                <button
                  key={group.category}
                  type="button"
                  className={`filter-pill ${activeCategory === group.category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(group.category)}
                >
                  {isEn && group.category_en ? group.category_en : group.category}
                </button>
              ))}
            </div>

            <div className="skills-grid">
              {visibleCategories.map((group) => (
                <div key={group.category}>
                  <h2 className="skill-category-title">
                    <span>{isEn && group.category_en ? group.category_en : group.category}</span>
                    <span className="skill-count-badge">{group.items.length}</span>
                  </h2>
                  <div className="skill-items-list">
                    {group.items.map((skill) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        icon={skill.icon}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="folio-section">
            <div className="editorial-two-col">
              <div>
                <h2 className="folio-heading">{t('skills.languagesTitle')}</h2>
                <div className="language-card-list">
                  <div className="language-row">
                    <strong>{t('skills.turkish')}</strong>
                    <span className="cert-date">{t('skills.turkishLevel')}</span>
                  </div>
                  <div className="language-row">
                    <strong>{t('skills.english')}</strong>
                    <span className="cert-date">{t('skills.englishLevel')}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="folio-heading">{t('skills.softSkillsTitle')}</h2>
                <div className="soft-skills-wrap">
                  {Array.isArray(softSkills) &&
                    softSkills.map((item) => (
                      <span key={item} className="soft-skill-chip">
                        {item}
                      </span>
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

export default Skills;
