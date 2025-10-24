# 🚀 OptiMSP Intelligence Hub

> A modern MSP dashboard with AI-powered insights for business optimization and real-time analytics.

## ✨ What This Does

This is a complete dashboard for Managed Service Providers (MSPs) that helps you:
- **Track Business Performance** - Revenue, profit margins, client retention in real-time
- **Get AI Insights** - Smart recommendations for cost optimization and growth
- **Monitor Systems** - Real-time performance metrics and alerts
- **Manage Teams** - Team member profiles and department analytics
- **Make Data-Driven Decisions** - Interactive charts and business intelligence

## 🎯 Key Features

### 📊 **Business Dashboard**
- Live revenue tracking ($2.3M+ revenue visualization)
- Health score monitoring with visual indicators
- Client retention analytics (94.5% retention rate)
- Profit margin optimization insights

### 🤖 **AI Assistant (AWS Bedrock)**
- **Smart Chat Interface** - Ask questions about your business metrics
- **AWS Claude 3 Haiku** - Fast, cost-effective AI responses
- **Contextual Responses** - Get insights about revenue, costs, and retention
- **Quick Suggestions** - Pre-built queries for common business questions
- **Responsive Design** - Works seamlessly on desktop and mobile

### 📊 **Client Sentiment Analysis (Amazon Comprehend)**
- **Real-time Sentiment Tracking** - Monitor client satisfaction levels
- **Positive/Negative/Neutral Analysis** - Comprehensive feedback insights
- **Overall Satisfaction Score** - Track client happiness trends
- **AWS-Powered Analytics** - Enterprise-grade text analysis

### 📈 **Analytics & Monitoring**
- Real-time system performance monitoring
- Automated alerts and notifications
- Team productivity tracking
- Department-wise spend analysis

## 🛠️ Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd SuperHack-Optimsp-AI-1
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your AWS credentials:
   # VITE_AWS_REGION=us-east-1
   # VITE_AWS_ACCESS_KEY_ID=your_access_key
   # VITE_AWS_SECRET_ACCESS_KEY=your_secret_key
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Your Browser**
   ```
   http://localhost:5173
   ```

## 🎮 How to Use

### Using the AI Assistant
1. **Find the AI Assistant** - Look for the "ASK AI β" button in the sidebar
2. **Click to Chat** - Button automatically scrolls to the AI interface
3. **Ask Questions** - Try these examples:
   - "How can I improve revenue?"
   - "What about cost optimization?"
   - "Show me client retention insights"
4. **Use Quick Buttons** - Click suggestion buttons for instant queries

### Navigation
- **Overview** - Main dashboard with business health score
- **Metrics** - Detailed analytics and performance charts
- **Spend Analysis** - Cost breakdown and optimization opportunities
- **Team** - Team member management and department insights
- **Settings** - Configuration and preferences

## 🏗️ Project Structure

```
SuperHack-Optimsp-AI-1/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Layout/          # Main dashboard layout
│   │   ├── ui/              # Base UI components (buttons, cards, etc.)
│   │   ├── AlertsPanel.tsx  # System alerts display
│   │   ├── PerformanceMonitor.tsx  # System metrics + AI chat
│   │   ├── NotificationCenter.tsx  # Notification management
│   │   ├── SentimentAnalysis.tsx   # AWS Comprehend sentiment tracking
│   │   └── ThemeCustomizer.tsx     # Theme switching
│   ├── pages/               # Main application pages
│   │   ├── Overview.tsx     # Main dashboard
│   │   ├── Metrics.tsx      # Analytics page
│   │   ├── SpendAnalysis.tsx # Cost analysis
│   │   ├── Team.tsx         # Team management
│   │   └── Settings.tsx     # App settings
│   ├── services/
│   │   ├── aiService.ts     # AI chat functionality with Bedrock
│   │   ├── bedrockService.ts # AWS Bedrock Claude 3 Haiku integration
│   │   └── comprehendService.ts # AWS Comprehend sentiment analysis
│   ├── hooks/
│   │   └── useLiveData.ts   # Real-time data management
│   └── utils/
│       └── exportUtils.ts   # Data export utilities
├── .env                     # Environment variables
└── package.json            # Dependencies and scripts
```

## 🔧 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run code linting
```

## 🎨 Tech Stack

- **React 18** + **TypeScript** - Modern frontend framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible UI components
- **Recharts** - Data visualization library
- **Lucide React** - Icon library
- **AWS Bedrock** - AI-powered insights with Claude 3 Haiku
- **Amazon Comprehend** - Sentiment analysis for client feedback
- **OpenAI API** - Fallback AI service (optional)

## 🚀 Features in Detail

### AI Assistant Integration
- **Location**: Below System Performance section
- **Functionality**: Contextual business insights
- **Responsive**: Adapts to mobile and desktop
- **Smart Responses**: Tailored to MSP business metrics

### Real-time Data
- **Live Updates**: Metrics update every 5 seconds
- **Health Monitoring**: System performance tracking
- **Dynamic Charts**: Interactive data visualization
- **Alert System**: Proactive notifications

### Business Intelligence
- **Revenue Tracking**: $2.3M+ revenue monitoring
- **Client Analytics**: 157 active clients, 94.5% retention
- **Profit Optimization**: 23% margin with improvement tracking
- **Team Insights**: Department-wise performance

## 🏆 AWS GenAI Features

### **Amazon Bedrock Integration**
- **Model**: Claude 3 Haiku for fast, cost-effective responses
- **Cost**: ~$0.25 per 1M tokens (fits within $100 credit limit)
- **Use Case**: Business intelligence chat interface
- **Fallback**: OpenAI API for redundancy

### **Amazon Comprehend Integration**
- **Service**: Real-time sentiment analysis
- **Cost**: $0.0001 per unit (extremely cost-effective)
- **Use Case**: Client satisfaction monitoring
- **Features**: Positive/Negative/Neutral classification with confidence scores

### **Credit Usage Optimization**
- **Budget**: Designed for $100 AWS credit limit
- **Monitoring**: Built-in usage tracking
- **Efficiency**: Optimized API calls with caching
- **Fallbacks**: Mock data when credits exhausted

## 🎯 Perfect For

- **MSP Business Owners** - Track performance and growth with AI insights
- **Operations Managers** - Monitor team and system health with sentiment analysis
- **Financial Analysts** - Analyze costs and profitability with AWS GenAI
- **IT Teams** - System monitoring and optimization with cloud-native AI
- **Hackathon Teams** - Showcase AWS GenAI integration and win competitions

---

**Built with ❤️ for MSP success** | Ready to deploy and scale  
