import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock PouchDB
vi.mock('pouchdb-browser', () => ({
  default: vi.fn().mockImplementation(() => ({
    get: vi.fn(),
    put: vi.fn(),
    allDocs: vi.fn(),
  })),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
