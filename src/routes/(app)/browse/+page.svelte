<script lang="ts">
    // 1. Imports
    import { onMount } from 'svelte';
    import Icon from '@iconify/svelte';
    import Pagination from '$lib/components/pagination.svelte';
    import BrowseFilter from '$lib/components/browse/browseFilter.svelte';

    import { searchText } from '$lib/stores/searchText';
    import { page as currentPageStore, maxPage } from '$lib/stores/page';
    import { sortAsc } from '$lib/stores/sortOrder';
    import { weeklySchedule, validDays } from '$lib/components/browse/weeklySchedule';

    import { setSafetypeFilter, typeFilter } from '$lib/components/browse/typeFilter';
    import { contentFilter } from '$lib/components/browse/contentFilter';
    import { scheduleFilter } from '$lib/components/browse/scheduleFilter';

    import { masterDummy } from '$lib/masterdatadummy';
    import { dailySchedule } from '$lib/components/browse/dailySchedule';
    import { monthySchedule } from '$lib/components/browse/monthlySchedule';

    // 2. Local state & derived
    $: keyword = $searchText;

    // responsive width
    let width = 0;
    $: phone        = width < 500;
    $: desktop      = width > 900;
    $: desktopex    = width > 1300;
    $: desktoplarge = width > 1100;

    // pagination
    let currentPage = 1;
    let unsubscribePage: () => void;

    // data arrays
    let noCutCards: any[] = [];
    let showCards: any[] = [];

    // per-page & slicing
    let perPage = 18;
    $: perPage =
        width < 500  ? 11 :
        width < 900  ? 18 :
        width < 1100 ? 14 : 18;

    $: updateStart = 0;
    $: updateEnd =
        width < 500  ? 15 :
        width < 900  ? 16 :
        width < 1100 ? 15 : 18;

    $: offset = (currentPage - 1) * perPage;

    // total pages
    $: totalPages = Math.max(1, Math.ceil(noCutCards.length / perPage));
    $: maxPage.set(totalPages);

    // sort order
    $: isAsc = $sortAsc;

    // 3. Reactive filtering & paging
    function normalize(str: string) {
        return str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');  // buang semua kecuali a–z & 0–9
    }

    $: {
        if ($searchText.trim()) {
            const q = normalize($searchText);

            const bySearch = masterDummy.filter(card => {
            const title   = normalize(card.title);
            const authors = normalize(card.authors?.join(' ')   ?? '');
            const artists = normalize(card.artists?.join(' ')   ?? '');

            return title.includes(q)
                || authors.includes(q)
                || artists.includes(q);
            });
            noCutCards = bySearch.map((card,i) => ({ ...card, idfe: `update-${i}` }));
            // console.log('active :' + $searchText.trim())
        } else if (masterDummy && $contentFilter !== 'Schedule') {
            // filter by content
            const byRelease = masterDummy.filter(card => {
                if ($contentFilter === 'Official') return card.release === 1;
                if ($contentFilter === 'Indie')    return card.release === 2;
                if ($contentFilter === 'Mirror')   return card.release === 3;
                return true;
            });
            // filter by type
            const byType = byRelease.filter(card => {
                if ($typeFilter === 'Novel')        return card.type === 'NOVEL';
                if ($typeFilter === 'Komik')        return card.type === 'KOMIK';
                if ($typeFilter === 'Visual Novel') return card.type === 'VISUAL NOVEL';
                return true;
            });
            noCutCards = byType.map((card, i) => ({
                ...card,
                idfe: `update-${i}`
            }));
            console.log($searchText.trim())
        } else {
            // schedule mode
            const bySchedule = masterDummy.filter(card => {
                const p = card.schedule?.[0]?.period;
                if ($scheduleFilter === 'Daily')   return p === 'daily';
                if ($scheduleFilter === 'Weekly')  return p === 'weekly';
                if ($scheduleFilter === 'Monthly') return p === 'monthly';
                return true;
            });

            let byOn: any[] = [];

            if ($scheduleFilter === 'Daily') {
                byOn = bySchedule.filter(card => {
                    const p = card.schedule?.[0]?.on;
                    if ($dailySchedule === '03:00')   return p === '03:00';
                    if ($dailySchedule === '09:00')   return p === '09:00';
                    if ($dailySchedule === '15:00')   return p === '15:00';
                    if ($dailySchedule === '21:00')   return p === '21:00';
                    return true;
                });
            } else if ($scheduleFilter === 'Weekly') {
                byOn = bySchedule.filter(card => {
                    const p = card.schedule?.[0]?.on;
                    if ($weeklySchedule === 'Mon')   return p === 'Mon';;
                    if ($weeklySchedule === 'Tue')   return p === 'Tue';;
                    if ($weeklySchedule === 'Wed')   return p === 'Wed';;
                    if ($weeklySchedule === 'Thu')   return p === 'Thu';;
                    if ($weeklySchedule === 'Fri')   return p === 'Fri';;
                    if ($weeklySchedule === 'Sat')   return p === 'Sat';;
                    if ($weeklySchedule === 'Sun')   return p === 'Sun';;
                    return true;
                });
            } else if ($scheduleFilter === 'Monthly') {
                byOn = bySchedule.filter(card => {
                    const p = card.schedule?.[0]?.on;
                    if ($monthySchedule === 'Week 1')   return p === 'Week 1';
                    if ($monthySchedule === 'Week 2')   return p === 'Week 2';
                    if ($monthySchedule === 'Week 3')   return p === 'Week 3';
                    if ($monthySchedule === 'Week 4')   return p === 'Week 4';
                    return true;
                });
            }

            noCutCards = byOn
                .filter(card => card.status === 1)
                .map((card, i) => ({
                ...card,
                idfe: `update-${i}`
                }));
        }
    }

    $: showCards = noCutCards.slice(updateStart + offset, updateEnd + offset);

    // 4. Lifecycle
    onMount(() => {
        console.log("Offset :" + offset)
        console.log("$currentPageStore :" + $currentPageStore)
        console.log("currentPage :" + currentPage)
        // width & resize listener
        const handleResize = () => { width = window.innerWidth; };
        handleResize();
        window.addEventListener('resize', handleResize);

        // subscribe page store
        unsubscribePage = currentPageStore.subscribe(val => {
            currentPage = val;
        });

        // init sessionStorage for typeFilter
        if (!sessionStorage.getItem('typeFilter')) {
        setSafetypeFilter('Daily');
        sessionStorage.setItem('typeFilter', 'Daily');
        }

        // init weeklySchedule
        // const today = validDays[new Date().getDay()];
        // weeklySchedule.set(today);
        // sessionStorage.setItem('weeklySchedule', today);

        return () => {
        window.removeEventListener('resize', handleResize);
        unsubscribePage?.();
        };
    });

    // 5. Functions
    function toggleSort() {
        sortAsc.update(v => !v);
    }

    function lightenHexColor(hex: string, amount: number = 0.85) {
        const c = hex.replace('#', '');
        if (c.length !== 6) return hex;
        const [r, g, b] = [0,2,4].map(i => parseInt(c.slice(i, i+2), 16));
        return `rgb(${[r,g,b].map(v => Math.round(v + (255 - v) * amount)).join(',')})`;
    }

    function getToday(): typeof validDays[number] {
        const map = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return map[new Date().getDay()] as typeof validDays[number];
    }
</script>

<section class="max-xs:bg-zinc-900">
    <div class="flex flex-col justify-center items-center min-[900px] max-xs:bg-zinc-200">
        <div class="w-full sm:max-w-[calc(675px-16px)] md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] mt-3 md:mt-6 font-work-sans">

            {#if keyword !== ''}
                <div class="w-full bg-zinc-400">
                    Hasil pencarian dari "{keyword}"
                </div>
            {:else}
                <BrowseFilter />
            {/if}

            <!-- SEOERATOR -->
            <div class="w-full px-2 md:px-0">
                <div class="w-full flex items-end justify-between border-b pb-[1.6vw] xs:pb-2">
                    <!-- LEFT FILLER -->
                    <div class="ml-[2.4vw] xs:ml-3 max-xs:text-[3.2vw]">
                        {noCutCards.length} series
                    </div>
                    
                    <!-- RIGHT FILLER -->
                    <div class="flex items-center justify-center mr-[0.8vw] xs:mr-1 space-x-2">
                        <button
                        on:click={toggleSort}
                        class="flex justify-center items-center max-xs:py-[0.8vw] py-1 text-nowrap rounded-full border border-zinc-900/15 outline-none
                                max-xs:text-[4vw] text-xl aspect-square h-[8vw] xs:h-8
                                max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white
                                hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50
                                active:bg-zinc-900/9 cursor-pointer"
                        aria-label="Toggle sort order"
                        >
                        {#if isAsc}
                            <Icon icon="mingcute:large-arrow-up-fill" />
                        {:else}
                            <Icon icon="mingcute:large-arrow-up-line" />
                        {/if}
                        </button>
                        <button
                        on:click={toggleSort}
                        class="flex justify-center items-center max-xs:py-[0.8vw] py-1 text-nowrap rounded-full border border-zinc-900/15 outline-none
                                max-xs:text-[4vw] text-xl aspect-square h-[8vw] xs:h-8
                                max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white
                                hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50
                                active:bg-zinc-900/9 cursor-pointer"
                        aria-label="Toggle sort order"
                        >
                        {#if isAsc}
                            <Icon icon="mingcute:axe-fill" />
                        {:else}
                            <Icon icon="mingcute:axe-line" />
                        {/if}
                        </button>
                        <button
                        on:click={toggleSort}
                        class="flex justify-center items-center max-xs:py-[0.8vw] py-1 text-nowrap rounded-full border border-zinc-900/15 outline-none
                                max-xs:text-[4vw] text-xl aspect-square h-[8vw] xs:h-8
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
                                max-xs:text-[4vw] text-xl aspect-square h-[8vw] xs:h-8
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
            

            <!-- SCHEDULE -->


            <!-- NOT SCHEDULE -->
            {#if $searchText !== "" || $contentFilter === 'Schedule'}
                <div class="grid grid-cols-3 xs:grid-cols-4 w-full max-w-[675px] md:max-w-[770px]
                max-xs:px-[1.6vw] px-[8px] gap-[0.8vw] my-2 xs:my-[8px]
                md:grid-cols-5 lg:w-[946px] lg:max-w-[100%] md:p-0
                lg:grid-cols-6 xl:w-[1100px]">
                    {#each noCutCards  as item}
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


                                {#if !phone }
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

                                        <div class="absolute bottom-0 left-0 h-[5em] p-[1em] flex items-center justify-center min-w-full">
                                            <h3 class={`text-center font-semibold line-clamp-3 leading-tight
                                            text-[16px] max-xs:text-[3.2vw]
                                            `}
                                            style={`color: ${
                                            item.color ? lightenHexColor(item.color) :
                                            item.genre[0] === 'Fantasy' ? '#f3e8ff' :      
                                            item.genre[0] === 'Action' ? '#e0e7ff' :      
                                            item.genre[0] === 'Comedy' ? '#fef3c7' :      
                                            item.genre[0] === 'Drama' ? '#cffafe' :       
                                            item.genre[0] === 'Horror' ? '#ffe4e6' :      
                                            item.genre[0] === 'Romance' ? '#fce7f3' :      
                                            '#f5f5f5'                                      
                                            }`}>
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                {/if}


                                <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center max-xs:scale-101">
                                    <img src="{item.image}" alt="" 
                                    class={`w-full h-full object-center duration-150 transition-all rounded-md max-xs:rounded-[1.4vw]
                                    object-cover landscape:group-hover:scale-105 landscape:group-focus-visible:scale-105 landscape:group-focus-within:scale-110`} />
                                </div>

                            </div>
                            <!-- <div>
                                <div class="whitespace-nowrap text-red-400">{ item.schedule?.[0]?.on } </div>
                                <div class="whitespace-nowrap text-red-400">{ item.schedule?.[0]?.period } </div>
                                <div class="whitespace-nowrap text-blue-400">{ item.chapter?.[0]?.number ?? "[Invalid]" } chaps</div>
                                <div class="whitespace-nowrap text-green-400">{ item.chapter?.[0]?.title ?? "[Invalid]" }</div>
                                <div class="whitespace-nowrap text-orange-400">{ item.authors ?? '[unknown]' } auth</div>
                                <div class="whitespace-nowrap text-purple-400">{item.artists?.[0] && item.artists[0] !== '' ? item.artists[0] : "[unknown]"} art</div>
                                <div class="line-clamp-5 mt-4 text-yellow-400">{ item.excerpt ?? "[unknown]" }</div>
                                <div class="whitespace-nowrap text-cyan-400">{ item.color ?? "[unknown]" } color</div>
                            </div> -->
                        </button>
                    {/each}
                </div>
            {:else}
                <div class="grid grid-cols-3 xs:grid-cols-4 w-full max-w-[675px] md:max-w-[770px]
                max-xs:px-[1.6vw] px-[8px] gap-[0.8vw] my-2 xs:my-[8px]
                md:grid-cols-5 lg:w-[946px] lg:max-w-[100%] md:p-0
                lg:grid-cols-6 xl:w-[1100px]">
                    {#each showCards as item}
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


                                {#if !phone }
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

                                        <div class="absolute bottom-0 left-0 h-[5em] p-[1em] flex items-center justify-center min-w-full">
                                            <h3 class={`text-center font-semibold line-clamp-3 leading-tight
                                            text-[16px] max-xs:text-[3.2vw]
                                            `}
                                            style={`color: ${
                                            item.color ? lightenHexColor(item.color) :
                                            item.genre[0] === 'Fantasy' ? '#f3e8ff' :      
                                            item.genre[0] === 'Action' ? '#e0e7ff' :      
                                            item.genre[0] === 'Comedy' ? '#fef3c7' :      
                                            item.genre[0] === 'Drama' ? '#cffafe' :       
                                            item.genre[0] === 'Horror' ? '#ffe4e6' :      
                                            item.genre[0] === 'Romance' ? '#fce7f3' :      
                                            '#f5f5f5'                                      
                                            }`}>
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                {/if}


                                <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center max-xs:scale-101">
                                    <img src="{item.image}" alt="" 
                                    class={`w-full h-full object-center duration-150 transition-all rounded-md max-xs:rounded-[1.4vw]
                                    object-cover landscape:group-hover:scale-105 landscape:group-focus-visible:scale-105 landscape:group-focus-within:scale-110`} />
                                </div>

                            </div>
                            <!-- <div>
                                <div class="whitespace-nowrap text-red-400">{ item.genre[0] }</div>
                                <div class="whitespace-nowrap text-blue-400">{ item.chapter?.[0]?.number ?? "[Invalid]" } chaps</div>
                                <div class="whitespace-nowrap text-green-400">{ item.chapter?.[0]?.title ?? "[Invalid]" }</div>
                                <div class="whitespace-nowrap text-orange-400">{ item.authors ?? '[unknown]' } auth</div>
                                <div class="whitespace-nowrap text-purple-400">{item.artists?.[0] && item.artists[0] !== '' ? item.artists[0] : "[unknown]"} art</div>
                                <div class="line-clamp-5 mt-4 text-yellow-400">{ item.excerpt ?? "[unknown]" }</div>
                                <div class="whitespace-nowrap text-cyan-400">{ item.color ?? "[unknown]" } color</div>
                            </div> -->
                        </button>
                    <!-- <Card item={{...item, size: '1x1'}}/> -->
                    {/each}
                </div>
                <Pagination totalPages={totalPages}/>
            {/if}
        </div>
    </div>
</section>