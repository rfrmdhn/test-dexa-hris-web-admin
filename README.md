# DEXA HRIS Web Admin

Admin dashboard for the DEXA HRIS system, designed to manage employees and monitor attendance records.

## Features

- **Employee Management**: Create, read, update, and delete employee records.
- **Attendance Monitoring**: View-only interface for tracking employee check-ins and check-outs with photo verification.
- **Authentication**: Secure admin login with role-based access control.
- **Responsive Design**: Built with a mobile-first approach using Tailwind CSS.

## Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand (Auth), TanStack Query (Server Data)
- **Forms**: React Hook Form + Zod
- **Networking**: Axios

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone <repository-url>
cd web-admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file to create your local configuration:

```bash
cp .env.example .env
```

Open `.env` and ensure the service URLs point to your running backend services:

```env
# Authentication & Employee Service URL
AUTH_SERVICE_URL=http://localhost:3001

# Attendance Service URL
ATTENDANCE_SERVICE_URL=http://localhost:3002
```

### 4. Run the development server

Start the app in development mode:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Building for Production

To build the application for production deployment:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Atomic design components (atoms, molecules, organisms, templates)
├── features/       # Feature-based modules (auth, employees, attendance, dashboard)
├── libs/           # Shared utilities, hooks, constants, types, and API client
├── routes/         # Route definitions and guarded routes
├── stores/         # Global state management (Zustand)
└── main.tsx        # Main application entry point
```

## Linting

Run the linter to check for code quality issues:

```bash
npm run lint
```
