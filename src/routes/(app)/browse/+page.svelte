<script lang="ts">
    import Icon from "@iconify/svelte";
    import { onDestroy, onMount, tick } from "svelte";
    import { update } from '$lib/updatedummy';
	import { searchText } from '$lib/stores/searchText';
    import SearchFilter from "$lib/components/searchFilter.svelte";
    import Pagination from "$lib/components/pagination.svelte";
    import Card from "$lib/components/util/card.svelte";
	$: keyword = $searchText;

    import { searchFilter } from '$lib/stores/searchFilter';

    const phone = writable(false);
    const desktop = writable(false);
    const desktopex = writable(false);
    const desktoplarge = writable(false);

    onMount(() => {
        const update = () => {
            phone.set(window.innerWidth < 500);
            desktop.set(window.innerWidth >= 900);
            desktopex.set(window.innerWidth >= 1300);
            desktoplarge.set(window.innerWidth >= 1100);
        };

        update(); // Initial check
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    });

    type CardItem = {
		idfe: string;
		id?: number;
        title: string;
        excerpt: string;
        likes: number;
        rating: number;
        pages: number;
        genre: string[];
        type: string;
        chapter?: number[];
        label: string;
        size?: string;
        image: string;
		order?: number | 'first' | 'last';
    };
    
    // let updateCards: CardItem[] = [];

    // let width = 0;
    // let limit = 12;
    // $: limit = typeof window !== 'undefined' ? width < 1100 ? width < 900 ? width < 500 ? 6 : 9 : 12 : 15 : 15;

    let perPage = 15;
    import { page as paginationPage } from '$lib/stores/page';
    import { writable } from "svelte/store";
    let currentPage: number;
    $: currentPage = $paginationPage;
    // $: console.log('currentPage from store =', currentPage);

    onMount(() => {
        // page = Number(sessionStorage.getItem('page') ?? '1');
        if (window.innerWidth < 500) {
            perPage = 11;
        } else if (window.innerWidth < 900) {
            perPage = 18;
        } else if (window.innerWidth < 1100) {
            perPage = 14;
        }
    });

    $: updateStart = 0;
	$: updateEnd = typeof window !== 'undefined' ? window.innerWidth < 1100 ? window.innerWidth < 900 ? window.innerWidth < 500 ? 6 : 9 : 12 : 15 : 15;

    $: offset = (currentPage - 1) * perPage;
    
    let updateCards = update
    let updateItems = updateCards
    $: if (update) {
         updateCards = update
        .filter(card => {
            if ($searchFilter === "Novel") {
                return card.type === "NOVEL";
            } else if ($searchFilter === "Komik") {
                return card.type === "KOMIK";
            } else if ($searchFilter === "Visual Novel") {
                return card.type === "VISUAL NOVEL";
            }
            return true;
        })
        // .slice(0, limit)
        .map((card, i) => ({
            ...card,
            idfe: `update-${i}`,
            size: '1x1'
        }));
        type Tag = {
            disabled: boolean;
            label: string;
        };
    
        updateItems = updateCards.slice(updateStart + offset, updateEnd + offset);
        // $: updateItemsLength = updateItems.length;
        console.log(update)
        console.log(updateCards)
        console.log(updateItems)
        // console.log(updateItemsLength)
    }



    // function handleResize() {
    //     width = window.innerWidth;
    // }

    // onMount(() => {
    //     if (typeof window !== 'undefined')
    //     handleResize();
    //     window.addEventListener('resize', handleResize);
    // });

    // onDestroy(() => {
    //     if (typeof window !== 'undefined')
    //     window.removeEventListener('resize', handleResize);
    // });

	const weekly = [
		{ disabled: false, label: 'Mon' },
		{ disabled: false, label: 'Tue' },
		{ disabled: false, label: 'Wed' },
		{ disabled: false, label: 'Thu' },
		{ disabled: false, label: 'Fri' },
		{ disabled: false, label: 'Sat' },
		{ disabled: false, label: 'Sun' },
	];

	const monthly = [
		{ disabled: false, label: 'week 1' },
		{ disabled: false, label: 'week 2' },
		{ disabled: false, label: 'week 3' },
		{ disabled: false, label: 'week 4' },
	];

	const genrelist = [
		{ disabled: false, label: 'Action' },
		{ disabled: false, label: 'Romance' },
		{ disabled: false, label: 'Horror' },
		{ disabled: false, label: 'Comedy' },
		{ disabled: false, label: 'Drama' },
		// { disabled: true, label: 'Short' },
	];

    let currentGenre:string = '';    

	import { sortAsc } from '$lib/stores/sortOrder';

	// reactive dapat nilai terbaru
	$: isAsc = $sortAsc;

	function toggleSort() {
		sortAsc.update(v => !v);
	}
</script>

<section class="max-xs:bg-zinc-900">
    <div class="flex flex-col justify-center items-center min-[900px] max-xs:bg-zinc-200">
        <div class="w-full sm:max-w-[calc(675px-16px)] md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] mt-3 md:mt-6 font-work-sans">
            {#if keyword !== ''}
                <div class="w-full bg-zinc-400">
                    Hasil pencarian dari "{keyword}"
                </div>
            {/if}
            <div>
                <SearchFilter />
            {#if $searchFilter !== 'Daily' && $searchFilter !== 'Weekly'}
                <div class="text-sm font-work-sans font-[400] tracking-tight space-x-2 flex outline-none my-2 xs:my-[8px]">
                    {#each genrelist  as genre, i}
                    <button
                    tabindex={genre.label === currentGenre || genre.disabled ? -1 : 0}
                    class={`  
                        flex justify-center items-center
                        max-xs:py-[0.8vw] py-1 h-fit
                        text-nowrap rounded-full
                        border border-zinc-900/15
                        outline-none 
                        max-xs:text-[2.8vw]
                        ${genre.label === currentGenre ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
                        genre.disabled ? 'opacity-30 pointer-events-none' :
                        'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                    `}>
                        <span 
                            class={`max-xs:mx-[3.2vw] mx-4 h-fit`}
                        >
                            {genre.label}
                        </span>
                    </button>
                    {/each}
                </div>
            {:else if $searchFilter === 'Weekly'}
                <div class="text-sm font-work-sans font-[400] tracking-tight space-x-2 flex outline-none my-2 xs:my-[8px]">
                    {#each monthly  as genre, i}
                    <button
                    tabindex={genre.label === currentGenre || genre.disabled ? -1 : 0}
                    class={`  
                        flex justify-center items-center
                        max-xs:py-[0.8vw] py-1 h-fit
                        text-nowrap rounded-full
                        border border-zinc-900/15
                        outline-none 
                        max-xs:text-[2.8vw]
                        ${genre.label === currentGenre ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
                        genre.disabled ? 'opacity-30 pointer-events-none' :
                        'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                    `}>
                        <span 
                            class={`max-xs:mx-[3.2vw] mx-4 h-fit`}
                        >
                            {genre.label}
                        </span>
                    </button>
                    {/each}
                </div>
            {:else}
                <div class="text-sm font-work-sans font-[400] tracking-tight space-x-2 flex outline-none my-2 xs:my-[8px]">
                    {#each weekly  as genre, i}
                    <button
                    tabindex={genre.label === currentGenre || genre.disabled ? -1 : 0}
                    class={`  
                        flex justify-center items-center
                        max-xs:py-[0.8vw] py-1 h-fit
                        text-nowrap rounded-full
                        border border-zinc-900/15
                        outline-none 
                        max-xs:text-[2.8vw]
                        ${genre.label === currentGenre ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
                        genre.disabled ? 'opacity-30 pointer-events-none' :
                        'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                    `}>
                        <span 
                            class={`max-xs:mx-[3.2vw] mx-4 h-fit`}
                        >
                            {genre.label}
                        </span>
                    </button>
                    {/each}
                </div>
            {/if}

            <div class="w-full px-2 md:px-0">
                <div class="w-full flex items-end justify-between border-b pb-[1.6vw] xs:pb-2">
                    <div class="ml-[2.4vw] xs:ml-3">
                        {#if $searchFilter !== 'Daily' && $searchFilter !== 'Weekly'}
                            {updateCards.length} series
                        {:else}
                            else
                        {/if}
                    </div>
                    
                    <!-- RIGHT FILLER -->
                    <div class="flex items-center justify-center mr-[0.8vw] xs:mr-1 space-x-2">
                        <button
                        on:click={toggleSort}
                        class="flex justify-center items-center max-xs:py-[0.8vw] py-1 text-nowrap rounded-full border border-zinc-900/15 outline-none
                                max-xs:text-[2.8vw] text-xl aspect-square w-10
                                max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white
                                hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50
                                active:bg-zinc-900/9 cursor-pointer"
                        aria-label="Toggle sort order"
                        >
                        {#if isAsc}
                            <Icon icon="material-symbols:do-not-disturb-on-rounded" />
                        {:else}
                            <Icon icon="material-symbols:do-not-disturb-on-outline-rounded" />
                        {/if}
                        </button>
                        <button
                        on:click={toggleSort}
                        class="flex justify-center items-center max-xs:py-[0.8vw] py-1 text-nowrap rounded-full border border-zinc-900/15 outline-none
                                max-xs:text-[2.8vw] text-xl aspect-square w-10
                                max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white
                                hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50
                                active:bg-zinc-900/9 cursor-pointer"
                        aria-label="Toggle sort order"
                        >
                        {#if isAsc}
                            <Icon icon="lets-icons:flag-finish" />
                        {:else}
                            <Icon icon="lets-icons:flag-finish-alt" />
                        {/if}
                        </button>
                        <button
                        on:click={toggleSort}
                        class="flex justify-center items-center max-xs:py-[0.8vw] py-1 text-nowrap rounded-full border border-zinc-900/15 outline-none
                                max-xs:text-[2.8vw] text-xl aspect-square w-10
                                max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white
                                hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50
                                active:bg-zinc-900/9 cursor-pointer"
                        aria-label="Toggle sort order"
                        >
                        {#if isAsc}
                            <Icon icon="mdi:sort-bool-ascending" />
                        {:else}
                            <Icon icon="mdi:sort-bool-descending" />
                        {/if}
                        </button>
                    </div>
                </div>
            </div>
            
            {#if $searchFilter !== 'Daily' && $searchFilter !== 'Weekly'}
                <div class="grid grid-cols-2 xs:grid-cols-3 w-full max-w-[675px] md:max-w-[770px]
                max-xs:px-[1.6vw] px-[8px] gap-[8px] my-2 xs:my-[8px]
                md:grid-cols-4 lg:w-[946px] lg:max-w-[100%] md:p-0
                lg:grid-cols-5 xl:w-[1100px]">
                    {#each updateItems as card}
                        <Card item={{ ...card, size: '1x1' }} showChapter={false} />
                    {/each}
                </div>
                <Pagination totalPages={Math.ceil(updateCards.length / perPage)}/>
            {/if}
        </div>
    </div>
</section>