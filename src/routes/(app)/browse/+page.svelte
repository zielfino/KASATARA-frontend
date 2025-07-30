<script lang="ts">
    import Icon from "@iconify/svelte";
    import { onDestroy, onMount, tick } from "svelte";
    import { update } from '$lib/updatedummy';
	import { searchText } from '$lib/stores/searchText';
    import SearchFilter from "$lib/components/searchFilter.svelte";
    import Pagination from "$lib/components/pagination.svelte";
	$: keyword = $searchText;


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

    import { page as currentPageStore } from '$lib/stores/page';
    import { writable } from "svelte/store";
    import { searchFilter } from '$lib/stores/searchFilter';
    
    let currentPage = 1;
    // $currentPageStore;
    let unsubscribePage: () => void;

    function forceUpdateItems() {
        const offset = (currentPage - 1) * perPage;
        updateItems = updateCards.slice(updateStart + offset, updateEnd + offset);
    }
    $: {
        if (updateCards.length) forceUpdateItems();
    }
    onMount(() => {
        unsubscribePage = currentPageStore.subscribe((val) => {
            currentPage = val;
            forceUpdateItems();
        });
    });

    onDestroy(() => {
        unsubscribePage?.();
    });

	let width = 0;
	let perPage = 18;

	let updateCards: any[] = [];
	let updateItems: any[] = [];

	// updateStart dan updateEnd
	$: updateStart = 0;

	$: updateEnd =
		width < 500 ? 12 :
		width < 900 ? 9 :
		width < 1100 ? 12 : 18;

	// perPage responsif terhadap width
	$: {
		if (width < 500) perPage = 11;
		else if (width < 900) perPage = 18;
		else if (width < 1100) perPage = 14;
		else perPage = 18;
	}
    
	$: offset = (currentPage - 1) * perPage;

	// Filter updateCards berdasarkan searchFilter
	$: {
		if (update) {
			const filtered = update.filter(card => {
				if ($searchFilter === "Novel") return card.type === "NOVEL";
				if ($searchFilter === "Komik") return card.type === "KOMIK";
				if ($searchFilter === "Visual Novel") return card.type === "VISUAL NOVEL";
				return true;
			});

			updateCards = filtered.map((card, i) => ({
				...card,
				idfe: `update-${i}`,
				size: '1x1'
			}));
		}
	}

	$: {
		updateItems = updateCards.slice(updateStart + offset, updateEnd + offset);
	}

	// Reaktif width di-resize
	onMount(() => {
		width = window.innerWidth;

		const handleResize = () => {
			width = window.innerWidth;
		};

		window.addEventListener('resize', handleResize);
		onDestroy(() => window.removeEventListener('resize', handleResize));
	});
    
    import { maxPage } from '$lib/stores/page';
    let totalPages = 1;
    $: totalPages = Math.max(1, Math.ceil(updateCards.length / perPage));
    $: maxPage.set(totalPages);

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


    function lightenHexColor(hex: string, amount: number = 0.85) {
        const parsed = hex.replace('#', '');
        if (parsed.length !== 6) return hex;

        const r = parseInt(parsed.slice(0, 2), 16);
        const g = parseInt(parsed.slice(2, 4), 16);
        const b = parseInt(parsed.slice(4, 6), 16);

        // Interpolasi linear ke putih
        const newR = Math.round(r + (255 - r) * amount);
        const newG = Math.round(g + (255 - g) * amount);
        const newB = Math.round(b + (255 - b) * amount);

        return `rgb(${newR}, ${newG}, ${newB})`;
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
                    <!-- LEFT FILLER -->
                    <div class="ml-[2.4vw] xs:ml-3 max-xs:text-[3.2vw]">
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
                                max-xs:text-[4vw] text-xl aspect-square w-[8vw] xs:w-10
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
                                max-xs:text-[4vw] text-xl aspect-square w-[8vw] xs:w-10
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
                                max-xs:text-[4vw] text-xl aspect-square w-[8vw] xs:w-10
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
                <div class="grid grid-cols-3 xs:grid-cols-4 w-full max-w-[675px] md:max-w-[770px]
                max-xs:px-[1.6vw] px-[8px] gap-[0.8vw] my-2 xs:my-[8px]
                md:grid-cols-5 lg:w-[946px] lg:max-w-[100%] md:p-0
                lg:grid-cols-6 xl:w-[1100px]">
                    {#each updateItems as item}
                        <button
                            role={'button'} 
                            aria-label="card"
                            class={`group relative
                            flex flex-col outline-none
                            col-span-1 aspect-[3/5]
                            ${
                                item.type === "VISUAL NOVEL" ? 'portrait:focus-visible:ring-1 portrait:focus-visible:ring-sky-400 focus-visible:bg-sky-200/90 rounded-lg' : ''
                            }
                            `}
                            style="direction:ltr"
                        >   
                            <div class={`z-10 xs:drop-shadow-xs landscape:lg:drop-shadow-none xs:bg-mainlight xs:border xs:border-zinc-900/15 relative w-full h-full p-3 max-xs:p-[2.4vw] rounded-md max-xs:rounded-[1.6vw] xs:rounded-lg flex justify-center items-center max-xs:border max-xs:border-zinc-900/30 overflow-hidden
                            portrait:group-focus-visible:border-1 portrait:group-focus-visible:ring-1 portrait:group-focus-visible:border-sky-400 portrait:group-focus-visible:ring-sky-400 portrait:group-focus-visible:bg-sky-200/90
                            aspect-[3/4]`}>


                                {#if !$phone }
                                    <div class="absolute w-full h-full top-0 left-0 z-20 opacity-0 landscape:group-hover:opacity-100 landscape:group-focus-visible:opacity-100 landscape:group-focus-within:opacity-100 transition-opacity cursor-pointer duration-300 ease-out"
                                    style={`background-image:
                                   
                                    linear-gradient(180deg,
                                        transparent 35%,
                                        ${item.color ? item.color :
                                        item.genre[0] === 'Fantasy' ? '#9810fa' :
                                        item.genre[0] === 'Action'  ? '#4f46e5' :
                                        item.genre[0] === 'Comedy'  ? 'oklch(66.6% 0.179 58.318)' :
                                        item.genre[0] === 'Drama'   ? 'oklch(60.9% 0.126 221.723)' :
                                        item.genre[0] === 'Horror'  ? 'oklch(57.7% 0.245 27.325)' :
                                        item.genre[0] === 'Romance' ? 'oklch(58.6% 0.253 17.585)' :
                                        '#4a5565'
                                        } 85%
                                    )`}
                                    >

                                        <!-- MAIN HOVER -->
                                        <div class="absolute bottom-0 left-0 h-[5em] p-[1em] flex items-center justify-center min-w-full">
                                            <h3 class={`text-center font-semibold line-clamp-3 leading-tight
                                            text-[16px] max-xs:text-[3.2vw]
                                            `}
                                            style={`color: ${
                                            item.color ? lightenHexColor(item.color) :
                                            item.genre[0] === 'Fantasy' ? '#f3e8ff' :       // text-purple-100
                                            item.genre[0] === 'Action' ? '#e0e7ff' :        // text-indigo-100
                                            item.genre[0] === 'Comedy' ? '#fef3c7' :        // text-amber-100
                                            item.genre[0] === 'Drama' ? '#cffafe' :         // text-cyan-100
                                            item.genre[0] === 'Horror' ? '#ffe4e6' :        // text-rose-100
                                            item.genre[0] === 'Romance' ? '#fce7f3' :       // text-pink-100
                                            '#f5f5f5'                                       // text-gray-100
                                            }`}>
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                {/if}


                                <!-- BACKGROUND IMAGE -->
                                <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center max-xs:scale-101">
                                    <img src="{item.image}" alt="" 
                                    class={`w-full h-full object-center duration-150 transition-all rounded-md max-xs:rounded-[1.4vw]
                                    object-cover landscape:group-hover:scale-105 landscape:group-focus-visible:scale-105 landscape:group-focus-within:scale-110`} />
                                </div>

                            </div>
                        </button>
                    {/each}
                </div>
                <Pagination totalPages={totalPages}/>
            {/if}
        </div>
    </div>
</section>