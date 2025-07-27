# 🏋️‍♂️ AI Fitness Trainer

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=for-the-badge)](https://clerk.com/)

> **Transform Your Body With Advanced AI Technology** - A comprehensive fitness tracking application powered by artificial intelligence, featuring personalized workout plans, nutrition tracking, and real-time progress monitoring.

## ✨ Features

### 🤖 **AI-Powered Assistant**
- Intelligent chatbot with contextual responses
- Personalized fitness and nutrition advice
- Real-time workout guidance and motivation

### 🏋️ **Workout Management**
- **Interactive Workout Timer** with rest periods
- Pre-built workout routines (Beginner to Advanced)
- **Progress Tracking** with visual analytics
- Exercise database with detailed instructions

### 🥗 **Nutrition Tracking**
- **Smart Calorie Calculator** with food database
- **BMI Calculator** with health category insights
- **Nutrition Insights Dashboard** with macro tracking
- Sample diet plans for different fitness goals

### 📊 **Analytics & Progress**
- **Real-time Progress Tracking** (weight, workouts, calories)
- Visual charts and progress indicators
- **Goal Setting** and achievement tracking
- Historical data analysis

### 🎨 **Modern UI/UX**
- **Cyberpunk-themed Design** with animations
- Fully responsive across all devices
- **Toast Notifications** for better user experience
- Smooth transitions and interactive elements

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PreetKot/ai-fitness-trainer.git
   cd ai-fitness-trainer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables in `.env.local`:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   
   # Convex Database
   CONVEX_DEPLOYMENT=your_convex_deployment_url
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   
   # Google AI (for enhanced AI features)
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   
   # VAPI (for voice features)
   VAPI_PUBLIC_KEY=your_vapi_public_key
   VAPI_PRIVATE_KEY=your_vapi_private_key
   ```

4. **Set up Convex database**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 15.2.4](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Chart.js](https://www.chartjs.org/)** - Interactive charts

### **Backend & Services**
- **[Convex](https://convex.dev/)** - Real-time database and backend
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[Google AI](https://ai.google.dev/)** - AI-powered responses
- **[VAPI](https://vapi.ai/)** - Voice AI integration

### **Development Tools**
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Turbopack](https://turbo.build/pack)** - Ultra-fast bundler

## 📁 Project Structure

```
ai-fitness-trainer/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── generate-program/   # AI program generation
│   │   ├── profile/           # User profile page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI primitives
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── ProgressTracker.tsx
│   │   ├── WorkoutTimer.tsx
│   │   ├── NutritionInsights.tsx
│   │   └── ...
│   ├── lib/                  # Utility functions
│   │   ├── utils.ts         # General utilities
│   │   └── vapi.ts          # VAPI configuration
│   └── constants/           # App constants
├── convex/                  # Convex backend
│   ├── schema.ts           # Database schema
│   ├── users.ts            # User functions
│   └── plans.ts            # Fitness plans
├── public/                 # Static assets
└── ...config files
```

## 🔧 Configuration

### **Environment Variables**

Create a `.env.local` file in the root directory:

```env
# Required - Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Required - Convex Database
CONVEX_DEPLOYMENT=https://...
NEXT_PUBLIC_CONVEX_URL=https://...

# Optional - Enhanced AI Features
GOOGLE_AI_API_KEY=AIza...
VAPI_PUBLIC_KEY=...
VAPI_PRIVATE_KEY=...
```

### **Clerk Setup**
1. Create account at [Clerk.com](https://clerk.com/)
2. Create new application
3. Copy API keys to `.env.local`
4. Configure sign-in/sign-up URLs

### **Convex Setup**
1. Install Convex CLI: `npm install -g convex`
2. Run `npx convex dev`
3. Follow authentication prompts
4. Database will be automatically created

## 📱 Key Components

### **Homepage Features**
- **Hero Section** with animated AI avatar
- **BMI Calculator** with health insights
- **Calorie Tracker** with real-time totals
- **Sample Plans** (diet and fitness)
- **AI Chatbot** with contextual responses

### **Progress Tracking**
- Weight tracking with trend analysis
- Workout completion metrics
- Calorie burn tracking
- Visual progress indicators

### **Workout Timer**
- Customizable exercise routines
- Rest period management
- Audio/visual cues
- Progress tracking

### **Nutrition Dashboard**
- Macro/micronutrient tracking
- Hydration monitoring
- Quick food logging
- Nutritional insights

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Manual Deployment**
```bash
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Clerk](https://clerk.com/)** for authentication
- **[Convex](https://convex.dev/)** for real-time database
- **[Vercel](https://vercel.com/)** for hosting
- **[Tailwind CSS](https://tailwindcss.com/)** for styling
- **[Lucide](https://lucide.dev/)** for icons

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/PreetKot/ai-fitness-trainer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/PreetKot/ai-fitness-trainer/discussions)
- **Email**: [your-email@example.com](mailto:your-email@example.com)

## 🚧 Roadmap

- [ ] **Mobile App** (React Native)
- [ ] **Wearable Integration** (Apple Watch, Fitbit)
- [ ] **Social Features** (friends, challenges)
- [ ] **Advanced AI** (computer vision for form checking)
- [ ] **Nutrition Scanner** (barcode/image recognition)
- [ ] **Offline Mode** support
- [ ] **Multi-language** support

---

<div align="center">

**[⭐ Star this repo](https://github.com/PreetKot/ai-fitness-trainer)** • **[🐛 Report Bug](https://github.com/PreetKot/ai-fitness-trainer/issues)** • **[✨ Request Feature](https://github.com/PreetKot/ai-fitness-trainer/issues)**

Made with ❤️ by [PreetKot](https://github.com/PreetKot)

</div>