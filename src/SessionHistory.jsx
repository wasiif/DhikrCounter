function SessionHistory({ history, onClearHistory, t, language }) {
  const grouped = history.reduce((acc, session) => {
    const date = new Date(session.completedAt).toLocaleDateString()
    acc[date] = acc[date] || []
    acc[date].push(session)
    return acc
  }, {})

  const phraseValue = (phrase) => {
    if (!phrase) {
      return ''
    }
    if (typeof phrase === 'string') {
      return phrase
    }
    return phrase.arabic || phrase.transliteration || phrase.translation?.[language] || phrase.translation?.en || ''
  }

  const exportHistory = (format) => {
    const sanitizedHistory = history.map((session) => ({
      phrase: phraseValue(session.phrase),
      count: session.count,
      target: session.target,
      note: session.note,
      completedAt: new Date(session.completedAt).toISOString(),
      durationMinutes: session.durationMinutes,
    }))

    let payload
    let fileName = 'dhikr-history'

    if (format === 'csv') {
      fileName += '.csv'
      const header = ['Phrase', 'Count', 'Target', 'Note', 'Finished At', 'Duration (min)']
      const rows = sanitizedHistory.map((entry) => [
        `"${entry.phrase.replace(/"/g, '""')}"`,
        entry.count,
        entry.target,
        `"${entry.note.replace(/"/g, '""')}"`,
        entry.completedAt,
        entry.durationMinutes,
      ].join(','))
      payload = [header.join(','), ...rows].join('\n')
    } else {
      fileName += '.json'
      payload = JSON.stringify(sanitizedHistory, null, 2)
    }

    const blob = new Blob([payload], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = fileName
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="panel panel-history" id="history">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{t('historyTitle')}</p>
          <h2>{t('historySubtitle')}</h2>
        </div>
        <div className="history-actions">
          <button type="button" className="btn btn-secondary" onClick={() => exportHistory('json')} disabled={history.length === 0}>
            {t('exportJSON')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => exportHistory('csv')} disabled={history.length === 0}>
            {t('exportCSV')}
          </button>
        </div>
      </div>

      {history.length === 0 ? (
        <p className="empty-message">{t('noHistory')}</p>
      ) : (
        Object.entries(grouped).map(([date, sessions]) => (
          <div key={date} className="history-group">
            <h3>{date}</h3>
            <ul>
              {sessions.map((session) => (
                <li key={session.id} className="history-row">
                  <div>
                    <strong>{phraseValue(session.phrase)}</strong>
                    <p>{session.count} {t('repetitions')} · {session.durationMinutes} min</p>
                    {session.phrase?.transliteration ? <p className="history-subtext">{session.phrase.transliteration}</p> : null}
                  </div>
                  <div className="history-meta">
                    <span>{t('targetRepetitions')} {session.target}</span>
                    {session.note ? <p>{session.note}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      <div className="history-clear">
        <button type="button" className="btn btn-tertiary" onClick={onClearHistory} disabled={history.length === 0}>
          {t('clearHistory')}
        </button>
      </div>
    </section>
  )
}

export default SessionHistory
