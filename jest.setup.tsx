import '@testing-library/jest-dom';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock GSAP
jest.mock('gsap', () => ({
  to: jest.fn(),
  from: jest.fn(),
  fromTo: jest.fn(),
  registerPlugin: jest.fn(),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
  })),
}));

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn(),
}));

jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));
