<script lang="ts">
    import LeaderboardSwitch from '$lib/components/leaderboardSwitch.svelte';
    import Linker from '$lib/components/linker.svelte';
    import MainContenSwitch from '$lib/components/mainContenSwitch.svelte';
    import Breakline from '$lib/components/util/breakline.svelte';
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';


    type Bacaan = {
        id: number;
        title: string;
        chapter: number;
        author: string;
        genre: string;
    };

    let bacaan: Bacaan[] = [
        { id: 1, title: 'Mounth Hua Sect', chapter: 300, author: 'Tan Feli', genre: 'comedy' },
        { id: 2, title: 'Nobleese', chapter: 150, author: 'Tan Feli', genre: 'horror' },
        { id: 3, title: 'Damn Reincarnation', chapter: 100, author: 'Tan Feli', genre: 'drama' },
        { id: 4, title: 'Tower of God', chapter: 200, author: 'Tan Feli', genre: 'fantasy' },
        { id: 5, title: 'The God of Highscholl', chapter: 400, author: 'Tan Feli', genre: 'fantasy' },
        { id: 6, title: 'Girls of The Wild', chapter: 40, author: 'Tan Feli', genre: 'romance' },
        { id: 7, title: 'Eleceed', chapter: 20, author: 'Tan Feli', genre: 'fantasy' }
    ];

    const genreClass: Record<string, string> = {
        fantasy: 'text-purple-500',
        romance: 'text-pink-500',
        comedy: 'text-amber-500',
        'slice of life': 'text-sky-500',
        drama: 'text-emerald-500',
        horror: 'text-red-500'
    };

    function genreColor(genre: string): string {
        return genreClass[genre] || 'text-gray-500';
    }

    const [first] = bacaan;

    const desktop = writable(false);
    const desktopex = writable(false);
    const desktoplarge = writable(false);

    onMount(() => {
        const update = () => {
            desktop.set(window.innerWidth >= 900);
            desktopex.set(window.innerWidth >= 1300);
            desktoplarge.set(window.innerWidth >= 1100);
        };

        update(); // Initial check
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    });



    // history
    let historyShow: boolean = false;
    function handleScroll() {
        historyShow = false;
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);

        // onDestroy(() => {
        // window.removeEventListener('scroll', handleScroll);
        // });
    });


    // SLIDER
	import { fade } from 'svelte/transition';
	let currentSlide = 0;
	const totalSlides = 4; // Jumlah slide yang tersedia

	function nextSlide() {
		currentSlide = (currentSlide + 1) % totalSlides;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
	}

	function goToSlide(index: number) {
		currentSlide = index;
	}
</script>

<svelte:head>
    <!-- BASIC SEO -->
        <title>KASATARA - Beranda</title>
        <meta name="description" content="BacaKomik adalah platform untuk membaca komik dan novel digital secara gratis dan legal." />
        <meta name="keywords" content="komik, baca komik online, novel, webtoon, manga gratis, baca novel" />
        <!-- <meta name="author" content="BacaKomik Team" /> -->
        <meta name="robots" content="index, follow" />
        <meta charset="UTF-8" />
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0" /> -->

    <!-- OPEN GRAPH (untuk Facebook & LinkedIn) -->
        <meta property="og:title" content="BacaKomik - Platform Komik & Novel Gratis" />
        <meta property="og:description" content="Nikmati berbagai judul komik dan novel terbaru hanya di BacaKomik." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bacakomik.com/" />
        <meta property="og:image" content="https://bacakomik.com/og-image.jpg" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="BacaKomik" />

    <!-- TWITTER CARD -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BacaKomik - Platform Komik & Novel Gratis" />
        <meta name="twitter:description" content="Nikmati berbagai judul komik dan novel terbaru hanya di BacaKomik." />
        <meta name="twitter:image" content="https://bacakomik.com/og-image.jpg" />
        <meta name="twitter:site" content="@bacakomik" />
        <meta name="twitter:creator" content="@bacakomik" />

    <!-- FAVICON -->
        <!-- <link rel="icon" href="/favicon.ico" /> -->
</svelte:head>

<section>


    <!-- H I S T O R Y -->
    <div tabindex="-1" class={`group fixed h-screen z-[100] transition-all right-0 top-0 duration-300 ease-in-out
            ${historyShow
            ? '-translate-x-[320px]'
            : 'hover:-translate-x-4 focus-within:-translate-x-4'}
        `}>
        <div class="relative">
            <button on:click={(e) => { historyShow = !historyShow }} class="fixed z-[101] translate-x-[2px] md:block top-[calc(100%/3)] right-0 bg-mainlight text-[14px] font-work-sans rounded-l-xl cursor-pointer 
            border-2 border-r-0 border-zinc-400 hidden
            peer focus:outline-none focus:border-sky-500">
                <div class="flex my-3 mt-4 [writing-mode:vertical-lr]"><div>Riwayat Bacaan</div> <Icon icon="material-symbols:arrow-back-ios-new-rounded" class={`text-xl mx-3 transition-transform ${historyShow ? 'rotate-180' : ''}`} /></div>
            </button>
            <div tabindex="-1"
            class={`
                fixed z-[100] w-[320px] right-0 translate-y-32 translate-x-full
                h-[75dvh] bg-mainlight border-2 rounded-l-xl border-r-0 border-zinc-400
                p-3 focus:outline-none overflow-y-scroll
                peer-focus:outline-none peer-focus:border-sky-500
                ${historyShow
                ? 'shadow-2xl shadow-zinc-900/50'
                : 'group-focus-within:shadow-2xl group-focus-within:shadow-zinc-900/50 group-hover:shadow-2xl group-hover:shadow-zinc-900/50'}
            `}>
        <!-- <div class={`
            fixed z-[100] w-[320px] right-0 translate-y-32
            transition-transform duration-500 ease-in-out
            ${historyShow ? 'translate-x-0 pointer-events-auto' : 'translate-x-full group-hover:translate-x-[calc(100%-16px)] group-focus-within:translate-x-[calc(100%-16px)]'}
            `}>
                <div tabindex="-1" class={`
                h-[75dvh] bg-mainlight border-2 rounded-l-xl border-r-0 border-zinc-400 transition-shadow group-focus-within:border-sky-500
                p-3 focus:outline-none overflow-y-scroll
                ${historyShow ? 'shadow-2xl shadow-zinc-900/50' : 'group-focus-within:shadow-2xl group-focus-within:shadow-zinc-900/50 group-hover:shadow-2xl group-hover:shadow-zinc-900/50'}
                `}> -->
                    <!-- <div class=" overflow-y-scroll w-full h-full mask-b-from-[90%] mask-b-to-100% mask-t-from-[90%] mask-t-to-100%"> -->
                        <div class="space-y-2">
                            <!-- <div class="h-4"></div> -->
                            {#each Array.from({ length: 10 }, (_, i) => i + 1) as n}
                                <!-- <li>{n}</li> -->
                                <div class="flex justify-center items-center">
                                    <div class="bg-emerald-400 rounded-lg h-[60px] aspect-square mr-2"></div>
                                    <div class="w-full flex justify-between items-center">
                                        <div>
                                            <div class="leading-[1.2] text-[16px] text-zinc-900 capitalize">judul bacaan</div>
                                            <div class="leading-none text-[12px] text-zinc-900/40 tracking-tight">terakhir dibaca 32 Feb 2025</div>
                                        </div>
                                        <div>#{n}</div>
                                    </div>
                                </div>
                            {/each}
                            <!-- <div class="h-6"></div> -->
                        </div>
                    <!-- </div> -->
                <!-- </div> -->
            </div>
        </div>
    </div>


    <!-- H E R O    S E C T I O N -->
        <!-- Slider Mobile -->
        {#if !$desktoplarge}
            <section class="w-full flex justify-center bg-stone-500 md:landscape:hidden">
                <div class="w-full max-w-[500px] 
                aspect-square bg-mainred text-zinc-900 relative">
                    <div class="flex justify-center items-center w-full h-full">
                        SLIDER MOBILE
                    </div>
                </div>
            </section>
        {/if}
        {#if $desktop}
            <section class="w-full flex justify-center bg-stone-500 max-lg:portrait:hidden">
                <div class="h-[350px] lg:h-[430px] xl:h-[500px] aspect-[5/2] flex justify-center items-center relative">
                    <img src="https://i.imgur.com/JEeO6Yw.png" alt="banner" class="h-full absolute left-0">
                    <img src="https://i.imgur.com/Jd9blRa.png" alt="" class="h-[37%] right-[calc(12%/2)] top-[calc((100%-81%)/2)] absolute">
                    <img src="https://i.imgur.com/UaoxPIJ.png" alt="" class="h-[50%] right-[calc(12%/2)] bottom-[calc((100%-81%)/2)] absolute">
                    <div class="absolute left-[calc(12%/2)] trapezoid hover:bg-emerald-500 h-[calc(100%-(100%-81%))] w-[62%]  top-[calc((100%-81%)/2)] bottom-[calc((100%-81%)/2)] bg-red-500/30">test</div>
                    <div class="absolute right-[calc(12%/2)] h-[calc(37%)] hover:bg-emerald-500 w-[30.7%] top-[calc((100%-81%)/2)] bg-red-500/30 bannertr"></div>
                    <div class="absolute right-[calc(12%/2)] h-[calc(50%)] hover:bg-emerald-500 w-[28%] bottom-[calc((100%-81%)/2)] bg-red-500/30 bannertb"></div>
                </div> 
            </section>
        {/if}

    <!-- C O N T E N T -->
        <!-- Konten Utama -->
        <section class="flex flex-col justify-center items-center min-[900px]:bg-stone-200">
            <!-- Tombol Rekomendasi -->
             
            {#if !$desktop}
                <Linker 
                    title="Rekomendasi Hari Ini"
                    link="todays"
                />
            {/if}

            <!-- Switch Komik Novel -->
             <MainContenSwitch/>

            <!-- Bacaan Rekomendasi -->
            <div class="grid grid-cols-3 w-full max-w-[770px] 
            xs:my-[5vw] xs:px-[5vw] xs:gap-[8px] md:my-[20px]
            md:grid-cols-4 lg:w-[946px] lg:max-w-[100%] md:p-0
            lg:grid-cols-5 xl:w-[1100px]" style="direction:rtl">
                <div class="col-span-2 row-span-2 aspect-[1/1] bg-mainlight flex justify-center items-center relative p-3" style="direction:ltr">
                    <div class="absolute top-0 right-0 w-8 h-8 bg-emerald-500 text-[12px] font-[700] rounded-es-full text-right pt-1 pr-1 text-mainlight z-10">UP</div>
                    <div class="bg-black absolute top-0 left-0 w-full h-full z-[1] opacity-60"
                    style="
                        mask-image: linear-gradient(to bottom, black 0%, transparent 40%, transparent 60%, black 100%);
                        -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 40%, transparent 60%, black 100%);
                    ">
                        test
                    </div>
                    <div class="absolute w-full h-full top-0 left-0 bg-purple-600 z-10 opacity-0 hover:opacity-100 transition-opacity">
                        <div class="absolute top-0 left-0 p-3">
                            <h3 class="text-left font-semibold text-[24px] line-clamp-1 text-mainlight">OVERGEARED</h3>
                            <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                            <h4 class="flex items-center text-[12px] text-mainlight text-justify line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sunt voluptates, dodos dolorem dignissimos minus dolor.</h4>
                        </div>
                        <div class="absolute flex bottom-0 left-0 p-3">
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full text-purple-600 font-[600] flex items-center mr-1"><Icon icon="fa6-solid:copy" class="mr-1" /> 150</span>
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full text-purple-600 font-[600] flex items-center"><Icon icon="fa6-solid:star" class="mr-1" /> 4.7/5</span>
                        </div>
                        <div class="absolute bottom-0 right-0 bg-mainlight text-[16px] rounded-ss-xl px-2.5 py-1 text-purple-600 z-20 cursor-pointer">BACA</div>
                    </div>
                    <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center" style="background-image: url('https://i.imgur.com/HHe6hQi.png');"></div>
                    <div class="relative w-full h-full z-[2]">
                        <div class="absolute top-0 left-0 w-3/4">
                            <h3 class="text-left font-semibold text-[24px] line-clamp-3 text-mainlight">OVERGEARED</h3>
                            <h4 class="flex items-center text-[16px] text-emerald-400"><Icon icon="fa6-solid:heart" class="mr-1" />1.3K</h4>
                        </div>
                        <div class="absolute bottom-0 left-0">
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full border-purple-600 border-2 text-purple-600 font-[600]">GENRE</span>
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full border-purple-600 border-2 text-purple-600 font-[600]">KOMIK</span>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 md:h-[186.5px] lg:h-full w-full max-md:order-1 bg-mainlight flex justify-center items-center relative p-3" style="direction:ltr">
                    <div class="absolute top-0 right-0 w-12 h-9 bg-zinc-900 text-[14px] font-[700] rounded-es-full text-right pt-1 pr-1 text-amber-300 z-10 font-caveat"><div class="-translate-x-1">NEW</div></div>
                    <div class="absolute w-full h-full top-0 left-0 bg-purple-600 z-10 opacity-0 hover:opacity-100 transition-opacity">
                        <div class="absolute top-0 left-0 p-3">
                            <h3 class="text-left font-semibold line-clamp-1 text-mainlight">The Greatest Estate Developer</h3>
                            <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                            <h4 class="flex items-center text-[12px] text-mainlight text-justify line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sunt voluptates, dodos dolorem dignissimos minus dolor.</h4>
                        </div>
                        <div class="absolute flex bottom-0 left-0 p-3">
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full text-purple-600 font-[600] flex items-center mr-1"><Icon icon="fa6-solid:copy" class="mr-1" /> 150</span>
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full text-purple-600 font-[600] flex items-center"><Icon icon="fa6-solid:star" class="mr-1" /> 4.7/5</span>
                        </div>
                        <div class="absolute bottom-0 right-0 bg-mainlight text-[16px] rounded-ss-xl px-2.5 py-1 text-purple-600 z-20 cursor-pointer">BACA</div>
                    </div>
                    <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center" style="background-image: url('https://i.imgur.com/vQVhakk.png');"></div>
                    <div class="relative w-full h-full">
                        <div class="absolute top-0 left-0 w-3/4">
                            <h3 class="text-left font-semibold line-clamp-3">The Greatest Estate Developer</h3>
                            <h4 class="flex items-center text-[14px] text-emerald-600"><Icon icon="fa6-solid:heart" class="mr-1" />1.3K</h4>
                        </div>
                        <div class="absolute bottom-0 left-0">
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full border-purple-600 border-2 text-purple-600 font-[600]">GENRE</span>
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full border-purple-600 border-2 text-purple-600 font-[600]">KOMIK</span>
                        </div>
                    </div>
                </div>
                <div class="col-span-1 aspect-[1/1] bg-mainlight flex justify-center items-center relative p-3" style="direction:ltr">
                    <div class="absolute top-0 right-0 w-8 h-8 bg-emerald-500 text-[12px] font-[700] rounded-es-full text-right pt-1 pr-1 text-mainlight z-10">UP</div>
                    <div class="absolute w-full h-full top-0 left-0 bg-purple-600 z-10 opacity-0 hover:opacity-100 transition-opacity">
                        <div class="absolute top-0 left-0 p-3">
                            <h3 class="text-left font-semibold line-clamp-1 text-mainlight">Return Of The Mount Hua Sect</h3>
                            <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                            <h4 class="flex items-center text-[12px] text-mainlight text-justify line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sunt voluptates, dodos dolorem dignissimos minus dolor.</h4>
                        </div>
                        <div class="absolute flex bottom-0 left-0 p-3">
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full text-purple-600 font-[600] flex items-center mr-1"><Icon icon="fa6-solid:copy" class="mr-1" /> 150</span>
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full text-purple-600 font-[600] flex items-center"><Icon icon="fa6-solid:star" class="mr-1" /> 4.7/5</span>
                        </div>
                        <div class="absolute bottom-0 right-0 bg-mainlight text-[16px] rounded-ss-xl px-2.5 py-1 text-purple-600 z-20 cursor-pointer">BACA</div>
                    </div>
                    <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center" style="background-image: url('https://i.imgur.com/kyLUJIS.png');"></div>
                    <div class="relative w-full h-full">
                        <div class="absolute top-0 left-0 w-3/4">
                            <h3 class="text-left font-semibold line-clamp-3">Return Of The Mount Hua Sect</h3>
                            <h4 class="flex items-center text-[14px] text-emerald-600"><Icon icon="fa6-solid:heart" class="mr-1" />1.3K</h4>
                        </div>
                        <div class="absolute bottom-0 left-0">
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full border-purple-600 border-2 text-purple-600 font-[600]">GENRE</span>
                            <span class="text-[10px] bg-mainlight py-0.5 px-1.5 rounded-full border-purple-600 border-2 text-purple-600 font-[600]">KOMIK</span>
                        </div>
                    </div>
                </div>
                <div class="col-span-1 aspect-[1/1] bg-amber-500 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-sky-500 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-emerald-300 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-emerald-200 flex justify-center items-center"></div>
                {#if $desktoplarge}
                    <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center"></div>
                    <div class="col-span-2 w-full bg-emerald-300 flex justify-center items-center"></div>
                {/if}
            </div>
        </section>


        <!-- Berita Terbaru -->
        <section>
            <div>
                <div class="w-full flex justify-center bg-stone-200">
                    <a href="/news" class="w-full font-semibold flex justify-between items-center 
                    px-[3.2vw] py-[2.8vw] xs:px-[16px] xs:py-[14px]
                    text-mainlight bg-mainred md:rounded-[16px] md:px-6
                    md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px]">
                        <div class="flex items-center space-x-[1vw] xs:space-x-[5px]">
                            <div class="text-[3.6vw] xs:text-[18px] uppercase font-bold tracking-tight">PENGUMUMAN</div>
                            <div><Icon icon="material-symbols:arrow-forward-ios" class="text-[3.6vw] xs:text-[18px]" /></div>
                            <p class=" text-[2.8vw] xs:text-[16px] line-clamp-1 mr-[2vw] xs:mr-[10px]">Fitur baru dapakatkan koin dari menonton iklan baru</p>
                        </div>
                        <div class="text-[2.8vw] xs:text-[16px] text-stone-300/80 text-nowrap">32 Feb 2025</div>
                    </a>
                </div>
            </div>
        </section>

        {#if $desktop}
            <!-- <section class="w-full flex justify-center py-16 bg-stone-200">
                <div class="w-full max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] flex flex-col items-center justify-center relative">
                    <div class="w-min text-nowrap">
                        <Linker 
                        title="Terbaru Dari Kita"
                        link="latest"
                        />
                    </div>
                    <div class="w-full flex overflow-scroll overflow-scroll-hidden">
                        {#each [1, 2, 3, 4] as item}
                            <div class="grid grid-cols-4 min-w-[770px] lg:min-w-[946px] mr-[8px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5" style="direction: rtl;">
                                <div class="col-span-2 md:h-[186.5px] lg:h-full w-full bg-emerald-600 flex justify-center items-center"></div>
                                <div class="col-span-1 aspect-[1/1] bg-emerald-300 flex justify-center items-center"></div>
                                <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center"></div>
                                {#if $desktoplarge}
                                    <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center"></div>
                                {/if}
                            </div>
                        {/each}
                    </div>
                    <div class="flex justify-center items-center space-x-4 mt-4">
                        <div class="h-3 aspect-square rounded-full bg-black"></div>
                        <div class="h-3 aspect-square rounded-full bg-black/30"></div>
                        <div class="h-3 aspect-square rounded-full bg-black/30"></div>
                        <div class="h-3 aspect-square rounded-full bg-black/30"></div>
                    </div>
                    <div class="absolute h-full flex items-center -left-[5%]">
                        <Icon icon="material-symbols:arrow-back-ios-rounded" class="text-3xl" />
                    </div>
                    <div class="absolute h-full flex items-center -right-[5%]">
                        <Icon icon="material-symbols:arrow-forward-ios-rounded" class="text-3xl" />
                    </div>
                </div>
            </section> -->

            <section class="w-full flex justify-center py-16 bg-stone-200">
                <div class="w-full max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] flex flex-col items-center justify-center relative">

                    <!-- Title -->
                    <div class="w-min text-nowrap">
                        <Linker title="Terbaru Dari Kita" link="latest" />
                    </div>

                    <!-- Slider -->
                    <div class="w-full relative min-h-[calc(770px/5)] lg:min-h-[calc(946px/5)] xl:min-h-[calc(1100px/5)]">
                        {#each Array(totalSlides) as _, i (i)}
                            {#if i === currentSlide}
                                <div transition:fade class="absolute top-0 left-0 w-full flex justify-center overflow-hidden">
                                    {#if i === 0}
                                        <div class="grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5" style="direction: rtl;">
                                            <div class="col-span-2 md:h-[186.5px] lg:h-full w-full bg-emerald-600 flex justify-center items-center">
                                                Slide 1 - A
                                            </div>
                                            <div class="col-span-1 aspect-[1/1] bg-emerald-300 flex justify-center items-center">B</div>
                                            <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center">C</div>
                                            {#if $desktoplarge}
                                                <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center">D</div>
                                            {/if}
                                        </div>
                                    {:else if i === 1}
                                        <div class="grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5" style="direction: rtl;">
                                            <div class="col-span-2 md:h-[186.5px] lg:h-full w-full bg-fuchsia-600 flex justify-center items-center">
                                                Slide 2 - A
                                            </div>
                                            <div class="col-span-1 aspect-[1/1] bg-fuchsia-300 flex justify-center items-center">B</div>
                                            <div class="col-span-1 aspect-[1/1] bg-fuchsia-400 flex justify-center items-center">C</div>
                                            {#if $desktoplarge}
                                                <div class="col-span-1 aspect-[1/1] bg-fuchsia-400 flex justify-center items-center">D</div>
                                            {/if}
                                        </div>
                                    {:else if i === 2}
                                        <div class="grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5" style="direction: rtl;">
                                            <div class="col-span-2 md:h-[186.5px] lg:h-full w-full bg-sky-600 flex justify-center items-center">
                                                Slide 3 - A
                                            </div>
                                            <div class="col-span-1 aspect-[1/1] bg-sky-300 flex justify-center items-center">B</div>
                                            <div class="col-span-1 aspect-[1/1] bg-sky-400 flex justify-center items-center">C</div>
                                            {#if $desktoplarge}
                                                <div class="col-span-1 aspect-[1/1] bg-sky-400 flex justify-center items-center">D</div>
                                            {/if}
                                        </div>
                                    {:else if i === 3}
                                        <div class="grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5" style="direction: rtl;">
                                            <div class="col-span-2 md:h-[186.5px] lg:h-full w-full bg-cyan-600 flex justify-center items-center">
                                                Slide 4 - A
                                            </div>
                                            <div class="col-span-1 aspect-[1/1] bg-cyan-300 flex justify-center items-center">B</div>
                                            <div class="col-span-1 aspect-[1/1] bg-cyan-400 flex justify-center items-center">C</div>
                                            {#if $desktoplarge}
                                                <div class="col-span-1 aspect-[1/1] bg-cyan-400 flex justify-center items-center">D</div>
                                            {/if}
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        {/each}
                    </div>


                    <!-- Navigation Buttons -->
                    <div class="absolute h-full flex items-center -left-[5%]">
                        <button class="cursor-pointer" on:click={prevSlide}>
                            <Icon icon="material-symbols:arrow-back-ios-rounded" class="text-3xl text-stone-400" />
                        </button>
                    </div>
                    <div class="absolute h-full flex items-center -right-[5%]">
                        <button class="cursor-pointer" on:click={nextSlide}>
                            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="text-3xl text-stone-400" />
                        </button>
                    </div>


                    <!-- Dots -->
                    <div class="flex justify-center items-center space-x-4 mt-4">
                        {#each Array(totalSlides) as _, i (i)}
                            <button
                                aria-label={`Pindah ke slide ${i + 1}`}
                                tabindex="0"
                                on:click={() => goToSlide(i)}
                                class={`h-3 aspect-square rounded-full cursor-pointer ${i === currentSlide ? 'bg-zinc-900' : 'bg-stone-400'}`}
                            ></button>
                        {/each}
                    </div>

                </div>
            </section>
        {/if}

        <!-- Konten Tambahan -->
        <section class="flex flex-col md:flex-row justify-center items-center md:items-start md:my-8">
            <!-- Terakhir Di Update -->
             <div class="w-full max-w-[770px] md:w-[calc(770px/2)] lg:w-[calc(946px/5*3)] xl:w-[calc(1100px/5*3)]">
                { #if $desktop }
                    <Linker 
                    title="Terakhir di Update"
                    link="latest"
                    />
                {/if}
                <div class="grid grid-cols-3 w-full
                xs:my-[5vw] xs:px-[5vw] xs:gap-[8px] md:m-0
                md:grid-cols-2 lg:w-[946px] lg:max-w-[100%] md:p-0
                lg:grid-cols-3 xl:w-[1100px] md:pr-1" style="direction: rtl;">
                    <div class="col-span-2 md:h-[186.5px] lg:h-full w-full bg-emerald-600 flex justify-center items-center"></div>
                    <div class="col-span-1 aspect-[1/1] bg-emerald-300 flex justify-center items-center"></div>
                    <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center"></div>
                    <div class="col-span-1 aspect-[1/1] bg-emerald-500 flex justify-center items-center"></div>
                    <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center"></div>
                    <div class="col-span-1 aspect-[1/1] bg-emerald-300 flex justify-center items-center"></div>
                    <div class="col-span-2 md:h-[186.5px] lg:h-full md:order-1 lg:order-none w-full bg-emerald-200 flex justify-center items-center"></div>
                    <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center"></div>
                    {#if !$desktop}
                        <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center"></div>
                        <div class="col-span-1 aspect-[1/1] bg-emerald-300 flex justify-center items-center"></div>
                    {/if}
                    {#if $desktoplarge}
                        <div class="col-span-1 aspect-[1/1] bg-emerald-400 flex justify-center items-center"></div>
                        <div class="col-span-1 aspect-[1/1] bg-emerald-300 flex justify-center items-center"></div>
                        <div class="col-span-2 w-full bg-emerald-400 flex justify-center items-center"></div>
                        <div class="col-span-1 aspect-[1/1] bg-emerald-300 flex justify-center items-center"></div>
                    {/if}
                </div>
            </div>

            <div class="flex flex-col justify-center items-center w-full md:w-[calc(770px/2)] lg:w-[calc(946px/5*2)] xl:w-[calc(1100px/5*2)] md:pl-4">
                <!-- Tombol 'Papan Peringkat' -->
                <Linker 
                    title="Papan Peringkat"
                    link="leaderboard"
                />

                <!-- Switch Peringkat -->
                 <LeaderboardSwitch/>

                <!-- Peringkat -->
                <div class="max-w-[700px] w-full xs:flex xs:flex-col xs:justify-center xs:items-center">
                    <!-- pertama -->
                    {#if first}
                        <div class="w-full flex flex-col justify-center items-center">
                            <div class="flex justify-center items-center w-full xs:aspect-auto
                            px-[3.2vw] xs:px-[16px] 
                            pt-[3.2vw] xs:pt-[48px]
                            md:px-0 md:pt-[32px]">
                                <div class="w-full h-full">
                                    <img src="https://i.imgur.com/1zbe9Fp.png" alt="first place" class="w-full">
                                </div>
                            </div>
                            <div class="flex items-center justify-between xs:max-w-[600px]
                            space-x-[3.2vw] xs:space-x-[16px]
                            pl-[4.8vw] xs:pl-[24px] 
                            pr-[7.2vw] xs:pr-[36px] 
                            pt-[3.2vw] xs:pt-[16px] 
                            pb-[4.8vw] xs:pb-[24px]
                            md:px-0
                            w-full">
                                <div class="font-bold 
                                text-[4.8vw] xs:text-[32px]
                                mr-[4.8vw] xs:mr-[24px]">
                                    #{first.id}
                                </div>
                                <div class="flex-1 leading-[1.4] 
                                text-[3.2vw] xs:text-[16px] md:text-[16px] capitalize">
                                    <div class={genreColor(first.genre)}>{first.genre}</div>
                                    <div class="text-[4.8vw] xs:text-[24px] md:text-[20px] font-bold">{first.title}</div>
                                    <div class="text-[3.2vw] xs:text-[16px] md:text-[16px]">{first.author}</div>
                                </div>
                                <div class="text-[3.2vw] xs:text-[16px] md:text-[14px] flex justify-center items-center">
                                    {first.chapter} <Icon icon="material-symbols:file-copy-outline-rounded" class="text-[4vw] ml-2 xs:text-[20px]" />
                                </div>
                            </div>
                        </div>
                    {/if}
                    <!-- 2 - 7 -->
                    <div class="max-w-[600px] w-full">
                        <Breakline />
                        {#each bacaan.slice(1, 7) as item, i (item.id)}
                            <div class="flex items-center justify-between 
                            space-x-[3.2vw] xs:space-x-[16px] 
                            pl-[4.8vw] xs:pl-[24px]
                            pr-[7.2vw] xs:pr-[36px]
                            py-[1vw] xs:py-[5px]
                            md:px-0">
                                <div class="font-bold 
                                text-[4.8vw] xs:text-[24px] md:text-[20px]
                                mr-[4.8vw] xs:mr-[24px] md:mr-[16px]">
                                    #{item.id}
                                </div>
                                <div class="bg-emerald-400 rounded-[1vw] xs:rounded-[5px] 
                                h-[16vw] xs:h-[80px] md:h-[73px] xl:h-[88px] aspect-square">
                                    
                                </div>
                                <div class="flex-1 leading-[1.4] text-[2.8vw] xs:text-[14px] md:text-[12px] xl:text-[14px] capitalize">
                                    <div class={genreColor(item.genre)}>{item.genre}</div>
                                    <div class="text-[3.2vw] xs:text-[16px] md:text-[14px] xl:text-[16px] font-bold">{item.title}</div>
                                    <div class="text-[2.8vw] xs:text-[14px] md:text-[12px] xl:text-[14px] text-stone-500">{item.author}</div>
                                </div>
                                <div class="text-[3.2vw] xs:text-[16px] md:text-[14px] flex justify-center items-center">
                                    {item.chapter} <Icon icon="material-symbols:file-copy-outline-rounded" class="text-[4vw] ml-2 xs:text-[20px]" />
                                </div>
                            </div>
                            {#if i < 5}
                                <Breakline />
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <div class="max-md:hidden"><Breakline/></div>

        <!-- Karya (Canvas) -->
        <section class="w-full flex justify-center md:my-8">
            <div class="w-full flex flex-col min-[650px]:flex-row justify-center min-[650px]:items-start items-center xs:h-full max-w-[700px] md:max-w-[100%] xs:p-[50px]
            md:p-0 md:w-[770px] lg:w-[946px] xl:w-[1100px]">
                <div class="w-2/3 min-[650px]:w-1/2 flex justify-center items-center flex-col text-center min-[650px]:text-left min-[650px]:items-start space-y-[3.2vw] min-[650px]:pr-[16px] xs:mb-[32px] min-[650px]:pb-[0px] min-[650px]:pt-[32px] h-[75vw] xs:h-fit lg:w-[calc(946px/5*2)] xl:w-[calc(1100px/5*2)]">
                    <h6 class="text-[4.8vw] xs:text-[24px] font-nunito font-black xs:mb-[8px] leading-none">KARYA</h6>
                    <p class="text-[3.2vw] xs:text-[14px] xs:mb-[24px]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum laboriosam aut iusto, consequuntur quam dignissimos!</p>
                    <button class="text-[3.2vw] xs:text-[14px] bg-mainred 
                    px-[3.2vw] xs:px-[16px]
                    py-[2.8vw] xs:py-[14px]
                    text-mainlight rounded-[2vw] xs:rounded-[10px]">Lihat Karya Lainnya</button>
                </div>
                <div class="w-full min-[650px]:w-1/2 grid grid-cols-3 min-[650px]:grid-cols-2 xs:gap-[8px] md:pl-1 lg:grid-cols-4 lg:w-[calc(946px/5*3)] xl:w-[calc(1100px/5*3)] xl:grid-cols-5">
                    <div class="bg-emerald-500 w-full min-[650px]:h-[186.5px] lg:h-full col-span-2"></div>
                    <div class="bg-emerald-400 w-full aspect-square"></div>
                    <div class="bg-emerald-300 w-full aspect-square"></div>
                    <div class="bg-emerald-500 w-full aspect-square"></div>
                    <div class="bg-emerald-600 w-full aspect-square"></div>
                    {#if $desktopex}
                        <div class="bg-emerald-500 w-full aspect-square"></div>
                        <div class="bg-emerald-600 w-full aspect-square"></div>
                    {/if}
                    {#if $desktoplarge}
                        <div class="bg-emerald-500 w-full aspect-square"></div>
                        <div class="bg-emerald-600 w-full aspect-square"></div>
                    {/if}
                </div>
            </div>
        </section>
</section>
<style>
    .trapezoid {
        clip-path: polygon(0 0, 90.4% 0, 99.5% 100%, 0% 100%);
    }
    .bannertr {
        clip-path: polygon(0 0, 100% 0, 100% 75%, 8.6% 100%);
    }
    .bannertb {
        clip-path: polygon(0.5% 20%, 100% 0, 100% 100%, 10.5% 100%);
    }
    
	.overflow-scroll-hidden {
		overflow: auto;
		scrollbar-width: none;       /* Firefox */
		-ms-overflow-style: none;    /* Internet Explorer 10+ */
	}

	.overflow-scroll-hidden::-webkit-scrollbar {
		display: none;               /* Safari & Chrome */
	}
</style>