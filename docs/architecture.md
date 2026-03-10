# 🏗️ System Architecture

CeylonSky FIDS is built on a modern, reactive stack designed for high availability and real-time synchronization.

## 🏛️ Overall Pattern: MVVM (Model-View-ViewModel)

The application follows the **MVVM** pattern to ensure a clean separation between data logic and user interface:

- **Model**: PouchDB documents representing Flights and Audio Queue items.
- **Service Layer**: `FlightService.ts` encapsulates all direct database interactions (PouchDB, future MongoDB), ensuring the store remains agnostic of the persistence engine.
- **ViewModel (Store)**: Zustand store (`useFlightStore.ts`) which manages in-memory state, triggers UI updates, and delegates persistence to the Service Layer.
- **View**: React components (Next.js App Router) styled with Ant Design and Tailwind CSS.

## 🔄 Data Synchronization Flow

### 1. Local-First Approach
The system uses **PouchDB** as a local database engine. This ensures that even if the airport network is unstable, the flight information display remains functional.
- When the app starts, it fetches the current state from the local PouchDB instance.
- Any updates received (via mock data or future APIs) are immediately written to the local DB.

### 2. State-UI Sync
The Zustand store acts as the bridge. It subscribes to PouchDB changes and updates the React application's state, triggering re-renders only where necessary.

## 🌍 Trilingual Implementation

To support **English, Sinhala, and Tamil** seamlessly:
- A custom hook (`useLanguageCycle.ts`) manages a timed interval to switch the 'active' language.
- The `translations.ts` utility provides a unified schema for all three languages.
- Components use the active language index to pull the correct localized string for every label and status.

## 🛠️ Technology Stack Breakdown

| Component | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 15+ | SSR capabilities and optimized routing. |
| **State Management** | Zustand | Lightweight and perfect for frequent updates. |
| **Local Database** | PouchDB (IndexedDB) | Native offline-first synchronization and caching. |
| **UI Components** | Ant Design | Professional, enterprise-grade data components. |
| **Styling** | Tailwind CSS | Rapid prototyping and utility-first design. |
| **Icons** | Lucide React | Modern, lightweight iconography. |

## 🛡️ Security Considerations

- **Secure Headers**: The application implements custom HTTP headers (CSP, X-Frame-Options, X-Content-Type-Options) via `next.config.ts` to mitigate common web vulnerabilities.
- **Data Isolation**: Database logic is decoupled through the Service Layer, allowing for strict validation before persistence.
- **Environment Safety**: Sensitive configurations are managed via `.env` files and never committed to version control.

## 🚀 Performance & Maintenance

- **Multi-Stage Docker Builds**: Ensures minimal production image size and faster deployments.
- **Reactive State Management**: Zustand provides efficient re-renders by allowing components to subscribe only to relevant slices of state.
- **Automated Quality Control**: GitHub Actions pipeline runs linting, building, and unit tests on every PR to maintain code standards.

---

*This document is part of the CeylonSky FIDS documentation suite.*
