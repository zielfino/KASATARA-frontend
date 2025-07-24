// src/lib/stores/heroFilter.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'heroFilter';
const DEFAULT = 'Rekomendasi';

const initial = browser
  ? window.sessionStorage.getItem(STORAGE_KEY) ?? DEFAULT
  : DEFAULT;

export const heroFilter = writable<string>(initial);

if (browser) {
  heroFilter.subscribe((v) => {
    window.sessionStorage.setItem(STORAGE_KEY, v);
  });
}
