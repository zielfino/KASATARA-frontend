<script lang="ts">
	import { onMount } from 'svelte';
	import Breakline from './util/breakline.svelte';

	let type: string = 'semua';
	let by: string = 'trending';
	let per: string = 'harian';

	let translateType = '';
	let translateBy = '';
	let translatePer = '';

	const isBrowser = typeof window !== 'undefined';

	// 🔁 Single function to calculate translate value
	function getTranslate(factor: number): string {
		if (!isBrowser) return '';
		return window.innerWidth > 500
			? `translateX(calc((100% + 8px) * ${factor}))`
			: `translateX(calc((100% + 1.6vw) * ${factor}))`;
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
		if (storedType && ['komik', 'novel', 'semua'].includes(storedType)) {
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
		if (storedPer && ['harian', 'bulanan', 'tahunan', 'semua'].includes(storedPer)) {
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




<div class="w-full text-[3.2vw] min-[500px]:text-[18px] md:text-[16px]">
    <div class="grid grid-cols-3 w-full relative
    h-[9.6vw] min-[500px]:h-[64px] md:h-[44px]
    text-[3.2vw] min-[500px]:text-[18px] md:text-[16px]">
        <div class="h-full w-1/3 absolute inset-0 z-0
        p-[0.8vw] min-[500px]:p-[4px]">
          <div
            class="bg-mainred rounded-[2vw] min-[500px]:rounded-[10px] h-full transition-all"
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
    </div>
    <Breakline />
    <div class="grid grid-cols-3 w-full relative
    h-[9.6vw] min-[500px]:h-[64px] md:h-[44px]
    text-[3.2vw] min-[500px]:text-[18px] md:text-[16px]">
        <div class="h-full w-1/3 absolute inset-0 z-0
        p-[0.8vw] min-[500px]:p-[4px]">
          <div
            class="bg-mainred rounded-[2vw] min-[500px]:rounded-[10px] h-full transition-all"
            style:transform={translateBy}
          ></div>
        </div>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${by === 'trending' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={by === 'trending'}
        on:click={() => changeContentBy('trending')}>
            Trending
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${by === 'sering' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={by === 'sering'}
        on:click={() => changeContentBy('sering')}>
            Sering
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${by === 'favorit' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={by === 'favorit'}
        on:click={() => changeContentBy('favorit')}>
            Favorit
        </button>
    </div>
    <Breakline />
    <div class="grid grid-cols-4 w-full relative
    h-[9.6vw] min-[500px]:h-[64px] md:h-[44px]
    text-[3.2vw] min-[500px]:text-[18px] md:text-[16px]">
        <div class="h-full w-1/4 absolute inset-0 z-0
        p-[0.8vw] min-[500px]:p-[4px]">
          <div
            class="bg-mainred rounded-[2vw] min-[500px]:rounded-[10px] h-full transition-all"
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
    </div>
    <Breakline />
</div>