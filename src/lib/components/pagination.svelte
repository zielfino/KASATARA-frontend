<script lang="ts">
    import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  // export let ison = 'false';
  export let totalPages: number = 3 ;
  export let initialPage: number = 1;

  import { page } from '$lib/stores/page';
  $: currentPage = $page;

  // ⏳ Load page dari sessionStorage saat mount
  // onMount(() => {
  //   const stored = sessionStorage.getItem('page');
  //   const parsed = stored ? parseInt(stored) : NaN;
  //   // currentPage = initialPage;

  //   if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
  //     currentPage = parsed;
  //   } else {
  //     sessionStorage.setItem('page', currentPage.toString());
  //   }
  // });

  // function goToPage(page: number) {
  //   if (page < 1 || page > totalPages) return;
  //   currentPage = page;
  //   sessionStorage.setItem('page', currentPage.toString());
  // }
  function goToPage(p: number) {
    if (p < 1 || p > totalPages) return;
    page.set(p);
  }

  // function next() {
  //   if (currentPage < totalPages) {
  //     goToPage(currentPage + 1);
  //   }
  // }
  function next() {
    if (currentPage < totalPages) {
      page.set(currentPage + 1);
    }
  }

  // function prev() {
  //   if (currentPage > 1) {
  //     goToPage(currentPage - 1);
  //   }
  // }
  function prev() {
    if (currentPage > 1) {
      page.set(currentPage - 1);
    }
  }

  // function first() {
  //   if (initialPage) {
  //     goToPage(initialPage);
  //   }
  // }

  // function last() {
  //   if (totalPages) {
  //     goToPage(totalPages);
  //   }
  // }

  function first() {
    page.set(initialPage);
  }

  function last() {
    page.set(totalPages);
  }

  onMount(() => {
    const path = window.location.pathname;
    const key = path === '/' ? 'page' : path.replace('/', '') + 'page';

    currentPage = initialPage;
    sessionStorage.setItem(key, currentPage.toString());
  });













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

  $: pageButtons = makePages(currentPage, totalPages);











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

<!-- <div class={`w-full bg-mainlight border border-zinc-900/15 rounded-md h-[14vw] text-[3.2vw] xs:h-[64px] flex justify-center items-center xs:text-[16px] space-x-[1.6vw] xs:space-x-2 py-[3.2vw] xs:py-4
${ ison === 'true' ? 'md:hidden' : ison === 'false' ? 'max-md:hidden' : ''}`}> -->
<div class={`w-full bg-mainlight border border-zinc-900/15 rounded-md h-[14vw] text-[3.2vw] xs:h-[64px] flex justify-center items-center xs:text-[16px] space-x-[1.6vw] xs:space-x-2 py-[3.2vw] xs:py-4`}>
    <!-- <button
        on:click={first}
        class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-context-menu focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        disabled={currentPage === 1}
    >
        <Icon icon="material-symbols:double-arrow-rounded" class="text-[18px] max-xs:text-[3.6vw] rotate-180" />
    </button> -->
    <button
        on:click={prev}
        class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-context-menu focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        disabled={currentPage === 1}
    >
        <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
    </button>

    <!-- {#each Array(totalPages).fill(0).map((_, i) => i + 1) as page}
        <button
        disabled={currentPage === page}
        class=" h-full aspect-square rounded-md text-zinc-900 border bg-mainlight border-zinc-900/30 cursor-pointer disabled:cursor-context-menu disabled:bg-zinc-900/15 hover:bg-zinc-900/10 disabled:hover:bg-zinc-900/15 flex justify-center items-center focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        on:click={() => goToPage(page)}
        >
        {page}
        </button>
    {/each} -->

 {#each pageButtons as page}
    {#if page === '...'}
      <!-- <button
        class="h-8 w-8 rounded-md border border-zinc-300 bg-mainlight text-zinc-900
               flex items-center justify-center text-sm
               cursor-pointer disabled:cursor-default disabled:bg-zinc-200
               hover:bg-zinc-100 disabled:hover:bg-mainlight
               focus-visible:ring-1 focus-visible:ring-sky-400/50 outline-none"
      >
        ...
      </button> -->
      <input
      type="number"
      bind:value={jump}
      placeholder="..."
      class="h-8 w-8 rounded-md border border-zinc-300 bg-mainlight text-zinc-900 outline-none text-center appearance-none"
      on:input={handleInput}
      on:keydown={handleJump}
      />
    {:else}
      <button
        class={`h-8 w-8 rounded-md border border-zinc-300 bg-mainlight text-zinc-900
               flex items-center justify-center text-sm
               cursor-pointer disabled:cursor-default disabled:bg-zinc-200
                not-disabled:hover:bg-zinc-100
               focus-visible:ring-1 focus-visible:ring-sky-400/50 outline-none
               `}
        disabled={page === currentPage}
        on:click={() => goToPage(page)}
      >
        {page}
      </button>
    {/if}
  {/each}


    <button
        on:click={next}
        class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-context-menu focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        disabled={currentPage === totalPages}
    >
        <Icon icon="material-symbols:arrow-forward-ios-rounded" />
    </button>

    <!-- <button
        on:click={last}
        class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-context-menu focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        disabled={currentPage === totalPages}
    >
        <Icon icon="material-symbols:double-arrow-rounded" class="text-[18px] max-xs:text-[3.6vw] " />
    </button> -->
</div>

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
