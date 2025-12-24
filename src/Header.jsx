function Header({ count = 0, onReset }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#eaeaea" />
            <path d="M12 6v6l4 2" stroke="#c42525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="header-title">
          <h1>Dhikr Counter</h1>
          <p className="subtitle">Mindful remembrance, one bead at a time</p>
        </div>
      </div>

      <div className="header-right">
        <nav className="header-nav" aria-label="Main navigation">
          <a className="nav-link" href="#">Home</a>
          <a className="nav-link" href="#about">About</a>
          <a className="nav-link" href="#settings">Settings</a>
        </nav>

        <div className="counter">
          <span className="counter-label">Count</span>
          <span className="counter-value">{count}</span>
          {typeof onReset === 'function' && (
            <button className="btn-reset" onClick={onReset} aria-label="Reset counter">Reset</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;