import { useState } from 'react';
import { FiCheckCircle, FiSend } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const INITIAL_VALUES = {
  name: '',
  email: '',
  subject: '',
  message: '',
  botcheck: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (values) => {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = t('contact.form.errors.nameRequired');
    } else if (values.name.trim().length < 3) {
      nextErrors.name = t('contact.form.errors.nameMin');
    }

    if (!values.email.trim()) {
      nextErrors.email = t('contact.form.errors.emailRequired');
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = t('contact.form.errors.emailInvalid');
    }

    if (!values.subject.trim()) {
      nextErrors.subject = t('contact.form.errors.subjectRequired');
    } else if (values.subject.trim().length < 4) {
      nextErrors.subject = t('contact.form.errors.subjectMin');
    }

    if (!values.message.trim()) {
      nextErrors.message = t('contact.form.errors.messageRequired');
    } else if (values.message.trim().length < 15) {
      nextErrors.message = t('contact.form.errors.messageMin');
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError('');

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Honeypot bot guard
    if (formData.botcheck) {
      setIsSubmitted(true);
      setFormData(INITIAL_VALUES);
      return;
    }

    setIsSubmitting(true);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();

    // If no Web3Forms key is configured, run offline simulation cleanly
    if (!accessKey) {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData(INITIAL_VALUES);
        setErrors({});
      }, 650);
      return;
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          from_name: 'Bilal Kocakaplan Portfolio',
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          botcheck: false,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData(INITIAL_VALUES);
        setErrors({});
      } else {
        setSubmitError(data.message || t('contact.form.errors.submitFailed'));
      }
    } catch {
      setSubmitError(t('contact.form.errors.submitFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="form-success-box" role="status" aria-live="polite">
        <FiCheckCircle className="success-icon" />
        <h4>{t('contact.form.successTitle')}</h4>
        <p>{t('contact.form.successMessage')}</p>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setIsSubmitted(false)}
        >
          {t('contact.form.sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Hidden honeypot input for spam protection */}
      <input
        type="text"
        name="botcheck"
        value={formData.botcheck}
        onChange={handleChange}
        className="form-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {submitError && (
        <div className="form-error-banner" role="alert">
          {submitError}
        </div>
      )}

      <div className="form-row-2">
        <div className="form-field">
          <label htmlFor="contact-name" className="form-label">
            {t('contact.form.name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={`form-input ${errors.name ? 'has-error' : ''}`}
            placeholder={t('contact.form.namePlaceholder')}
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="contact-email" className="form-label">
            {t('contact.form.email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={`form-input ${errors.email ? 'has-error' : ''}`}
            placeholder={t('contact.form.emailPlaceholder')}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contact-subject" className="form-label">
          {t('contact.form.subject')}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className={`form-input ${errors.subject ? 'has-error' : ''}`}
          placeholder={t('contact.form.subjectPlaceholder')}
          value={formData.subject}
          onChange={handleChange}
          aria-invalid={Boolean(errors.subject)}
        />
        {errors.subject && <span className="field-error">{errors.subject}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="contact-message" className="form-label">
          {t('contact.form.message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          className={`form-textarea ${errors.message ? 'has-error' : ''}`}
          placeholder={t('contact.form.messagePlaceholder')}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <span className="field-error">{errors.message}</span>}
      </div>

      <div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          <FiSend size={16} />
          <span>{isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}</span>
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
