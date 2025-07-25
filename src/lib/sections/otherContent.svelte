<script lang="ts">
    import Pagination from "$lib/components/pagination.svelte";
    import Icon from "@iconify/svelte";
    import { top  } from '$lib/topdummy';
    import { update  } from '$lib/updatedummy';
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import Card from "$lib/components/util/card.svelte";
    import News from "$lib/components/news.svelte";
    import TitleLink from "$lib/components/util/titleLink.svelte";
    import LeaderboardSwitch from "$lib/components/leaderboardSwitch.svelte";


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

        const genreClass: Record<string, string> = {
        Fantasy: 'text-purple-500',
        Romance: 'text-pink-500',
        Comedy: 'text-amber-500',
        'slice of life': 'text-sky-500',
        Drama: 'text-emerald-500',
        Horror: 'text-red-500'
    };

    function genreColor(genre: string): string {
        return genreClass[genre] || 'text-gray-500';
    }

    import { contentType, contentBy, contentPer } from '../stores/leaderboard';

    // Local reactive values dari store
    $: type = $contentType;
    $: by = $contentBy;
    $: per = $contentPer;

    // Step 1: Filter berdasarkan type
    $: filteredByType = update.filter(card => {
        switch (type) {
            case "komik": return card.type === "KOMIK";
            case "novel": return card.type === "NOVEL";
            case "visual novel": return card.type === "VISUAL NOVEL";
            default: return true;
        }
    });

    // Step 2: Filter berdasarkan per
    $: filteredByPer = (() => {
        if (per === "harian") return filteredByType.slice(0, 15);
        if (per === "bulanan") return filteredByType.slice(0, 30);
        if (per === "tahunan") return filteredByType.slice(0, 50);
        return filteredByType;
    })();

    // Step 3: Sort berdasarkan by
    $: sorted = [...filteredByPer].sort((b, a) => {
        switch (by) {
            case "trending": return (a.likes ?? 0) - (b.likes ?? 0);
            case "sering": return (a.chapter?.[0] ?? a.pages ?? 0) - (b.chapter?.[0] ?? b.pages ?? 0);
            case "favorit": return (a.rating ?? 0) - (b.rating ?? 0);
            default: return 0;
        }
    });

    // Step 4: Pisahkan first dan rest
    $: first = sorted[0];
    $: rest = sorted.slice(...($desktop ? [1, 15] : [1, 10]));

    $: console.log('Leaderboard settings:', { type, by, per });

    function numFormat(n: number): string {
        if (n >= 1_000_000) {
            const v = n / 1_000_000;
            return v % 1 === 0 ? `${v.toFixed(0)}M` : `${v.toFixed(1)}M`;
        }
        if (n >= 1_000) {
            const v = n / 1_000;
            return v % 1 === 0 ? `${v.toFixed(0)}K` : `${v.toFixed(1)}K`;
        }
        return n.toString();
    }






    let perPage = 12;
    import { page } from '$lib/stores/page';
    $: currentPage = $page;

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

    $: topStart = 0;
	$: topEnd = $phone ? 1 : $desktop ? $desktoplarge ? 3 : 4 : 3;

	$: botStart = topEnd;
	$: botEnd = $phone ? 11 : $desktoplarge ? 12 : $desktop ? 14 : 19;

    $: offset = (currentPage - 1) * perPage;
    
    $: topItems = update.slice(topStart + offset, topEnd + offset);
    $: botItems = update.slice(botStart + offset, botEnd + offset);

    function getSize(i: number): string {
        if (i === 0 && ($desktoplarge || $phone)) return '2x1';
        return '1x1';
    }


      // Ambil sekali saat inisialisasi
    // let currentPage: number =
    //     typeof window !== 'undefined'
    //     ? Number(sessionStorage.getItem('page') ?? '1')
    //     : 1;

    // // Setiap kali kamu ubah page, simpan kembali:
    // function goToPage(p: number) {
    //     currentPage = p;
    //     sessionStorage.setItem('page', String(p));
    //     // ...logika lain
    // }

    // // hitung perPage berdasarkan lebar
    // let perPage = 12;
    // onMount(() => {
    //     const w = window.innerWidth;
    //     if (w < 500) perPage = 11;
    //     else if (w < 900) perPage = 18;
    //     else if (w < 1100) perPage = 14;
    // });

    // // reactive: slice range untuk top & bottom
    // $: topStart = 0;
    // $: topEnd   = $phone
    //     ? 1
    //     : $desktop
    //     ? ($desktoplarge ? 3 : 4)
    //     : 3;

    // $: botStart = $phone ? 1 : 4;
    // $: botEnd   = $phone
    //     ? perPage
    //     : $desktoplarge
    //     ? 13
    //     : $desktop
    //         ? 14
    //         : 19;

    // // reactive: data yang di-slice
    // $: topItems = update.slice(topStart + (currentPage - 1) * perPage,
    //                             topEnd   + (currentPage - 1) * perPage);

    // $: botItems = update.slice(botStart + (currentPage - 1) * perPage,
    //                             botEnd   + (currentPage - 1) * perPage);

    // function getSize(i: number) {
    //     if (i === 0 && ($desktoplarge || $phone)) return '2x1';
    //     return '1x1';
    // }
</script>

<section>
    <!-- <News title="TIPS" type="info" color="light" /> -->
    <div class="pt-4 max-xs:pt-[6vw] max-xs:mb-[0vw] max-xs:pb-[0.8vw] flex justify-center items-center max-xs:bg-gradient-to-b max-xs:from-zinc-200 max-xs:to-zinc-200/0">
        <div class="w-full max-w-[calc(675px-16px)] md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] max-xs:px-[3.2vw] px-1.5">
            <div class="text-xl whitespace-nowrap max-xs:text-[4vw] font-work-sans font-[600] tracking-tight flex justify-between xs:pl-2">
                <!-- Recently updated -->
                Konten Terbaru
                <!-- <a href="/" class="text-base flex justify-center items-center"><Icon icon="material-symbols:arrow-forward-ios-rounded" /></a> -->
            </div>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center min-[900px] max-xs:bg-zinc-200 max-xs:rounded-b-xl max-xs:pb-[0vw]">
        <div class="grid grid-cols-2 xs:grid-cols-3 w-full max-w-[675px] md:max-w-[770px]
        max-xs:px-[1.6vw] xs:px-[8px] gap-2 max-xs:gap-[1.6vw]
        md:grid-cols-4 lg:w-[946px] lg:max-w-[100%] md:p-0
        lg:grid-cols-5 xl:w-[1100px]">

            {#each topItems as item, i}
                <Card item={{ ...item, size: getSize(i) }} />
            {/each}


        </div>
    </div>
    <section class="w-full flex justify-center py-[1.6vw] xs:py-2 landscape:sm:mb-12">
        <div class="w-full max-w-[675px] max-xs:px-[1.6vw] xs:px-[8px] md:px-0 md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] flex flex-col items-center justify-center relative">

            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 max-xs:gap-[1.6vw]">
                <!-- Left -->
                <div class="w-full lg:col-span-3 max-xs:space-y-[1.6vw] space-y-2">
                    <Pagination totalPages={Math.ceil(update.length / perPage)}/>
                    <div id="" class="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-2 h-fit gap-2 max-xs:gap-[1.6vw] lg:grid-cols-3 relative">

                        {#each botItems as item}
                            <Card item={{ ...item, size: '1x1' }} />
                        {/each}
                        
                    </div>
                    {#if $phone}
                        <Pagination totalPages={Math.ceil(update.length / perPage)}/>
                    {/if}
                </div>

                <!-- Right -->
                <div class="w-full md:w-[calc(770px/2-4px)] lg:w-[calc((946px/5*2)-5px)] xl:w-[calc((1100px/5*2)-5px)] lg:col-span-2 space-y-2 max-xs:space-y-[1.6vw]">
                    <div class="w-full p-2 bg-mainlight rounded-md border border-zinc-900/15 space-y-[1.6vw] xs:space-y-2 max-xs:space-y-[1.6vw] mb-2 h-fit">

                        <!-- Tombol 'Papan Peringkat' -->
                        <div class="pb-0">
                            <TitleLink title="Papan Peringkat" link="/" outer={false} />
                        </div>

                        <!-- Switch Peringkat -->
                        <LeaderboardSwitch/>
                        
                    </div>

                    <!-- Peringkat -->
                    {#if first}
                        <button on:click={() => window.location.href = '/'} class="outline-none h-fit hover:bg-zinc-200/80 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 
                            w-full cursor-pointer flex flex-col justify-center items-center bg-mainlight rounded-md xs:pb-2 border border-zinc-900/15 overflow-hidden">
                            <div class="flex justify-center items-center w-full xs:aspect-auto
                            md:px-0">
                                <div class="w-full h-full relative">
                                    <!-- {#if top.imageLong}
                                        <img src="{top.imageLong}" alt="top place" class="w-full object-cover aspect-[9/4] rounded-b-md">
                                    {:else if top.image} -->
                                        <div class="bg-cover bg-center" style={`${!first.imageLong ? `background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${first.image}");` : ""}`}>
                                            <img src="{first.imageLong ? first.imageLong : first.image}" alt="first place" class={`${first.imageLong ? 'object-cover' : 'object-contain backdrop-blur-md'} w-full aspect-[9/4] rounded-b-md`}>
                                        </div>
                                    <!-- {/if} -->
                                </div>
                            </div>
                            <div class="grid grid-cols-12 xs:max-w-[600px]
                            pl-4 pr-6 pb-2 pt-3
                            w-full">
                                <div class="font-bold col-span-2
                                text-[4.8vw] xs:text-[32px] flex justify-center items-center pr-[20%]">
                                    #1
                                </div>
                                <div class="flex-1 leading-[1.4] col-span-8 flex flex-col items-start capitalize">
                                    <div class={`text-[2.4vw] xs:text-[14px] md:text-[14px] ${genreColor(first.genre[0])}`}>
                                        <a tabindex="-1" href="/" class="hover:underline">{first.genre[0] ? first.genre[0] : 'genre'}</a>
                                    </div>
                                    <div class="text-[4.8vw] xs:text-[24px] md:text-[20px] font-bold text-start line-clamp-1">
                                        <a tabindex="-1" href="/" class="hover:underline mr-2">{first.title ? first.title : 'Title'}</a>
                                    </div>
                                    <!-- <div class="text-[2.4vw] xs:text-[12px] md:text-[10px] text-nowrap line-clamp-1">{first.author}</div> -->
                                    <div class="text-[2.4vw] xs:text-[12px] md:text-[12px] text-nowrap line-clamp-1">
                                        <a tabindex="-1" href="/" class="hover:underline">{first.author ? first.author : 'author'}</a>, <a tabindex="-1" href="/" class="hover:underline">{first.ilustrator ? first.ilustrator : 'Illustrator'}</a>
                                    </div>
                                </div>
                                <div class="text-[3.2vw] xs:text-[16px] md:text-[14px] flex justify-center items-center col-span-2">
                                    {#if by === 'trending'}    
                                        {numFormat(first.likes)} <Icon icon="mingcute:heart-line" class="text-[4vw] ml-2 xs:text-[20px]" />
                                    {:else if by === 'sering'}    
                                        {first.chapter?.[0] ?? first.pages} <Icon icon="material-symbols:file-copy-outline-rounded" class="text-[4vw] ml-2 xs:text-[20px]" />
                                    {:else if by === 'favorit'}    
                                        {first.rating} <Icon icon="mingcute:star-line" class="text-[4vw] ml-2 xs:text-[20px]" />
                                    {/if}
                                </div>
                            </div>
                        </button>
                    {/if}

                    <div class="max-w-[700px] md:h-[932px] lg:h-[406.5px] md:border-y xl:h-[503.12px] border-zinc-900/15 overflow-y-scroll overflow-scroll-hidden rounded-[7px] max-md:mb-2 max-xs:mb-0">
                        <!-- 2 - 7 -->
                        <div class="w-full overflow-scroll-hidden space-y-2 max-xs:space-y-[1.6vw] overflow-y-scroll">
                            {#each rest as item, i}
                                <button class={`flex items-center justify-between bg-mainlight rounded-md border border-zinc-900/15 outline-none overflow-hidden
                                w-full hover:bg-zinc-200/80 cursor-pointer gap-[2.4vw] pr-[4.8vw] xs:pr-8 xs:gap-4 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 
                                h-[24vw] xs:h-[96px] md:h-[96.28px] lg:h-[95.8px] xl:h-[94.2px]
                                ${i === 0 ? 'border-t-0' : i === 13 ? 'border-b-0' : ''}
                                `}>
                                    <div class="font-bold 
                                    text-[4.8vw] xs:text-[20px] md:text-[20px] aspect-[3/4] bg-cover bg-center h-full relative"
                                    style={`background-image: url('${item.image}')`}>
                                        <div class="absolute top-[1.6vw] left-[2.4vw] xs:top-1 xs:left-3">#{i+2}</div>
                                    </div>
                                    <div class="flex-1 flex flex-col items-start leading-[1.4] text-[2.8vw] xs:text-[14px] md:text-[12px] xl:text-[12px] text-left capitalize">
                                        <div class={genreColor(item.genre[0])}>{item.genre[0]}</div>
                                        <div class="text-[3.2vw] xs:text-[16px] md:text-[14px] xl:text-[14px] font-bold line-clamp-1">{item.title}</div>
                                        <div class="text-[2.8vw] xs:text-[12px] md:text-[12px] xl:text-[12px] text-stone-500 line-clamp-1">{item.title}</div>
                                    </div>
                                    <div class="text-[3.2vw] xs:text-[16px] md:text-[14px] flex justify-center items-center">
                                        {#if by === 'trending'}    
                                            {numFormat(item.likes)} <Icon icon="mingcute:heart-line" class="text-[4vw] ml-2 xs:text-[20px]" />
                                        {:else if by === 'sering'}    
                                            {item.chapter?.[0] ?? item.pages} <Icon icon="material-symbols:file-copy-outline-rounded" class="text-[4vw] ml-2 xs:text-[20px]" />
                                        {:else if by === 'favorit'}    
                                            {item.rating} <Icon icon="mingcute:star-line" class="text-[4vw] ml-2 xs:text-[20px]" />
                                        {/if}
                                    </div>
                                </button>
                            {/each}
                        </div>
                    </div>

                    <!-- <Pagination totalPages={5}/> -->


                </div>
            </div>
            {#if !$phone}
                <div class="max-xs:mt-[1.6vw] mt-2 w-full">
                    <Pagination totalPages={Math.ceil(update.length / perPage)}/>
                </div>
            {/if}
        </div>
    </section>
</section>

<style>
	.overflow-scroll-hidden {
		overflow: auto;
		scrollbar-width: none;       /* Firefox */
		-ms-overflow-style: none;    /* Internet Explorer 10+ */
	}

	.overflow-scroll-hidden::-webkit-scrollbar {
		display: none;               /* Safari & Chrome */
	}
</style>