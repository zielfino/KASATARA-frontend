import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

const initial = 1;
export const page = writable<number>(initial);
export const maxPage = writable<number>(Infinity); // default tanpa batas

// hanya jalan di browser
if (browser) {
	onloadOrHydrate();
}

function onloadOrHydrate() {
	const path = window.location.pathname;
	const key = path === '/' ? 'page' : path.replace(/^\//, '') + 'page';

	// Ambil dari sessionStorage
	const saved = Number(sessionStorage.getItem(key));
	if (!isNaN(saved) && saved >= 1) {
		page.set(saved);
	}

	// Sinkronisasi ke sessionStorage saat page berubah
	page.subscribe((value) => {
		const clamped = Math.max(1, value);
		sessionStorage.setItem(key, String(clamped));
	});

	// Reaktif ke perubahan maxPage: pastikan page tidak melebihi batas
	maxPage.subscribe((max) => {
		const current = get(page);
		if (current > max) {
			page.set(max);
		} else if (current < 1) {
			page.set(1);
		}
	});
}
