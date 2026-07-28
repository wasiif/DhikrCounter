import { ESSENTIAL_ADHKAR } from './data.js'

function DhikrLibrary({ phrases = ESSENTIAL_ADHKAR, selectedPhrase, onSelectPhrase, t, language }) {
  return (
    <section className="panel panel-library" id="library">
      <div className="panel-header">
        <div>
          <p className="eyebrow">{t('dhikrLibraryLabel')}</p>
          <h2>{t('dhikrLibraryTitle')}</h2>
        </div>
      </div>
      <p className="panel-description">{t('dhikrLibraryDescription')}</p>
      <div className="phrase-list">
        {phrases.map((phrase, index) => (
          <button
            key={`${phrase.arabic}-${index}`}
            type="button"
            className={`phrase-card ${selectedPhrase === index ? 'selected' : ''}`}
            onClick={() => onSelectPhrase(index)}
          >
            <span className="phrase-card-arabic">{phrase.arabic}</span>
            <span className="phrase-card-transliteration">{phrase.transliteration}</span>
            <span className="phrase-card-translation">{phrase.translation?.[language] ?? phrase.translation?.en}</span>
            <span className="phrase-card-count">{t('recommendedCount')} {phrase.recommendedCount}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default DhikrLibrary
