<script lang="ts">
    import { onMount } from 'svelte';
    let mainContent: string = 'komik'; // default

    onMount(() => {
        const stored = sessionStorage.getItem('selectedMainContent');
        if (stored === 'komik' || stored === 'novel') {
            mainContent = stored;
        } else {
            sessionStorage.setItem('selectedMainContent', mainContent);
        }
    });

    function changeContent(to: string) {
        mainContent = to;
        sessionStorage.setItem('selectedMainContent', to);
    }

    function getTranslateValue(): string {
        const factor = mainContent === 'novel' ? 1 : 0;
        return `translateX(calc((100% + 1.6vw) * ${factor}))`;
    }
</script>


<div class="grid grid-cols-2 w-full text-[3.2vw] h-[9.6vw] relative">
    <div class="h-full w-1/2 absolute inset-0 z-0 p-[0.8vw]">
      <div
        class="bg-mainred rounded-[2vw] h-full transition-all"
        style:transform={getTranslateValue()}
      ></div>
    </div>
    <button class={`h-full flex justify-center items-center z-10 transition-all ${mainContent === 'komik' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
    disabled={mainContent === 'komik'}
    on:click={() => changeContent('komik')}>
        Komik
    </button>
    <button class={`h-full flex justify-center items-center z-10 transition-all ${mainContent === 'novel' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
    disabled={mainContent === 'novel'}
    on:click={() => changeContent('novel')}>
        Novel
    </button>
</div>