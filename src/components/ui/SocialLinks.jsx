import { FiGithub, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import profile from '../../data/profile.json';

function SocialLinks({ showLabels = false, variant = 'default' }) {
  const links = [
    {
      name: 'Email',
      url: `mailto:${profile.email}`,
      icon: <FiMail size={variant === 'minimal' ? 21 : 17} />,
    },
    {
      name: 'GitHub',
      url: profile.social.github,
      icon: <FiGithub size={variant === 'minimal' ? 21 : 17} />,
    },
    {
      name: 'LinkedIn',
      url: profile.social.linkedin,
      icon: <FiLinkedin size={variant === 'minimal' ? 21 : 17} />,
    },
    {
      name: 'Instagram',
      url: profile.social.instagram || profile.social.twitter,
      icon: <FiInstagram size={variant === 'minimal' ? 21 : 17} />,
    },
  ];

  if (variant === 'minimal') {
    return (
      <div className="social-links minimal">
        {links.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target={item.url.startsWith('http') ? '_blank' : undefined}
            rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="social-link-minimal"
            aria-label={item.name}
            title={item.name}
          >
            {item.icon}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="social-links">
      {links.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target={item.url.startsWith('http') ? '_blank' : undefined}
          rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`social-link-btn ${showLabels ? '' : 'icon-only'}`}
          aria-label={item.name}
          title={item.name}
        >
          {item.icon}
          {showLabels && <span>{item.name}</span>}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
