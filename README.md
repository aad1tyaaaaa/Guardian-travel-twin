# 🛡️ Guardian Travel Twin

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-latest-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-green?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Blockchain](https://img.shields.io/badge/Blockchain-Enabled-blue?style=for-the-badge&logo=ethereum)](https://ethereum.org/)
[![AI](https://img.shields.io/badge/AI--Powered-orange?style=for-the-badge&logo=openai)](https://openai.com/)

> **Smart Tourism. Safer Journeys.** Real-time protection with AI, blockchain, and geo-fencing technology for the modern traveler.

## 🌟 Overview

Guardian Travel Twin is a revolutionary AI-powered tourist safety platform that combines cutting-edge technology with human-centered design to create the ultimate travel protection ecosystem. Our integrated system provides comprehensive safety solutions from digital identity verification to real-time emergency response.

## ✨ Key Features

### 🔐 Digital Tourist ID
- **Blockchain-secured identity verification** with encrypted personal data
- **Instant verification** across tourism checkpoints
- **Tamper-proof records** ensuring data integrity
- **Privacy-protected** personal information storage

### 📍 Smart Geo-Fencing
- **AI-powered location monitoring** with customizable safety zones
- **Real-time tracking** and automatic alerts
- **Custom safety zones** for personalized protection
- **Predictive risk assessment** based on location patterns

### 🧠 AI Anomaly Detection
- **Machine learning algorithms** that identify unusual patterns
- **Risk assessment** and predictive alerts
- **Pattern recognition** for behavioral analysis
- **Continuous monitoring** for potential safety risks

### 🚨 Emergency SOS System
- **One-touch emergency response** with automatic location sharing
- **Multi-channel alerts** to emergency contacts and authorities
- **Instant response** coordination with local services
- **Real-time location sharing** for rapid assistance

### 📊 Authority Dashboard
- **Comprehensive monitoring interface** for tourism officials
- **Real-time analytics** and response coordination
- **Emergency response management** tools
- **Data-driven insights** for tourism safety optimization

## 🏗️ Architecture

```
Guardian Travel Twin
├── Frontend (Next.js 15 + React 19)
│   ├── 3D Visualizations (Three.js + React Three Fiber)
│   ├── Interactive UI (Tailwind CSS + Radix UI)
│   └── Animations (GSAP)
├── AI Engine
│   ├── Anomaly Detection
│   ├── Risk Assessment
│   └── Predictive Analytics
├── Blockchain Layer
│   ├── Digital ID Management
│   ├── Secure Data Storage
│   └── Identity Verification
└── Emergency Response System
    ├── Geo-Fencing
    ├── SOS Coordination
    └── Authority Integration
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.2.4 with App Router
- **Language:** TypeScript 5.0
- **Styling:** Tailwind CSS 4.1 + Tailwind Animate
- **UI Components:** Radix UI (Accordion, Dialog, Dropdown, etc.)
- **3D Graphics:** Three.js + React Three Fiber + React Three Drei
- **Animations:** GSAP (GreenSock Animation Platform)
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Icons:** Lucide React

### Development Tools
- **Package Manager:** pnpm
- **Build Tool:** Next.js (Turbopack)
- **Linting:** ESLint
- **Code Quality:** TypeScript strict mode
- **Analytics:** Vercel Analytics

### Key Dependencies
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for React Three Fiber
- `@radix-ui/*` - Accessible UI components
- `gsap` - High-performance animations
- `react-hook-form` - Performant forms
- `zod` - TypeScript-first schema validation
- `tailwind-merge` - Utility for merging Tailwind classes

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **pnpm** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/guardian-travel-twin.git
   cd guardian-travel-twin
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 📁 Project Structure

```
guardian-travel-twin/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── fonts/                   # Custom fonts
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── Hero.tsx                 # Hero section
│   ├── FeatureStrip.tsx         # Features showcase
│   ├── SOSDemo.tsx              # Emergency demo
│   ├── Navigation.tsx           # Site navigation
│   ├── Footer.tsx               # Site footer
│   ├── Scene3D.tsx              # 3D scene component
│   └── ...
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── public/                      # Static assets
│   ├── mock-data/               # Mock data files
│   └── placeholder-*.{png,svg} # Placeholder images
├── styles/                      # Additional styles
└── types/                       # TypeScript type definitions
```

## 🎯 Usage

### For Tourists
1. **Register** with your personal information
2. **Receive** your blockchain-secured digital ID
3. **Enable** location tracking for safety monitoring
4. **Access** emergency SOS in case of danger

### For Authorities
1. **Monitor** tourist activities through the dashboard
2. **Receive** real-time emergency alerts
3. **Coordinate** response efforts
4. **Access** analytics for safety optimization

### Interactive Demo
The application includes a live SOS demo that simulates:
- Emergency button activation
- Real-time location tracking
- Automatic authority notification
- Route replay of the last 10 minutes
- e-FIR (Electronic First Information Report) generation

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS=true

# API Endpoints (for future backend integration)
NEXT_PUBLIC_API_BASE_URL=https://api.guardiantraveltwin.com
```

### Customization

#### Theme Colors
Modify the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1E3A8A',
      secondary: '#64748B',
      // ... other colors
    }
  }
}
```

#### Animations
Adjust GSAP animations in component files for different timing and effects.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Icons:** [Lucide React](https://lucide.dev/) for beautiful icons
- **UI Components:** [Radix UI](https://www.radix-ui.com/) for accessible components
- **3D Graphics:** [Three.js](https://threejs.org/) community
- **Animations:** [GSAP](https://greensock.com/gsap/) for smooth animations
- **Fonts:** [Google Fonts](https://fonts.google.com/) (Montserrat & Inter)

## 📞 Contact

**Guardian Travel Twin Team**
- Website: [guardiantraveltwin.com](https://guardiantraveltwin.com)
- Email: hello@guardiantraveltwin.com
- Twitter: [@GuardianTwin](https://twitter.com/GuardianTwin)
- LinkedIn: [Guardian Travel Twin](https://linkedin.com/company/guardian-travel-twin)

## 🔮 Future Roadmap

- [ ] Mobile app development (React Native)
- [ ] Integration with tourism authority systems
- [ ] Advanced AI risk prediction models
- [ ] Multi-language support
- [ ] Offline emergency mode
- [ ] Integration with wearable devices
- [ ] Real-time weather and safety alerts

---

<div align="center">
  <p><strong>Made with ❤️ for safer travels worldwide</strong></p>
  <p>
    <a href="#overview">Overview</a> •
    <a href="#key-features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>
