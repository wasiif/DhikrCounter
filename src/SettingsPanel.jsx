function SettingsPanel({
  target,
  onTargetChange,
  phrases,
  selectedPhrase,
  onSelectPhrase,
  customPhrase,
  onCustomPhraseChange,
  onAddPhrase,
  soundEnabled,
  onToggleSound,
  vibrationEnabled,
  onToggleVibration,
  darkMode,
  onToggleDarkMode,
}) {
  return (
    <section className="panel panel-settings" id="settings">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h2>Personalize your practice</h2>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="target-count">Target repetitions</label>
        <input
          id="target-count"
          type="number"
          min="1"
          value={target}
          onChange={(event) => onTargetChange(event.target.value)}
          aria-describedby="target-help"
        />
        <p id="target-help" className="help-text">
          Set a target for the current session.
        </p>
      </div>

      <div className="form-row">
        <label>Phrase selection</label>
        <div className="phrase-grid">
          {phrases.map((phrase, index) => (
            <button
              key={phrase + index}
              type="button"
              className={`phrase-chip ${selectedPhrase === index ? 'selected' : ''}`}
              onClick={() => onSelectPhrase(index)}
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="custom-phrase">Add custom phrase</label>
        <div className="custom-phrase-row">
          <input
            id="custom-phrase"
            type="text"
            value={customPhrase}
            onChange={(event) => onCustomPhraseChange(event.target.value)}
            placeholder="Enter a phrase"
          />
          <button type="button" className="btn btn-primary" onClick={onAddPhrase}>
            Add
          </button>
        </div>
      </div>

      <div className="option-list">
        <div className="option-item">
          <span>Sound feedback</span>
          <button type="button" className={`toggle ${soundEnabled ? 'active' : ''}`} onClick={onToggleSound}>
            {soundEnabled ? 'On' : 'Off'}
          </button>
        </div>
        <div className="option-item">
          <span>Vibration</span>
          <button type="button" className={`toggle ${vibrationEnabled ? 'active' : ''}`} onClick={onToggleVibration}>
            {vibrationEnabled ? 'On' : 'Off'}
          </button>
        </div>
        <div className="option-item">
          <span>Dark mode</span>
          <button type="button" className={`toggle ${darkMode ? 'active' : ''}`} onClick={onToggleDarkMode}>
            {darkMode ? 'On' : 'Off'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default SettingsPanel
