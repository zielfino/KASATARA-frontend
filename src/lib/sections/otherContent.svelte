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

</script>

<section>
    <div class="pt-4 max-xs:pt-[3vw] max-xs:mb-[0vw] max-xs:pb-[2.4vw] flex justify-center items-center max-xs:bg-gradient-to-b max-xs:from-zinc-200 max-xs:to-zinc-200/0">
        <div class="w-full max-w-[calc(675px-16px)] md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] max-xs:px-[4vw] px-1.5">
            <div class="text-xl max-xs:text-[4vw] font-work-sans font-[600] tracking-tight flex justify-between xs:pl-2">
                <div>Semua Terbaru</div>
                <!-- <a href="/" class="text-base flex justify-center items-center"><Icon icon="material-symbols:arrow-forward-ios-rounded" /></a> -->
            </div>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center min-[900px] max-xs:bg-zinc-200 max-xs:rounded-b-xl max-xs:pb-[0.2vw]">
        <div class="grid grid-cols-2 xs:grid-cols-3 w-full max-w-[675px] md:max-w-[770px]
        max-xs:px-[1.6vw] xs:px-[8px] gap-2 max-xs:gap-[1.6vw] my-2 xs:my-[8px]
        md:grid-cols-4 lg:w-[946px] lg:max-w-[100%] md:p-0
        lg:grid-cols-5 xl:w-[1100px]">

            {#each update.slice( 0, $phone ? 1 : $desktop ? $desktoplarge ? 3 : 4 : 3) as item, i}
                <Card item="{{...item, size: i === 0 ? ($desktoplarge ? '2x1' : $phone ? '2x1' : '1x1') : '1x1'}}" />
            {/each}

        </div>
    </div>
    <News title="TIPS" type="info" color="light" />
    <section class="w-full flex justify-center py-2 landscape:sm:mb-12">
        <div class="w-full max-w-[675px] max-xs:px-[1.6vw] xs:px-[8px] md:px-0 md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] flex flex-col items-center justify-center relative">

            <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 max-xs:gap-[1.6vw]">
                <!-- Left -->
                <div class="w-full lg:col-span-3 space-y-2 max-xs:space-y-[1.6vw]">
                    <div class="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-2 h-fit gap-2 max-xs:gap-[1.6vw] lg:grid-cols-3 relative">

                        {#each update.slice($phone ? 1 : 4, $phone ? 11 : $desktoplarge ? 19 : $desktop ? 18 : 19) as item}
                            <Card item="{{...item, size: '1x1'}}" />
                        {/each}
                        
                    </div>

                    <Pagination ison={'true'} totalPages={5} initialPage={1} />
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
                    {#if top}
                        <button on:click={() => window.location.href = '/'} class="outline-none h-fit hover:bg-zinc-200/80 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 
                            w-full cursor-pointer flex flex-col justify-center items-center bg-mainlight rounded-md p-2 border border-zinc-900/15">
                            <div class="flex justify-center items-center w-full xs:aspect-auto
                            py-[1.6vw] xs:px-[16px] 
                            md:px-0">
                                <div class="w-full h-full">
                                    <img src="{top.imageLarge}" alt="top place" class="w-full">
                                </div>
                            </div>
                            <div class="grid grid-cols-12 xs:max-w-[600px]
                            p-2 max-xs:p-[1.6vw]
                            w-full">
                                <div class="font-bold col-span-2
                                text-[4.8vw] xs:text-[32px] flex justify-center items-center pr-[20%]">
                                    #1
                                </div>
                                <div class="flex-1 leading-[1.4] col-span-8 flex flex-col items-start capitalize">
                                    <div class={`text-[2.4vw] xs:text-[14px] md:text-[14px] ${genreColor(top.genre[0])}`}>
                                        <a tabindex="-1" href="/" class="hover:underline">{top.genre[0]}</a>
                                    </div>
                                    <div class="text-[4.8vw] xs:text-[24px] md:text-[20px] font-bold">
                                        <a tabindex="-1" href="/" class="hover:underline">{top.title}</a>
                                    </div>
                                    <!-- <div class="text-[2.4vw] xs:text-[12px] md:text-[10px] text-nowrap line-clamp-1">{top.author}</div> -->
                                    <div class="text-[2.4vw] xs:text-[12px] md:text-[12px] text-nowrap line-clamp-1">
                                        <a tabindex="-1" href="/" class="hover:underline">{top.author }</a>, <a tabindex="-1" href="/" class="hover:underline">{top.ilustrator}</a>
                                    </div>
                                </div>
                                <div class="text-[3.2vw] xs:text-[16px] md:text-[14px] flex justify-center items-center col-span-2">
                                    {top.pages} <Icon icon="material-symbols:file-copy-outline-rounded" class="text-[4vw] ml-2 xs:text-[20px]" />
                                </div>
                            </div>
                        </button>
                    {/if}

                    <div class="max-w-[700px] md:h-[816px] lg:h-[404px] border-y xl:h-[519px] border-zinc-900/15 overflow-y-scroll overflow-scroll-hidden rounded-[7px] max-md:mb-0">
                        <!-- 2 - 7 -->
                        <div class="w-full overflow-scroll-hidden space-y-2 max-xs:space-y-[1.6vw] overflow-y-scroll">
                            {#each update.slice(1, 15) as item, i}
                                <button class={`flex items-center justify-between bg-mainlight rounded-md border border-zinc-900/15 outline-none overflow-hidden
                                w-full hover:bg-zinc-200/80 cursor-pointer gap-[2.4vw] pr-[4.8vw] xs:pr-8 xs:gap-4 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 
                                h-[24vw] xs:h-[96px] md:h-[95px] lg:h-[95px] xl:h-[98.1px]
                                ${i === 0 ? 'border-t-0' : i === 13 ? 'border-b-0' : ''}
                                `}>
                                    <div class="font-bold 
                                    text-[4.8vw] xs:text-[20px] md:text-[20px] aspect-[5/5] bg-cover h-full relative"
                                    style={`background-image: url('${item.image}')`}>
                                        <div class="absolute top-[1.6vw] left-[2.4vw] xs:top-1 xs:left-3">#{i+2}</div>
                                    </div>
                                    <div class="flex-1 flex flex-col items-start leading-[1.4] text-[2.8vw] xs:text-[14px] md:text-[12px] xl:text-[14px] text-left capitalize">
                                        <div class={genreColor(item.genre[0])}>{item.genre[0]}</div>
                                        <div class="text-[3.2vw] xs:text-[16px] md:text-[14px] xl:text-[16px] font-bold line-clamp-1">{item.title}</div>
                                        <div class="text-[2.8vw] xs:text-[12px] md:text-[12px] xl:text-[14px] text-stone-500 line-clamp-1">{item.title}</div>
                                    </div>
                                    <div class="text-[3.2vw] xs:text-[16px] md:text-[14px] flex justify-center items-center">
                                        {item.pages} <Icon icon="material-symbols:file-copy-outline-rounded" class="text-[4vw] ml-2 xs:text-[20px]" />
                                    </div>
                                </button>
                            {/each}
                        </div>
                    </div>

                    <Pagination totalPages={5} initialPage={1} />


                </div>
            </div>
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