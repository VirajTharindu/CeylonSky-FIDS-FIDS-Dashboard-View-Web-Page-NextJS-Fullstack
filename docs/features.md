# ✨ Key Features Deep-Dive

CeylonSky FIDS is more than just a table; it's a integrated flight management display unit.

## 1. Real-Time Dashboard
The heart of the system is the **Modern Dashboard View**. It features:
- **Carbon-Fibre Theme**: A premium dark aesthetic optimized for high-brightness airport environments.
- **Dynamic Table**: Instant updates for status changes (e.g., ON TIME → BOARDING).
- **Network Awareness**: Integrated Wi-Fi status indicator that monitors connectivity in real-time.

## 2. Multi-Language Cycling
In an international hub, language accessibility is key. 
- The system automatically cycles through **English, Sinhala, and Tamil**.
- All states (DELAYED, BOARDING, etc.) are fully localized.

## 3. Intelligent Flight Details
Clicking on any flight row reveals a side drawer containing:
- Specific terminal info.
- Origin/Destination details.
- Status breakdown.

## 4. Audio Announcement System (Ready)
The system is built with an **Audio Queue Engine**:
- It tracks flight changes (like Gate Changes).
- It prepares announcement strings ready for Text-to-Speech integration.

## 5. Flexible Database Integration
The system is built for scalability and data resilience:
- **Local Persistence**: Integrated PouchDB (IndexedDB) for offline-first capabilities and performance caching.
- **Production-Ready**: Seamlessly switch to **MongoDB** via environment variables for cloud synchronization.

---

*This document is part of the CeylonSky FIDS documentation suite.*
