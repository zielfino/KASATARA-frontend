<script>
    import Pagination from "$lib/components/pagination.svelte";
    import Breakline from "$lib/components/util/breakline.svelte";
    import Icon from "@iconify/svelte";

</script>
<div class="text-zinc-900">

    <!-- content -->
    <div class="grid grid-cols-12 xl:grid-cols-10 gap-2">
        <div class="col-span-8 xl:col-span-7 space-y-2">
            <div class="min-h-[300px] relative z-10">
                <div class="translate-x-[calc(150px+2rem+8px)] absolute bottom-[122px] flex space-x-2">
                    <button class="bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center h-[32px] px-2
                    outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer
                    "><Icon icon="material-symbols:add" class="text-[18px] mx-1" /><span class="text-[14px] mr-3">Favorit</span></button>
                    <button class="aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center
                    outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] mt-0.5" /></button>
                    <button class="aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center
                    outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] mt-0.5" /></button>
                    <button class="aspect-square h-[32px] bg-mainlight border border-zinc-900/15 rounded-full flex justify-center items-center
                    outline-none hover:bg-mainlight/85 focus-visible:bg-sky-200 focus-visible:border-sky-400/50 active:bg-mainlight/70 cursor-pointer"><Icon icon="material-symbols:favorite-outline-rounded" class="text-[22px] mt-0.5" /></button>
                </div>
                <div class="w-full border border-zinc-900/15 bg-mainlight rounded-2xl font-work-sans p-2 pl-6 absolute bottom-0">
                    <div class="absolute bottom-3 -translate-x-2 w-40 h-4 rounded-ful blur-md -skew-y-6 bg-zinc-900"></div>
                    <!-- <div class="aspect-[2/3] w-[150px] rounded-lg bg-cover bg-center absolute bottom-2 ring-2 ring-zinc-900/15 -skew-y-6 -translate-y-8 drop-shadow-lg drop-shadow-zinc-900/30 -translate-x-4 bg-zinc-900 overflow-hidden"><img src="https://storage.shngm.id/thumbnail/cover/f38bf1beaa3b.jpeg" alt="" class="w-full h-full opacity-20"></div> -->
                    <!-- <div class="aspect-[2/3] w-[150px] rounded-lg bg-cover bg-center absolute bottom-2 ring-2 ring-zinc-900/15 -skew-y-6 -translate-y-6 drop-shadow-lg drop-shadow-zinc-900/30 -translate-x-2 bg-zinc-900 overflow-hidden"><img src="https://storage.shngm.id/thumbnail/cover/f38bf1beaa3b.jpeg" alt="" class="w-full h-full opacity-20"></div> -->
                    <div class="aspect-[2/3] w-[150px] rounded-lg bg-cover bg-center absolute bottom-2 ring-2 ring-zinc-900/15 -skew-y-6 -translate-y-4 drop-shadow-lg drop-shadow-zinc-900/30" style={`background-image: url('https://storage.shngm.id/thumbnail/cover/f38bf1beaa3b.jpeg')`}></div>
                    <div class="z-4 w-fit flex justify-center flex-col translate-x-[calc(150px+8px)] pl-4 py-4">
                        <div class="text-[24px] font-semibold z-5 leading-[1]">Overgeared</div>
                        <div class="text-[14px] font-light z-5">Lee Dong‑Wook, Team Argo (REDICE)</div>
                        <div class="flex opacity-60">
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-fill" class="text-[14px]" /></div>
                            <div class="flex justify-center items-center"><Icon icon="mingcute:star-half-fill" class="text-[14px]" /></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-mainlight rounded-2xl space-y-2 border border-zinc-900/15 p-2">
                <div class="flex justify-between items-center text-sm font-work-sans font-[400] tracking-tight w-full">
                    <div class="flex justify-center items-center space-x-2">
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
                    <button class="mr-2 flex justify-center items-center px-2 py-1 rounded-md cursor-pointer outline-none
                    max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:ring-1 focus-visible:ring-sky-400/50 active:bg-zinc-900/9">
                        <Icon icon="solar:sort-horizontal-bold" class="-rotate-90 text-[16px] mr-1 leading-1" />
                        <div class="leading-1">Urutkan</div>
                    </button>
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
                            <div class="text-[16px] font-bold line-clamp-1">Judul Chapter {148-n}</div>
                            <div class="space-x-1 flex justify-center items-center mt-2">
                                <div class="text-[12px] text-zinc-500/50 line-clamp-1">{30-n} Feb 2025</div>
                                <div class="bg-amber-400 text-mainlight border-amber-600 border px-1 rounded-md text-[10px] leading-[1.5]">Paid</div>
                                <div class="bg-emerald-400 text-mainlight border-emerald-600 border px-1 rounded-md text-[10px] leading-[1.5]">Up</div>
                            </div>
                        </div>
                        <div class="text-[16px] flex justify-center items-center">#{148-n}</div>
                    </button>
                {/each}
                {#each Array.from({ length: 7 }, (_, i) => i + 1) as n}
                    <button class={`flex items-center justify-between bg-mainlight rounded-md border border-zinc-900/15 outline-none overflow-hidden
                    w-full hover:bg-zinc-200/80 cursor-pointer gap-[2.4vw] pr-[4.8vw] xs:pr-8 xs:gap-4 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 
                    h-[24vw] xs:h-[96px] md:h-[95px] lg:h-[95px] xl:h-[98.1px]`}>
                        <div class="font-bold 
                        text-[4.8vw] xs:text-[20px] md:text-[20px] aspect-[5/5] bg-cover h-full relative"
                        style={`background-image: url('https://i.imgur.com/HHe6hQi.png')`}>
                        </div>
                        <div class="flex-1 flex flex-col items-start leading-[1.4] text-[2.8vw] xs:text-[14px] md:text-[12px] xl:text-[14px] text-left capitalize">
                            <!-- <div class={genreColor(item.genre[0])}>{item.genre[0]}</div> -->
                            <div class="text-[16px] font-bold line-clamp-1">Judul Chapter {148-n-3}</div>
                            <div class="space-x-1 flex justify-center items-center mt-2">
                                <div class="text-[12px] text-zinc-500/50 line-clamp-1">{30-n-3} Feb 2025</div>
                                <div class="text-gray-600 border-gray-400 border px-1 rounded-md text-[10px] leading-[1.5]">Free</div>
                            </div>
                        </div>
                        <div class="text-[16px] flex justify-center items-center">#{148-n-3}</div>
                    </button>
                {/each}
                <Pagination totalPages={5} initialPage={1} />
            </div>
        </div>

        <div class="bg-mainlight rounded-2xl border border-zinc-900/15 col-span-4 xl:col-span-3
        flex flex-col justify-start items-center relative overflow-hidden h-fit text-[12px]
        text-center mt-[190px]">
            <div class="hidden">
            <div style={`background-image: url('https://i.imgur.com/HHe6hQi.png')`} class="bg-cover bg-center w-full aspect-[4/5] absolute -translate-y-2 scale-105
            mask-b-from-0 mask-b-to-100 blur-sm opacity-50"></div>
            <div class="z-4 mt-12 mb-8">
                <div class="bg-red-300 aspect-[2/3] w-[150px] rounded-lg bg-cover bg-center" style={`background-image: url('https://i.imgur.com/HHe6hQi.png')`}></div>
                <div class="text-[18px] font-semibold mt-4">Overgeared</div>
                <div class="text-[12px] font-light">Lee Dong‑Wook, <br> Team Argo (REDICE)</div>
            </div>
            
            </div>

            <div class="w-full flex justify-around items-center text-[12px] pl-6 pr-8 mt-8">
                <div class="flex justify-center items-center group"><Icon icon="mingcute:bookmark-line" class="text-[18px] mr-1 group-hover:hidden" /> <Icon icon="mingcute:bookmark-fill" class="text-[18px] mr-1 hidden group-hover:block" />1.2M</div>
                <div class="flex justify-center items-center group"><Icon icon="mingcute:eye-line" class="text-[18px] mr-1 group-hover:hidden" /><Icon icon="mingcute:eye-close-line" class="text-[18px] mr-1 hidden group-hover:block" />65.7M</div>
                <div class="flex justify-center items-center group"><Icon icon="mingcute:emoji-line" class="text-[18px] mr-1 group-hover:hidden" /><Icon icon="mingcute:emoji-2-line" class="text-[18px] mr-1 hidden group-hover:block" />34.2M</div>
                <!-- <div class="flex justify-center items-center"><Icon icon="mingcute:comment-2-line" class="text-[18px] mr-1" />200K</div> -->
            </div>

            <!-- <div class="w-[80%] flex justify-around items-center text-[12px] px-8 mt-4"> -->
                <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:like" class="text-[18px] mr-1" />1.2M</div> -->
                <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:star" class="text-[18px] mr-1" />1.2M</div> -->
                <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:thumbs-up" class="text-[18px] mr-1" />test</div> -->
            <!-- </div> -->

            <div class="w-[90%] flex justify-around items-center text-[12px] px-8 mt-4">
                <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:like" class="text-[18px] mr-1" />1.2M</div> -->
                <div class="flex justify-center items-center"><Icon icon="mingcute:book-2-line" class="text-[18px] mr-1" />Komik</div>
                <!-- <div class="flex justify-center items-center"><Icon icon="mingcute:clapperboard-line" class="text-[18px] mr-1" />Komik</div> -->
                <div class="flex justify-center items-center"><Icon icon="mingcute:clapperboard-line" class="text-[18px] mr-1" />Fantasy, Comedy</div>
                <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:thumbs-up" class="text-[18px] mr-1" />test</div> -->

            </div>
            <div class="border-zinc-300 border w-[90%] my-4"></div>

            <p class="px-2text-[12px] text-justify indent-4 px-4 line-clamp-15">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique perspiciatis non, neque, nesciunt possimus ipsam eveniet, repudiandae a fugiat enim dicta obcaecati itaque praesentium sint aspernatur tempora dolorem necessitatibus quae molestiae debitis sapiente placeat suscipit minus dolor. Minima accusantium ad amet hic magni, alias error modi odio repellendus illum harum voluptates animi tempore. At odit, temporibus magnam eos soluta ad inventore recusandae nesciunt culpa exercitationem minima perferendis ratione maxime, vero, aspernatur reiciendis eius sed pariatur adipisci saepe. Libero, id ipsam. Eveniet, velit deleniti aperiam et maxime, eum fuga quis ipsa quia accusantium, maiores accusamus aliquam modi ipsam cum magni praesentium. ipsum dolor sit amet consectetur adipisicing elit. Porro consequatur dignissimos perferendis excepturi quia iure numquam exercitationem voluptates ut id nobis voluptatibus amet ab vero, laborum error eos culpa sunt velit, est adipisci placeat perspiciatis? Natus expedita ad debitis eius ipsum, esse non suscipit voluptatum a explicabo voluptatibus facilis illum corporis, accusamus doloremque exercitationem repellat at, cum placeat. Sequi eos iure molestiae, voluptatem cum hic minus vitae minima quam saepe vero quis, ab expedita recusandae numquam. Eligendi natus quasi quidem. Doloremque quasi assumenda, repudiandae explicabo voluptate autem voluptatem aperiam suscipit excepturi, velit cumque quae debitis porro, perferendis ex ea eligendi?</p>
            
            <div class="border-zinc-300 border w-[90%] my-4"></div>
            
            <div class="w-full px-4 uppercase">
                <div class="w-full px-4 py-5 rounded-lg font-work-sans cursor-pointer
                border-2 border-purple-600 hover:bg-mainlight hover:text-purple-600
                bg-purple-600 text-mainlight transition text-[12px]">baca eps pertama</div>
            </div>

            <div class="w-full p-4 pt-2 space-y-2">
                <div class="w-full rounded-lg text-[12px] font-work-sans
                border border-zinc-900/30
                bg-mainlight text-zinc-600 transition flex justify-between items-center">
                    <div class="ml-4">
                        <span>Baca Novel</span>
                        <span class="opacity-50">372 Chap</span>
                    </div>
                    <div class="px-3 py-1 bg-zinc-900 rounded-full text-mainlight text-[14px] hover:bg-zinc-600 m-2 cursor-pointer">Baca</div>
                </div>
                <div class="w-full rounded-lg text-[12px] font-work-sans
                border border-zinc-900/30
                bg-mainlight text-zinc-600 transition flex justify-between items-center">
                    <div class="ml-4">
                        <span>Tiket Gratis</span>
                        <span class="opacity-50">1 Chap</span>
                    </div>
                    <div class="px-3 py-1 bg-zinc-900 rounded-full text-mainlight text-[14px] hover:bg-zinc-600 m-2 cursor-pointer">Claim</div>
                </div>
            </div>
        </div>

    </div>
</div>