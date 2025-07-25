<script lang="ts">
    // export const ssr = false;
    // export const prerender = true;

    import { onMount, onDestroy, tick } from "svelte";
    import "$lib/app.css";
    import Icon from "@iconify/svelte";
    import { goto } from '$app/navigation';
    import { writable } from "svelte/store";
	import { browser } from '$app/environment';
    import PhoneSlider from "$lib/components/phoneSlider.svelte";
    // let { children } = $props();

    let showNav: boolean = true;

    function home() {
        goto('/'); // Arahkan ke halaman root
    }

    function handleScroll(): void {
        const isMobile = window.innerWidth <= 1;
        const threshold = isMobile ? window.innerWidth * 0.5 : 1;
        showNav = window.scrollY > threshold;
		if (showDropdown) {
			showDropdown = false;
		}
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });


    const phone = writable(false);
    const desktop = writable(false);
    const desktopex = writable(false);
    const desktoplarge = writable(false);
    const touchscreen = writable(false)
    const mousecontrol = writable(false)

    onMount(() => {
        const update = () => {
            phone.set(window.innerWidth <= 500);
            desktop.set(window.innerWidth >= 900);
            desktopex.set(window.innerWidth >= 1300);
            desktoplarge.set(window.innerWidth >= 1100);
            touchscreen.set(window.matchMedia('(orientation: portrait)').matches);
            mousecontrol.set(window.matchMedia('(orientation: landscape)').matches);
        };

        update(); // Initial check
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    });



    // S E A R C H B A R

    let searchForm: HTMLFormElement | null = null;
    let searchInput: HTMLInputElement | null = null;

    function focusInput(): void {
        searchInput?.focus();
        // console.log("succ1");
    }

    onMount(() => {
        const init = async () => {
            await tick();

            if (!searchForm) {
                console.log("searchForm masih null setelah tick 😢");
                return;
            }
            // console.log("succ2");

            searchForm.addEventListener('click', focusInput);
            // console.log("succ3");
        };

        init();

        return () => {
            searchForm?.removeEventListener('click', focusInput);
            // console.log("succ4");
        };
    });

    onMount(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                // if (!showNav) return;
                e.preventDefault();
                searchInput?.focus();
                if (!touchscreen) {
                    isSOpen = true;
                }
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    });



    // P R O F I L E
	let showDropdown: boolean = false;

	let profileButton: HTMLButtonElement | null = null;
	let profileDropdown: HTMLDivElement | null = null;

	function toggleDropdown(): void {
        if (window.matchMedia('(orientation: landscape)').matches) {
            showDropdown = !showDropdown;
        } else {
            console.log('clicked')
        }
	}

	onMount(() => {
        // console.log($mousecontrol)
		if (browser) {
			window.addEventListener('scroll', handleScroll, { passive: true });
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});


    $: if (!isSOpen && searchInput && touchscreen) {
  searchInput.blur();
}
    let isSOpen = false;
  function isSOpenToggle() {
    if (!touchscreen) return;
    isSOpen = true;
  tick().then(() => {
    searchInput?.focus();
  });
  }

onMount(() => {
  if (!browser || !touchscreen) return;
  const originalState = history.state;

  function handleBackButton(e: PopStateEvent) {
    if (isSOpen) {
      isSOpen = false;
      // prevent actual navigation back
      history.pushState(originalState, '', location.href);
    }
  }

  if (isSOpen) {
    history.pushState({ modalOpen: true }, '', location.href);
  }

  window.addEventListener('popstate', handleBackButton);

  return () => {
    window.removeEventListener('popstate', handleBackButton);
  };
});




function lockScroll() {
  document.body.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
}

function unlockScroll() {
  document.body.style.overflow = '';
  document.body.style.touchAction = '';
}

let mounted = false;

onMount(() => {
  mounted = true;
});

$: if (mounted && typeof window !== 'undefined') {
  if ($touchscreen && (isSOpen || document.activeElement === searchInput)) {
    lockScroll();
  } else {
    unlockScroll();
  }
}



//   let searchInput: HTMLInputElement;
//   let hasScrolledForOpen = false;

//   // Lock & unlock scroll
//   function lockScroll() {
//     if (!browser) return;
//     document.body.style.overflow = 'hidden';
//     document.body.style.touchAction = 'none'; // Optional for touch lock
//   }

//   function unlockScroll() {
//     if (!browser) return;
//     document.body.style.overflow = '';
//     document.body.style.touchAction = '';
//   }

//   // Handle scroll + lock on open
//   $: if (browser && isSOpen && !hasScrolledForOpen) {
//     hasScrolledForOpen = true;

//     // Smooth scroll +200px
//     window.scrollTo({
//       top: window.scrollY - 200,
//       behavior: 'smooth'
//     });

//     // Delay lock after scroll settles
//     setTimeout(() => {
//       lockScroll();
//     }, 300);
//   }

//   // Unlock when isSOpen closes
//   $: if (browser && !isSOpen) {
//     unlockScroll();
//     hasScrolledForOpen = false;
//   }

//   // Optional: toggle from button
//   function openSearch() {
//     isSOpen = true;
//     if (browser) {
//       // Give DOM time to render before focusing
//       setTimeout(() => {
//         searchInput?.focus();
//       }, 350); // after scroll + lock
//     }
//   }

//   onMount(() => {
//     // Just in case user reloads while open
//     if (browser && isSOpen) lockScroll();
//   });


 function closeSearch() {
    isSOpen = false;
    searchInput?.blur();
  }

  function handlePopState() {
    if (document.activeElement === searchInput) {
      // Jangan benar-benar navigate ke back, tapi tutup dulu panel
      closeSearch();

      // Optional: dorong kembali satu step ke depan biar nggak balik route
      history.pushState(null, '', location.href);
    }
  }

onMount(() => {
  if (typeof window !== 'undefined') {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', handlePopState);
  }
});

onDestroy(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('popstate', handlePopState);
  }
});
console.log('🔥 Root layout active');

// import { page } from '$app/stores';

//   $: hideRootLayout = $page.url.pathname.startsWith('/series');

import { page } from '$app/stores';
    import Footer from "$lib/components/Footer.svelte";
</script>

<style>
	.dropdown-panel::before {
		content: "";
		position: absolute;
		top: -10px;
		right: 13.5px;
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 10px solid black; /* Outline */
		z-index: 0;
	}

	.dropdown-panel::after {
		content: "";
		position: absolute;
		top: -8px;
		right: 15px;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 8px solid white; /* Inner triangle (match bg) */
		z-index: 1;
	}
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

<section class="bg-mainlight">
    

    <section class="bg-zinc-300/50 xs:bg-zinc-200/50">
        <!-- HERO SECTION -->
        {#if $page.url.pathname === '/'}
            {#if $mousecontrol}
                <section class="w-full relative flex justify-center bg-zinc-500 max-lg:portrait:hidden overflow-hidden">
                    <div class="absolute w-full h-full bg-cover bg-center filter opacity-40 blur-xl scale-110" style="background-image: url('https://upload-os-bbs.hoyolab.com/upload/2024/05/23/365304258/d1adb95d30664a78ff88407d92cac6e2_198581824676022933.jpg');"></div>
                    <div class="h-[210px] sm:h-[300px] md:h-[350px] lg:h-[430px] xl:h-[500px] aspect-[5/2] flex justify-center items-center relative">
                        <!-- <img src="https://i.imgur.com/yV9iEEP.png" alt="banner" class="h-full absolute left-0">
                        <img src="https://i.imgur.com/AUQkFm6.png" alt="" class="h-[37%] right-[calc(12%/2)] top-[calc((100%-81%)/2)] absolute">
                        <img src="https://i.imgur.com/eiEJ5of.png" alt="" class="h-[50%] right-[calc(12%/2)] bottom-[calc((100%-81%)/2)] absolute"> -->
                        <button on:click={() => goto('/series')} tabindex="0" class="absolute w-full h-full outline-none">
                            <div class="absolute cursor-pointer left-[calc(12%/2)] h-[calc(100%-(100%-81%))] w-[62%] top-[calc((100%-81%)/2)] bottom-[calc((100%-81%)/2)] trapezoid peer z-3"></div>
                            <img src="https://i.imgur.com/K3dGSiE.png" alt="banner" class="h-full absolute top-0 left-0 z-2 peer-hover:scale-[1.005] peer-focus-visible:scale-[1.0075] peer-active:scale-[1] pointer-events-none transition">
                        </button>
                        <button on:click={() => goto('/series')} tabindex="0" class="absolute w-full h-full outline-none">
                            <div class="absolute cursor-pointer right-[calc(12%/2)] h-[calc(37%)] w-[30.7%] top-[calc((100%-81%)/2)] peer bannertr z-3"></div>
                            <img src="https://i.imgur.com/V1cYTpP.png" alt="" class="h-[46%] right-[calc(4.6%/2)] top-0 absolute z-2 peer-hover:scale-[1.01] peer-focus-visible:scale-[1.015] peer-active:scale-[1] pointer-events-none transition">
                        </button>
                        <button on:click={() => goto('/series')} tabindex="0" class="absolute w-full h-full outline-none">
                            <div class="absolute cursor-pointer right-[calc(12%/2)] h-[calc(50%)] w-[28%] bottom-[calc((100%-81%)/2)] peer bannertb z-3"></div>
                            <img src="https://i.imgur.com/e7JRrts.png" alt="" class="h-[59%] right-[calc(4.6%/2)] bottom-0 absolute z-2 peer-hover:scale-[1.01] peer-focus-visible:scale-[1.015] peer-active:scale-[1] pointer-events-none transition">
                        </button>
                    </div> 
                </section>
            {:else if $touchscreen}
                <PhoneSlider />
            {/if}
        {/if}
        




        <!-- Top Nav -->
        <nav class="sticky top-0 z-100 drop-shadow-lg drop-shadow-zinc-900/15 portrait:px-[1.6vw] portrait:xs:px-2 portrait:pt-2 portrait:xs:pt-[1.6vw] transition-all duration-300" 
        class:translate-y-[50%]={touchscreen && (isSOpen && scrollY <= 300 && scrollY > 200)} class:translate-y-[150%]={touchscreen && (isSOpen && scrollY > 300)} class:-translate-y-[100%]={touchscreen && (isSOpen && scrollY <= 300)}>
            <section class="flex flex-col justify-center items-center bg-mainlight min-[900px]:bg-zinc-200 portrait:rounded-lg portrait:overflow-hidden portrait:border border-zinc-900/30 landscape:border-y relative">
                <div class="w-full min-[900px]:bg-mainlight flex flex-col items-center justify-center z-2">
                    <div class="w-full  text-mainred fill-mainred flex items-center justify-between 
                    md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1200px]
                    max-xs:px-[4.8vw] max-md:pl-[24px] max-md:pr-[16px]
                    h-[20vw] xs:h-[76px] md:landscape:h-[80px] lg:h-[80px]">
                        <!-- LEFT -->
                        <div class="flex justify-center items-center space-x-[20px]">
                            <!-- Logo -->
                            <button
                            on:click={home} aria-label="home" class="mr-3 cursor-pointer outline-none fill-zinc-900 focus-visible:fill-sky-400">
                                <svg class="h-[4vw] xs:h-[18px] mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860.59 118.52">
                                    <g>
                                        <path d="m171.55.14h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84L171.55.14Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                                        <polygon points="312.24 69.44 264.81 118.2 224.41 118.2 267.58 73.82 219.56 73.82 209.18 49.25 256.95 .14 297.34 .14 253.83 44.87 301.86 44.87 312.24 69.44"/>
                                        <path d="m386.18.14h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84L386.18.14Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                                        <path d="m48.77,61.84c9.82,11.17,25.24,30.6,39.25,56.36h-33.5c-9.38-15.09-18.76-27.03-25.57-34.98v34.98H0V.14h28.96v40.46C37.28,31.54,49.35,17.17,59.61.14h33.04c-13.4,26.91-32.3,49.32-43.88,61.7Z"/>
                                        <path d="m817.24.14h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84L817.24.14Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                                        <path d="m581.98.14h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84L581.98.14Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                                        <polygon points="517.7 .23 517.7 29.18 486.51 29.18 486.51 118.29 451.76 118.29 451.76 29.18 420.57 29.18 420.57 .23 517.7 .23"/>
                                        <path d="m738.99,54.27c3.5-6.62,6.49-17.5.79-31.78C733.92,7.82,717.53.04,687.22.04c-18.54,0-39.86-.09-40.59,0l-14.39,17.77c.03.17,7.39,17.15,9.96,47.22,1.92,22.48-2.82,43.98-3.56,53.49h29.05c.49-6.66,1.08-16.3,1.45-28.06,7.46-1.7,14.26-3.46,20.44-5.3,3.38,6.4,8.77,18.02,12.69,33.36h29.73c-4.12-19.31-10.53-34.47-15.29-43.95,10.96-5.8,18.13-12.43,22.3-20.3Zm-25.58-13.56c-2.13,4.01-10.76,11.66-43.98,19.92-.19-13.3-.85-23.85-1.55-31.58,4.39-.27,9.46-.47,14.67-.44,20.42.09,28.14,2.14,30.52,5.08s.74,6.25.34,7.01Z"/>
                                    </g> 
                                </svg>
                            </button>

                            <!-- Navigasi -->
                            {#if !$phone}
                                <div class="text-[18px] font-work-sans font-[600] tracking-tight capitalize text-zinc-900 max-lg:portrait:hidden">
                                    <a href="/browse" class="focus-visible:underline outline-none focus-visible:text-sky-400 focus-visible:decoration-sky-400 underline-offset-1 focus-visible:decoration-[0.1em] hover:underline">jelajahi</a>
                                </div>
                                <!-- <div class="text-[18px] font-work-sans font-[600] tracking-tight capitalize text-zinc-900 max-lg:portrait:hidden">
                                    <a href="/" class="focus-visible:underline outline-none focus-visible:text-sky-400 focus-visible:decoration-sky-400 underline-offset-1 focus-visible:decoration-[0.1em] hover:underline">komik</a>
                                </div> -->
                                <!-- <div class="text-[18px] font-work-sans font-[600] tracking-tight capitalize text-zinc-900 max-lg:portrait:hidden">
                                    <a href="/" class="focus-visible:underline outline-none focus-visible:text-sky-400 focus-visible:decoration-sky-400 underline-offset-1 focus-visible:decoration-[0.1em] hover:underline">novel</a>
                                </div> -->
                                <!-- <div class="text-[18px] font-work-sans font-[600] tracking-tight capitalize text-zinc-900 max-lg:portrait:hidden">
                                    <a href="/">buku</a>
                                </div> -->
                                <div class="text-[18px] cursor-not-allowed font-work-sans font-[600] tracking-tight capitalize text-zinc-900 max-lg:portrait:hidden opacity-30">
                                    <div class="outline-none underline-offset-1">Jadwal</div>
                                </div>
                                {#if $desktoplarge}
                                    <div class="text-[18px] cursor-not-allowed font-work-sans font-[600] tracking-tight capitalize text-zinc-900 max-lg:portrait:hidden opacity-30">
                                        <div class="outline-none underline-offset-1">kreator</div>
                                    </div>
                                {/if}
                            {/if}
                        </div>

                        <!-- RIGHT -->
                        <div class="space-x-[2vw] md:space-x-[10px] flex xs:justify-center xs:items-center">
                            <!-- {#if !$phone} -->
                                {#if !$touchscreen && !$phone}
                                <!-- Search Bar -->
                                    <form bind:this={searchForm}
                                    class="bg-mainlight border-2 border-zinc-900 text-zinc-900 fill-zinc-900
                                    focus-within:outline-3 focus-within:outline-sky-400
                                    rounded-lg pl-3 pr-4 h-[40px] font-work-sans items-center relative overflow-hidden w-[250px] flex justify-between text-[12px]
                                    focus-within:[&_.shortcut]:hidden max-sm:hidden
                                    cursor-text
                                    ">
                                        <div class="flex justify-center items-center flex-1">
                                            <Icon icon="fa6-solid:magnifying-glass" class="text-[16px] mr-2" />
                                            <input
                                                name="kasantaraSearchInput"
                                                id="kasantaraSearchInput"   
                                                bind:this={searchInput}
                                                type="text"
                                                class="outline-none bg-transparent w-full py-2"
                                                placeholder="Cari Bacaan"
                                                maxlength="25"
                                            />
                                        </div>
                                        <div class="shortcut max-[1100px]:hidden">
                                            <span class="bg-zinc-300 px-2 py-1 rounded-sm">ctrl</span> + <span class="bg-zinc-300 px-2 py-1 rounded-sm">k</span>
                                        </div>
                                    </form>
                                {/if}

                                {#if $touchscreen && !$desktop}
                                    <!-- Diamond Currency -->
                                    <!-- <button class="flex justify-center items-center focus-visible:bg-sky-400 outline-none cursor-pointer bg-zinc-900 text-mainlight rounded-3xl px-[2.4vw] xs:px-3 py-[0.8vw] xs:py-1 max-xs:mr-[3.2vw]">
                                        <span class="mr-[1.2vw] xs:mr-1.5 text-[3.2vw] xs:text-[16px]">100</span>
                                        <Icon icon="material-symbols:diamond-rounded" class="text-[4.8vw] xs:text-[20px] translate-y-[5%]" />
                                    </button> -->
                                    <!-- Circle Search -->
                                    <div class="relative landscape:hidden">
                                        <button on:click={isSOpenToggle}
                                        class=" focus-visible:ring-2 ring-sky-400 outline-none cursor-pointer
                                        h-[7vw] xs:h-[35px] rounded-full aspect-square text-zinc-900 flex justify-center items-center relative overflow-hidden">
                                            <Icon icon="fa6-solid:magnifying-glass" class="text-[4.8vw] xs:text-[24px]" />
                                        </button>
                                    </div>
                                {/if}
                                
                                <!-- Publish Button -->
                                {#if $desktoplarge}
                                    <button
                                    disabled
                                    class="opacity-30 cursor-not-allowed
                                    bg-zinc-900 text-mainlight outline-sky-500 focus:outline-3 max-lg:portrait:hidden
                                    rounded-lg px-4 py-2 font-work-sans flex justify-center items-center relative overflow-hidden">
                                        Publish
                                    </button>
                                {/if}

                                {#if !$touchscreen && !$phone}
                                    <!-- Profile Picture -->
                                    <div class="relative">
                                        <!-- <button 
                                        bind:this={profileButton}
                                        on:click={toggleDropdown}
                                        class=" outline-sky-500 focus:outline-3 cursor-pointer
                                        h-[50px] rounded-full aspect-square bg-zinc-500 text-mainlight border-2 border-zinc-900 flex justify-center items-center relative overflow-hidden">
                                            <Icon icon="material-symbols:person" class="text-[60px] translate-y-1.5 absolute" />
                                        </button> -->
                                        <!-- <a href="/proile"
                                        class=" outline-sky-500 focus:outline-3 cursor-pointer
                                        h-[50px] rounded-full aspect-square bg-zinc-500 text-mainlight border-2 border-zinc-900 flex justify-center items-center relative overflow-hidden">
                                            <Icon icon="material-symbols:person" class="text-[60px] translate-y-1.5 absolute" />
                                        </a> -->
                                        <div
                                        class=" outline-sky-500 focus:outline-3 cursor-not-allowed opacity-30
                                        h-[50px] rounded-full aspect-square bg-zinc-500 text-mainlight border-2 border-zinc-900 flex justify-center items-center relative overflow-hidden">
                                            <Icon icon="material-symbols:person" class="text-[60px] translate-y-1.5 absolute" />
                                        </div>
                                        <!-- {#if showDropdown}
                                            <div bind:this={profileDropdown}
                                            class="absolute translate-y-1 right-0 mt-3 rounded-lg shadow-lg bg-mainlight border-2 border-zinc-900 z-50 dropdown-panel">
                                                <div class="">
                                                    <ul class="space-y-1 text-sm text-gray-700 whitespace-nowrap overflow-hidden rounded-lg">
                                                        <li><button class="hover:bg-zinc-300 cursor-pointer w-full py-1.5 pl-4 pr-5 outline-none focus-visible:bg-sky-400/20">Profil</button></li>
                                                        <li><button class="hover:bg-zinc-300 cursor-pointer w-full py-1.5 pl-4 pr-5 outline-none focus-visible:bg-sky-400/20">Aktifitas Saya</button></li>
                                                        <li><button class="hover:bg-zinc-300 cursor-pointer w-full py-1.5 pl-4 pr-5 outline-none focus-visible:bg-sky-400/20">Pengaturan</button></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        {/if} -->
                                    </div>
                                {/if}
                            <!-- {:else} -->
                                <!-- Circle Search -->
                                <!-- <div class="relative sm:hidden">
                                    <button on:click={() => console.log('clicked')}
                                    class=" outline-sky-500 focus:outline-[0.6vw] cursor-pointer
                                    h-[10vw] rounded-full aspect-square text-zinc-900 flex justify-center items-center relative overflow-hidden">
                                        <Icon icon="fa6-solid:magnifying-glass" class="text-[4.8vw]" />
                                    </button>
                                </div> -->

                                <!-- Profile Picture -->
                                <!-- <div class="relative">
                                    <button
                                    on:click={() => console.log('clicked')}
                                    class=" outline-sky-500 focus:outline-[0.6vw] cursor-pointer
                                    h-[10vw] rounded-full aspect-square bg-zinc-500 text-mainlight border-2 border-zinc-900 flex justify-center items-center relative overflow-hidden">
                                        <Icon icon="material-symbols:diamond-rounded" class="text-[12vw] translate-y-[1.2vw] absolute" />
                                    </button>
                                </div> -->
                            <!-- {/if} -->
                        </div>
                    </div>
                </div>
                {#if $touchscreen && !$desktop}
                    <div class={`w-full h-full absolute z-5 top-0 left-0 flex justify-center items-center bg-mainlight
                    ${isSOpen === true ? '' : 'hidden pointer-events-none'}
                    `}>
                        <form bind:this={searchForm}
                        class="bg-mainlight border-[0.4vw] border-zinc-900 text-zinc-900 fill-zinc-900
                        outline-none focus-within:border-sky-400
                        rounded-lg pl-[2.4vw] xs:pl-3 pr-[3.2vw] xs:pr-4 h-[10vw] xs:h-[50px] font-work-sans items-center relative overflow-hidden w-[88%] flex justify-between text-[3.2vw] xs:text-[14px]
                        focus-within:[&_.shortcut]:hidden
                        cursor-text
                        ">
                            <div class="flex justify-center items-center flex-1">
                                <Icon icon="fa6-solid:magnifying-glass" class="text-[3.2vw] xs:text-[14px] mr-[1.6vw] xs:mr-[8px]" />
                                <input
                                    name="kasantaraSearchInput"
                                    id="kasantaraSearchInput"   
                                    bind:this={searchInput}
                                    type="text"
                                    class="outline-none bg-transparent w-full py-[1.6vw] xs:py-[8px"
                                    placeholder="Cari Bacaan"
                                    maxlength="25"
                                    disabled={!isSOpen}
                                    tabindex={isSOpen ? 0 : -1}
                                />
                                <!-- <button type="button" tabindex="-1" class="outline-none cursor-pointer"  on:click={() => { if (!isSOpen) { isSOpen = false; searchInput?.blur();} }}><Icon icon="iconamoon:sign-times-bold" class="text-[4.8vw]" /></button> -->
                                <button
                                type="button"
                                tabindex="-1"
                                class="outline-none cursor-pointer"
                                on:click={() => {
                                    isSOpen = false;
                                    searchInput?.blur();
                                }}
                                >
                                    <Icon icon="iconamoon:sign-times-bold" class="text-[4.8vw]" />
                                </button>
                            </div>
                            <!-- <div class="shortcut max-[1100px]:hidden">
                                <span class="bg-zinc-300 px-2 py-1 rounded-sm">ctrl</span> + <span class="bg-zinc-300 px-2 py-1 rounded-sm">k</span>
                            </div> -->
                        </form>
                    </div>
                {/if}
            </section>
        </nav>

        <!-- Bot Nav -->
        {#if !$desktoplarge}
            <nav class="fixed bottom-0 w-full z-[50] xs:pb-[16px] flex justify-center landscape:hidden portrait:px-0 portrait:xs:px-2 portrait:pb-0 portrait:xs:pb-2">
                <div class="h-[12.5vw] xs:h-[76px] xs:rounded-[16px] xs:max-w-[400px] portrait:border border-zinc-900/30 landscape:border-y max-xs:portrait:border-b-0 max-xs:portrait:border-x-0 max-xs:portrait:rounded-none
                w-full drop-shadow-md shadow-black bg-mainlight text-zinc-900 fill-zinc-900 grid grid-cols-5 portrait:rounded-lg portrait:overflow-hidden">
                    <!-- <div>
                        <div class="flex justify-center items-center flex-col 
                        h-[10vw] xs:h-[45px] aspect-square"> 
                            <div class="h-[10vw] xs:h-[45px]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.6318339501961 80.04623387654848" class="h-full">
                                    <g stroke-linecap="round">
                                        <g transform="translate(10.257518941929675 34.878757027045765) rotate(0 28.18281437969563 5.140170465332133)" fill-rule="evenodd">
                                            <path d="M-1.3 -1.39 L29.06 -25.53 L55.54 0.47 L57.86 34.49 L39.23 34.3 L37.15 12.1 L21.79 13.95 L19.03 34.7 L0.81 36.86 L1.56 0.39" stroke="none" stroke-width="0" fill="#fa5252" fill-rule="evenodd"></path>
                                            <path d="M0 0 C10.89 -9.71, 18.85 -16.29, 28.14 -24.88 M0 0 C6.67 -5.74, 13.11 -11.36, 28.14 -24.88 M28.14 -24.88 C37.69 -17.02, 47.86 -6.06, 55.81 -0.58 M28.14 -24.88 C34.94 -17.89, 41.98 -11.35, 55.81 -0.58 M55.81 -0.58 C55.67 10.65, 56.47 20.38, 56.37 34.89 M55.81 -0.58 C56.66 10.9, 55.37 22.23, 56.37 34.89 M56.37 34.89 C51.87 33.5, 44.29 35.92, 38.51 34.83 M56.37 34.89 C51.44 34.34, 47.91 35.76, 38.51 34.83 M38.51 34.83 C38.73 26.67, 39.57 18.81, 38.57 12.89 M38.51 34.83 C37.48 26.45, 37.43 17.9, 38.57 12.89 M38.57 12.89 C30.43 12.78, 24.8 12.44, 20.36 13.02 M38.57 12.89 C34.4 12.79, 28.94 12.98, 20.36 13.02 M20.36 13.02 C20.75 20.55, 20 30.57, 19.73 34.87 M20.36 13.02 C21.09 20.94, 19.53 28.03, 19.73 34.87 M19.73 34.87 C14.87 35.67, 6.66 33.71, 0.42 35.16 M19.73 34.87 C13.35 35.8, 7.1 34.15, 0.42 35.16 M0.42 35.16 C2.06 25.18, -1.05 15.46, 0 0 M0.42 35.16 C-0.02 24.88, -0.6 12.96, 0 0 M0 0 C0 0, 0 0, 0 0 M0 0 C0 0, 0 0, 0 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div class="text-[3.2vw] xs:text-[16px] leading-none font-caveat-brush">
                                Home
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-center items-center flex-col 
                        h-[10vw] xs:h-[45px] aspect-square translate-y-[1.6vw] xs:translate-y-[8px]">
                            <div class="h-[10vw] xs:h-[45px]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.90193329959584 70.31634381568136" class="h-full">
                                    <g stroke-linecap="round">
                                        <g transform="translate(10.605492152565489 10.006453227626594) rotate(0 29.43193044398049 25.154945294027385)">
                                            <path d="M0 0 C22.52 1.51, 40.31 0.01, 58.86 0.31 M0 0 C11.62 0.41, 23.09 -0.42, 58.86 0.31 M58.86 0.31 C58.8 7.72, 60.14 17.51, 58.4 31.58 M58.86 0.31 C59.64 10.91, 58.83 20.12, 58.4 31.58 M58.4 31.58 C54.26 31.31, 50.68 33.47, 43.04 33.75 M58.4 31.58 C54.42 31.76, 51.2 33.07, 43.04 33.75 M43.04 33.75 C44.53 37.99, 45.45 44.99, 47.34 50.31 M43.04 33.75 C44.24 39, 46.34 43.73, 47.34 50.31 M47.34 50.31 C44.58 46.29, 38.7 45.35, 29.1 36.75 M47.34 50.31 C41.92 46.45, 38.01 43.59, 29.1 36.75 M29.1 36.75 C17.77 38.73, 10.25 38.18, 0.31 41.35 M29.1 36.75 C19.1 38.5, 10.21 39.38, 0.31 41.35 M0.31 41.35 C0.61 26.25, -1.64 11.41, 0 0 M0.31 41.35 C-0.08 26.18, 0.74 11.4, 0 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div class="text-[3.2vw] xs:text-[16px] leading-none font-caveat-brush opacity-0">
                                Bacaan
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-center items-center flex-col 
                        h-[10vw] xs:h-[45px] aspect-square translate-y-[1.6vw] xs:translate-y-[8px]"> 
                            <div class="h-[10vw] xs:h-[45px]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.12377844690377 83.65464768345012" class="h-full">
                                    <g stroke-linecap="round">
                                        <g transform="translate(62.56705659498198 7.754143913107356) rotate(16.150310021680614 -7.765904571119677 10.293427525460274)">
                                            <path d="M0 0 C-1.26 0.35, -4.98 0.75, -7.53 2.11 C-10.08 3.48, -13.88 5.76, -15.3 8.21 C-16.72 10.65, -17.3 14.7, -16.07 16.76 C-14.84 18.83, -10.52 20.42, -7.94 20.59 C-5.35 20.75, -1.97 19.32, -0.56 17.76 C0.86 16.19, 0.87 13.23, 0.54 11.18 C0.21 9.14, -2.45 7.34, -2.54 5.48 C-2.63 3.62, -0.42 0.91, 0 0 M0 0 C-1.26 0.35, -4.98 0.75, -7.53 2.11 C-10.08 3.48, -13.88 5.76, -15.3 8.21 C-16.72 10.65, -17.3 14.7, -16.07 16.76 C-14.84 18.83, -10.52 20.42, -7.94 20.59 C-5.35 20.75, -1.97 19.32, -0.56 17.76 C0.86 16.19, 0.87 13.23, 0.54 11.18 C0.21 9.14, -2.45 7.34, -2.54 5.48 C-2.63 3.62, -0.42 0.91, 0 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                        </g>
                                    </g>
                                    <g stroke-linecap="round">
                                        <g transform="translate(40.89827917904199 24.84969486563196) rotate(0 -9.25990071061176 23.7444720981576)">
                                            <path d="M0 0 C0.55 0.93, 1.46 3.48, 3.28 5.6 C5.1 7.71, 13.3 8.03, 10.92 12.71 C8.54 17.39, -4.98 27.86, -11.01 33.67 C-17.04 39.49, -22.2 46.11, -25.27 47.6 C-28.34 49.1, -33.41 50.62, -29.44 42.67 C-25.47 34.71, -6.13 7.02, -1.47 -0.12 M0 0 C0.55 0.93, 1.46 3.48, 3.28 5.6 C5.1 7.71, 13.3 8.03, 10.92 12.71 C8.54 17.39, -4.98 27.86, -11.01 33.67 C-17.04 39.49, -22.2 46.11, -25.27 47.6 C-28.34 49.1, -33.41 50.62, -29.44 42.67 C-25.47 34.71, -6.13 7.02, -1.47 -0.12" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div class="text-[3.2vw] xs:text-[16px] leading-none font-caveat-brush opacity-0">
                                Karya
                            </div>
                        </div>
                    </div> -->
                    <a href="/" class="w-full h-full flex justify-center items-center cursor-pointer hover:bg-zinc-200 outline-none focus-visible:text-sky-400 group">
                        <Icon icon="mingcute:home-4-line" class="text-[7vw] xs:text-[35px]  group-hover:hidden" />
                        <Icon icon="mingcute:home-4-fill" class="text-[7vw] xs:text-[35px]  hidden group-hover:block" />
                    </a>
                    <a href="/browse" class="w-full h-full flex justify-center items-center cursor-pointer hover:bg-zinc-200 outline-none focus-visible:text-sky-400 group">
                        <Icon icon="mingcute:calendar-line" class="text-[7vw] xs:text-[35px] absolute group-hover:hidden" />
                        <Icon icon="mingcute:calendar-fill" class="text-[7vw] xs:text-[35px] absolute hidden group-hover:block" />
                    </a>
                    <button on:click={() => console.log('clicked')} class="opacity-30 w-full h-full flex justify-center items-center cursor-pointer hover:bg-zinc-200 outline-none focus-visible:text-sky-400 group">
                        <Icon icon="material-symbols:browse-outline" class="text-[7vw] xs:text-[35px] absolute group-hover:hidden" />
                        <Icon icon="material-symbols:browse" class="text-[7vw] xs:text-[35px] absolute hidden group-hover:block" />
                    </button>
                    <button on:click={() => console.log('clicked')} class="opacity-30 w-full h-full flex justify-center items-center cursor-pointer hover:bg-zinc-200 outline-none focus-visible:text-sky-400 group">
                        <Icon icon="material-symbols:notifications-outline-rounded" class="text-[7vw] xs:text-[35px] absolute group-hover:hidden" />
                        <Icon icon="material-symbols:notifications-rounded" class="text-[7vw] xs:text-[35px] absolute hidden group-hover:block" />
                    </button>
                    <!-- <button on:click={() => console.log('clicked')} class="w-full h-full flex justify-center items-center cursor-pointer hover:bg-zinc-200 outline-none focus-visible:text-sky-400 group"> -->
                        <!-- <Icon icon="material-symbols:person" class="text-[12vw] xs:text-[50px] absolute" /> -->
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.12377844690377 83.65464768345012" class="w-1/2 aspect-square">
                            <g stroke-linecap="round">
                                <g transform="translate(62.56705659498198 7.754143913107356) rotate(16.150310021680614 -7.765904571119677 10.293427525460274)">
                                    <path d="M0 0 C-1.26 0.35, -4.98 0.75, -7.53 2.11 C-10.08 3.48, -13.88 5.76, -15.3 8.21 C-16.72 10.65, -17.3 14.7, -16.07 16.76 C-14.84 18.83, -10.52 20.42, -7.94 20.59 C-5.35 20.75, -1.97 19.32, -0.56 17.76 C0.86 16.19, 0.87 13.23, 0.54 11.18 C0.21 9.14, -2.45 7.34, -2.54 5.48 C-2.63 3.62, -0.42 0.91, 0 0 M0 0 C-1.26 0.35, -4.98 0.75, -7.53 2.11 C-10.08 3.48, -13.88 5.76, -15.3 8.21 C-16.72 10.65, -17.3 14.7, -16.07 16.76 C-14.84 18.83, -10.52 20.42, -7.94 20.59 C-5.35 20.75, -1.97 19.32, -0.56 17.76 C0.86 16.19, 0.87 13.23, 0.54 11.18 C0.21 9.14, -2.45 7.34, -2.54 5.48 C-2.63 3.62, -0.42 0.91, 0 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                </g>
                            </g>
                            <g stroke-linecap="round">
                                <g transform="translate(40.89827917904199 24.84969486563196) rotate(0 -9.25990071061176 23.7444720981576)">
                                    <path d="M0 0 C0.55 0.93, 1.46 3.48, 3.28 5.6 C5.1 7.71, 13.3 8.03, 10.92 12.71 C8.54 17.39, -4.98 27.86, -11.01 33.67 C-17.04 39.49, -22.2 46.11, -25.27 47.6 C-28.34 49.1, -33.41 50.62, -29.44 42.67 C-25.47 34.71, -6.13 7.02, -1.47 -0.12 M0 0 C0.55 0.93, 1.46 3.48, 3.28 5.6 C5.1 7.71, 13.3 8.03, 10.92 12.71 C8.54 17.39, -4.98 27.86, -11.01 33.67 C-17.04 39.49, -22.2 46.11, -25.27 47.6 C-28.34 49.1, -33.41 50.62, -29.44 42.67 C-25.47 34.71, -6.13 7.02, -1.47 -0.12" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                </g>
                            </g>
                        </svg> -->
                    <!-- </button> -->
                    <!-- <button on:click={() => console.log('clicked')} class="w-full h-full flex justify-center items-center cursor-pointer hover:bg-zinc-200 outline-none focus-visible:text-sky-400 group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.12377844690377 83.65464768345012" class="w-1/2 aspect-square">
                            <g stroke-linecap="round">
                                <g transform="translate(62.56705659498198 7.754143913107356) rotate(16.150310021680614 -7.765904571119677 10.293427525460274)">
                                    <path d="M0 0 C-1.26 0.35, -4.98 0.75, -7.53 2.11 C-10.08 3.48, -13.88 5.76, -15.3 8.21 C-16.72 10.65, -17.3 14.7, -16.07 16.76 C-14.84 18.83, -10.52 20.42, -7.94 20.59 C-5.35 20.75, -1.97 19.32, -0.56 17.76 C0.86 16.19, 0.87 13.23, 0.54 11.18 C0.21 9.14, -2.45 7.34, -2.54 5.48 C-2.63 3.62, -0.42 0.91, 0 0 M0 0 C-1.26 0.35, -4.98 0.75, -7.53 2.11 C-10.08 3.48, -13.88 5.76, -15.3 8.21 C-16.72 10.65, -17.3 14.7, -16.07 16.76 C-14.84 18.83, -10.52 20.42, -7.94 20.59 C-5.35 20.75, -1.97 19.32, -0.56 17.76 C0.86 16.19, 0.87 13.23, 0.54 11.18 C0.21 9.14, -2.45 7.34, -2.54 5.48 C-2.63 3.62, -0.42 0.91, 0 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                </g>
                            </g>
                            <g stroke-linecap="round">
                                <g transform="translate(40.89827917904199 24.84969486563196) rotate(0 -9.25990071061176 23.7444720981576)">
                                    <path d="M0 0 C0.55 0.93, 1.46 3.48, 3.28 5.6 C5.1 7.71, 13.3 8.03, 10.92 12.71 C8.54 17.39, -4.98 27.86, -11.01 33.67 C-17.04 39.49, -22.2 46.11, -25.27 47.6 C-28.34 49.1, -33.41 50.62, -29.44 42.67 C-25.47 34.71, -6.13 7.02, -1.47 -0.12 M0 0 C0.55 0.93, 1.46 3.48, 3.28 5.6 C5.1 7.71, 13.3 8.03, 10.92 12.71 C8.54 17.39, -4.98 27.86, -11.01 33.67 C-17.04 39.49, -22.2 46.11, -25.27 47.6 C-28.34 49.1, -33.41 50.62, -29.44 42.67 C-25.47 34.71, -6.13 7.02, -1.47 -0.12" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                </g>
                            </g>
                        </svg>
                    </button> -->
                    <button on:click={() => console.log('clicked')} class="opacity-30 w-full h-full flex justify-center items-center cursor-pointer hover:bg-zinc-200 outline-none focus-visible:text-sky-400 group">
                        <div class=" outline-sky-500 focus:outline-[0.6vw] h-[8vw] xs:h-10 rounded-full aspect-square bg-zinc-500 text-mainlight border-[0.6vw] xs:border-2 border-zinc-900 flex justify-center items-center relative overflow-hidden group-focus-visible:ring-2 group-focus-visible:ring-sky-400">
                            <Icon icon="material-symbols:person" class="text-[10vw] xs:text-[50px] translate-y-[1.2vw] xs:translate-y-[6px] absolute" />
                        </div>
                    </button>
                </div>
            </nav>   
        {/if}

        <div
            aria-label="background-search"
            role="presentation"
            tabindex="-1"
            on:click={() => {
                isSOpen = false;
                searchInput?.blur();
            }}
            class="fixed bg-zinc-900/50 w-full h-[120dvh] top-0 z-51 outline-none backdrop-blur-[2px]"
            class:hidden={!isSOpen}
        ></div>



        <!-- 4vw = 20px -->
        <section class="text-zinc-900 min-h-screen flex flex-col">

            <!-- Content -->
            <main class="min-h-screen">
                <slot />
            </main>

        </section>
        



        <Footer />
    </section>
</section>