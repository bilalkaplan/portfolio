import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <section className="folio-stage">
      <div className="paper-folio">
        <div className="not-found-box">
          <div className="not-found-code">{t('notFound.code')}</div>
          <h1>{t('notFound.title')}</h1>
          <p>{t('notFound.description')}</p>
          <Link to="/" className="btn btn-primary">
            <FiArrowLeft size={16} />
            <span>{t('notFound.backHome')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
