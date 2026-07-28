function CounterPanel({
  count,
  target,
  phrase,
  progress,
  onIncrement,
  onDecrement,
  onComplete,
  onReset,
  note,
  onNoteChange,
  t,
  language,
}) {
  const isTasbihFatimah = target === 100 && count >= target
  const circumference = 2 * Math.PI * 52
  const dashOffset = circumference - (progress / 100) * circumference

  return (
    <section className={`panel panel-counter ${isTasbihFatimah ? 'tasbih-complete' : ''}`}>
      <div className="panel-header">
        <div>
          <p className="eyebrow">{t('heroLead')}</p>
          <h2>{phrase.arabic}</h2>
          <p className="phrase-detail phrase-transliteration">{phrase.transliteration}</p>
          <p className="phrase-detail phrase-translation">{phrase.translation?.[language] ?? phrase.translation?.en}</p>
        </div>
        <div className="count-badge">
          <span>{count}</span>
          <small>{t('ofTarget')} {target}</small>
        </div>
      </div>

      <div className="counter-ring-wrapper">
        <div className="counter-ring">
          <svg viewBox="0 0 128 128" className="progress-ring" aria-hidden="true">
            <circle className="ring-track" cx="64" cy="64" r="52" />
            <circle
              className="ring-fill"
              cx="64"
              cy="64"
              r="52"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>

          <button
            type="button"
            className="tap-button"
            onClick={() => onIncrement(1)}
            aria-label={t('tapToRemember')}
          >
            <span className="tap-count">{count}</span>
            <span className="tap-label">{t('tapToRemember')}</span>
          </button>
        </div>

        <p className="counter-ring-copy">
          {progress.toFixed(0)}% {t('complete')} • {Math.max(target - count, 0)} {t('toGoal')}
        </p>
      </div>

      <div className="counter-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onDecrement(5)} disabled={count === 0}>
          -5
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => onDecrement(1)} disabled={count === 0}>
          -1
        </button>
        <button type="button" className="btn btn-primary" onClick={() => onIncrement(5)}>
          +5
        </button>
        <button type="button" className="btn btn-primary" onClick={() => onIncrement(10)}>
          +10
        </button>
      </div>

      <div className="session-actions">
        <button type="button" className="btn btn-tertiary" onClick={onReset}>
          {t('resetCounter')}
        </button>
        <button type="button" className="btn btn-success" onClick={onComplete} disabled={count === 0}>
          {t('completeSession')}
        </button>
      </div>

      <div className="note-panel">
        <label htmlFor="session-note">{t('sessionNoteLabel')}</label>
        <textarea
          id="session-note"
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder={t('sessionNotePlaceholder')}
          rows={4}
        />
      </div>
    </section>
  )
}

export default CounterPanel
