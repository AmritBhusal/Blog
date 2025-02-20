# Next.js Blog Project

A modern blog application built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI components built with Radix UI
- 🌗 Dark mode support using next-themes
- 📱 Responsive design
- 🎯 Type-safe development with TypeScript
- 🎨 Styled with Tailwind CSS
- 📅 Date handling with date-fns
- 🔍 Advanced filtering and search capabilities
- 📄 Blog post pagination

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (latest LTS version recommended)
- npm package manager

## Project Structure

```
src/
├── app/
│   ├── blogs/             # Blog-related components and logic
│   ├── components/        # Reusable UI components
│   │   ├── card/         # Card-related components
│   │   ├── ui/           # Base UI components
│   │   └── hooks/        # Custom React hooks
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd blog
```

2. Install dependencies:
```bash
npm install

```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run start` - Runs the production server
- `npm run lint` - Runs ESLint for code linting

## Dependencies

### Core
- Next.js 15.1.7
- React 19.0.0
- TypeScript 5.x

### UI Components
- Radix UI components
- Tailwind CSS
- Lucide React (for icons)
- class-variance-authority
- clsx
- tailwind-merge

### Utilities
- date-fns
- js-cookie
- next-themes

## Development Dependencies

- ESLint with Next.js configuration
- TypeScript
- Tailwind CSS
- PostCSS
- Various type definitions (@types/*)

## Styling

This project uses Tailwind CSS for styling with additional features:
- @tailwindcss/typography for rich text styling
- tailwindcss-animate for animations
- Custom UI components built with Radix UI primitives

## Project Configuration

Key configuration files:
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
