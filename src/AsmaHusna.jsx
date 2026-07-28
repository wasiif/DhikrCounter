import { ASMA_NAMES } from './data.js'

function AsmaHusna({ onSelectName, t, language }) {
  return (
    <section className="panel panel-asma" id="asma">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{t('asmaLabel')}</p>
          <h2>{t('asmaTitle')}</h2>
        </div>
      </div>
      <p className="panel-description">{t('asmaDescription')}</p>
      <div className="asma-grid">
        {ASMA_NAMES.map((name, index) => (
          <button
            key={`${name.arabic}-${index}`}
            type="button"
            className="asma-card"
            onClick={() => onSelectName({
              arabic: name.arabic,
              transliteration: name.transliteration,
              translation: {
                en: `${name.meaning}`,
                ar: name.meaning,
                ur: name.meaning,
              },
              recommendedCount: 99,
            })}
          >
            <span className="asma-arabic">{name.arabic}</span>
            <span className="asma-transliteration">{name.transliteration}</span>
            <span className="asma-meaning">{language === 'ar' ? name.meaning : name.meaning}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default AsmaHusna
