<script lang="ts">
	import { onMount } from 'svelte';
	import Breakline from './util/breakline.svelte';

    let currentType = 'komik';
    let currentBy = 'trending';
    let currentPer = 'harian';
    const typeChoices = ['semua', 'komik', 'novel', 'visual novel'];
    const perChoices = ['semua', 'harian', 'bulanan', 'tahunan'];

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




<div class="w-full text-[3.2vw] min-xs:text-[18px] md:text-[16px] space-y-[1.6vw] xs:space-y-2">
    <!-- <div class="grid grid-cols-3 w-full relative
    h-[9.6vw] min-xs:h-[64px] md:h-[44px]
    text-[3.2vw] min-xs:text-[18px] md:text-[16px]">
        <div class="h-full w-1/3 absolute inset-0 z-0
        p-[0.8vw] min-xs:p-[4px]">
          <div
            class="bg-mainred rounded-[1.2vw] min-xs:rounded-md h-full transition-all"
            style:transform={translateType}
          ></div>
        </div>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${type === 'semua' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={type === 'semua'}
        on:click={() => changeContentType('semua')}>
            Semua
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${type === 'komik' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={type === 'komik'}
        on:click={() => changeContentType('komik')}>
            Komik
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${type === 'novel' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={type === 'novel'}
        on:click={() => changeContentType('novel')}>
            Novel
        </button>
    </div> -->
    <!-- <Breakline /> -->
    <!-- <Breakline /> -->
    <!-- <div class="grid grid-cols-4 w-full relative
    h-[9.6vw] min-xs:h-[64px] md:h-[44px]
    text-[3.2vw] min-xs:text-[18px] md:text-[16px]">
        <div class="h-full w-1/4 absolute inset-0 z-0
        p-[0.8vw] min-xs:p-[4px]">
          <div
            class="bg-mainred rounded-[1.2vw] min-xs:rounded-md h-full transition-all"
            style:transform={translatePer}
          ></div>
        </div>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${per === 'harian' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={per === 'harian'}
        on:click={() => changeContentPer('harian')}>
            Harian
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${per === 'bulanan' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={per === 'bulanan'}
        on:click={() => changeContentPer('bulanan')}>
            Bulanan
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${per === 'tahunan' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={per === 'tahunan'}
        on:click={() => changeContentPer('tahunan')}>
            Tahunan
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${per === 'semua' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={per === 'semua'}
        on:click={() => changeContentPer('semua')}>
            Semua
        </button>
    </div> -->
    <!-- <Breakline /> -->

    <div class="grid grid-cols-2 gap-[1.6vw] xs:gap-[8px]">
        <DropSelect
            options={typeChoices}
            selected={currentType}
            onChange={(value) => changeContentType(value)}
        />
        <DropSelect
            options={perChoices}
            selected={currentPer}
            onChange={(value) => changeContentPer(value)}
        />
    </div>
    <div class="grid grid-cols-3 w-full relative
    h-[9.6vw] min-xs:h-[64px] md:h-[38px]
    text-[3.2vw] min-xs:text-[18px] md:text-[14px] gap-[1.6vw] xs:gap-2">
        <!-- <div class="h-full w-[calc((1/3*100%)-5.2px)] absolute inset-0 z-0">
          <div
            class="bg-zinc-900/30 rounded-md h-full transition-all"
            style:transform={translateBy}
          ></div>
        </div> -->
        <button class={`h-full flex justify-center items-center z-10 transition-all outline-none rounded-md ${by === 'trending' ? 'bg-zinc-900/10 pointer-events-none' : 'cursor-pointer xs:focus:bg-zinc-900/15 xs:hover:bg-zinc-900/5'}`}
        disabled={by === 'trending'}
        on:click={() => changeContentBy('trending')}>
            Trending
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all outline-none rounded-md ${by === 'sering' ? 'bg-zinc-900/10 pointer-events-none' : 'cursor-pointer xs:focus:bg-zinc-900/15 xs:hover:bg-zinc-900/5'}`}
        disabled={by === 'sering'}
        on:click={() => changeContentBy('sering')}>
            Sering
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all outline-none rounded-md ${by === 'favorit' ? 'bg-zinc-900/10 pointer-events-none' : 'cursor-pointer xs:focus:bg-zinc-900/15 xs:hover:bg-zinc-900/5'}`}
        disabled={by === 'favorit'}
        on:click={() => changeContentBy('favorit')}>
            Favorit
        </button>
    </div>
</div>