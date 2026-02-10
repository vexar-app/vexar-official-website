import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { currentLang, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
            const el = document.querySelector(targetId);
            if (el) {
                const navH = document.getElementById('navbar')?.offsetHeight || 80;
                window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - navH, behavior: 'smooth' });
            }
        }, 100);
        return;
    }
    const el = document.querySelector(targetId);
    if (el) {
        setMenuOpen(false);
        const navH = document.getElementById('navbar').offsetHeight;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - navH, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-icon">
            <img src="/assets/vexar-logo.png" alt="Vexar" width="32" height="32" />
          </div>
          <span className="logo-text">Vexar</span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`} id="navLinks">
          <a href="#features" className="nav-link" onClick={(e) => handleNavClick(e, '#features')}>
            {t('nav.features')}
          </a>
          <a href="#platforms" className="nav-link" onClick={(e) => handleNavClick(e, '#platforms')}>
            {t('nav.platforms')}
          </a>
          <a href="#how-it-works" className="nav-link" onClick={(e) => handleNavClick(e, '#how-it-works')}>
            {t('nav.howItWorks')}
          </a>
          <Link to="/download" className="nav-link" onClick={() => setMenuOpen(false)}>
            {t('nav.download')}
          </Link>
          <a href="https://github.com/vexar-app" target="_blank" rel="noopener noreferrer" className="nav-link">
            GitHub
          </a>
        </div>

        <div className="nav-actions">
          <a href="https://www.patreon.com/cw/ConsolAktif" target="_blank" rel="noopener noreferrer" className="nav-donate">
            <span className="donate-icon">☕</span>
            <span className="donate-text">{t('nav.donate')}</span>
          </a>
          <button className="lang-switcher" id="langSwitcher" onClick={toggleLanguage} aria-label="Switch Language">
            <span className="lang-icon">🌐</span>
            <span className="lang-text" id="currentLang">{currentLang.toUpperCase()}</span>
          </button>
          <Link to="/download" className="nav-cta">
            {t('nav.getVexar')}
          </Link>
        </div>

        <button
          className={`mobile-toggle ${menuOpen ? 'active' : ''}`}
          id="mobileToggle"
          aria-label="Toggle Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
