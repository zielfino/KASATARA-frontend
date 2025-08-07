// src/lib/stores/contentFilter.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// 1. Daftar opsi yang valid
export const validContentFilters = ['Schedule', 'Semua', 'Official', 'Indie', 'Mirror'] as const;
export type ContentFilter = typeof validContentFilters[number];

// 2. Helper validasi
function isValidFilter(value: string): value is ContentFilter {
	return validContentFilters.includes(value as ContentFilter);
}

const STORAGE_KEY = 'contentFilter';
const DEFAULT: ContentFilter = 'Schedule';

// 3. Ambil nilai awal dari sessionStorage jika valid
const initial: ContentFilter = browser
	? (() => {
		const stored = window.sessionStorage.getItem(STORAGE_KEY);
		return isValidFilter(stored ?? '') ? (stored as ContentFilter) : DEFAULT;
	})()
	: DEFAULT;

// 4. Store dengan type safety
export const contentFilter = writable<ContentFilter>(initial);

// 5. Simpan ke session jika valid
if (browser) {
	contentFilter.subscribe((v) => {
		if (isValidFilter(v)) {
			window.sessionStorage.setItem(STORAGE_KEY, v);
		}
	});
}

// 6. Opsional helper untuk set aman dari luar
export function setSafeContentFilter(value: string) {
	if (isValidFilter(value)) {
		contentFilter.set(value);
	}
}
