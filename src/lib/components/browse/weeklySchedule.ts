// src/lib/stores/weeklySchedule.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'weeklySchedule';

export const validDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Day = typeof validDays[number];

export function isValidDay(value: string): value is Day {
	return validDays.includes(value as Day);
}

export function getToday(): Day {
	const dayIndex = new Date().getDay();
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

export function setDayforWeekly(value: string) {
	if (isValidDay(value)) {
		weeklySchedule.set(value);
	}
}

const initial: Day = browser
	? (() => {
			const stored = window.sessionStorage.getItem(STORAGE_KEY);
			return isValidDay(stored ?? '') ? stored as Day : 'Sun'; // 👈 default = hari ini
		})()
	: 'Mon';

export const weeklySchedule = writable<Day>(initial);

if (browser) {
	weeklySchedule.subscribe((value) => {
		if (isValidDay(value)) {
			window.sessionStorage.setItem(STORAGE_KEY, value);
		}
	});
}
