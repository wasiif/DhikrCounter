function RoutinesPanel({ routines, activeRoutineId, routineStep, currentPhrase, onStartRoutine, onNextStep, onPrevStep, t, language }) {
  const activeRoutine = routines.find((routine) => routine.id === activeRoutineId)
  const currentStep = activeRoutine?.entries?.[routineStep]

  return (
    <section className="panel panel-routines" id="routines">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{t('routinesLabel')}</p>
          <h2>{t('routinesTitle')}</h2>
        </div>
      </div>
      <p className="panel-description">{t('routinesDescription')}</p>

      <div className="routine-actions">
        {routines.map((routine) => (
          <button
            key={routine.id}
            type="button"
            className={`btn btn-secondary ${activeRoutineId === routine.id ? 'active' : ''}`}
            onClick={() => onStartRoutine(routine.id)}
          >
            {routine.name[language] ?? routine.name.en}
          </button>
        ))}
      </div>

      {activeRoutine ? (
        <div className="routine-current">
          <h3>{activeRoutine.name[language] ?? activeRoutine.name.en}</h3>
          <p>{activeRoutine.description[language] ?? activeRoutine.description.en}</p>
          <div className="routine-step-card">
            <span className="routine-step-label">{t('currentStep')}</span>
            <p className="routine-step-arabic">{currentStep?.arabic}</p>
            <p className="routine-step-transliteration">{currentStep?.transliteration}</p>
            <p className="routine-step-translation">{currentStep?.translation?.[language] ?? currentStep?.translation?.en}</p>
            <p className="routine-step-count">
              {t('recommendedCount')} {currentStep?.count}
            </p>
          </div>
          <div className="routine-navigation">
            <button type="button" className="btn btn-tertiary" onClick={onPrevStep} disabled={routineStep === 0}>
              {t('previous')}
            </button>
            <button type="button" className="btn btn-primary" onClick={onNextStep} disabled={routineStep >= (activeRoutine.entries.length - 1)}>
              {t('next')}
            </button>
          </div>
          <div className="routine-note">
            <p>{t('routineActiveHint')}</p>
            <p className="routine-phrase-highlight">{currentPhrase.arabic}</p>
          </div>
        </div>
      ) : (
        <p className="empty-message">{t('noRoutineActive')}</p>
      )}
    </section>
  )
}

export default RoutinesPanel
