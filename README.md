# 🗳️ ElectraGuide — AI-Powered Voter Education Platform

🔗 **Live Demo:** [https://electraguideai.netlify.app](https://electraguideai.netlify.app)

ElectraGuide is an intelligent, interactive platform that educates citizens about the Indian electoral process. It provides step-by-step voting guidance, an AI-powered chat assistant, realistic polling-booth simulations, quizzes, and a comprehensive election timeline — all in a visually engaging interface.

## ✨ Features

- **🤖 AI Chat Assistant** — Ask election-related questions and get instant, fact-based answers powered by Google Gemini AI
- **🗳️ Polling Booth Simulation** — Experience a realistic, step-by-step walkthrough of the EVM voting process with sound effects
- **📋 Interactive Guidance** — Visual step-by-step voter registration and eligibility checker
- **📅 Election Timeline** — Interactive timeline covering the full Indian election process from announcement to results
- **🧠 Quiz Section** — Test your knowledge with multiple-choice election trivia (scores saved per user)
- **❓ FAQ Module** — Searchable, categorized answers to common voter questions
- **🔐 Google Sign-In** — Authenticate with Google to save your quiz scores and track learning progress
- **🌐 Multilingual Support** — Full English & Hindi language toggle
- **🔊 Text-to-Speech** — Listen to content for accessibility
- **♿ Accessibility** — ARIA labels, keyboard navigation, skip-to-content, screen reader support, reduced motion
- **📊 Analytics** — Firebase Analytics tracking for user engagement insights
- **🎨 Premium UI** — Glassmorphic design with smooth animations and a patriotic colour scheme

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8 |
| Styling | Tailwind CSS, Google Fonts (Inter), custom glassmorphism |
| AI | Google Gemini API (`@google/generative-ai`) |
| Authentication | Firebase Auth (Google Sign-In) |
| Database | Cloud Firestore (user profiles, quiz scores, progress) |
| Analytics | Firebase Analytics (event tracking) |
| Animations | Framer Motion, CSS transitions |
| Testing | Vitest, React Testing Library (23 tests) |
| Icons | Lucide React |
| Effects | Canvas Confetti |
| Deployment | Netlify |

## 🧪 Testing

The project includes **23 unit tests** across 4 test suites:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

| Test Suite | Tests | Coverage |
|-----------|-------|----------|
| AppContext | 8 | Language toggle, TTS, translations, edge cases |
| AuthContext | 4 | Default state, progress values, loading, rendering |
| AI Utility | 5 | API key validation, mocked responses, error handling |
| QuizSection | 6 | Rendering, answer selection, accessibility, ARIA roles |

## 🔥 Google Cloud Integration

| Service | Usage |
|---------|-------|
| **Firebase Auth** | Google Sign-In popup, auth state persistence, user profiles |
| **Cloud Firestore** | User profiles, quiz score history, learning progress tracking |
| **Firebase Analytics** | Chat interactions, quiz completions, simulation events, navigation |
| **Gemini AI** | Conversational AI assistant for election education |

## ♿ Accessibility

- Skip-to-content link for keyboard users
- ARIA landmarks (`main`, `navigation`, `complementary`)
- `aria-live` regions for chat messages and typing indicators
- `aria-label`, `aria-pressed`, `aria-expanded` on all interactive elements
- `role="log"` for chat, `role="radiogroup"` for quiz answers
- Focus-visible ring styles for keyboard navigation
- `prefers-reduced-motion` media query support
- Screen-reader-only (`.sr-only`) utility class

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A Google Gemini API key

### Installation

```bash
# Clone the repository
git clone https://github.com/Ganu39/hack2skill.git
cd hack2skill

# Install dependencies
npm install

# Create a .env file with your Gemini API key
echo VITE_GEMINI_API_KEY=your_api_key_here > .env

# Run tests
npm run test

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
hack2skill/
├── public/                # Static assets (favicon, icons, images)
├── src/
│   ├── __tests__/         # Unit tests (Vitest + Testing Library)
│   │   ├── AppContext.test.jsx
│   │   ├── AuthContext.test.jsx
│   │   ├── QuizSection.test.jsx
│   │   ├── ai.test.js
│   │   └── setup.js
│   ├── assets/            # Image assets
│   ├── components/        # React components
│   │   ├── ChatAssistant.jsx
│   │   ├── ElectionTimeline.jsx
│   │   ├── FAQSection.jsx
│   │   ├── InteractiveGuidance.jsx
│   │   ├── Onboarding.jsx
│   │   ├── PollingSimulation.jsx
│   │   ├── QuizSection.jsx
│   │   └── TopNav.jsx
│   ├── context/           # Global state management
│   │   ├── AppContext.jsx  # Language, TTS
│   │   └── AuthContext.jsx # Firebase Auth, user progress
│   ├── data/              # Simulation scenarios
│   ├── utils/             # Utilities
│   │   ├── ai.js           # Gemini AI integration
│   │   ├── firebase.js     # Firebase Auth, Firestore, Analytics
│   │   ├── quizBank.js     # Quiz question bank
│   │   └── translations.js # EN/HI translations
│   ├── App.jsx            # Main application
│   ├── App.css            # Component styles
│   ├── index.css          # Global styles + accessibility
│   └── main.jsx           # Entry point
├── index.html             # SEO meta tags, Open Graph, Google Fonts
├── vitest.config.js       # Test configuration
├── tailwind.config.js
├── package.json
└── vite.config.js
```

## 📜 License

This project was built for the Hack2Skill hackathon.

---

Built with ❤️ by [Ganu39](https://github.com/Ganu39)
