# Dhikr Counter

Dhikr Counter is an advanced mindfulness tracker built with React and Vite. It is designed for daily devotional use, helping users track repetitions, manage session goals, capture notes, and maintain a consistent practice with progress history.

## What’s included

- Custom phrase library and selectable Dhikr phrases
- Essential Dhikr library with recommended repeat counts for core adhkar
- Tasbih Fatimah and Morning & Evening adhkar routines with guided step navigation
- Asma-ul-Husna reference screen for the 99 beautiful names of Allah
- Target-based progress tracking with animated circular progress ring
- Session completion workflow with notes and grouped history
- Export history to JSON or CSV for personal record keeping
- Dark mode, sound feedback, and vibration toggles
- Daily streak tracking to encourage consistent sessions
- Full multilingual support: English, Arabic, Urdu with RTL layout handling
- Calm premium interface with sacred color palette, gentle animations, and night mode

## Tech stack

- React 19
- Vite 8
- ESLint 10
- Plain CSS for responsive UI styling

## Getting started

1. Clone the repository:

```bash
git clone git@github.com:wasiif/DhikrCounter.git
cd Dhikr-Counter
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm run preview
```

## Project structure

- `src/`
  - `App.jsx` — main application shell and state management
  - `CounterPanel.jsx` — central counter UI and session controls
  - `SettingsPanel.jsx` — personalization and toggles
  - `SessionHistory.jsx` — saved session timeline and exports
  - `DhikrLibrary.jsx` — essential adhkar reference and quick selection
  - `RoutinesPanel.jsx` — guided Tasbih Fatimah and daily adhkar routines
  - `AsmaHusna.jsx` — browsable 99 Names of Allah reference
  - `Header.jsx` / `Footer.jsx` — layout chrome and metadata
  - `main.jsx` — app entry point
  - `App.css`, `index.css` — app-wide styling

## Security and quality

- App logic has been validated with `npm run lint`
- Production build verified with `npm run build`
- Dependencies were updated to remove known high-severity audit issues
- Local storage access is guarded to avoid non-browser execution failures

## Notes

This project is designed as a client-side web app. Session state and history are stored locally in the browser and are not uploaded to any external server.

## Contributing

Contributions are welcome. If you plan to contribute:

- Create a feature branch
- Keep the change scope narrow
- Run `npm run lint` and `npm run build` before submitting

---


