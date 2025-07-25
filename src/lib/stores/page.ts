import { writable } from 'svelte/store';

// const stored = typeof window !== 'undefined' ? sessionStorage.getItem('page') : null;
// const initialPage = stored ? Number(stored) : 1;
const initialPage = 1;

export const page = writable(initialPage);

page.subscribe((value) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('page', String(value));
    }
});
