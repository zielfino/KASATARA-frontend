<script lang="ts">
	import { onMount } from 'svelte';
	import Breakline from './util/breakline.svelte';

    let currentType = 'komik';
    let currentBy = 'trending';
    let currentPer = 'harian';
    const typeChoices = ['semua', 'komik', 'novel', 'visual novel'];
    const perChoices = ['semua', 'harian', 'bulanan', 'tahunan'];

    let storedType = 'semua';
    let storedPer = 'semua';
    onMount(() => {
        storedType = sessionStorage.getItem('leaderboardSwitchType') ?? 'semua';
        storedPer = sessionStorage.getItem('leaderboardSwitchPer') ?? 'semua';
    });
    // function handleChange(value: string) {
    //     console.log('You picked:', value);
    // }

	let type: string = currentType;
	let by: string = currentBy;
	let per: string = currentPer;

	let translateType = '';
	let translateBy = '';
	let translatePer = '';

	const isBrowser = typeof window !== 'undefined';

	// 🔁 Single function to calculate translate value
	function getTranslate(factor: number): string {
		if (!isBrowser) return '';
		return window.innerWidth > 500
			? `translateX(  calc( (100% * ${factor}) + 8px * ${factor} )  )`
			: `translateX(  calc( (100% * ${factor}) + 8px * ${factor} )  )`;
	}

	function updateAllTranslate() {
		const typeMap: Record<string, number> = { semua: 0, komik: 1, novel: 2 };
		const byMap: Record<string, number> = { trending: 0, sering: 1, favorit: 2 };
		const perMap: Record<string, number> = { harian: 0, bulanan: 1, tahunan: 2, semua: 3 };

		translateType = getTranslate(typeMap[type]);
		translateBy = getTranslate(byMap[by]);
		translatePer = getTranslate(perMap[per]);
	}

	onMount(() => {
		if (!isBrowser) return;

		// Session restore
		const storedType = sessionStorage.getItem('leaderboardSwitchType');
		if (storedType && ['semua', 'komik', 'novel', 'visual novel'].includes(storedType)) {
			type = storedType;
		} else {
			sessionStorage.setItem('leaderboardSwitchType', type);
		}

		const storedBy = sessionStorage.getItem('leaderboardSwitchBy');
		if (storedBy && ['trending', 'sering', 'favorit'].includes(storedBy)) {
			by = storedBy;
		} else {
			sessionStorage.setItem('leaderboardSwitchBy', by);
		}

		const storedPer = sessionStorage.getItem('leaderboardSwitchPer');
		if (storedPer && ['semua', 'harian', 'bulanan', 'tahunan'].includes(storedPer)) {
			per = storedPer;
		} else {
			sessionStorage.setItem('leaderboardSwitchPer', per);
		}

		updateAllTranslate();
		window.addEventListener('resize', updateAllTranslate);
		return () => window.removeEventListener('resize', updateAllTranslate);
	});

	// 💡 Update & tick for DOM sync
	import { tick } from 'svelte';
    import DropSelect from './DropSelect.svelte';

	async function changeContentType(to: string) {
		type = to;
		sessionStorage.setItem('leaderboardSwitchType', to);
		await tick();
		updateAllTranslate();
	}

	async function changeContentBy(to: string) {
		by = to;
		sessionStorage.setItem('leaderboardSwitchBy', to);
		await tick();
		updateAllTranslate();
	}

	async function changeContentPer(to: string) {
		per = to;
		sessionStorage.setItem('leaderboardSwitchPer', to);
		await tick();
		updateAllTranslate();
	}
</script>




<div class="w-full text-[3.2vw] min-xs:text-[14px] md:text-[16px] space-y-[1.6vw] xs:space-y-2">
    <div class="grid grid-cols-2 gap-[1.6vw] xs:gap-[8px]">
        <DropSelect
            options={typeChoices}
            selected={storedType}
            onChange={(value) => changeContentType(value)}
        />
        <DropSelect
            options={perChoices}
            selected={storedPer}
            onChange={(value) => changeContentPer(value)}
        />
    </div>
    <div class="grid grid-cols-3 w-full relative
    h-[9.6vw] xs:h-[38px]
    text-[3.2vw] min-xs:text-[14px] md:text-[14px] gap-[1.6vw] xs:gap-2">
        <button class={`h-full flex justify-center items-center z-10 transition-all outline-none rounded-md ${by === 'trending' ? 'bg-zinc-900/10 pointer-events-none' : 'cursor-pointer focus-visible:bg-sky-400/10 focus-visible:ring-sky-400/50 focus-visible:ring-1 xs:hover:bg-zinc-900/5'}`}
        disabled={by === 'trending'}
        on:click={() => changeContentBy('trending')}>
            Trending
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all outline-none rounded-md ${by === 'sering' ? 'bg-zinc-900/10 pointer-events-none' : 'cursor-pointer focus-visible:bg-sky-400/10 focus-visible:ring-sky-400/50 focus-visible:ring-1 xs:hover:bg-zinc-900/5'}`}
        disabled={by === 'sering'}
        on:click={() => changeContentBy('sering')}>
            Sering
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all outline-none rounded-md ${by === 'favorit' ? 'bg-zinc-900/10 pointer-events-none' : 'cursor-pointer focus-visible:bg-sky-400/10 focus-visible:ring-sky-400/50 focus-visible:ring-1 xs:hover:bg-zinc-900/5'}`}
        disabled={by === 'favorit'}
        on:click={() => changeContentBy('favorit')}>
            Favorit
        </button>
    </div>
</div>