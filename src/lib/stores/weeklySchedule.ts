// src/lib/stores/weeklySchedule.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'weeklySchedule';

export const validDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = typeof validDays[number];

export function isValidDay(value: string): value is Day {
	return validDays.includes(value as Day);
}

// 🔁 Fungsi untuk ambil hari saat ini
function getToday(): Day {
	const dayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
	// Sesuaikan ke format validDays
	const dayMap: Record<number, Day> = {
		0: 'Sun',
		1: 'Mon',
		2: 'Tue',
		3: 'Wed',
		4: 'Thu',
		5: 'Fri',
		6: 'Sat',
	};
	return dayMap[dayIndex];
}

// Setter aman
export function setDayforWeekly(value: string) {
	if (isValidDay(value)) {
		weeklySchedule.set(value);
	}
}

const initial: Day = browser
	? (() => {
			const stored = window.sessionStorage.getItem(STORAGE_KEY);
			return isValidDay(stored ?? '') ? stored as Day : getToday(); // 👈 default = hari ini
		})()
	: getToday();

export const weeklySchedule = writable<Day>(initial);

if (browser) {
	weeklySchedule.subscribe((value) => {
		if (isValidDay(value)) {
			window.sessionStorage.setItem(STORAGE_KEY, value);
		}
	});
}
