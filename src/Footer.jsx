function Footer({ year = new Date().getFullYear() }) {
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
          <p className="footer-sub">Mindful remembrance, one bead at a time</p>
        </div>
      </div>

      <div className="footer-right">
        <nav className="footer-nav" aria-label="Footer navigation">
          <a className="nav-link" href="#">Privacy</a>
          <a className="nav-link" href="#contact">Contact</a>
          <a className="nav-link" href="#help">Help</a>
        </nav>

        <div className="footer-copy">© {year} Dhikr Counter</div>
      </div>
    </footer>
  );
}

export default Footer;
