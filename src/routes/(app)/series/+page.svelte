<script>
    import Pagination from "$lib/components/pagination.svelte";
    import SeriesSidebar from "$lib/components/SeriesSidebar.svelte";
    import Breakline from "$lib/components/util/breakline.svelte";
    import Icon from "@iconify/svelte";

</script>
<div class="text-zinc-900 max-xs:px-[1.6vw]">

    <!-- content -->
    <div class="grid grid-cols-12 xl:grid-cols-10 gap-2">

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
                        <SeriesSidebar />
                    </div>
                    
                    <div class="absolute flex xs:space-x-2 space-x-[1.6vw] lg:space-x-0
                    right-0 lg:left-[calc(175px+1.25rem)] lg:-top-[calc(32px+0.7rem)] -top-[7.6vw] xs:-top-[calc(28px+0.5rem)] sm:-top-[calc(32px+0.5rem)] ">
                        <button class="lg:order-1 lg:ml-2 aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center max-sm:h-[28px] max-xs:h-[5.6vw]
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] max-xs:text-[3.6vw] max-sm:text-[18px] mt-0.5 max-xs:mt-[0.4vw]" /></button>
                        <button class="bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center h-[32px] max-xs:h-[5.6vw] px-2 max-xs:px-[0.8vw] max-sm:px-1 max-sm:h-[28px]
                        outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer group
                        ">
                        <!-- <Icon icon="material-symbols:add" class="text-[18px] max-sm:text-[14px] max-xs:text-[2.8vw] mx-1 max-xs:mx-[0.8vw]" /> -->
                        <Icon icon="mingcute:bookmark-line" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] group-hover:hidden mx-1 max-xs:mx-[0.8vw]" /> <Icon icon="mingcute:bookmark-fill" class="text-[12px] min-[700px]:text-[14px] max-xs:text-[2.8vw] mr-1 max-xs:mr-[0.8vw] hidden group-hover:block  mx-1 max-xs:mx-[0.8vw]" />
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
                    <div class="z-4 w-fit max-w-[calc(100%-(150px+8px))] max-xs:max-w-[calc(100%-(25vw+1.6vw))] flex justify-center flex-col translate-x-[calc(150px+8px)] max-xs:translate-x-[calc(25vw+1.6vw)] pl-4 py-4 max-xs:pl-[3.2vw] max-xs:py-[3.2vw]">
                        <div class="text-[26px] font-semibold z-5 leading-[1] max-xs:text-[5.2vw] line-clamp-2 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nihil saepe, aliquid officia doloremque alias.</div>
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
            <div class="max-lg:col-span-12 max-lg:flex">

                <div class="max-lg:w-[40%] min-w-[300px] lg:hidden space-y-2 max-[800px]:hidden max-md:mr-2 order-1">
                    <SeriesSidebar />
                </div>
            
                <div class="bg-mainlight rounded-2xl max-xs:rounded-[2.4vw] space-y-2 max-xs:space-y-[1.6vw] border border-zinc-900/15 p-2 max-xs:p-[1.6vw] max-md:order-2 max-lg:w-[60%] max-lg:mr-2 max-md:m-0 max-md:w-full">
                    <div class="flex justify-between items-center text-sm font-work-sans font-[400] tracking-tight w-full">
                        <div class="flex justify-center items-center space-x-2 max-xs:space-x-[1.6vw]">
                            <button
                            disabled
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw] font-work-sans
                                text-mainlight bg-zinc-900`}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    Chapter
                                </span>
                            </button>
                            <button
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw] font-work-sans
                                max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer`}>
                                <span class="max-xs:mx-[3.2vw] mx-4">
                                    Info
                                </span>
                            </button>
                            <button
                            class={`  
                                flex justify-center items-center
                                max-xs:py-[0.8vw] py-1 
                                text-nowrap rounded-full
                                border border-zinc-900/15
                                outline-none 
                                max-xs:text-[2.8vw]
                                max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer`}>
                                <!-- ICON -->
                                <!-- {#if tag.icon}
                                    <Icon icon={tag.icon} class={`
                                        max-xs:ml-[1.6vw] max-xs:mr-[0.8vw] ml-2 mr-1
                                        ${tag.label === heroFilter ? 
                                        tag.color : 
                                        ''}
                                    `} />
                                {/if} -->
                                <!-- LABEL -->
                                <!-- <span class={`${tag.icon ? 'max-xs:mr-[3.2vw] mr-4' : 'max-xs:mx-[3.2vw] mx-4'}`}> -->
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
                                            <div class="text-[2.4vw] xs:text-[14px]">Berbayar</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-pointer hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Gratis</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-pointer hover:bg-zinc-900/15 rounded-md">
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
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-pointer hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Terlama</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-pointer hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Reaksi</div>
                                        </button>
                                        <button class="w-full flex space-x-2 max-xs:space-x-[1.6vw] p-1 max-xs:p-[0.8vw] items-center cursor-pointer hover:bg-zinc-900/15 rounded-md">
                                            <Icon icon="ci:checkbox-unchecked" class="text-[18px] max-xs:text-[3.6vw]" />
                                            <div class="text-[2.4vw] xs:text-[14px]">Komentar</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {#each Array.from({ length: 3 }, (_, i) => i + 1) as n}
                        <button class={`flex items-center justify-between bg-mainlight rounded-md border border-zinc-900/15 outline-none overflow-hidden
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
                        <button class={`flex items-center justify-between bg-mainlight rounded-md border border-zinc-900/15 outline-none overflow-hidden
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
                    <Pagination ison={'both'}  totalPages={5} initialPage={1} />
                </div>

            </div>
        </div>

        <div class="col-span-12 xl:col-span-10 bg-mainlight rounded-2xl border border-zinc-900/15 order-3
        flex flex-col justify-start items-center relative overflow-hidden h-fit text-[12px]">
            <div class="my-4 text-center">komen</div>
        </div>

    </div>
</div>