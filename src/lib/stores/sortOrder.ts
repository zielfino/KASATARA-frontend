// src/lib/stores/sortOrder.ts
import { writable } from 'svelte/store';

const key = 'sortAsc';
const initial = typeof window !== 'undefined'
  ? sessionStorage.getItem(key)?.toLowerCase() === 'false' ? false : true
  : true;

export const sortAsc = writable<boolean>(initial);

sortAsc.subscribe((v) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, String(v));
  }
});
