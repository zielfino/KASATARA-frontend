<script lang="ts">
    import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';

  export let ison = 'false';
  export let totalPages: number = 10;
  export let initialPage: number = 1;

  let currentPage: number = initialPage;

  // ⏳ Load page dari sessionStorage saat mount
  onMount(() => {
    const stored = sessionStorage.getItem('page');
    const parsed = stored ? parseInt(stored) : NaN;

    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      currentPage = parsed;
    } else {
      sessionStorage.setItem('page', currentPage.toString());
    }
  });

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    sessionStorage.setItem('page', currentPage.toString());
  }

  function next() {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }

  function prev() {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }

  function first() {
    if (initialPage) {
      goToPage(initialPage);
    }
  }

  function last() {
    if (totalPages) {
      goToPage(totalPages);
    }
  }
</script>

<div class={`w-full bg-mainlight border border-zinc-900/15 rounded-md h-[14vw] text-[3.2vw] xs:h-[64px] flex justify-center items-center xs:text-[16px] space-x-[1.6vw] xs:space-x-2 py-[3.2vw] xs:py-4
${ ison === 'true' ? 'md:hidden' : ison === 'false' ? 'max-md:hidden' : ''}`}>
    <button
        on:click={first}
        class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-context-menu focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        disabled={currentPage === 1}
    >
        <Icon icon="material-symbols:double-arrow-rounded" class="text-[18px] max-xs:text-[3.6vw] rotate-180" />
    </button>
    <button
        on:click={prev}
        class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-context-menu focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        disabled={currentPage === 1}
    >
        <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
    </button>

    {#each Array(totalPages).fill(0).map((_, i) => i + 1) as page}
        <button
        disabled={currentPage === page}
        class=" h-full aspect-square rounded-md text-zinc-900 border bg-mainlight border-zinc-900/30 cursor-pointer disabled:cursor-context-menu disabled:bg-zinc-900/15 hover:bg-zinc-900/10 disabled:hover:bg-zinc-900/15 flex justify-center items-center focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        on:click={() => goToPage(page)}
        >
        {page}
        </button>
    {/each}

    <button
        on:click={next}
        class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-context-menu focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        disabled={currentPage === totalPages}
    >
        <Icon icon="material-symbols:arrow-forward-ios-rounded" />
    </button>

    <button
        on:click={last}
        class="bg-mainlight border border-zinc-900/30 hover:bg-zinc-900/10 disabled:hover:bg-mainlight rounded-md disabled:opacity-30 aspect-square flex justify-center items-center h-full cursor-pointer disabled:cursor-context-menu focus-visible:bg-sky-400/10 outline-none focus-visible:border-sky-400/50"
        disabled={currentPage === totalPages}
    >
        <Icon icon="material-symbols:double-arrow-rounded" class="text-[18px] max-xs:text-[3.6vw] " />
    </button>
</div>
