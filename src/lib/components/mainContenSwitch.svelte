<script lang="ts">
    import { onMount } from 'svelte';
    import { tick } from 'svelte';
    import Breakline from './util/breakline.svelte';

    let mainContent: string = 'komik';
    let translateStyle: string = '';

    const isBrowser = typeof window !== 'undefined';

    function calculateTranslate(): string {
        if (!isBrowser) return '';
        const factor = mainContent === 'novel' ? 1 : 0;
        return window.innerWidth > 500
            ? `translateX(calc((100% + 8px) * ${factor}))`
            : `translateX(calc((100% + 1.6vw) * ${factor}))`;
    }

    function updateTranslate() {
        translateStyle = calculateTranslate();
    }

    onMount(() => {
        if (isBrowser) {
            const stored = sessionStorage.getItem('selectedMainContent');
            if (stored === 'komik' || stored === 'novel') {
                mainContent = stored;
            } else {
                sessionStorage.setItem('selectedMainContent', mainContent);
            }

            updateTranslate(); // initial
            window.addEventListener('resize', updateTranslate);

            return () => {
                window.removeEventListener('resize', updateTranslate);
            };
        }
    });

    async function changeContent(to: string) {
        mainContent = to;
        if (isBrowser) {
            sessionStorage.setItem('selectedMainContent', to);
        }
            await tick();
            updateTranslate();
    }
</script>

<div class="w-full min-[900px]:bg-mainlight flex flex-col items-center justify-center z-2">
    <div class="grid grid-cols-2 w-full relative
    h-[9.6vw] min-[500px]:h-[64px]
    text-[3.2vw] min-[500px]:text-[18px]
    md:max-w-[calc((875px/100*88))]
    lg:max-w-[calc((1075px/100*88))]
    xl:max-w-[1100px]">
        
        <div class="h-full w-1/2 absolute inset-0 z-0 
        p-[0.8vw] min-[500px]:p-[4px]">
            <div
                class="bg-mainred rounded-[2vw] min-[500px]:rounded-[10px] h-full transition-all"
                style:transform={translateStyle}
            ></div>
        </div>

        <button class={`h-full flex justify-center items-center z-10 transition-all md:uppercase ${mainContent === 'komik' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={mainContent === 'komik'}
        on:click={() => changeContent('komik')}>
            Komik
        </button>

        <button class={`h-full flex justify-center items-center z-10 transition-all md:uppercase ${mainContent === 'novel' ? 'text-mainlight pointer-events-none' : 'cursor-pointer'}`}
        disabled={mainContent === 'novel'}
        on:click={() => changeContent('novel')}>
            Novel
        </button>
    </div>
    <div class="max-[500px]:hidden min-[900px]:hidden"><Breakline/></div>
</div>