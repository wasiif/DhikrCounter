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
  hapticEnabled,
  onToggleHaptic,
  darkMode,
  onToggleDarkMode,
  autoResetOnComplete,
  onToggleAutoReset,
  fontSizeArabic,
  onFontSizeArabicChange,
  onResetAllData,
  t,
  language,
  onLanguageChange,
}) {
  return (
    <section className="panel panel-settings" id="settings">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{t('settingsTitle')}</p>
          <h2>{t('settingsSubtitle')}</h2>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="language-select">{t('language')}</label>
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

      <div className="form-row">
        <label htmlFor="theme-select">{t('theme')}</label>
        <select
          id="theme-select"
          value={darkMode ? 'night' : 'light'}
          onChange={(event) => onToggleDarkMode(event.target.value === 'night')}
        >
          <option value="light">{t('lightMode')}</option>
          <option value="night">{t('nightMode')}</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="target-count">{t('targetRepetitions')}</label>
        <input
          id="target-count"
          type="number"
          min="1"
          value={target}
          onChange={(event) => onTargetChange(event.target.value)}
          aria-describedby="target-help"
        />
        <p id="target-help" className="help-text">
          {t('targetHelp')}
        </p>
      </div>

      <div className="form-row">
        <label>{t('phraseSelection')}</label>
        <div className="phrase-grid">
          {phrases.map((phrase, index) => (
            <button
              key={`${phrase.arabic}-${index}`}
              type="button"
              className={`phrase-chip ${selectedPhrase === index ? 'selected' : ''}`}
              onClick={() => onSelectPhrase(index)}
            >
              <span className="phrase-script">{phrase.arabic}</span>
              {phrase.transliteration ? <span className="phrase-transliteration">{phrase.transliteration}</span> : null}
              <span className="phrase-translation">{phrase.translation?.[language] ?? phrase.translation?.en}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="custom-phrase">{t('addCustomPhrase')}</label>
        <div className="custom-phrase-row">
          <input
            id="custom-phrase"
            type="text"
            value={customPhrase}
            onChange={(event) => onCustomPhraseChange(event.target.value)}
            placeholder={t('customPhrasePlaceholder')}
          />
          <button type="button" className="btn btn-primary" onClick={onAddPhrase}>
            {t('addButton')}
          </button>
        </div>
      </div>

      <div className="option-list">
        <div className="option-item">
          <span>{t('soundEffect')}</span>
          <button type="button" className={`toggle ${soundEnabled ? 'active' : ''}`} onClick={onToggleSound} aria-pressed={soundEnabled}>
            {soundEnabled ? t('on') : t('off')}
          </button>
        </div>
        <div className="option-item">
          <span>{t('hapticFeedback')}</span>
          <button type="button" className={`toggle ${hapticEnabled ? 'active' : ''}`} onClick={onToggleHaptic} aria-pressed={hapticEnabled}>
            {hapticEnabled ? t('on') : t('off')}
          </button>
        </div>
        <div className="option-item">
          <span>{t('autoReset')}</span>
          <button type="button" className={`toggle ${autoResetOnComplete ? 'active' : ''}`} onClick={onToggleAutoReset} aria-pressed={autoResetOnComplete}>
            {autoResetOnComplete ? t('on') : t('off')}
          </button>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="arabic-font-size">{t('arabicFontSize')}</label>
        <input
          id="arabic-font-size"
          type="range"
          min="0.85"
          max="1.3"
          step="0.05"
          value={fontSizeArabic}
          onChange={(event) => onFontSizeArabicChange(parseFloat(event.target.value))}
        />
        <p className="help-text">{t('arabicFontSizeHelp')}</p>
      </div>

      <div className="form-row">
        <label>{t('dataResetTitle')}</label>
        <p className="help-text">{t('dataResetHelp')}</p>
        <button type="button" className="btn btn-tertiary btn-block" onClick={onResetAllData}>
          {t('resetAllData')}
        </button>
      </div>
    </section>
  )
}

export default SettingsPanel
