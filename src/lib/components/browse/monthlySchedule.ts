// src/lib/stores/monthySchedule.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'monthlySchedule';

// 1. Valid weeks: Week 1–Week 4
export const validWeeks = [
  'Week 1',
  'Week 2',
  'Week 3',
  'Week 4'
] as const;
export type Week = typeof validWeeks[number];

// 2. Guard untuk memastikan string masuk validWeeks
export function isValidWeek(value: string): value is Week {
  return validWeeks.includes(value as Week);
}

// 3. Hitung minggu ke-berapa di bulan ini
export function getCurrentWeek(): Week {
  const today = new Date();
  // tanggal 1–7 => week 1, 8–14 => week 2, dst.
  const weekIndex = Math.min(
    3, // batas maksimum 3 agar tidak melewati index ke-3 (Week 4)
    Math.floor((today.getDate() - 1) / 7)
  );
  return validWeeks[weekIndex];
}

// 4. Setter publik
export function setWeekForMonthly(value: string) {
  if (isValidWeek(value)) {
    monthySchedule.set(value);
  }
}

// 5. Nilai awal: dari sessionStorage atau default getCurrentWeek()
const initial: Week = browser
  ? (() => {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      return isValidWeek(stored ?? '') ? (stored as Week) : getCurrentWeek();
    })()
  : getCurrentWeek();

// 6. Store writable
export const monthySchedule = writable<Week>(initial);

// 7. Subscribe untuk simpan ke sessionStorage setiap berubah
if (browser) {
  monthySchedule.subscribe((value) => {
    if (isValidWeek(value)) {
      window.sessionStorage.setItem(STORAGE_KEY, value);
    }
  });
}
