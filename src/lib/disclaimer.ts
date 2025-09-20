// src/lib/stores/disclaimer.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createSessionStore<T>(key: string, initial: T) {
  const { subscribe, set, update } = writable(initial);

  // hanya akses sessionStorage di client
  if (browser) {
    try {
      const json = sessionStorage.getItem(key);
      if (json !== null) set(JSON.parse(json));
    } catch (e) {
      // ignore (quota/security)
      console.warn('sessionStorage read failed for', key);
    }

    // subscribe untuk menyimpan perubahan ke sessionStorage
    subscribe((val) => {
      try {
        sessionStorage.setItem(key, JSON.stringify(val));
      } catch (e) {
        // ignore
      }
    });
  }

  return { subscribe, set, update };
}

// default sesuai yg kamu mau (kamu sebut awalnya true)
export const disclaimer = createSessionStore<boolean>('disclaimer', true);
