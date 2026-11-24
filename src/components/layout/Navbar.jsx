import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import profile from '../../data/profile.json';

function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/hakkimda', label: t('nav.about') },
    { to: '/yetenekler', label: t('nav.skills') },
    { to: '/projeler', label: t('nav.projects') },
    { to: '/iletisim', label: t('nav.contact') },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            {profile.name}
          </Link>

          <nav className="navbar-links" aria-label="Main Navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar-actions">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-menu-links" aria-label="Mobile Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
