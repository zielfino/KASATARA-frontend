// src/lib/stores/dailySchedule.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'dailySchedule';

// 1. Valid hours (3-jam sekali)
export const validHours = [
  '03:00',
  // '06:00',
  '09:00',
  // '12:00',
  '15:00',
  // '18:00',
  '21:00',
  // '24:00'
] as const;
export type Hour = typeof validHours[number];

// 2. Guard untuk memastikan string masuk validHours
export function isValidHour(value: string): value is Hour {
  return validHours.includes(value as Hour);
}

// 3. Hitung slot jam sekarang
//    - Kita bagi 24 jam menjadi 8 slot 3-jam: 00–02 => '03:00', 03–05 => '06:00', ..., 21–23 => '24:00'
export function getCurrentHour(): Hour {
  const now   = new Date();
  const total = now.getHours() + now.getMinutes() / 60; // jam desimal

  if (total < 3)   return '21:00';
  if (total < 9)   return '03:00';
  if (total < 15)  return '09:00';
  if (total < 21)  return '15:00';
  // total < 24
  return '21:00';
}

// 4. Setter publik
export function setHourForDaily(value: string) {
  if (isValidHour(value)) {
    dailySchedule.set(value);
  }
}

// 5. Nilai awal: dari sessionStorage atau default getCurrentHour()
const initial: Hour = browser
  ? (() => {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      return isValidHour(stored ?? '') ? (stored as Hour) : getCurrentHour();
    })()
  : getCurrentHour();

// 6. Store writable
export const dailySchedule = writable<Hour>(initial);

// 7. Subscribe untuk simpan ke sessionStorage setiap berubah
if (browser) {
  dailySchedule.subscribe((value) => {
    if (isValidHour(value)) {
      window.sessionStorage.setItem(STORAGE_KEY, value);
    }
  });
}
