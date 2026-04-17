# KeenKeeper

Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.

## Features

- **Friend Profile Management**: Detailed profiles with relationship goals and status tracking
- **Interaction Logging**: Log calls, texts, and video interactions with complete timeline history
- **Analytics Dashboard**: Interactive charts visualizing communication patterns
- **Search & Filter**: Easily find friends by name or tags
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Motion
- **Notifications**: Sonner
- **Testing**: Vitest, Testing Library

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run TypeScript type checking

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Navbar, Footer)
│   └── ui/              # Reusable UI components (Button, StatusBadge)
├── context/             # React contexts (FriendContext, ThemeContext)
├── pages/               # Page components
├── data/                # Static data files
├── lib/                 # Utility functions
└── types.ts             # TypeScript type definitions
```