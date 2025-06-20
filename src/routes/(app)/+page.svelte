<script lang="ts">
    import LeaderboardSwitch from '$lib/components/leaderboardSwitch.svelte';
    import Linker from '$lib/components/linker.svelte';
    import MainContenSwitch from '$lib/components/mainContenSwitch.svelte';
    import Breakline from '$lib/components/util/breakline.svelte';
    import Choice from '$lib/components/util/choice.svelte';
    import New from '$lib/components/util/new.svelte';
    // import Top from '$lib/components/util/top.svelte';
    import Up from '$lib/components/util/up.svelte';
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';    
    import { top  } from '$lib/topdummy';
    import { update  } from '$lib/updatedummy';



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

    const [first] = bacaan;

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

    // CARDS
    import { cards } from '$lib/datadummy';
    import Card from '$lib/components/util/card.svelte';
    import Slaideres from '$lib/components/slaideres.svelte';
    import HeroFilter from '$lib/components/heroFilter.svelte';
    import HeroShow from '$lib/components/heroShow.svelte';
    import MainConent from '$lib/sections/mainConent.svelte';
    import TitleLink from '$lib/components/util/titleLink.svelte';
    import SliderContent from '$lib/sections/sliderContent.svelte';
    import News from '$lib/components/news.svelte';
    // import LastPag from '$lib/components/pagination.svelte';
    import Pagination from '$lib/components/pagination.svelte';
    import OtherContent from '$lib/sections/otherContent.svelte';
    function formatLikes(n: number): string {
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





















  const items = Array.from({ length: 16 }, (_, i) => ({
    title: `Item ${i + 1}`
  }));
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
            peer focus-visible:outline-none focus-visible:border-sky-500">
                <div class="flex my-3 mt-4 [writing-mode:vertical-lr]"><div>Riwayat Bacaan</div> <Icon icon="material-symbols:arrow-back-ios-new-rounded" class={`text-xl mx-3 transition-transform ${historyShow ? 'rotate-180' : ''}`} /></div>
            </button>
            <div tabindex="-1"
            class={`
                fixed z-[100] w-[320px] right-0 translate-y-32 translate-x-full
                h-[75dvh] bg-mainlight border-2 rounded-l-xl border-r-0 border-zinc-400
                p-3 focus-visible:outline-none overflow-y-scroll
                peer-focus-visible:outline-none peer-focus-visible:border-sky-500
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
                p-3 focus-visible:outline-none overflow-y-scroll
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



    <!-- C  O  N  T  E  N  T -->

        
        <!-- MAIN -->
         <MainConent />

        <!-- SLIDER -->
         <SliderContent />

        <!-- OTHER -->
         <OtherContent />

         
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

    .clip-zigzag {
        clip-path: polygon(
            0% 0%, 10% 10%, 20% 0%, 30% 10%, 40% 0%,
            50% 10%, 60% 0%, 70% 10%, 80% 0%, 90% 10%, 100% 0%,
            100% 100%, 0% 100%
        );
    }

</style>