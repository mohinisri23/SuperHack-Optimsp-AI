# OPTI-MSP AI Dashboard

A comprehensive MSP (Managed Service Provider) business intelligence dashboard with AI-powered insights and optimization recommendations.

## Features

- **Real-time Business Metrics** - Track revenue, profit margins, client retention
- **AI-Powered Insights** - Get intelligent recommendations for cost optimization
- **Department Spend Analysis** - Monitor budget utilization across teams
- **Performance Analytics** - Visualize trends with interactive charts
- **Team Management** - Track productivity and resource allocation

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd SuperHack-Optimsp-AI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OpenAI API key to .env

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file with:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts
- **Build Tool**: Vite
- **State Management**: React Query
- **AI Integration**: OpenAI API

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── DashboardLayout.tsx
│   ├── ui/        # Core UI components
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
│   ├── AIChat.tsx
│   └── AlertsPanel.tsx
├── pages/
│   ├── Overview.tsx
│   ├── Metrics.tsx
│   ├── SpendAnalysis.tsx
│   ├── Team.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── hooks/
│   └── useLiveData.ts
├── lib/
│   └── utils.ts
├── services/
│   └── aiService.ts
├── utils/
│   └── exportUtils.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

Build the project and deploy to your preferred hosting platform:

```bash
npm run build
```

The `dist` folder contains the production build.
