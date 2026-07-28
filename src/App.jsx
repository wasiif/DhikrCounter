import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import CounterPanel from './CounterPanel.jsx'
import SettingsPanel from './SettingsPanel.jsx'
import SessionHistory from './SessionHistory.jsx'
import DhikrLibrary from './DhikrLibrary.jsx'
import RoutinesPanel from './RoutinesPanel.jsx'
import AsmaHusna from './AsmaHusna.jsx'
import { DEFAULT_LANGUAGE, DEFAULT_PHRASES, translations } from './i18n.js'
import { ESSENTIAL_ADHKAR, ROUTINES } from './data.js'

const STORAGE_KEY = 'dhikr-counter-app-state'
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

  const normalizePhrase = (phrase) => {
    if (typeof phrase === 'string') {
      return {
        arabic: phrase,
        transliteration: '',
        translation: { en: phrase, ar: phrase, ur: phrase },
      }
    }
    return phrase
  }

  const savedState = useMemo(() => loadSavedState(), [])
  const [count, setCount] = useState(savedState.count ?? 0)
  const [target, setTarget] = useState(savedState.target ?? DEFAULT_TARGET)
  const [selectedPhrase, setSelectedPhrase] = useState(savedState.selectedPhrase ?? 0)
  const [phrases, setPhrases] = useState(
    savedState.phrases?.length
      ? savedState.phrases.map(normalizePhrase)
      : ESSENTIAL_ADHKAR,
  )
  const [customPhrase, setCustomPhrase] = useState(savedState.customPhrase ?? '')
  const [soundEnabled, setSoundEnabled] = useState(savedState.soundEnabled ?? true)
  const [vibrationEnabled, setVibrationEnabled] = useState(savedState.vibrationEnabled ?? true)
  const [darkMode, setDarkMode] = useState(savedState.darkMode ?? false)
  const [history, setHistory] = useState(savedState.history ?? [])
  const [note, setNote] = useState(savedState.note ?? '')
  const [language, setLanguage] = useState(savedState.language ?? DEFAULT_LANGUAGE)
  const [activeRoutineId, setActiveRoutineId] = useState(savedState.activeRoutineId ?? null)
  const [routineStep, setRoutineStep] = useState(savedState.routineStep ?? 0)
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
      language,
      activeRoutineId,
      routineStep,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [count, target, phrases, selectedPhrase, customPhrase, soundEnabled, vibrationEnabled, darkMode, history, note, sessionStart, language, activeRoutineId, routineStep])

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', darkMode)
    document.documentElement.classList.toggle('rtl', language !== 'en')
    document.documentElement.dir = language !== 'en' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [darkMode, language])

  const activePhrase = phrases[selectedPhrase] || phrases[0] || DEFAULT_PHRASES[0]
  const progress = target > 0 ? Math.min((count / target) * 100, 100) : 0
  const t = (key) => translations[language]?.[key] || translations.en[key] || key

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

    const customEntry = {
      arabic: trimmed,
      transliteration: '',
      translation: { en: trimmed, ar: trimmed, ur: trimmed },
    }

    const nextPhrases = [...phrases, customEntry]
    setPhrases(nextPhrases)
    setSelectedPhrase(nextPhrases.length - 1)
    setCustomPhrase('')
  }

  const handleSetPhrase = (index) => {
    const selected = phrases[index]
    setSelectedPhrase(index)
    setCount(0)
    setTarget(selected?.recommendedCount ?? ESSENTIAL_ADHKAR[index]?.recommendedCount ?? DEFAULT_TARGET)
    setActiveRoutineId(null)
    setRoutineStep(0)
  }

  const handleStartRoutine = (routineId) => {
    setActiveRoutineId(routineId)
    setRoutineStep(0)
    const routine = ROUTINES.find((item) => item.id === routineId)
    if (routine?.entries?.length) {
      const firstEntry = routine.entries[0]
      const phraseIndex = ESSENTIAL_ADHKAR.findIndex((entry) => entry.arabic === firstEntry.arabic)
      setSelectedPhrase(phraseIndex >= 0 ? phraseIndex : 0)
      setTarget(firstEntry.count)
      setCount(0)
    }
  }

  const handleActivateAsmaName = (nameEntry) => {
    const nextPhrases = [...phrases, nameEntry]
    const nextIndex = nextPhrases.length - 1
    setPhrases(nextPhrases)
    setSelectedPhrase(nextIndex)
    setTarget(nameEntry.recommendedCount ?? 99)
    setCount(0)
    setActiveRoutineId(null)
    setRoutineStep(0)
  }

  const handleNextRoutineStep = () => {
    if (!activeRoutineId) {
      return
    }
    const routine = ROUTINES.find((item) => item.id === activeRoutineId)
    if (!routine?.entries?.length) {
      return
    }
    const nextStep = Math.min(routine.entries.length - 1, routineStep + 1)
    const nextDefinition = routine.entries[nextStep]
    setRoutineStep(nextStep)
    const phraseIndex = ESSENTIAL_ADHKAR.findIndex((entry) => entry.arabic === nextDefinition.arabic)
    setSelectedPhrase(phraseIndex >= 0 ? phraseIndex : 0)
    setTarget(nextDefinition.count)
    setCount(0)
  }

  const handlePrevRoutineStep = () => {
    if (!activeRoutineId) {
      return
    }
    const routine = ROUTINES.find((item) => item.id === activeRoutineId)
    if (!routine?.entries?.length) {
      return
    }
    const prevStep = Math.max(0, routineStep - 1)
    const prevDefinition = routine.entries[prevStep]
    setRoutineStep(prevStep)
    const phraseIndex = ESSENTIAL_ADHKAR.findIndex((entry) => entry.arabic === prevDefinition.arabic)
    setSelectedPhrase(phraseIndex >= 0 ? phraseIndex : 0)
    setTarget(prevDefinition.count)
    setCount(0)
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
    <div className={`app-shell ${language !== 'en' ? 'rtl' : ''}`}>
      <Header
        count={count}
        target={target}
        onReset={handleReset}
        t={t}
        language={language}
        onLanguageChange={setLanguage}
      />

      <main className="app-content">
        <section className="hero-card" id="about">
          <div>
            <p className="eyebrow">{t('heroLead')}</p>
            <h1>{t('appTitle')}</h1>
            <p className="hero-text">{t('heroText')}</p>
          </div>
 
          <div className="summary-grid">
            <article className="summary-card">
              <p className="summary-label">{t('activeGoal')}</p>
              <strong>{target} {t('repetitions')}</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">{t('totalToday')}</p>
              <strong>{summary.totalDhikr}</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">{t('completedSessions')}</p>
              <strong>{summary.totalSessions}</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">{t('currentStreak')}</p>
              <strong>{summary.streak} {t('days')}</strong>
            </article>
            <article className="summary-card">
              <p className="summary-label">{t('averageSession')}</p>
              <strong>{summary.averageSession} {t('repetitions')}</strong>
            </article>
          </div>
        </section>
 
        <section className="library-section">
          <div className="section-header">
            <h2>{t('dhikrLibraryTitle')}</h2>
            <p>{t('dhikrLibraryDescription')}</p>
          </div>
          <div className="feature-grid">
            <DhikrLibrary
              phrases={ESSENTIAL_ADHKAR}
              selectedPhrase={selectedPhrase}
              onSelectPhrase={handleSetPhrase}
              t={t}
              language={language}
            />
            <RoutinesPanel
              routines={ROUTINES}
              activeRoutineId={activeRoutineId}
              routineStep={routineStep}
              currentPhrase={activePhrase}
              onStartRoutine={handleStartRoutine}
              onNextStep={handleNextRoutineStep}
              onPrevStep={handlePrevRoutineStep}
              t={t}
              language={language}
            />
            <AsmaHusna
              onSelectName={handleActivateAsmaName}
              t={t}
              language={language}
            />
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
            t={t}
            language={language}
          />

          <div className="side-column">
            <SettingsPanel
              target={target}
              onTargetChange={handleTargetChange}
              phrases={phrases}
              selectedPhrase={selectedPhrase}
              onSelectPhrase={handleSetPhrase}
              customPhrase={customPhrase}
              onCustomPhraseChange={setCustomPhrase}
              onAddPhrase={handleAddPhrase}
              soundEnabled={soundEnabled}
              onToggleSound={() => setSoundEnabled((active) => !active)}
              vibrationEnabled={vibrationEnabled}
              onToggleVibration={() => setVibrationEnabled((active) => !active)}
              darkMode={darkMode}
              onToggleDarkMode={() => setDarkMode((active) => !active)}
              t={t}
              language={language}
              onLanguageChange={setLanguage}
            />
            <SessionHistory history={history} onClearHistory={handleClearHistory} t={t} language={language} />
          </div>
        </div>
      </main>

      <Footer year={new Date().getFullYear()} sessions={summary.totalSessions} totalDhikr={summary.totalDhikr} t={t} />
    </div>
  )
}

export default App;
