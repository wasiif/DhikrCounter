function Footer({ year = new Date().getFullYear(), sessions = 0, totalDhikr = 0, t }) {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="logo" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#f4f1e5" />
            <path d="M12 7v5l3 1.5" stroke="#0f4c3a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="footer-info">
          <h2>{t('appTitle')}</h2>
          <p className="footer-sub">{t('subtitle')}</p>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-meta">
          <span>{sessions} {t('completedSessions')}</span>
          <span>{totalDhikr} {t('repetitions')}</span>
        </div>
        <div className="footer-copy">© {year} Dhikr Counter</div>
      </div>
    </footer>
  )
}

export default Footer
