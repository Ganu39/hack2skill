# 🗳️ ElectraGuide — AI-Powered Voter Education Platform

🔗 **Live Demo:** [https://phenomenal-choux-e72d4e.netlify.app](https://phenomenal-choux-e72d4e.netlify.app)

ElectraGuide is an intelligent, interactive platform that educates citizens about the Indian electoral process. It provides step-by-step voting guidance, an AI-powered chat assistant, realistic polling-booth simulations, quizzes, and a comprehensive election timeline — all in a visually engaging interface.

## ✨ Features

- **🤖 AI Chat Assistant** — Ask election-related questions and get instant, fact-based answers powered by Google Gemini AI
- **🗳️ Polling Booth Simulation** — Experience a realistic, step-by-step walkthrough of the EVM voting process with sound effects
- **📋 Interactive Guidance** — Visual step-by-step voter registration and eligibility checker
- **📅 Election Timeline** — Interactive timeline covering the full Indian election process from announcement to results
- **🧠 Quiz Section** — Test your knowledge with multiple-choice election trivia
- **❓ FAQ Module** — Searchable, categorized answers to common voter questions
- **🌐 Multilingual Support** — Full English & Hindi language toggle
- **🔊 Text-to-Speech** — Listen to content for accessibility
- **🎨 Premium UI** — Glassmorphic design with smooth animations and a patriotic colour scheme

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite |
| Styling | Tailwind CSS, custom glassmorphism |
| AI | Google Gemini API (`@google/generative-ai`) |
| Animations | Framer Motion, CSS transitions |
| Icons | Lucide React |
| Effects | Canvas Confetti |

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

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
hack2skill/
├── public/              # Static assets (favicon, icons, images)
├── src/
│   ├── assets/          # Image assets
│   ├── components/      # React components
│   │   ├── ChatAssistant.jsx
│   │   ├── ElectionTimeline.jsx
│   │   ├── FAQSection.jsx
│   │   ├── InteractiveGuidance.jsx
│   │   ├── Onboarding.jsx
│   │   ├── PollingSimulation.jsx
│   │   ├── QuizSection.jsx
│   │   └── TopNav.jsx
│   ├── context/         # Global state (AppContext)
│   ├── data/            # Simulation scenarios
│   ├── utils/           # AI helper, quiz bank, translations
│   ├── App.jsx          # Main application
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 📸 Screenshots

> Run the app locally with `npm run dev` to see the full experience!

## 📜 License

This project was built for the Hack2Skill hackathon.

---

Built with ❤️ by [Ganu39](https://github.com/Ganu39)
