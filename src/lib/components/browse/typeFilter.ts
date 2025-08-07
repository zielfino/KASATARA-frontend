// src/lib/stores/typeFilter.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// 1. Daftar opsi yang valid
export const TypeearchFilters = ['Semua', 'Komik', 'Novel', 'Visual Novel'] as const;
export type TypeFilter = typeof TypeearchFilters[number];

// 2. Helper validasi
function isValidFilter(value: string): value is TypeFilter {
	return TypeearchFilters.includes(value as TypeFilter);
}

const STORAGE_KEY = 'typeFilter';
const DEFAULT: TypeFilter = 'Semua';

// 3. Ambil nilai awal dari sessionStorage jika valid
const initial: TypeFilter = browser
	? (() => {
		const stored = window.sessionStorage.getItem(STORAGE_KEY);
		return isValidFilter(stored ?? '') ? (stored as TypeFilter) : DEFAULT;
	})()
	: DEFAULT;

// 4. Store dengan type safety
export const typeFilter = writable<TypeFilter>(initial);

// 5. Simpan ke session jika valid
if (browser) {
	typeFilter.subscribe((v) => {
		if (isValidFilter(v)) {
			window.sessionStorage.setItem(STORAGE_KEY, v);
		}
	});
}

// 6. Opsional helper untuk set aman dari luar
export function setSafetypeFilter(value: string) {
	if (isValidFilter(value)) {
		typeFilter.set(value);
	}
}
