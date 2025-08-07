// src/lib/stores/scheduleFilter.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// 1. Daftar opsi yang valid
export const validScheduleFilters = ['Daily', 'Weekly', 'Monthly'] as const;
export type ScheduleFilter = typeof validScheduleFilters[number];

// 2. Helper validasi
function isValidFilter(value: string): value is ScheduleFilter {
	return validScheduleFilters.includes(value as ScheduleFilter);
}

const STORAGE_KEY = 'scheduleFilter';
const DEFAULT: ScheduleFilter = 'Daily';

// 3. Ambil nilai awal dari sessionStorage jika valid
const initial: ScheduleFilter = browser
	? (() => {
		const stored = window.sessionStorage.getItem(STORAGE_KEY);
		return isValidFilter(stored ?? '') ? (stored as ScheduleFilter) : DEFAULT;
	})()
	: DEFAULT;

// 4. Store dengan type safety
export const scheduleFilter = writable<ScheduleFilter>(initial);

// 5. Simpan ke session jika valid
if (browser) {
	scheduleFilter.subscribe((v) => {
		if (isValidFilter(v)) {
			window.sessionStorage.setItem(STORAGE_KEY, v);
		}
	});
}

// 6. Opsional helper untuk set aman dari luar
export function setSafeScheduleFilter(value: string) {
	if (isValidFilter(value)) {
		scheduleFilter.set(value);
	}
}
