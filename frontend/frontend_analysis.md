# Frontend Codebase Analysis

## 1. High-Level Overview

This document provides a detailed analysis of the frontend codebase, a standard Vite + React Single Page Application (SPA) written in TypeScript. The application serves as the user interface for an HRIS (Human Resource Information System).

The architecture follows modern React best practices, featuring:
- **Component-Based Structure**: Clear separation of concerns with pages, layouts, and reusable components.
- **Centralized State Management for Authentication**: `AuthContext` provides global access to user session data.
- **Protected Routing**: `react-router-dom` is used for navigation, with custom wrapper components (`ProtectedRoute`, `AuthRedirectRoute`) to manage access based on authentication status.
- **Build & Development**: Vite serves as the build tool, configured with path aliases for cleaner imports.
- **Styling**: Tailwind CSS is used for utility-first styling, alongside global CSS files.

## 2. Project Setup & Configuration

These files are responsible for defining dependencies, build processes, and environment-specific settings.

### `package.json`
- **Role**: Defines project metadata, dependencies, and scripts.
- **Key Dependencies**:
    - `react`, `react-dom`: Core libraries for building the UI.
    - `react-router-dom`: For client-side routing.
    - `axios`: For making HTTP requests to the backend API.
    - `typescript`: For static typing.
    - `vite`: The build tool and development server.
    - `tailwindcss`, `postcss`, `autoprefixer`: For styling.
    - `lucide-react`: For icons.
    - `@headlessui/react`: For accessible UI components like menus.
    - `framer-motion`: For animations.

### `vite.config.ts`
- **Role**: Configures the Vite development server and build process.
- **Key Logic**:
    - `plugins: [react()]`: Enables React support.
    - `resolve.alias`: Sets up a path alias where `@` maps to the `./src` directory. This allows for cleaner, absolute-like imports (e.g., `import Component from '@/components/Component'`).

### `tsconfig.json` & `tsconfig.app.json`
- **Role**: Configures the TypeScript compiler.
- **Key Logic**:
    - `compilerOptions.paths`: Mirrors the Vite alias (`"@/*": ["src/*"]`) to provide type-checking and autocompletion for aliased paths.
    - Ensures strict type-checking rules are enforced across the project.

### `.env.development` & `.env.production`
- **Role**: Store environment-specific variables.
- **Key Variables**:
    - `VITE_API_HOST`: The hostname of the backend API.
    - `VITE_API_PORT`: The port of the backend API.
    These are used to construct the base URL for API calls.

### `src/config/api.ts`
- **Role**: Centralizes the configuration for backend API communication.
- **Key Logic**:
    - It reads `VITE_API_HOST` and `VITE_API_PORT` from the environment.
    - It constructs and exports `API_BASE_URL`.
    - In development (`import.meta.env.DEV`), it creates a full URL like `http://localhost:8000`.
    - In production, it's an empty string, implying that API requests will be sent to the same origin under a relative path (e.g., `/api`), which is typically handled by a reverse proxy like Nginx.

## 3. Application Entry Point

This is where the application is initialized and mounted to the DOM.

### `index.html`
- **Role**: The single HTML file that serves as the main page.
- **Key Logic**: Contains `<div id="root"></div>`, which is the container where the entire React application will be rendered.

### `src/main.tsx`
- **Role**: The main entry point for the React application.
- **Key Logic**:
    1. Imports the main `App` component.
    2. Uses `ReactDOM.createRoot` to render the application into the `#root` element from `index.html`.
    3. Wraps the entire `App` component with `BrowserRouter` to enable routing capabilities across the application.
    4. Wraps `App` with `AuthProvider` to make authentication state and functions available to all child components.

**Integration**: `index.html` -> `src/main.tsx` -> `src/App.tsx`

## 4. Core Application & Routing

Defines the navigational structure of the application.

### `src/App.tsx`
- **Role**: The top-level component that defines the application's routes.
- **Key Logic**:
    - It uses `Routes` and `Route` from `react-router-dom` to map URL paths to components.
    - **Login Route**: The `/login` path is wrapped in an `AuthRedirectRoute`. This component redirects already authenticated users away from the login page to the dashboard.
    - **Protected Routes**: A parent `Route` element is wrapped with `ProtectedRoute`. This component ensures that only authenticated users can access the nested child routes (`/`, `/requests`). Unauthenticated users are redirected to `/login`.
    - The protected routes render their content within the `AppPage` component, which provides the main application layout.

**Integration**: This file acts as a central hub, connecting URLs to the authentication system (`ProtectedRoute`, `AuthRedirectRoute`) and the main application layout (`AppPage`).

## 5. Authentication Workflow

This system manages user sessions and protects routes.

### `src/auth/AuthContext.tsx`
- **Role**: The core of the authentication system. It provides a global, shared state for user authentication.
- **Key Functions/State**:
    - `AuthProvider`: The context provider component. It holds the authentication state (`user`, `isAuthenticated`).
    - `useEffect`: On initial mount, it calls `verifySession` to check if the user has a valid session cookie by making a request to a backend endpoint (likely `/api/auth/me`).
    - `login(email, password)`: Makes a POST request to the backend's login endpoint. On success, it stores user data, sets `isAuthenticated` to `true`, and likely receives a session cookie.
    - `logout()`: Makes a request to the backend's logout endpoint and clears the local authentication state.
    - `useAuth()`: A custom hook that allows any component to easily access the context's values (`isAuthenticated`, `user`, `login`, `logout`).

### `src/pages/Login.tsx`
- **Role**: Provides the UI for user login.
- **Key Logic**:
    - Renders a form with email and password fields.
    - Uses the `useAuth()` hook to get access to the `login` function.
    - On form submission (`handleSubmit`), it calls `login(email, password)`.
    - It shows a loading state while the login request is in progress.
    - On successful login, it navigates the user to their original destination or the dashboard (`/`).

### `src/auth/ProtectedRoute.tsx`
- **Role**: A component that acts as a gatekeeper for routes that require authentication.
- **Key Logic**:
    - It consumes the `AuthContext` using the `useAuth()` hook to check the `isAuthenticated` flag.
    - If `isAuthenticated` is `true`, it renders the child components (the actual protected page) via the `<Outlet />` component from `react-router-dom`.
    - If `isAuthenticated` is `false`, it redirects the user to the `/login` page using the `<Navigate />` component.

### `src/auth/AuthRedirectRoute.tsx`
- **Role**: The inverse of `ProtectedRoute`. It's used for routes that an authenticated user should *not* see, like the login page.
- **Key Logic**:
    - It checks if `isAuthenticated` is `true`.
    - If true, it redirects the user to the main dashboard (`/`).
    - If false, it renders the child component (e.g., the `Login` page).

## 6. Application Layout

These components create the consistent look and feel for the authenticated part of the application.

### `src/pages/AppPage.tsx`
- **Role**: A simple wrapper component that serves as the entry point for the authenticated application view.
- **Key Logic**: It renders the `AppLayout` component. This structure allows for potential future logic to be added at this level if needed.

### `src/layouts/AppLayout.tsx`
- **Role**: Defines the main visual structure of the application after login.
- **Key Logic**:
    - It uses a flexbox layout to create a two-column design.
    - It renders the `Sidebar` component on the left.
    - It renders a container on the right which includes the `Topbar` at the top and an `<Outlet />` below it. The `<Outlet />` is where the content of the nested routes (e.g., `DashboardPage`, `RequestsPage`) will be displayed.

### `src/components/sidebar/Sidebar.tsx`
- **Role**: The main navigation element of the application.
- **Key Logic**:
    - It contains `NavLink` components from `react-router-dom`.
    - `NavLink` automatically adds an `active` class when its `to` prop matches the current URL, allowing for easy styling of the current page's link.
    - It links to the primary pages: Dashboard (`/`) and Requests (`/requests`).

### `src/components/topbar/Topbar.tsx`
- **Role**: The header bar at the top of the authenticated application.
- **Key Logic**:
    - Displays user information (`John Doe`, `Approver`).
    - Contains a notification bell icon (`NotificationIcon`) that can show a notification status.
    - Features a user dropdown menu (using Headless UI) with a "Logout" button.
    - The `handleLogout` function calls the `logout` method from `AuthContext` and navigates the user back to the login page.

## 7. Feature Pages

These are the primary content pages of the application.

### `src/pages/DashboardPage.tsx`
- **Role**: The main landing page after a user logs in. It presents a summary of key HRIS information.
- **Key Components/Logic**:
    - `ClockedInStatus`: A stateful component that manages the UI for clocking in and out, including a confirmation modal.
    - **Attendance Metrics**: Displays cards for overtime, undertime, etc.
    - **Leave Credits**: Shows available vacation and sick leave balances.
    - **Upcoming Leaves / Recent Logs**: Displays tabular data for leave requests and attendance history.

### `src/pages/RequestsPage.tsx`
- **Role**: A page dedicated to managing leave requests and approvals.
- **Key Logic**:
    - Provides a tabbed interface for "Approvals" and "My Requests".
    - Displays a list of pending requests with "Accept" and "Reject" buttons.
    - Includes filtering and sorting options.
    - This component appears to be mostly static UI at the moment, with the expectation that it will be connected to the API to fetch and update request data.
