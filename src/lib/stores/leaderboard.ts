// stores/leaderboard.ts
import { writable, type Writable } from 'svelte/store';

export function createPersistedStore<T>(key: string, initial: T): Writable<T> {
	if (typeof window === 'undefined') {
		return writable(initial);
	}

	let saved: T;

	try {
		const raw = sessionStorage.getItem(key);
		saved = raw ? JSON.parse(raw) : initial;
	} catch (e) {
		console.warn(`Could not parse sessionStorage key "${key}"`, e);
		saved = initial;
	}

	const store = writable<T>(saved);

	store.subscribe((value) => {
		try {
			sessionStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			console.warn(`Could not write to sessionStorage key "${key}"`, e);
		}
	});

	return store;
}

// ⬇️ Buat tiga store
export const contentType = createPersistedStore<string>('leaderboardSwitchType', 'komik');
export const contentBy = createPersistedStore<string>('leaderboardSwitchBy', 'trending');
export const contentPer = createPersistedStore<string>('leaderboardSwitchPer', 'harian');
