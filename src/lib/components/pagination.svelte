<script lang="ts">
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';

    export let dead: boolean  ;
    export let totalPages: number = 3 ;
    export let initialPage: number = 1;

    import { page } from '$lib/stores/page';	
	// import { createPageStore } from '$lib/stores/page';

    // import { browser } from '$app/environment';
    // import { writable } from 'svelte/store';
    // export const page = browser ? createPageStore(window.location.pathname).page : writable(1);
    $: currentPage = $page;
    function goToPage(p: number) {
        if (p < 1 || p > totalPages) return;
        page.set(p);
    }
    function next() {
        if (currentPage < totalPages) {
        page.set(currentPage + 1);
        }
    }
    function prev() {
        if (currentPage > 1) {
        page.set(currentPage - 1);
        }
    }

    function first() {
        page.set(initialPage);
    }

    function last() {
        page.set(totalPages);
    }

    onMount(() => {
        const path = window.location.pathname;
        const key = path === '/' ? 'page' : path.replace('/', '') + 'page';
        console.log('test', key)

        // currentPage = initialPage;
        // sessionStorage.setItem(key, currentPage.toString());

        const saved = Number(sessionStorage.getItem(key));
        const validPage = !isNaN(saved) && saved >= 1 && saved <= totalPages ? saved : initialPage;

        page.set(validPage); // update ke store
    });

    $: pageButtons = makePages(currentPage, totalPages);











    function makePages(current: number, total: number): (number | '...')[] {
        // kalau total kecil tampil semua
        if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
        }

        const pages: (number | '...')[] = [];

        // tentukan berapa count di tepian
        const atEdge = current <= 3 || current > total - 3;
        const firstCount = atEdge ? 3 : 2;
        const lastCount  = atEdge ? 3 : 2;

        // awal
        for (let i = 1; i <= firstCount; i++) pages.push(i);

        // sisip gap kiri antara firstCount dan current
        const leftMax = firstCount;
        if (current > leftMax + 1) {
        const dist = current - leftMax;
        if (dist === 2) {
            pages.push(leftMax + 1);
        } else if (dist > 2) {
            pages.push('...');
        }
        }

        // halaman tengah (current) jika bukan di tepian
        const rightMin = total - lastCount + 1;
        if (current > firstCount && current < rightMin) {
        pages.push(current);
        }

        // sisip gap kanan
        if (rightMin > current + 1) {
        const dist = rightMin - current;
        if (dist === 2) {
            pages.push(rightMin - 1);
        } else if (dist > 2) {
            pages.push('...');
        }
        }

        // akhir
        for (let i = rightMin; i <= total; i++) pages.push(i);

        return pages;
    }











    let jump = '';

    function handleInput() {
        let v = Number(jump);
        if (v > totalPages) v = totalPages;
        if (v < 1 ) v = 1;
        jump = String(v);
    }

    function handleJump(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            goToPage(Number(jump));
            jump = '';
            (e.currentTarget as HTMLInputElement).blur();
        }
    }
</script>

{#if totalPages > 1}
    <div class={`w-full xs:mb-2 mb-[1.6vw] bg-mainlight border border-zinc-900/15 rounded-[1.2vw] xs:rounded-md h-[14vw] text-[3.2vw] xs:h-[64px] flex justify-center items-center xs:text-[16px] space-x-[1.6vw] xs:space-x-2 py-[3.2vw] xs:py-4`}>
        <button
            on:click={prev}
            class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-[1.2vw] xs:rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-not-allowed focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
            disabled={currentPage === 1 || dead}
        >
            <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
        </button>

        {#each pageButtons as page}
            {#if page === '...'}
            <input
            type="number"
            bind:value={jump}
            placeholder="..."
            disabled={dead}
            class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-[1.2vw] xs:rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-not-allowed focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50 w-[7.2vw] xs:w-8 text-center appearance-none"
            on:input={handleInput}
            on:keydown={handleJump} 
            />
            {:else}
            <button
                class={`bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-[1.2vw] xs:rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-not-allowed focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50`}
                disabled={page === currentPage || dead}
                on:click={() => goToPage(page)}
            >
                {page}
            </button>
            {/if}
        {/each}


        <button
            on:click={next}
            class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-[1.2vw] xs:rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-not-allowed focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
            disabled={currentPage === totalPages || dead}
        >
            <Icon icon="material-symbols:arrow-forward-ios-rounded" />
        </button>
    </div>
{/if}

<style>
  /* Chrome, Safari, Edge, Opera */
  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>
