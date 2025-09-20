<script lang="ts">
    import { goto } from "$app/navigation";
    import Pagination from "$lib/components/pagination.svelte";
    import SeriesSidebar from "$lib/components/SeriesSidebar.svelte";
    import Breakline from "$lib/components/util/breakline.svelte";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";

	let switchSeries: string = 'chapter';
	let sinopsisToggle: boolean = false;

	onMount(() => {
		// Ambil dari sessionStorage kalau ada
		const saved = sessionStorage.getItem('switchSeries');
		if (saved) switchSeries = saved;
		else sessionStorage.setItem('switchSeries', 'chapter');
	});

	function handleSeries(value: string) {
		switchSeries = value;
		sessionStorage.setItem('switchSeries', value);
	}

	function handleSinopsis() {
		sinopsisToggle = true;
	}

    let textarea: HTMLTextAreaElement;
    
    function autoGrow() {
        textarea.style.height = 'auto'; // reset dulu biar bisa shrink
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    import { koin } from "$lib/koin";

    function toggleKoin() {
        koin.update(v => !v);
    }
</script>
<div class="text-zinc-900 max-xs:px-[1.6vw]">

    <!-- content -->
    <div class="grid grid-cols-12 xl:grid-cols-10 gap-[1.6vw] xs:gap-2">

        <!-- Desktop Sidebar Ghost -->
        <div class="col-span-4 xl:col-span-3 space-y-2 max-lg:hidden mt-[180px] order-2">
            <!-- <SeriesSidebar /> -->
        </div>

        <div class="col-span-12 lg:col-span-8 xl:col-span-7 order-1
        max-lg:grid-cols-12 max-lg:grid lg:space-y-2 max-lg:gap-2 max-xs:gap-[1.6vw]">

            <!-- Hero Section Series -->
            <div class="min-h-[300px] max-xs:min-h-[50vw] relative z-10 max-lg:col-span-12">
                <div class="w-full border border-zinc-900/15 bg-mainlight rounded-2xl max-xs:rounded-[2.4vw] font-work-sans p-2 max-xs:p-[1.6vw] pl-6 max-xs:pl-[2.8vw] absolute bottom-0">
                    
                    <div class="absolute -top-[1px] -right-[313px] xl:-right-[328px] max-w-[305px] xl:max-w-[318.5px] space-y-2 max-lg:hidden">    
                        <div class="bg-mainlight rounded-2xl border border-zinc-900/15 
                        flex flex-col justify-start items-center relative overflow-hidden text-[12px]
                        text-center">                  
                            <SeriesSidebar />
                        </div>
                        <div class="bg-mainlight rounded-2xl border border-zinc-900/15 
                        flex flex-col justify-start items-center relative overflow-hidden text-[12px]
                        text-center md:h-120 lg:h-134 xl:h-139">                  
                            <div class="bg-red-100 text-mainlight w-full h-full flex justify-center items-center directi [writing-mode:vertical-lr]">Space Ads :D</div>
                        </div>
                    </div>
                    
                    <div class="absolute flex xs:space-x-2 space-x-[1.6vw] lg:space-x-0
                    right-0 lg:left-[calc(175px+1.25rem)] lg:-top-[calc(32px+0.7rem)] -top-[7.6vw] xs:-top-[calc(28px+0.5rem)] sm:-top-[calc(32px+0.5rem)] ">
                        <button class="lg:order-1 lg:ml-2 aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center max-sm:h-[28px] max-xs:h-[5.6vw]
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-not-allowed"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] max-xs:text-[3.6vw] max-sm:text-[18px] mt-0.5 max-xs:mt-[0.4vw]" /></button>
                        <button class="bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center h-[32px] max-xs:h-[5.6vw] px-2 max-xs:px-[0.8vw] max-sm:px-1 max-sm:h-[28px]
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-not-allowed group
                        ">
                        <!-- <Icon icon="material-symbols:add" class="text-[18px] max-sm:text-[14px] max-xs:text-[2.8vw] mx-1 max-xs:mx-[0.8vw]" /> -->
                        <Icon icon="mingcute:bookmark-line" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] mx-1 max-xs:mx-[0.8vw]" /> 
                        <!-- <Icon icon="mingcute:bookmark-line" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] group-hover:hidden mx-1 max-xs:mx-[0.8vw]" />  -->
                        <!-- <Icon icon="mingcute:bookmark-fill" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] hidden group-hover:block  mx-1 max-xs:mx-[0.8vw]" /> -->
                        <span class="sm:text-[14px] xs:text-[12px] text-[2.4vw] mr-[1.6vw] xs:mr-3">Bookmark</span></button>
                        <!-- <button class="aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] mt-0.5" /></button>
                        <button class="aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] mt-0.5" /></button> -->
                    </div>
                    <!-- <div class="absolute -top-8 max-xs:-top-[5vw] max-sm:-top-6 right-6 max-xs:right-[1.6vw] max-sm:right-2 text-mainlight flex space-x-3 max-xs:space-x-[2.4vw] min-[800px]:hidden hidden"> -->
                        <!-- <div class="flex justify-center items-center text-[14px] max-xs:text-[2.8vw]"><Icon icon="material-symbols:trophy" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-0.5 max-xs:mr-[0.4vw]" />#2</div> -->
                        <!-- <div class="flex justify-center items-center group text-[14px] max-xs:text-[2.8vw] max-[600px]:hidden"><Icon icon="mingcute:bookmark-line" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] group-hover:hidden" /> <Icon icon="mingcute:bookmark-fill" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] hidden group-hover:block" />1.2M</div> -->
                        <!-- <div class="flex justify-center items-center group text-[14px] max-xs:text-[2.8vw] max-[600px]:hidden"><Icon icon="mingcute:emoji-line" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] group-hover:hidden" /><Icon icon="mingcute:emoji-2-line" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] hidden group-hover:block" />34.2M</div> -->
                        <!-- <div class="flex justify-center items-center group text-[14px] max-xs:text-[2.8vw]"><Icon icon="mingcute:eye-line" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] group-hover:hidden" /><Icon icon="mingcute:eye-close-line" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] hidden group-hover:block" />65.7M</div> -->
                        <!-- <button class="bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center h-[32px] px-2
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer
                        "><Icon icon="material-symbols:add" class="text-[18px] mx-1" /><span class="text-[14px] mr-3">Favorit</span></button>
                        <button class="aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] mt-0.5" /></button>
                        <button class="aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] mt-0.5" /></button>
                        <button class="aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] mt-0.5" /></button> -->
                    <!-- </div> -->
                    <div class="absolute bottom-3 max-xs:bottom-[2.4vw] -translate-x-2 max-xs:-translate-x-[1.6vw] w-40 max-xs:w-[27vw] h-4 max-xs:h-[3.2vw] rounded-ful blur-md -skew-y-6 bg-zinc-900"></div>
                    <!-- <div class="aspect-[2/3] w-[150px] rounded-lg bg-cover bg-center absolute bottom-2 ring-2 ring-zinc-900/15 -skew-y-6 -translate-y-6 drop-shadow-lg drop-shadow-zinc-900/30 -translate-x-3 bg-zinc-900 overflow-hidden"></div> -->
                    <!-- <div class="aspect-[2/3] w-[150px] rounded-lg bg-cover bg-center absolute bottom-2 ring-2 ring-zinc-900/15 -skew-y-6 -translate-y-5 drop-shadow-lg drop-shadow-zinc-900/30 -translate-x-1.5 bg-zinc-900 overflow-hidden"></div> -->
                    <div class="aspect-[2/3] w-[150px] max-xs:w-[25vw] rounded-lg max-xs:rounded-[1.6vw] bg-cover bg-center absolute bottom-2 max-xs:bottom-[1.6vw] xs:ring-2 ring-zinc-900/15 -skew-y-6 -translate-y-4 max-xs:-translate-y-[3.2vw] drop-shadow-lg drop-shadow-zinc-900/30" style={`background-image: url('https://storage.shngm.id/thumbnail/cover/f38bf1beaa3b.jpeg')`}></div>
                    <div class="z-4 w-fit max-w-[calc(100%-(150px+8px))] max-xs:max-w-[calc(100%-(25vw+1.6vw))] flex justify-center flex-col translate-x-[calc(150px+8px)] max-xs:translate-x-[calc(25vw+1.6vw)] pl-4 pb-4 pt-3 max-xs:pl-[3.2vw] max-xs:py-[3.2vw]">
                        <div class="text-[26px] font-semibold z-5 leading-[1.4] max-xs:text-[5.2vw] line-clamp-2 ">Overgeared</div>
                        <div class="text-[12px] font-light z-5 max-xs:text-[2.4vw] leading-3 mt-[1.6vw] xs:mt-2">Lee Dong‑Wook, Team Argo (REDICE)</div>
                        <div class="flex opacity-60 space-x-[1.6vw] xs:space-x-2 font-[400] mt-[1.2vw] xs:mt-1.5">
                            <!-- <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div> -->
                            <div class="flex justify-center items-center text-[12px] max-xs:text-[2.4vw]"><Icon icon="mingcute:star-fill" class="xs:text-[12px] text-[2.4vw] mr-0.5 max-xs:mr-[0.4vw]" />9.9</div>
                            <!-- <div class="flex justify-center items-center group text-[12px] max-xs:text-[2.4vw] max-[600px]:hidden"><Icon icon="mingcute:bookmark-line" class="text-[12px] min-[700px]:text-[12px] max-xs:text-[2.4vw] mr-1 max-xs:mr-[0.8vw] group-hover:hidden" /> <Icon icon="mingcute:bookmark-fill" class="text-[12px] min-[700px]:text-[12px] max-xs:text-[2.4vw] mr-1 max-xs:mr-[0.8vw] hidden group-hover:block" />1.2M</div> -->
                            <!-- <div class="flex justify-center items-center group text-[12px] max-xs:text-[2.4vw]"><Icon icon="mingcute:eye-line" class="text-[12px] min-[700px]:text-[12px] max-xs:text-[2.4vw] mr-1 max-xs:mr-[0.8vw] group-hover:hidden" /><Icon icon="mingcute:eye-close-line" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] hidden group-hover:block" />65.7M</div> -->
                            <div class="flex justify-center items-center text-[12px] max-xs:text-[2.4vw]"><Icon icon="mdi:eye" class="xs:text-[14px] text-[2.8vw] mr-1 max-xs:mr-[0.8vw]" />65.7M</div>
                            <div class="flex justify-center items-center text-[12px] max-xs:text-[2.4vw]"><Icon icon="material-symbols:trophy" class="xs:text-[14px] text-[2.8vw] mr-0.5 max-xs:mr-[0.4vw]" />#2</div>
                            <!-- <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-half-fill" class="text-[14px] max-xs:text-[2.8vw]" /></div> -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content Series -->
            <div class={`max-lg:col-span-12 max-lg:flex 
            ${switchSeries === 'info' ? 'gap-[1.6vw] xs:gap-2 lg:space-y-2 flex-col' : ''}`}>

                { #if switchSeries !== 'info' }
                <div class="max-lg:w-[40%] min-w-[300px] lg:hidden space-y-2 max-[800px]:hidden max-md:mr-2 order-1">
                    <div class="bg-mainlight rounded-2xl border border-zinc-900/15 
                    flex flex-col justify-start items-center relative overflow-hidden text-[12px]
                    text-center">
                        <SeriesSidebar />
                    </div>  
                    <div class="bg-mainlight rounded-2xl border border-zinc-900/15 
                    flex flex-col justify-start items-center relative overflow-hidden text-[12px]
                    text-center xs:h-102.5 md:h-100.5">                  
                        <div class="bg-red-100 text-mainlight w-full h-full flex justify-center items-center directi [writing-mode:vertical-lr]">Space Ads :D</div>
                    </div>
                </div>
                {/if}
                { #if switchSeries === 'chapter' }
                <div class="bg-mainlight rounded-2xl max-xs:rounded-[2.4vw] space-y-2 max-xs:space-y-[1.6vw] border border-zinc-900/15 p-2 pb-0 max-xs:p-[1.6vw] max-md:order-2 max-lg:w-[60%] max-lg:mr-2 max-md:m-0 max-md:w-full">
                    <div class="flex justify-between items-center text-sm font-work-sans font-[400] tracking-tight w-full">
                        <div class="flex justify-center items-center space-x-2 max-xs:space-x-[1.6vw]">
                            <button
                            disabled={ switchSeries === 'chapter'}
                            on:click={() => handleSeries('chapter')}
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw] font-work-sans
                                ${ switchSeries === 'chapter' ? 'text-mainlight bg-zinc-900' : 'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                                `}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    Chapter
                                </span>
                            </button>
                            <button
                            disabled={ switchSeries === 'info'}
                            on:click={() => handleSeries('info')}
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw] font-work-sans
                                ${ switchSeries === 'info' ? 'text-mainlight bg-zinc-900' : 'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                                `}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    Info
                                </span>
                            </button>
                            <button
                            disabled={ switchSeries === 'news'}
                            on:click={() => handleSeries('news')}
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw]
                                ${ switchSeries === 'news' ? 'text-mainlight bg-zinc-900' : 'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                                `}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    News
                                </span>
                            </button>
                        </div>
                        <div class="flex">
                            <div class="relative group">
                                <button class="mr-2 max-xs:mr-[1.6vw] h-full flex justify-center items-center px-2 max-xs:px-[1.6vw] py-1 max-xs:py-[0.8vw] rounded-md max-xs:rounded-[1.2vw] cursor-pointer outline-none peer text-[2.4vw] xs:text-[14px]
                                max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:ring-1 max-xs:focus-visible:ring-[0.8vw] focus-visible:ring-sky-400/50 active:bg-zinc-900/9">
                                    <Icon icon="majesticons:filter" class="text-[14px] max-xs:text-[2.4vw] mr-1 max-xs:mr-[0.8vw] " />
                                    <div class="">Filter</div>
                                </button>
                                <div class="absolute w-32 max-xs:w-[25.6vw] h-4 max-xs:h-[3.2vw] right-0 group-hover:block hidden">
                                    <div class="absolute w-32 max-xs:w-[25.6vw] bg-mainlight border border-zinc-900/15 rounded-md top-2 max-xs:top-[1.6vw] p-1 max-xs:p-[0.8vw] space-y-1 max-xs:space-y-[0.8vw] drop-shadow-xl drop-shadow-zinc-900/30">
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-pointer hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-check" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Semua</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-not-allowed opacity-50 hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Berbayar</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-not-allowed opacity-50 hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Gratis</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-not-allowed opacity-50 hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Special</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="relative group">
                                <button class="mr-2 max-xs:mr-[1.6vw] flex justify-center items-center px-2 max-xs:px-[1.6vw] py-1 max-xs:py-[0.8vw] rounded-md max-xs:rounded-[1.2vw] cursor-pointer outline-none peer text-[2.4vw] xs:text-[14px]
                                max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:ring-1 max-xs:focus-visible:ring-[0.8vw] focus-visible:ring-sky-400/50 active:bg-zinc-900/9">
                                    <Icon icon="majesticons:sort-vertical" class="text-[18px] max-xs:text-[3.6vw] mr-1 max-xs:mr-[0.8vw] " />
                                    <div class="">Urutkan</div>
                                </button>
                                <div class="absolute w-32 max-xs:w-[25.6vw] h-4 max-xs:h-[3.2vw] right-0 group-hover:block hidden">
                                    <div class="absolute w-32 max-xs:w-[25.6vw] bg-mainlight border border-zinc-900/15 rounded-md top-2 max-xs:top-[1.6vw] p-1 max-xs:p-[0.8vw] space-y-1 max-xs:space-y-[0.8vw] drop-shadow-xl drop-shadow-zinc-900/30">
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-pointer hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-check" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Terbaru</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-not-allowed opacity-50 hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Terlama</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-not-allowed opacity-50 hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Reaksi</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-not-allowed opacity-50 hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Komentar</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {#each Array.from({ length: 3 }, (_, i) => i + 1) as n}
                        <button
                         on:click={toggleKoin}
                        class={`flex items-center justify-between bg-mainlight rounded-md border border-zinc-900/15 outline-none overflow-hidden
                        w-full hover:bg-zinc-200/80 cursor-pointer gap-[2.4vw] pr-[4.8vw] xs:pr-8 xs:gap-4 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 
                        h-[24vw] xs:h-[96px] md:h-[95px] lg:h-[95px] xl:h-[98.1px]`}>
                            <div class="font-bold 
                            text-[4.8vw] xs:text-[20px] md:text-[20px] aspect-[5/5] bg-cover h-full relative"
                            style={`background-image: url('https://i.imgur.com/HHe6hQi.png')`}>
                            </div>
                            <div class="flex-1 flex flex-col items-start leading-[1.4] text-[2.8vw] xs:text-[14px] md:text-[12px] xl:text-[14px] text-left capitalize">
                                <!-- <div class={genreColor(item.genre[0])}>{item.genre[0]}</div> -->
                                <div class="text-[16px] max-xs:text-[3.2vw] font-bold line-clamp-1">Judul Chapter {148-n}</div>
                                <div class="space-x-1 flex justify-center items-center mt-2">
                                    <span class="text-[12px] max-xs:text-[2.4vw] text-zinc-500/50 line-clamp-1">{30-n} Feb 2025</span>
                                    <div class="bg-amber-400 text-mainlight border-amber-600 border px-[0.8vw] xs:px-1 rounded-[1.2vw] xs:rounded-md text-[2vw] xs:text-[10px] leading-[1.5]">Paid</div>
                                    <div class="bg-emerald-400 text-mainlight border-emerald-600 border px-[0.8vw] xs:px-1 rounded-[1.2vw] xs:rounded-md text-[2vw] xs:text-[10px] leading-[1.5]">Up</div>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center items-end">
                                <span class="text-[16px] max-xs:text-[3.2vw] flex justify-center items-center">#{148-n}</span>
                                <span class="text-[12px] max-xs:text-[2.4vw] line-clamp-1 font-[300]">Gratis dalam {25-n*7} hari</span>
                            </div>
                        </button>
                    {/each}
                    {#each Array.from({ length: 4 }, (_, i) => i + 1) as n}
                        <button 
                        on:click={() => goto('/series/chap')}
                        class={`flex items-center justify-between bg-mainlight rounded-md border border-zinc-900/15 outline-none overflow-hidden
                        w-full hover:bg-zinc-200/80 cursor-pointer gap-[2.4vw] pr-[4.8vw] xs:pr-8 xs:gap-4 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 
                        h-[24vw] xs:h-[96px] md:h-[95px] lg:h-[95px] xl:h-[98.1px]`}>
                            <div class="font-bold 
                            text-[4.8vw] xs:text-[20px] md:text-[20px] aspect-[5/5] bg-cover h-full relative"
                            style={`background-image: url('https://i.imgur.com/HHe6hQi.png')`}>
                            </div>
                            <div class="flex-1 flex flex-col items-start leading-[1.4] text-[2.8vw] xs:text-[14px] md:text-[12px] xl:text-[14px] text-left capitalize">
                                <!-- <div class={genreColor(item.genre[0])}>{item.genre[0]}</div> -->
                                <div class="text-[16px] max-xs:text-[3.2vw] font-bold line-clamp-1">Judul Chapter {148-n-3}</div>
                                <div class="space-x-1 flex justify-center items-center mt-2">
                                    <div class="text-[12px] max-xs:text-[2.4vw] text-zinc-500/50 line-clamp-1">{30-n-3} Feb 2025</div>
                                    <div class="text-gray-600 border-gray-400 border px-[0.8vw] xs:px-1 rounded-[1.2vw] xs:rounded-md text-[2vw] xs:text-[10px] leading-[1.5]">Free</div>
                                </div>
                            </div>
                            <div class="text-[16px] max-xs:text-[3.2vw] flex justify-center items-center">#{148-n-3}</div>
                        </button>
                    {/each}
                    <Pagination totalPages={21} initialPage={1} dead={true} />
                </div>
                {/if}
            
                { #if switchSeries === 'info' }
                <div class="bg-mainlight rounded-2xl max-xs:rounded-[2.4vw] space-y-2 max-xs:space-y-[1.6vw] border border-zinc-900/15 p-2 max-xs:p-[1.6vw] max-md:order-2 w-full max-md:m-0">
                    <div class="flex justify-between items-center text-sm font-work-sans font-[400] tracking-tight w-full">
                        <div class="flex justify-center items-center space-x-2 max-xs:space-x-[1.6vw]">
                            <button
                            disabled={ switchSeries === 'chapter'}
                            on:click={() => handleSeries('chapter')}
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw] font-work-sans
                                ${ switchSeries === 'chapter' ? 'text-mainlight bg-zinc-900' : 'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                                `}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    Chapter
                                </span>
                            </button>
                            <button
                            disabled={ switchSeries === 'info'}
                            on:click={() => handleSeries('info')}
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw] font-work-sans
                                ${ switchSeries === 'info' ? 'text-mainlight bg-zinc-900' : 'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                                `}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    Info
                                </span>
                            </button>
                            <button
                            disabled={ switchSeries === 'news'}
                            on:click={() => handleSeries('news')}
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw]
                                ${ switchSeries === 'news' ? 'text-mainlight bg-zinc-900' : 'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                                `}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    News
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- info -->
                    <div class="w-full bg-zinc-900/5 hover:bg-zinc-900/10 rounded-md flex justify-between items-center p-[1.6vw] xs:p-2 pr-[3.2vw] xs:pr-4 cursor-pointer">
                        <div class="text-[2.8vw] xs:text-[14px] font-[400] capitalize p-[1.6vw] xs:p-2">
                            <span class="font-[700]">Peringkat mingguan kategori Fantasy</span>
                            Peringkat 1
                        </div>
                        <div class="p-[0.8vw] xs:p-1 text-[4vw] xs:text-[20px] bg-zinc-900/15 rounded-full"><Icon icon="mingcute:right-fill" class="translate-x-[0.2vw] xs:translate-x-0.25" /></div>
                    </div>

                    <!-- Sinopsis -->
                    <div class={`p-[1.6vw] xs:p-2 overflow-hidden
                    ${sinopsisToggle ? '' : 'xs:max-h-[300px] max-h-[60vw] mask-b-from-70% mask-b-to-100%'}
                    `}>
                        <h3 class="text-[3.6vw] xs:text-lg font-[700] font-work-sans mb-[0.5em]">Sinopsis</h3>
                        <p class="text-[2.8vw] xs:text-sm text-justify">
                            “Eh, lagi mati? Kali keberapa ini…”
                            <br>“Tenang, ini bukan akhir—baru permulaan.”
                            <br>
                            <br>Dulu aku hanya pecundang.
                            <br>Di dunia nyata impianku pupus,
                            <br>di Satisfy namaku jadi bahan tertawaan.
                            <br>Tiap loot besar, aku dapat reruntuhan.
                            <br>
                            <br>Tapi malam itu——
                            <br>‘Pagma’s Hammer’ terjatuh ke tanganku.
                            <br>Sekali ketuk, besi kasar berubah masterpiece.
                            <br>Pedang legendaris kujadikan mainanku,
                            <br>zirah tak tertandingi kubentuk dari bara panas.
                            <br>
                            <br>Desas-desus tentang “Grid si Pandai Besi”
                            <br>membara di setiap sudut guild hall.
                            <br>Guild elit menantang, intrik membayang,
                            <br>namun paluku menuntunku meraih <br>kemenangan demi kemenangan.
                            <br>
                            <br>Kini aku Grid.
                            <br>Pandai besi terkuat dan terhebat di jagat Satisfy.
                            <br>Dari reruntuhan, aku memahat takdir—
                            <br>menjadi legenda yang tak tergoyahkan.
                        </p>
                    </div>
                    {#if sinopsisToggle === false}
                        <button on:click={handleSinopsis} class="w-full flex justify-center items-center"><Icon icon="mingcute:down-fill" class="cursor-pointer -translate-y-1" /></button>
                    {/if}
                </div>

                <div class="flex max-sm:flex-col sm:grid-cols-2 sm:grid gap-[1.6vw] xs:gap-2 max-md:order-2">

                    <div class="order-1 row-span-2 lg:hidden bg-mainlight rounded-2xl max-xs:rounded-[2.4vw] space-y-2 max-xs:space-y-[1.6vw] border border-zinc-900/15 w-full max-md:m-0
                    flex flex-col justify-start items-center relative overflow-hidden text-[12px]
                    text-center h-full">
                        <SeriesSidebar excerpt={false} />
                    </div>

                    <!-- Detail -->
                    <div class="sm:order-1 sm:pl-4 bg-mainlight rounded-2xl max-xs:rounded-[2.4vw] space-y-2 max-xs:space-y-[1.6vw] border border-zinc-900/15 p-2 max-xs:p-[1.6vw] w-full max-md:m-0">

                        <!-- button -->
                        <!-- <div class="w-full bg-zinc-900/5 hover:bg-zinc-900/10 rounded-md flex justify-between items-center p-2 pr-4 cursor-pointer">
                            <div class="text-[14px] font-[400] capitalize p-2">
                                <span class="font-[700]">Peringkat mingguan kategori Fantasy</span>
                                Peringkat 1
                            </div>
                            <div class="p-1 text-[20px] bg-zinc-900/15 rounded-full"><Icon icon="mingcute:right-fill" class="translate-x-0.25" /></div>
                        </div> -->
                        <div class="p-2">
                            <h3 class="text-[3.6vw] xs:text-lg font-[700] font-work-sans mb-[0.5em]">Detail</h3>
                            <div class="xs:text-xs text-[2.4vw] tracking-wide font-[400] max-sm:flex">
                                <div class="w-full">
                                    <span class="font-[600] mr-[0.5em] font-work-sans xs:text-sm text-[2.8vw]">Name:</span>Overgeared, 템빨 <br>
                                    <span class="font-[600] mr-[0.5em] font-work-sans xs:text-sm text-[2.8vw]">Genre:</span><span class="px-[1.6vw] xs:px-2 rounded-[1.2vw] xs:rounded-md border border-zinc-900/10 bg-zinc-900/5 cursor-pointer hover:bg-zinc-900/10">Fantasy</span> <span class="px-[1.6vw] xs:px-2 rounded-[1.2vw] xs:rounded-md border border-zinc-900/10 bg-zinc-900/5 cursor-pointer hover:bg-zinc-900/10">Action</span><br>
                                    <span class="font-[600] mr-[0.5em] font-work-sans xs:text-sm text-[2.8vw]">Type:</span><span class="px-[1.6vw] xs:px-2 rounded-[1.2vw] xs:rounded-md border border-zinc-900/10 bg-zinc-900/5 cursor-pointer hover:bg-zinc-900/10">KOMIK</span>
                                </div>
                                <div class="w-full">
                                    <span class="font-[600] mr-[0.5em] font-work-sans xs:text-sm text-[2.8vw]">Author:</span><span class="hover:underline cursor-pointer">Park Saenal</span><br>
                                    <span class="font-[600] mr-[0.5em] font-work-sans xs:text-sm text-[2.8vw]">Scriptwriter:</span><span class="hover:underline cursor-pointer">Lee Dong-Wook</span><br>
                                    <span class="font-[600] mr-[0.5em] font-work-sans xs:text-sm text-[2.8vw]">Illustrator:</span><span class="hover:underline cursor-pointer">Team Agro</span> (<span class="hover:underline cursor-pointer">REDICE</span>)<br>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Kata Kunci -->
                    <div class="bg-mainlight sm:pl-4 lg:pl-2 rounded-2xl max-xs:rounded-[2.4vw] space-y-[1.6vw] xs:space-y-2 border border-zinc-900/15 p-[1.6vw] xs:p-2 w-full max-md:m-0">
                        <div class="p-[1.6vw] xs:p-2 w-full">
                            <h3 class="text-[3.6vw] xs:text-lg font-[700] font-work-sans mb-[0.5em]">Kata Kunci</h3>
                            <div class="flex gap-[1.6vw] xs:gap-2 text-[2.4vw] xs:text-xs flex-wrap">
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#sliceoflife</div>
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#grinding</div>
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#roleplay</div>
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#cunubyu</div>
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#game</div>
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#kingdom</div>
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#vr</div>
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#overpowered</div>
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#modern</div>
                                <div class="px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 bg-zinc-900/5 rounded-[1.2vw] xs:rounded-md border-[0.2vw] xs:border border-zinc-900/10 cursor-pointer hover:bg-zinc-900/10">#ranker</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/if}
            
                { #if switchSeries === 'news' }
                <div class="bg-mainlight flex flex-col items-center justify-center rounded-2xl max-xs:rounded-[2.4vw] space-y-2 max-xs:space-y-[1.6vw] border border-zinc-900/15 p-2 max-xs:p-[1.6vw] max-md:order-2 max-lg:w-[60%] max-lg:mr-2 max-md:m-0 max-md:w-full min-h-[295px]">
                    <div class="flex justify-between items-center text-sm font-work-sans font-[400] tracking-tight w-full">
                        <div class="flex justify-center items-center space-x-2 max-xs:space-x-[1.6vw]">
                            <button
                            disabled={ switchSeries === 'chapter'}
                            on:click={() => handleSeries('chapter')}
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw] font-work-sans
                                ${ switchSeries === 'chapter' ? 'text-mainlight bg-zinc-900' : 'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                                `}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    Chapter
                                </span>
                            </button>
                            <button
                            disabled={ switchSeries === 'info'}
                            on:click={() => handleSeries('info')}
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw] font-work-sans
                                ${ switchSeries === 'info' ? 'text-mainlight bg-zinc-900' : 'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                                `}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    Info
                                </span>
                            </button>
                            <button
                            disabled={ switchSeries === 'news'}
                            on:click={() => handleSeries('news')}
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw]
                                ${ switchSeries === 'news' ? 'text-mainlight bg-zinc-900' : 'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
                                `}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    News
                                </span>
                            </button>
                        </div>
                    </div>
                    <div class="w-full bg-gradient-to-br cursor-not-allowed from-purple-700 to-purple-500/75 text-mainlight rounded-md flex justify-between items-center p-[1.6vw] xs:p-2 pr-[3.2vw] xs:pr-4">
                        <div class="text-[2.4vw] xs:text-[12px] p-[1.6vw] xs:p-2">
                            <div class="font-[600] text-[2.8vw] xs:text-[14px]">I Killed An Academy Player</div>
                            <div class="opacity-75">Ayo season 3-nya sekarang, Corin telah bangkit dari tidurnya!</div>
                        </div>
                        <div><img src="https://i.imgur.com/GrlvuUo.png" alt="" class="h-[50px]"></div>
                        <!-- <div class="p-[0.8vw] xs:p-1 text-[4vw] xs:text-[20px] bg-zinc-900/15 rounded-full"><Icon icon="mingcute:right-fill" class="translate-x-[0.2vw] xs:translate-x-0.25" /></div> -->
                    </div>

                    <div class="px-[1.6vw] xs:px-2 mt-[3.2vw] xs:mt-4 text-sm w-full">
                        <div class="flex items-center mb-[1.6vw] xs:mb-2 text-[3.2vw] xs:text-base"><div class="text-mainlight text-[2.4vw] xs:text-xs px-[1.6vw] xs:px-2 py-[0.4vw] xs:py-0.5 mr-[0.8vw] xs:mr-1 bg-zinc-900 rounded-full">Guide</div> Terbit Pada</div>
                        <div class="text-[2.8vw] xs:text-sm">1 April 2020</div>
                    </div>

                    <div class="border-zinc-300 border-[0.2vw] xs:border w-[90%] my-[3.2vw] xs:my-4"></div>

                    <div class="px-[1.6vw] xs:px-2 w-full text-[2.8vw] xs:text-sm mb-[1.6vw] xs:mb-2">
                        <p>
                            Halo, kami dari tim Agro. <br>
                             <br>
                            Overgeared adalah webtoon bergenre aksi fantasi <br>
                            yang diperbarui setiap hari Senin malam pukul 22.00. <br>
                            Kemudian untuk menjaga kwalitas gambar, <br>
                            kita adakan libur regular 6 minggu sekali. <br>
                             <br>
                            Mohon dukungannya dan semoga kalian menikmati ceritanya. <br>
                            Terima kasih.
                        </p>
                    </div>
                </div>
                {/if}

            </div>
        </div>

        <div class="col-span-12 xl:col-span-10 bg-mainlight rounded-[3.2vw] xs:rounded-2xl border border-zinc-900/15 order-3
        flex flex-col justify-start items-center relative overflow-hidden h-fit text-[12px] mb-[3.2vw] xs:mb-4">
            <div class="my-4">
                
                <div class={`w-full h-full px-[3.2vw] xs:px-4 to-zinc-900 `}>
                    <div class="font-semibold tracking-wide text-zinc-500 flex items-center my-[3.2vw] xs:my-4 max-xs:text-[3.2vw] space-x-[8px] max-xs:space-x-[1.6vw] font-work-sans w-full  transition-all duration-300">
                        <!-- <button tabindex="-1" on:keydown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();e.stopPropagation();togglecomment()} }} on:click={(e) => {e.preventDefault();e.stopPropagation();togglecomment()}} class="hover:underline cursor-pointer"><Icon icon="mingcute:left-fill" class="text-2xl max-xs:text-[4.8vw]"/></button> -->
                        <div>Comments (3.2K)</div>
                        <!-- <button tabindex="-1" on:keydown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();e.stopPropagation();togglecomment()} }} on:click={(e) => {e.preventDefault();e.stopPropagation();togglecomment()}} class="hover:underline cursor-pointer">See all</button> -->
                    </div>

                    <div class="border space-y-[1.6vw] xs:space-y-2 rounded-md border-zinc-300 text-zinc-900  transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px] p-[3.2vw] xs:p-4 my-[3.2vw] xs:my-4">
                        <textarea name="" id="" bind:this={textarea} on:input={autoGrow} class="h-[9.6vw] overflow-scroll-hidden xs:h-12 w-full outline-none resize-none" placeholder="Please log in to leave a comment"></textarea>
                        <!-- <div class="h-[19.2vw] xs:h-24">Please log in to leave a comment</div> -->
                        <div class="flex justify-between">
                            <div class="flex space-x-[1.6vw] xs:space-x-2">
                                <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 cursor-pointer bg-zinc-200/70 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]">Spoiler</div>
                                <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 cursor-pointer bg-zinc-200/70 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]"><Icon icon="mingcute:bold-line" class=""/></div>
                                <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 cursor-pointer bg-zinc-200/70 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]"><Icon icon="mingcute:italic-line" class=""/></div>
                                <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 cursor-pointer bg-zinc-200/70 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]"><Icon icon="mingcute:underline-line" class=""/></div>
                                <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 cursor-pointer bg-zinc-200/70 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]"><Icon icon="mingcute:attachment-line" class=""/></div>
                                <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 cursor-pointer bg-zinc-200/70 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]"><Icon icon="mingcute:emoji-line" class=""/></div>
                            </div>
                            <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 cursor-not-allowed opacity-50 bg-zinc-200/70 px-[2.4vw] xs:px-3 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]">send</div>
                        </div>
                    </div>

                    <div class="my-[3.2vw] xs:my-4 flex space-x-[1.6vw] xs:space-x-2">
                        <div class="flex items-center justify-center transition-all duration-300 text-mainlight  bg-zinc-700 px-[3.2vw] xs:px-3 h-[8vw] xs:h-[32px] rounded-[1.2vw] xs:rounded-md text-[3.6vw] xs:text-[16px]">Top</div>
                        <div class="flex items-center justify-center transition-all duration-300 hover:bg-zinc-300 cursor-not-allowed opacity-50 bg-zinc-200/70 px-[3.2vw] xs:px-3 h-[8vw] xs:h-[32px] rounded-[1.2vw] xs:rounded-md text-[3.6vw] xs:text-[16px]">Terbaru</div>
                        <div class="flex items-center justify-center transition-all duration-300 hover:bg-zinc-300 cursor-not-allowed opacity-50 bg-zinc-200/70 px-[3.2vw] xs:px-3 h-[8vw] xs:h-[32px] rounded-[1.2vw] xs:rounded-md text-[3.6vw] xs:text-[16px]">Terlama</div>
                    </div>

                    <!-- induk -->
                    <div class="flex max-xs:text-[3.6vw]">
                        <div class="">
                            <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                                <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                                <div class="flex items-center text-zinc-900  transition-all duration-300">username 
                                    <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                                    <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                                    <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                                    <div class="flex text-amber-500/70 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                                </div>
                                <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                                    12 Hours ago
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <div class="text-zinc-900  transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                        <p class="leading-relaxed">
                                            comments Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, saepe ad enim rerum doloremque labore! Odit dolorum mollitia incidunt veritatis.
                                            <span class="text-mainlight">
                                                <span
                                                    class="cursor-pointer text-transparent bg-zinc-600 hover:text-inherit focus:text-inherit transition-colors duration-150 outline-none"
                                                    tabindex="0"
                                                    role="button"
                                                >
                                                    Voluptatem doloremque corporis sequi cumque quaerat tempore excepturi debitis aut nesciunt dolores recusandae exercitationem possimus saepe hic incidunt fuga,
                                                </span>
                                            </span>
                                            optio earum sit ad cupiditate velit est? Facere praesentium quod aut commodi, nisi neque saepe expedita maxime sit numquam doloribus quia tempora obcaecati sequi. repellat deserunt nulla incidunt officiis dolorem. Neque, eveniet, vero assumenda vel accusantium dignissimos aliquam nisi, quae at recusandae perspiciatis accusamus quo sunt dicta itaque distinctio voluptatibus. Eligendi eos tenetur esse voluptatum, consectetur atque est magni nemo sequi a? Modi, qui ea! Ea sint molestiae dolores dignissimos ipsam, cum voluptatem velit, voluptate obcaecati rem ullam saepe in molestias odio, labore ut.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center mt-[1.6vw] xs:mt-3 h-[40px] space-x-[2.4vw] xs:space-x-3 mb-[3.2vw] xs:mb-4">
                                <div class="flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                                    </div>
                                    <div class="my-2 font-work-sans text-zinc-900  transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                                    </div>
                                </div>
                                <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 cursor-pointer bg-zinc-200/70 px-[4.8vw] xs:px-4 rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px]">reply?</div>
                                <div class="flex justify-end flex-1 h-full">
                                    <div class="cursor-pointer flex justify-center items-center hover:bg-zinc-300 aspect-square text-zinc-900  bg-zinc-200/70 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                        <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- reply -->
                    <div class="flex max-xs:text-[3.6vw]">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">

                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                                <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                                <div class="flex items-center text-zinc-900  transition-all duration-300">username 
                                    <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                                    <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                                    <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                                    <div class="hidden flex text-amber-500/70 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                                </div>
                                <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                                    12 Hours ago
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <div class="text-zinc-900  transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                        is it true like that? just thas all?
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                                <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                                    </div>
                                    <div class="my-2 font-work-sans text-zinc-900  transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                                    </div>
                                </div>
                                <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45">reply?</div>
                                <div class="flex justify-end flex-1 h-full">
                                    <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900  rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                        <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- reply reply -->
                    <div class="flex max-xs:text-[3.6vw]">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">

                            </div>
                        </div>
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">

                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                                <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                                <div class="flex items-center text-zinc-900  transition-all duration-300">username 
                                    <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                                    <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                                    <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                                    <div class="hidden flex text-amber-500/70 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                                </div>
                                <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                                    12 Hours ago
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <div class="text-zinc-900  transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                        ofc thats all what do you want?
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                                <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                                    </div>
                                    <div class="my-2 font-work-sans text-zinc-900  transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                                    </div>
                                </div>
                                <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45">reply?</div>
                                <div class="flex justify-end flex-1 h-full">
                                    <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900  rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                        <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                                    <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">
                                        
                                    </div>
                                </div>
                                <div class="opacity-40 hover:opacity-100 cursor-pointer font-open-sans text-[2.8vw] xs:text-[14px] duration-300 transition-all">show reply (102)...</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- reply reply -->
                    <div class="flex max-xs:text-[3.6vw]">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">

                            </div>
                        </div>
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">

                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                                <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                                <div class="flex items-center text-zinc-900  transition-all duration-300">username 
                                    <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                                    <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                                    <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                                    <div class="hidden flex text-amber-500/70 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                                </div>
                                <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                                    12 Hours ago
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <div class="text-zinc-900  transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                        no just asking
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                                <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                                    </div>
                                    <div class="my-2 font-work-sans text-zinc-900  transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                                    </div>
                                </div>
                                <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45">reply?</div>
                                <div class="flex justify-end flex-1 h-full">
                                    <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900  rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                        <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                                    </div>
                                </div>
                            </div>
                            <div class="flex hidden">
                                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                                    <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">
                                        
                                    </div>
                                </div>
                                <div class="opacity-40 hover:opacity-100 cursor-pointer font-open-sans text-[2.8vw] xs:text-[14px] duration-300 transition-all">show reply (102)...</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- reply reply reply -->
                    <div class="flex max-xs:text-[3.6vw]">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">

                            </div>
                        </div>
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">

                            </div>
                        </div>
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">

                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                                <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                                <div class="flex items-center text-zinc-900  transition-all duration-300">username 
                                    <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                                    <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                                    <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                                    <div class="hidden flex text-amber-500/70 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                                </div>
                                <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                                    12 Hours ago
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <div class="text-zinc-900  transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                        maybe he want her to get something better
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                                <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                                    </div>
                                    <div class="my-2 font-work-sans text-zinc-900  transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                                    </div>
                                </div>
                                <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45">reply?</div>
                                <div class="flex justify-end flex-1 h-full">
                                    <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900  rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                        <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- reply -->
                    <div class="flex max-xs:text-[3.6vw]">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">

                            </div>
                        </div>
                        <div class="flex-1">
                            <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                                <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                                <div class="flex items-center text-zinc-900  transition-all duration-300">username 
                                    <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                                    <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                                    <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                                    <div class="hidden flex text-amber-500/70 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                                </div>
                                <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                                    12 Hours ago
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <div class="text-zinc-900  transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                        thanks for da spiler
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                                <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                                    </div>
                                    <div class="my-2 font-work-sans text-zinc-900  transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                                    </div>
                                </div>
                                <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45">reply?</div>
                                <div class="flex justify-end flex-1 h-full">
                                    <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900  rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                        <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                                    </div>
                                </div>
                            </div>
                            <div class="flex">
                                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                                    <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">
                                        
                                    </div>
                                </div>
                                <div class="opacity-40 hover:opacity-100 cursor-pointer font-open-sans text-[2.8vw] xs:text-[14px] duration-300 transition-all">show reply (102)...</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex max-xs:text-[3.6vw]">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">
                                
                            </div>
                        </div>
                        <div class="mt-[3.2vw] mb-[1.6vw] xs:mt-4 xs:mb-2 opacity-40 font-open-sans text-[2.8vw] xs:text-[14px] hover:opacity-100 cursor-pointer duration-300 transition-all">show more reply...</div>
                    </div>

                    <!-- induk -->
                    <div class="flex max-xs:text-[3.6vw]">
                        <div class="">
                            <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                                <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                                <div class="flex items-center text-zinc-900  transition-all duration-300">username 
                                    <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                                    <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                                    <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                                    <!-- <div class="flex text-amber-500/70 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div> -->
                                </div>
                                <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                                    12 Hours ago
                                </div>
                            </div>
                            <div class="flex">
                                <div>
                                    <div class="text-zinc-900  transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">comments Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, saepe ad enim rerum doloremque labore! Odit dolorum mollitia incidunt veritatis. Voluptatem doloremque corporis sequi cumque quaerat tempore excepturi debitis aut nesciunt dolores recusandae exercitationem possimus saepe hic incidunt fuga, optio earum sit ad cupiditate velit est? Facere praesentium quod aut commodi, nisi neque saepe expedita maxime sit numquam doloribus quia tempora obcaecati sequi, repellat deserunt nulla incidunt officiis dolorem. Neque, eveniet, vero assumenda vel accusantium dignissimos aliquam nisi, quae at recusandae perspiciatis accusamus quo sunt dicta itaque distinctio voluptatibus. Eligendi eos tenetur esse voluptatum, consectetur atque est magni nemo sequi a? Modi, qui ea! Ea sint molestiae dolores dignissimos ipsam, cum voluptatem velit, voluptate obcaecati rem ullam saepe in molestias odio, labore ut.</div>
                                </div>
                            </div>
                            <div class="flex items-center mt-[1.6vw] xs:mt-3 h-[40px] space-x-[2.4vw] xs:space-x-3 mb-[3.2vw] xs:mb-4">
                                <div class="flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                                    </div>
                                    <div class="my-2 font-work-sans text-zinc-900  transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                                    <div class="group cursor-pointer">
                                        <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                        <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                                    </div>
                                </div>
                                <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 cursor-pointer bg-zinc-200/70 px-[3.2vw] xs:px-4 rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px]">reply?</div>
                                <div class="flex justify-end flex-1 h-full">
                                    <div class="cursor-pointer flex justify-center items-center hover:bg-zinc-300 aspect-square text-zinc-900  bg-zinc-200/70 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                        <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex max-xs:text-[3.6vw]">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 h-full w-[1.5px] transition-all duration-300">
                                
                            </div>
                        </div>
                        <div class="mt-[3.2vw] mb-[1.6vw] xs:mt-4 xs:mb-2 opacity-40 font-open-sans text-[2.8vw] xs:text-[14px] hover:opacity-100 cursor-pointer duration-300 transition-all">show more reply...</div>
                    </div>

                    <div class="flex justify-center w-full my-[3.2vw] xs:my-4">
                        <div class="flex items-center justify-center transition-all duration-300 hover:bg-zinc-300 cursor-not-allowed bg-zinc-200/70 px-[2.4vw] xs:px-2 h-[8vw] xs:h-[32px] rounded-[1.2vw] xs:rounded-md text-[3.6vw] xs:text-[16px] opacity-50">show more</div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>