// src/lib/stores/page.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { page as appPage } from '$app/stores';
import { get } from 'svelte/store';

const initial = 1;
export const page = writable<number>(initial);

if (browser) {
  page.subscribe((value) => {
    // ambil URL current dengan safe-get
    const app = get(appPage);
    const path = app?.url?.pathname ?? '/';
    // buat key: '/' → 'page', '/browse' → 'browsepage', dll.
    const key = path === '/' ? 'page' : path.replace(/^\//, '') + 'page';
    sessionStorage.setItem(key, String(value));
  });
}
