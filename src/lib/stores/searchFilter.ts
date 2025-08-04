// src/lib/stores/searchFilter.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'searchFilter';
const DEFAULT = 'Semua';

const initial = browser
  ? window.sessionStorage.getItem(STORAGE_KEY) ?? DEFAULT
  : DEFAULT;

export const searchFilter = writable<string>(initial);

if (browser) {
  searchFilter.subscribe((v) => {
    window.sessionStorage.setItem(STORAGE_KEY, v);
  });
}
