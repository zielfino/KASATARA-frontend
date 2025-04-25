<script lang="ts">
    import { onMount } from 'svelte';
    import Breakline from './util/breakline.svelte';
    let type: string = 'semua'; // default
    let by: string = 'trending'; // default
    let per: string = 'harian'; // default

    onMount(() => {
        const storedType = sessionStorage.getItem('leaderboardSwitchType');
        if (storedType === 'komik' || storedType === 'novel' || storedType === 'semua') {
            type = storedType;
        } else {
            sessionStorage.setItem('leaderboardSwitchType', type);
        }
        
        const storedBy = sessionStorage.getItem('leaderboardSwitchBy');
        if (storedBy === 'komik' || storedBy === 'novel' || storedBy === 'semua') {
            by = storedBy;
        } else {
            sessionStorage.setItem('leaderboardSwitchBy', by);
        }
        
        const storedPer = sessionStorage.getItem('leaderboardSwitchPer');
        if (storedPer === 'komik' || storedPer === 'novel' || storedPer === 'semua') {
            per = storedPer;
        } else {
            sessionStorage.setItem('leaderboardSwitchPer', per);
        }
    });

    function changeContentType(to: string) {
        type = to;
        sessionStorage.setItem('leaderboardSwitchType', to);
    }

    function changeContentBy(to: string) {
        by = to;
        sessionStorage.setItem('leaderboardSwitchBy', to);
    }

    function changeContentPer(to: string) {
        per = to;
        sessionStorage.setItem('leaderboardSwitchPer', to);
    }

    function getTranslateType(): string {
        const indexMap: Record<typeof type, number> = {
            semua: 0,
            komik: 1,
            novel: 2,
        };

        const factor = indexMap[type];
        return `translateX(calc((100% + 1.6vw) * ${factor}))`;
    }

    function getTranslateBy(): string {
        const indexMap: Record<typeof by, number> = {
            trending: 0,
            sering: 1,
            favorit: 2
        };

        const factor = indexMap[by];
        return `translateX(calc((100% + 1.6vw) * ${factor}))`;
    }

    function getTranslatePer(): string {
        const indexMap: Record<typeof per, number> = {
            harian: 0,
            bulanan: 1,
            tahunan: 2,
            semua: 3
        };

        const factor = indexMap[per];
        return `translateX(calc((100% + 1.6vw) * ${factor}))`;
    }
</script>



<div class="w-full text-[3.2vw]">
    <div class="grid grid-cols-3 w-full text-[3.2vw] h-[9.6vw] relative">
        <div class="h-full w-1/3 absolute inset-0 z-0 p-[0.8vw]">
          <div
            class="bg-mainred rounded-[2vw] h-full transition-all"
            style:transform={getTranslateType()}
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
    <div class="grid grid-cols-3 w-full text-[3.2vw] h-[9.6vw] relative">
        <div class="h-full w-1/3 absolute inset-0 z-0 p-[0.8vw]">
          <div
            class="bg-mainred rounded-[2vw] h-full transition-all"
            style:transform={getTranslateBy()}
          ></div>
        </div>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${by === 'trending' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={by === 'trending'}
        on:click={() => changeContentBy('trending')}>
            trending
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${by === 'sering' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={by === 'sering'}
        on:click={() => changeContentBy('sering')}>
            sering
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${by === 'favorit' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={by === 'favorit'}
        on:click={() => changeContentBy('favorit')}>
            favorit
        </button>
    </div>
    <Breakline />
    <div class="grid grid-cols-4 w-full text-[3.2vw] h-[9.6vw] relative">
        <div class="h-full w-1/4 absolute inset-0 z-0 p-[0.8vw]">
          <div
            class="bg-mainred rounded-[2vw] h-full transition-all"
            style:transform={getTranslatePer()}
          ></div>
        </div>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${per === 'harian' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={per === 'harian'}
        on:click={() => changeContentPer('harian')}>
            harian
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${per === 'bulanan' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={per === 'bulanan'}
        on:click={() => changeContentPer('bulanan')}>
            bulanan
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${per === 'tahunan' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={per === 'tahunan'}
        on:click={() => changeContentPer('tahunan')}>
            tahunan
        </button>
        <button class={`h-full flex justify-center items-center z-10 transition-all ${per === 'semua' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={per === 'semua'}
        on:click={() => changeContentPer('semua')}>
            semua
        </button>
    </div>
    <Breakline />
</div>