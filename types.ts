export interface Subject2Tip {
  id: number;
  title: string;
  content: string;
  icon: string;
}

export interface CheeringState {
  count: number;
  level: number;
}

// Global definition for canvas-confetti library loaded via CDN
declare global {
  interface Window {
    confetti: any;
  }
}
