# OptiMSP Intelligence Hub
A comprehensive MSP (Managed Service Provider) dashboard with integrated AI agent for business optimization, real-time analytics, and intelligent insights.

🎯 Problem Statement

MSPs struggle with:
- Manual cost optimization processes
- Reactive client management
- Limited business intelligence visibility
- Inefficient resource allocation

💡 Solution

OptiMSP Intelligence Hub provides:
- **AI-Powered Insights** - OpenAI integration for intelligent business recommendations
- **Real-Time Dashboard** - Live metrics and performance monitoring
- **Cost Optimization** - Automated savings identification
- **Client Analytics** - Retention tracking and risk alerts
- **Interactive Visualizations** - Dynamic charts and data exploration

🌟 Key Features

- **AI Business Agent** - Chat interface with MSP-specialized AI assistant
- **Live Metrics Dashboard** - Revenue, margins, client retention tracking
- **Smart Alerts System** - Proactive notifications and risk management
- **Performance Monitor** - Real-time system health and team productivity
- **Theme Customization** - Multiple color schemes and personalization
- **Export Capabilities** - Data export for reporting and analysis

🚀 Quick Start

Prerequisites
- Node.js 18+
- OpenAI API key (optional - runs with mock data without it)

Installation & Setup
```bash
npm install
cp .env.example .env
npm run dev
```

Running the AI Agent

The AI agent is integrated into the web application:
1. **With OpenAI API key**: Real-time AI insights and chat functionality
2. **Without API key**: Runs with demonstration data

Access the dashboard at `http://localhost:5173`

🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite for fast development
- **AI Integration**: OpenAI GPT-3.5-turbo
- **State Management**: Custom hooks + React state

Project Structure
```
src/
├── components/
│   ├── Layout/
│   │   └── DashboardLayout.tsx
│   ├── ui/        # Foundational UI components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   ├── sonner.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   └── use-toast.ts
│   ├── AlertsPanel.tsx
│   ├── NotificationCenter.tsx    # Custom notification system
│   ├── PerformanceMonitor.tsx    # Real-time system metrics
│   └── ThemeCustomizer.tsx       # Dynamic theme engine
├── pages/
│   ├── Overview.tsx
│   ├── Metrics.tsx
│   ├── SpendAnalysis.tsx
│   ├── Team.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── hooks/
│   └── useLiveData.ts           # Custom data management
├── lib/
│   └── utils.ts
├── services/
│   └── aiService.ts             # Intelligence engine
├── utils/
│   └── exportUtils.ts           # Data export utilities
├── App.tsx
├── main.tsx
└── index.css
```

📋 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run code linting
```
```bash
npm run build
```
🏆 Technical Implementation

✅ Modern React 18 + TypeScript architecture  
✅ OpenAI API integration for intelligent insights  
✅ Real-time data visualization with Recharts  
✅ Responsive design with Tailwind CSS  
✅ Component-based architecture with shadcn/ui  
✅ Custom hooks for state management  
✅ Performance optimized with Vite build tool  
✅ Mock data fallback for demonstration  
