function Footer({ year = new Date().getFullYear(), sessions = 0, totalDhikr = 0 }) {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="logo" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#f3f3f3" />
            <path d="M12 7v5l3 1.5" stroke="#c42525" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="footer-info">
          <h2>Dhikr Counter</h2>
          <p className="footer-sub">Practice intentionally with focus, streaks, and history.</p>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-meta">
          <span>{sessions} sessions</span>
          <span>{totalDhikr} total</span>
        </div>
        <div className="footer-copy">© {year} Dhikr Counter</div>
      </div>
    </footer>
  )
}

export default Footer
