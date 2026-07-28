import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CounterPanel from './CounterPanel.jsx'
import SettingsPanel from './SettingsPanel.jsx'
import SessionHistory from './SessionHistory.jsx'

const STORAGE_KEY = 'dhikr-counter-app-state'
const DEFAULT_PHRASES = [
  'SubhanAllah',
  'Alhamdulillah',
  'Allahu Akbar',
  'La ilaha illallah',
  'Astaghfirullah',
]
const DEFAULT_TARGET = 33

function App() {
  const loadSavedState = () => {
    if (typeof window === 'undefined') {
      return {}
    }

    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return {}
    }

    try {
      const state = JSON.parse(saved)
      return state || {}
    } catch (error) {
      console.warn('Unable to load saved Dhikr Counter state.', error)
      return {}
    }
  }

  const savedState = useMemo(() => loadSavedState(), [])
  const [count, setCount] = useState(savedState.count ?? 0)
  const [target, setTarget] = useState(savedState.target ?? DEFAULT_TARGET)
  const [selectedPhrase, setSelectedPhrase] = useState(savedState.selectedPhrase ?? 0)
  const [phrases, setPhrases] = useState(savedState.phrases?.length ? savedState.phrases : DEFAULT_PHRASES)
  const [customPhrase, setCustomPhrase] = useState(savedState.customPhrase ?? '')
  const [soundEnabled, setSoundEnabled] = useState(savedState.soundEnabled ?? true)
  const [vibrationEnabled, setVibrationEnabled] = useState(savedState.vibrationEnabled ?? true)
  const [darkMode, setDarkMode] = useState(savedState.darkMode ?? false)
  const [history, setHistory] = useState(savedState.history ?? [])
  const [note, setNote] = useState(savedState.note ?? '')
  const [sessionStart, setSessionStart] = useState(() => savedState.sessionStart ?? Date.now())

  useEffect(() => {
    const state = {
      count,
      target,
      phrases,
      selectedPhrase,
      customPhrase,
      soundEnabled,
      vibrationEnabled,
      darkMode,
      history,
      note,
      sessionStart,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [count, target, phrases, selectedPhrase, customPhrase, soundEnabled, vibrationEnabled, darkMode, history, note, sessionStart])

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', darkMode)
  }, [darkMode])

  const activePhrase = phrases[selectedPhrase] || customPhrase || DEFAULT_PHRASES[0]
  const progress = target > 0 ? Math.min((count / target) * 100, 100) : 0

  const playFeedback = () => {
    if (vibrationEnabled && navigator.vibrate) {
      navigator.vibrate(18)
    }

    if (!soundEnabled || typeof window === 'undefined') {
      return
    }

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gain = audioContext.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = 440
      gain.gain.value = 0.08
      oscillator.connect(gain)
      gain.connect(audioContext.destination)
      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.04)
      oscillator.onended = () => audioContext.close()
    } catch (error) {
      console.warn('Feedback sound is not available on this device.', error)
    }
  }

  const handleIncrement = (value = 1) => {
    setCount((previous) => Math.max(0, previous + value))
    playFeedback()
  }

  const handleDecrement = (value = 1) => {
    setCount((previous) => Math.max(0, previous - value))
    playFeedback()
  }

  const handleReset = () => {
    setCount(0)
    setNote('')
    setSessionStart(Date.now())
  }

  const handleCompleteSession = () => {
    if (count <= 0) {
      return
    }

    const now = Date.now()
    const durationMinutes = Math.max(1, Math.round((now - sessionStart) / 60000))
    const session = {
      id: `${now}`,
      phrase: activePhrase,
      count,
      target,
      note: note.trim(),
      completedAt: now,
      durationMinutes,
    }

    setHistory((previous) => [session, ...previous].slice(0, 10))
    setCount(0)
    setNote('')
    setSessionStart(now)
  }

  const handleAddPhrase = () => {
    const trimmed = customPhrase.trim()
    if (!trimmed) {
      return
    }

    const nextPhrases = [...phrases, trimmed]
    setPhrases(nextPhrases)
    setSelectedPhrase(nextPhrases.length - 1)
    setCustomPhrase('')
  }

  const handleTargetChange = (value) => {
    const nextTarget = parseInt(value, 10)
    if (!Number.isNaN(nextTarget) && nextTarget > 0) {
      setTarget(nextTarget)
    }
  }

  const handleClearHistory = () => {
    setHistory([])
  }

  const summary = useMemo(() => {
    const totalSessions = history.length
    const totalDhikr = history.reduce((sum, item) => sum + item.count, 0) + count
    const averageSession = history.length ? Math.round(history.reduce((sum, item) => sum + item.count, 0) / history.length) : 0

    const completedDates = Array.from(
      new Set(history.map((item) => new Date(item.completedAt).toISOString().slice(0, 10))),
    ).sort((a, b) => (a < b ? 1 : -1))

    let streak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const cursor = new Date(today)

    const hasToday = completedDates[0] === today.toISOString().slice(0, 10)
    if (!hasToday) {
      cursor.setDate(cursor.getDate() - 1)
    }

    while (completedDates.includes(cursor.toISOString().slice(0, 10))) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    }

    return {
      totalSessions,
      totalDhikr,
      averageSession,
      streak,
    }
  }, [history, count])

  return (
    <div className="app-shell">
      <Header count={count} target={target} onReset={handleReset} />

      <main className="app-content">
        <section className="hero-card" id="about">
          <div>
            <p className="eyebrow">Advanced remembrance tracker</p>
            <h1>Stay focused with every dhikr</h1>
            <p className="hero-text">
              Track your repetitions, build consistent sessions, and save meaningful history without leaving your flow.
            </p>
          </div>

          <div className="summary-grid">
            <article className="summary-card">
              <p className="summary-label">Active goal</p>
              <strong>{target} repetitions</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">Total today</p>
              <strong>{summary.totalDhikr}</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">Completed sessions</p>
              <strong>{summary.totalSessions}</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">Current streak</p>
              <strong>{summary.streak} day{summary.streak === 1 ? '' : 's'}</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">Average session</p>
              <strong>{summary.averageSession} recitations</strong>
            </article>
          </div>
        </section>

        <div className="grid-two-col">
          <CounterPanel
            count={count}
            target={target}
            phrase={activePhrase}
            progress={progress}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onComplete={handleCompleteSession}
            onReset={handleReset}
            note={note}
            onNoteChange={setNote}
          />

          <div className="side-column">
            <SettingsPanel
              target={target}
              onTargetChange={handleTargetChange}
              phrases={phrases}
              selectedPhrase={selectedPhrase}
              onSelectPhrase={setSelectedPhrase}
              customPhrase={customPhrase}
              onCustomPhraseChange={setCustomPhrase}
              onAddPhrase={handleAddPhrase}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled((active) => !active)}
              vibrationEnabled={vibrationEnabled}
              onToggleVibration={() => setVibrationEnabled((active) => !active)}
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode((active) => !active)}
            />
            <SessionHistory history={history} onClearHistory={handleClearHistory} />
          </div>
        </div>
      </main>

      <Footer year={new Date().getFullYear()} sessions={summary.totalSessions} totalDhikr={summary.totalDhikr} />
    </div>
  )
}

export default App;
