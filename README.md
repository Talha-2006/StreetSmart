# StreetSmart

A mobile-friendly web app {rest here}

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework for mobile-first responsive design

## Project Structure

```
├── app/              # Next.js App Router directory
│   ├── layout.tsx   # Root layout with mobile viewport configuration
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles with Tailwind
├── components/       # Reusable React components (create as needed)
├── public/          # Static assets
└── ...config files  # Next.js, TypeScript, Tailwind configurations
```

## Mobile-First Design

The application is configured with mobile-first responsive design principles:
- Responsive viewport meta tags
- Touch-friendly UI elements
- Mobile-optimized styles with Tailwind CSS breakpoints
- Dark mode support