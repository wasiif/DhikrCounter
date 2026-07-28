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
}) {
  const targetReached = count >= target

  return (
    <section className="panel panel-counter">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Current dhikr</p>
          <h2>{phrase}</h2>
        </div>
        <div className="count-badge">
          <span>{count}</span>
          <small>of {target}</small>
        </div>
      </div>

      <div className="progress-bar" aria-label="Progress towards target">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-copy">{progress.toFixed(0)}% complete</p>

      <div className="counter-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onDecrement(5)} disabled={count === 0}>
          -5
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => onDecrement(1)} disabled={count === 0}>
          -1
        </button>
        <button type="button" className="btn btn-primary" onClick={() => onIncrement(1)}>
          +1
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
          Reset Counter
        </button>
        <button type="button" className="btn btn-success" onClick={onComplete} disabled={count === 0}>
          {targetReached ? 'Complete Session' : 'Complete Session'}
        </button>
      </div>

      <div className="note-panel">
        <label htmlFor="session-note">Session note</label>
        <textarea
          id="session-note"
          value={note}
          onChange={(event) => onNoteChange(event.target.value)}
          placeholder="Record your intention or gratitude for this session"
          rows={4}
        />
      </div>
    </section>
  )
}

export default CounterPanel
