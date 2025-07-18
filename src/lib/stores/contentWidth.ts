import { writable } from 'svelte/store';

const STEP = 100;
const MIN_WIDTH = 500;
const MAX_WIDTH = 1000;
const LOCAL_KEY = 'contentWidth';

// 🔢 Ambil nilai dari localStorage atau default 500
function getInitialContentWidth(): number {
  if (typeof localStorage === 'undefined') return MIN_WIDTH;

  const stored = parseInt(localStorage.getItem(LOCAL_KEY) ?? '');
  return isNaN(stored) ? MIN_WIDTH : clampToStep(stored);
}

// 🧮 Bulatkan ke kelipatan 100
function clampToStep(value: number): number {
  return Math.round(value / STEP) * STEP;
}

// 🧱 Clamp nilai ke dalam batas minimum dan maksimum global
function clampCW(value: number): number {
  return Math.min(Math.max(value, MIN_WIDTH), MAX_WIDTH);
}

// 🧠 Hitung batas maksimal CW berdasarkan lebar device
function getMaxCWFromWD(): number {
  const wd = window.innerWidth;
  const dynamicMax = Math.ceil(wd / STEP) * STEP;
  return Math.min(dynamicMax, MAX_WIDTH);
}

function createContentWidth() {
  const initial = clampCW(getInitialContentWidth());
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,

    // ✅ Update CW & simpan ke localStorage
    set(value: number) {
      const finalValue = clampCW(clampToStep(value));
      localStorage.setItem(LOCAL_KEY, String(finalValue));
      set(finalValue);
    },

    // ➕ Zoom In
    increase() {
      update(current => {
        const next = current + STEP;
        const maxAllowed = getMaxCWFromWD();
        const final = Math.min(next, maxAllowed, MAX_WIDTH);

        if (final !== current) {
          localStorage.setItem(LOCAL_KEY, String(final));
        }

        return final;
      });
    },

    // ➖ Zoom Out
    decrease() {
      const wdMax = getMaxCWFromWD(); // batas CW berdasarkan lebar device
      update(current => {
        // Hitung batas atas berdasarkan WD (bukan dari current)
        const adjustedMax = Math.min(wdMax, MAX_WIDTH);

        if (current > adjustedMax) {
        const fallback = adjustedMax - STEP;
        localStorage.setItem(LOCAL_KEY, String(fallback));
        return fallback;
        }
        
        const steps = [];

        // Siapkan array kelipatan 100 dari MIN ke adjustedMax
        for (let w = MIN_WIDTH; w <= adjustedMax; w += STEP) {
          steps.push(w);
        }

        // Temukan step terbesar di bawah current
        const prev = steps.filter(w => w < current).pop() ?? MIN_WIDTH;

        if (prev !== current) {
          localStorage.setItem(LOCAL_KEY, String(prev));
        }

        return prev;
      });
    }
  };
}

export const contentWidth = createContentWidth();
