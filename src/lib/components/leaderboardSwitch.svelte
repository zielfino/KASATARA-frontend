<script lang="ts">
	import { onMount } from 'svelte';
	import { contentType, contentBy, contentPer } from '../stores/leaderboard';
	import type { Writable } from 'svelte/store';
	import { tick } from 'svelte';

	import Breakline from './util/breakline.svelte';
	import DropSelect from './DropSelect.svelte';

	const typeChoices = ['semua', 'komik', 'novel', 'visual novel'];
	const perChoices = ['semua', 'harian', 'bulanan', 'tahunan'];

	let translateType = '';
	let translateBy = '';
	let translatePer = '';

	function getTranslate(factor: number): string {
		if (typeof window !== 'undefined'){
			return window.innerWidth > 500
				? `translateX(calc(100% * ${factor} + 8px * ${factor}))`
				: `translateX(calc(100% * ${factor} + 8px * ${factor}))`;
		}
		return '';
	}

	function updateAllTranslate() {
		const typeMap = {
			semua: 0,
			komik: 1,
			novel: 2,
			'visual novel': 3
		} as const;

		const byMap = {
			trending: 0,
			sering: 1,
			favorit: 2
		} as const;

		const perMap = {
			harian: 0,
			bulanan: 1,
			tahunan: 2,
			semua: 3
		} as const;

		type TypeKey = keyof typeof typeMap;
		type ByKey = keyof typeof byMap;
		type PerKey = keyof typeof perMap;

		translateType = getTranslate(typeMap[$contentType as TypeKey] ?? 0);
		translateBy = getTranslate(byMap[$contentBy as ByKey] ?? 0);
		translatePer = getTranslate(perMap[$contentPer as PerKey] ?? 0);
	}


	// Reaktif terhadap perubahan semua store
	$: updateAllTranslate();

	onMount(() => {
		if (typeof window !== 'undefined')
		window.addEventListener('resize', updateAllTranslate);
		return () => window.removeEventListener('resize', updateAllTranslate);
	});

	async function changeStore<T>(store: Writable<T>, value: T) {
		store.set(value);
		await tick();
	}
</script>


<div class="w-full text-[3.2vw] min-xs:text-[14px] md:text-[16px] space-y-[1.6vw] xs:space-y-2">
    <div class="grid grid-cols-2 gap-[1.6vw] xs:gap-[8px]">
        <DropSelect
            options={typeChoices}
            selected={$contentType}
            onChange={(value) => changeStore(contentType, value)}
        />
        <DropSelect
            options={perChoices}
            selected={$contentPer}
            onChange={(value) => changeStore(contentPer, value)}
        />
    </div>
    <div class="grid grid-cols-3 w-full relative
    h-[9.6vw] xs:h-[38px]
    text-[3.2vw] min-xs:text-[14px] md:text-[14px] gap-[1.6vw] xs:gap-2">
        <button class={`h-full flex justify-center items-center z-10 transition-all outline-none rounded-md ${$contentBy === 'trending' ? 'bg-zinc-900/10 pointer-events-none' : 'cursor-pointer focus-visible:bg-sky-400/10 focus-visible:ring-sky-400/50 focus-visible:ring-1 xs:hover:bg-zinc-900/5'}`}
        disabled={$contentBy === 'trending'}
        on:click={() => changeStore(contentBy, 'trending')}>
            Trending
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all outline-none rounded-md ${$contentBy === 'sering' ? 'bg-zinc-900/10 pointer-events-none' : 'cursor-pointer focus-visible:bg-sky-400/10 focus-visible:ring-sky-400/50 focus-visible:ring-1 xs:hover:bg-zinc-900/5'}`}
        disabled={$contentBy === 'sering'}
        on:click={() => changeStore(contentBy, 'sering')}>
            Sering
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all outline-none rounded-md ${$contentBy === 'favorit' ? 'bg-zinc-900/10 pointer-events-none' : 'cursor-pointer focus-visible:bg-sky-400/10 focus-visible:ring-sky-400/50 focus-visible:ring-1 xs:hover:bg-zinc-900/5'}`}
        disabled={$contentBy === 'favorit'}
        on:click={() => changeStore(contentBy, 'favorit')}>
            Favorit
        </button>
    </div>
</div>