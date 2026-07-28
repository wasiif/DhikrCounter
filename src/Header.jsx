function Header({ count = 0, target = 0, onReset, t, language, onLanguageChange }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#e9f4ec" />
            <path d="M12 6v6l4 2" stroke="#0f4c3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="header-title">
          <h1>{t('appTitle')}</h1>
          <p className="subtitle">{t('subtitle')}</p>
        </div>
      </div>

      <div className="header-right">
        <nav className="header-nav" aria-label={t('navigation')}>
          <a className="nav-link" href="#home">{t('home')}</a>
          <a className="nav-link" href="#about">{t('about')}</a>
          <a className="nav-link" href="#settings">{t('settingsTitle')}</a>
          <a className="nav-link" href="#history">{t('historyTitle')}</a>
        </nav>

        <div className="header-status">
          <div className="counter">
            <span className="counter-label">{t('countLabel')}</span>
            <span className="counter-value">{count}</span>
            <span className="target-label">{t('ofTarget')} {target}</span>
            {typeof onReset === 'function' && (
              <button className="btn-reset" onClick={onReset} aria-label={t('resetCounter')}>
                {t('resetCounter')}
              </button>
            )}
          </div>

          <div className="language-switcher">
            <label htmlFor="language-select" className="screen-reader-only">
              {t('language')}
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(event) => onLanguageChange(event.target.value)}
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="ur">اردو</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
