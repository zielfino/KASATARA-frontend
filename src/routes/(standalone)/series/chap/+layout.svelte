<script lang="ts">
    import "$lib/app.css";
    import Icon from "@iconify/svelte";
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";
    import { fade } from "svelte/transition";

    
    let speed:number = 1.0;
    const ticks = [0.5, 0.75, 1.0, 1.25, 1.5];

    // === State ===
    let autoPlay = false;
    let stopButton: HTMLButtonElement | null = null;
    $: if (autoPlay && stopButton) {
        // Fokus ke tombol saat autoPlay aktif
        stopButton.focus();
    }
    // let showAutoPlayUI = false;

    // function toggleNonaktif() {
    //     if (!autoPlay) {
    //         showAutoPlayUI = true;
    //         setTimeout(() => {
    //             autoPlay = true;
    //             handleAutoScroll()
    //         }, 10);
    //     } else {
    //         autoPlay = false;
    //         setTimeout(() => {
    //             showAutoPlayUI = false;
    //             handleAutoScroll()
    //         }, 10);
    //     }
    // }

    let navShow = true;
    let lastScrollY = 0;
    // let slotWrapper: HTMLDivElement;

    let settings = false;
    $: {
        if (typeof window !== 'undefined') {
            document.body.style.overflow = settings ? 'hidden' : 'auto';
        }
    }

    // === Responsive Stores ===
    const phone = writable(false);
    const tablet = writable(false);
    const desktop = writable(false);
    const desktopex = writable(false);
    const desktoplarge = writable(false);
    const touchscreen = writable(false);
    const mousecontrol = writable(false);

    // === Toggle AutoPlay ===
    function toggleAutoPlay() {
        autoPlay = !autoPlay;
        localStorage.setItem("autoPlay", autoPlay.toString());
    }

    let suppressScrollHandler = false;
    // === Scroll Handler ===
    function handleScroll() {
        if (suppressScrollHandler) return;
        
        const currentY = window.scrollY;
        navShow = currentY < lastScrollY || currentY < 10;
        lastScrollY = currentY;
        chaplist = false;
        // commentDisplay = false;
    }

    // === Resize Handler ===
    function updateDeviceFlags() {
        phone.set(window.innerWidth <= 500);
        tablet.set(window.innerWidth <= 700);
        desktop.set(window.innerWidth >= 900);
        desktopex.set(window.innerWidth >= 1300);
        desktoplarge.set(window.innerWidth >= 1100);
        touchscreen.set(window.matchMedia('(orientation: portrait)').matches);
        mousecontrol.set(window.matchMedia('(orientation: landscape)').matches);
    }

    // === Lifecycle Hooks ===
    onMount(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            // Restore autoPlay preference
            const savedReadQuality = localStorage.getItem("readQuality") || 'mid';
            const savedScrollSpeed = localStorage.getItem("scrollSpeed") || '1';
            // autoPlay = false;
            localStorage.setItem("autoPlay", 'false');
            localStorage.setItem("marathonMode", 'false');
            localStorage.setItem("readQuality", savedReadQuality.toString());
            localStorage.setItem("scrollSpeed", savedScrollSpeed.toString());
            // speed = localStorage.setItem("scrollSpeed", savedScrollSpeed.toString());
            if (savedScrollSpeed !== null) {
                speed = parseFloat(savedScrollSpeed);
            }

            // Slot height detection
            // if (slotWrapper) {
            //     slotHeight = slotWrapper.offsetHeight;
            //     console.log('Slot height:', slotHeight);
            // }

            // Scroll
            window.addEventListener('scroll', handleScroll);

            // Resize
            updateDeviceFlags();
            window.addEventListener('resize', updateDeviceFlags);
            
            // window.addEventListener('scroll', updateScrollProgress);
            // updateScrollProgress();
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateDeviceFlags);
            // window.removeEventListener('scroll', updateScrollProgress);
        }
    });


    let slotWrapper: HTMLDivElement;
    let contentH: number = 0;  
    let scrollPercent = 0;
    let hoverPercent: number | null = null;
    let savedScrollPercent = 0;

    // function updateScrollProgress() {
    //     if (typeof window !== 'undefined') {
    //         if (!slotWrapper) return;
    //         const contentHeight = slotWrapper.offsetHeight;
    //         const viewportHeight = window.innerHeight;
    //         const scrollY = window.scrollY;
    //         const maxScroll = contentHeight - viewportHeight;

    //         scrollPercent = Math.min(100, (scrollY / maxScroll) * 100);    
    //     }    
    // }

    // function handleBarClick(event: MouseEvent) {
    //     if (typeof window !== 'undefined') {
    //         const bar = event.currentTarget as HTMLDivElement;
    //         const rect = bar.getBoundingClientRect();
    //         const clickX = event.clientX - rect.left;
    //         const ratio = clickX / rect.width;

    //         const contentHeight = slotWrapper.offsetHeight;
    //         const viewportHeight = window.innerHeight;
    //         const maxScroll = contentHeight - viewportHeight;

    //         const targetScrollY = ratio * maxScroll;
    //         window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    //     }
    // }
    
    function handleHoverMove(event: MouseEvent) {
        const bar = event.currentTarget as HTMLDivElement;
        const rect = bar.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        hoverPercent = Math.max(0, Math.min(100, percent)); // Clamp antara 0–100
    }









    function updateScroll() {
        if (typeof window === 'undefined' || !slotWrapper) return;
        contentH = slotWrapper.offsetHeight;
        const viewH = window.innerHeight;
        const max = contentH - viewH;
        scrollPercent = max > 0 ? (window.scrollY / max) * 100 : 0;
    }

    function handleRangeInput(e: Event) {
        if (typeof window === 'undefined' || !slotWrapper) return;
        const v = parseFloat((e.target as HTMLInputElement).value);
        scrollPercent = v;
        const contentH = slotWrapper.offsetHeight;
        const viewH = window.innerHeight;
        const max = contentH - viewH;
        window.scrollTo({ top: (v / 100) * max, behavior: 'auto' });
    }

    function handleTouchMove(event: TouchEvent) {
        if (!event.touches.length) return;

        const touch = event.touches[0];
        const bar = event.currentTarget as HTMLElement;
        const rect = bar.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const percent = (x / rect.width) * 100;
        hoverPercent = Math.max(0, Math.min(100, percent));
    }

    onMount(() => {
        if (typeof window === 'undefined') return;
        window.addEventListener('scroll', updateScroll);
        updateScroll();
    });

    onDestroy(() => {
        if (typeof window === 'undefined') return;
        window.removeEventListener('scroll', updateScroll);
    });




    let marathonMode:boolean = false
    // let marathonSave:boolean = false

    function saveSettings () {
        settings = !settings
        localStorage.setItem("marathonMode", marathonMode.toString());
        localStorage.setItem("readQuality", readQuality.toString());
        localStorage.setItem("scrollSpeed", speed.toString());
    }

    // type ReadQuality = 'low' | 'mid' | 'high';
    const validReadQualities = ['low', 'mid', 'high'] as const;
    type ReadQuality = typeof validReadQualities[number];
    let readQuality: ReadQuality = 'mid'; // default

    // const validReadQualities: ReadQuality[] = ['low', 'mid', 'high'];

    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem("readQuality");
        if (validReadQualities.includes(saved as ReadQuality)) {
            readQuality = saved as ReadQuality;
        }
    }


    // console.log(savedReadQuality)
    // let slotWrapper: HTMLDivElement;
    //   let autoPlay = false;  // toggle autoplay
    let accSpeed = speed * 75;        // piksel per detik
    $: accSpeed = speed * 75;

    let intervalId: ReturnType<typeof setInterval>;

    // function startAutoScroll() {
    //     if (!slotWrapper) return;
    //     stopAutoScroll();                      // clear interval sebelumnya
    //     slotWrapper.style.overflowY = 'hidden';

    //     intervalId = setInterval(() => {
    //         if (!slotWrapper) return;
    //         const max:number = slotWrapper.scrollHeight;
    //         const left:number = slotWrapper.scrollHeight - Math.round(window.scrollY);
    //         const curr:number = Math.round(window.scrollY) + Math.round(window.innerHeight);
    //             console.log('Tinggi Container:' + max)
    //             console.log('Sisa Move:' + left)
    //             console.log('Posisi Sekarang:' + curr)
    //             console.log('Posisi Sekarang:' + (max - 10))
    //         if (curr < (max - 10)) {
    //             slotWrapper.scrollTo({ top: Math.min(curr + accSpeed, max), behavior: 'smooth' });
    //             console.log(slotWrapper.scrollTop)
    //         } else {
    //             slotWrapper.scrollTo({ top: max, behavior: 'smooth' });
    //             stopAutoScroll();
    //             autoPlay = false;
    //         }
    //     }, 250);
    // }

    function startAutoScroll() {
        if (!slotWrapper) return;

        stopAutoScroll(); // Clear interval sebelumnya

        // Optional: Matikan scroll manual (misalnya dengan style overflow)
        document.body.style.overflowY = 'hidden';

        // intervalId = setInterval(() => {
        //     if (!slotWrapper) return;

        //     const max = slotWrapper.scrollHeight - window.innerHeight;
        //     const curr = window.scrollY;
        //     const next = Math.min(curr + accSpeed, max);

        //     console.log('Tinggi Konten:', slotWrapper.scrollHeight);
        //     console.log('Scroll Saat Ini:', curr);
        //     console.log('Scroll Target:', next);

        //     if (curr >= max - 10) {
        //         window.scrollTo({ top: max, behavior: 'smooth' });
        //         stopAutoScroll();
        //         autoPlay = false;
        //     } else {
        //         window.scrollTo({ top: next, behavior: 'smooth' });
        //     }
        // }, 250);
        intervalId = setInterval(() => {
            if (!slotWrapper) return;

            const max = slotWrapper.scrollHeight - window.innerHeight;
            const curr = window.scrollY;
            const next = Math.min(curr + accSpeed, max);

            if (curr >= max - 10) {
                scrollToSmoothly(max, 250); // scroll ke bawah selama 250ms
                stopAutoScroll();
                handleAutoScroll();
                // autoPlay = false;
            } else {
                scrollToSmoothly(next, 250); // scroll 50px selama 250ms
            }
        }, 250);
    }

    function stopAutoScroll() {
        if (typeof window !== 'undefined') {
            clearInterval(intervalId);
            document.body.style.overflowY = 'auto';
        }
    }

    // Hanya trigger startAutoScroll sekali saat autoPlay berubah ke true
    $: if (autoPlay) startAutoScroll();
    // Trigger stopAutoScroll sekali saat autoPlay berubah ke false
    $: if (!autoPlay) stopAutoScroll();

    onDestroy(() => {
        stopAutoScroll();
    });

    function scrollToSmoothly(target: number, duration: number = 250) {
        const start = window.scrollY;
        const distance = target - start;
        const startTime = performance.now();

        function step(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeLinear(progress);

            window.scrollTo(0, start + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    function easeInOutQuad(t: number) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function easeLinear(t: number) {
        return t; // langsung linear, tidak ada easing
    }



    function handleAutoScroll () {
        if (settings) return;
        if (window.scrollY > 10) {
            navShow = !navShow;
        }
        chaplist = false;
        // commentDisplay = false;
        if (autoPlay) {
            chaplist = false;
            // commentDisplay = false;
            autoPlay = false 
            localStorage.setItem("autoPlay", 'false')    
            setTimeout(() => {
                navShow = !navShow;
            }, 300);
        }
    }

    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Biar scroll-nya halus
        });
    }















    
    import { getInitialDark, applyDarkClass, toggleDarkMode } from '$lib/theme';

    let isDark = false;

    onMount(() => {
        isDark = getInitialDark();
        applyDarkClass(isDark);
    });

    function switchTheme() {
        toggleDarkMode();
        isDark = !isDark;
    }









    
    import { contentWidth } from '$lib/stores/contentWidth';
    let width = 500;

    // const unsubscribe = contentWidth.subscribe(val => width = val);

    // export function waitForLayout(): Promise<void> {
    //     return new Promise(resolve => {
    //         requestAnimationFrame(() => {
    //             requestAnimationFrame(resolve);
    //         });
    //     });
    // }

    function zoomIn() {
        // const viewH = window.innerHeight;
        // const contentH = slotWrapper.offsetHeight;
        // const max = contentH - viewH;
        updateScroll();
        savedScrollPercent = scrollPercent;
        // const pixel = (savedScrollPercent / 100) * max;

        // if (window.innerWidth > 500)
        contentWidth.increase();
        
        suppressScrollHandler = true;

        requestAnimationFrame(() => {
            const viewH = window.innerHeight;
            const newContentH = slotWrapper.offsetHeight;
            const max = newContentH - viewH;
            const pixel = (savedScrollPercent / 100) * max;

            window.scrollTo({ top: pixel, behavior: 'auto' });

            setTimeout(() => {
                suppressScrollHandler = false;
            }, 50);
        });

        // window.scrollTo({ top: pixel, behavior: 'smooth' });
    }

    // function zoomOut() {
    //     const viewH = window.innerHeight;
    //     const contentH = slotWrapper.offsetHeight;
    //     const max = contentH - viewH;
    //     savedScrollPercent = scrollPercent;
    //     const pixel = (savedScrollPercent / 100) * max;
        
    //     if (window.innerWidth > 500)
    //     contentWidth.decrease();
    //     window.scrollTo({ top: pixel, behavior: 'smooth' });
    
    // }

    // async function zoomIn() {
    //     if (window.innerWidth <= 500) return;

    //     updateScroll();
    //     savedScrollPercent = scrollPercent;

    //     contentWidth.increase();

    //     await waitForLayout(); // ✅ Tunggu layout selesai dulu

    //     const viewH = window.innerHeight;
    //     const newContentH = slotWrapper.offsetHeight;
    //     const max = newContentH - viewH;
    //     const pixel = (savedScrollPercent / 100) * max;

    //     window.scrollTo({ top: pixel, behavior: 'auto' });
    // }

    function zoomOut() {
        if (window.innerWidth <= 500) return;

        updateScroll();
        savedScrollPercent = scrollPercent;

        contentWidth.decrease();
        suppressScrollHandler = true;

        requestAnimationFrame(() => {
            const viewH = window.innerHeight;
            const newContentH = slotWrapper.offsetHeight;
            const max = newContentH - viewH;
            const pixel = (savedScrollPercent / 100) * max;

            window.scrollTo({ top: pixel, behavior: 'auto' });

            setTimeout(() => {
                suppressScrollHandler = false;
            }, 50);
        });
    }




    let chaplist = false;

    function toggleChaplist() {
        chaplist = !chaplist;
    }


    let commentDisplay = false

    function togglecomment() {
        suppressScrollHandler = true;
        commentDisplay = !commentDisplay;

        if (commentDisplay) {
            updateScroll();
            // console.log(contentH)
            // console.log((scrollPercent/ 100) * contentH)
            savedScrollPercent = scrollPercent;
            window.scrollTo({ top: 0, behavior: 'auto' });
        } else {
            const viewH = window.innerHeight;
            const max = contentH - viewH;
            const pixel = (savedScrollPercent / 100) * max;
            // console.log(pixel)

            requestAnimationFrame(() => {
                window.scrollTo({ top: pixel, behavior: 'auto' });

                setTimeout(() => {
                    suppressScrollHandler = false;
                }, 50);
            });
        }
    }

</script>


<section class="bg-mainlight dark:bg-zinc-900 transition-colors duration-300 flex flex-col items-center justify-center w-full relative">

    <!-- SETTINGS POP UP -->
    {#if settings}
    <div transition:fade={{ duration: 150 }} class="fixed w-full left-0 top-0 backdrop-blur-xs h-full bg-zinc-900/80 text-zinc-700 dark:text-mainlight z-150 flex justify-center items-center">
        <div class="min-w-64 min-h-64 bg-stone-200 dark:bg-zinc-900 border-2 rounded-xl border-mainlight/30 flex flex-col items-center">
            <div class="w-full flex justify-between items-center">
                <div class="px-6 py-4">Settings</div>
                <button on:click={() => settings = !settings} class="cursor-pointer p-4 mr-2"><Icon icon="maki:cross" /></button>
            </div>
            <div class="bg-zinc-700 dark:bg-mainlight/30 h-[1.5px] w-[90%] rounded-full"></div>
            <div class="px-4 py-3 pb-4 space-y-3">
                <div>
                    <div class="mb-2">Read Mode</div>
                    <div class="flex space-x-4 justify-center">
                        <button on:click={() => marathonMode = false} class={`flex flex-col justify-center items-center text-sm font-[400] leading-[1] tracking-wide w-24 h-24 rounded-xl text-center
                        ${marathonMode ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-zinc-700 dark:border-mainlight' 
                        : 'border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-4xl mb-1" icon="mingcute:walk-fill" />
                            Normal Mode
                        </button>
                        <button on:click={() => marathonMode = true}  class={`flex flex-col justify-center items-center text-sm font-[400] leading-[1] tracking-wide w-24 h-24 rounded-xl text-center
                        ${!marathonMode ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-zinc-700 dark:border-mainlight' 
                        : 'border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-4xl mb-1" icon="mingcute:run-fill" />
                            Marathon Mode
                        </button>
                    </div>
                </div>
                
                <div>
                    <div class="mb-2">Read Quality</div>
                    <div class="flex space-x-4 justify-center">
                        <button on:click={() => readQuality = 'low'} class={`flex flex-col justify-center items-center text-sm font-[400] leading-[1] tracking-wide w-24 h-24 rounded-xl text-center
                        ${readQuality !== 'low' ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-zinc-700 dark:border-mainlight' 
                        : 'border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-5xl mb-1" icon="mdi:quality-low" />
                            Data Saver
                        </button>
                        <button on:click={() => readQuality = 'mid'}  class={`flex flex-col justify-center items-center text-sm font-[400] leading-[1] tracking-wide w-24 h-24 rounded-xl text-center
                        ${readQuality !== 'mid' ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-zinc-700 dark:border-mainlight' 
                        : 'border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-5xl mb-1" icon="mdi:quality-medium" />
                            Normal Quality
                        </button>
                        <button on:click={() => readQuality = 'high'}  class={`flex flex-col justify-center items-center text-sm font-[400] leading-[1] tracking-wide w-24 h-24 rounded-xl text-center
                        ${readQuality !== 'high' ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-zinc-700 dark:border-mainlight' 
                        : 'border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-5xl mb-1" icon="mdi:quality-high" />
                            Full Quality
                        </button>
                    </div>
                </div>

                <div class="w-full">
                    <div class="mb-2">Scroll Speed</div>
                    <div class="flex space-x-4 w-full">
                        <div class="min-w-64 w-full">
                            <!-- <label for="autoscroll" class="block text-lg font-semibold mb-2">Autoscroll Speed</label> -->
                            
                            <div class="relative w-full flex flex-col items-center justify-center">
                                <input
                                id="autoscroll"
                                type="range"
                                min="0.5"
                                max="1.5"
                                step="0.05"
                                bind:value={speed}
                                class="w-[94%] h-2 bg-neutral-600 rounded-lg cursor-pointer accent-mainred outline-none"
                                />
                                <div class="flex w-[95%] justify-between items-center mt-2">
                                    <Icon icon="ph:line-vertical" class="text-lg"/> 
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical" class="text-lg"/> 
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical" class="text-lg"/> 
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical" class="text-lg"/> 
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[12px]"/>
                                    <Icon icon="ph:line-vertical" class="text-lg"/> 
                                </div>
                                <div class="flex w-full justify-between text-xs text-neutral-400 mt-1 px-1">
                                    {#each ticks as tick}
                                    <div class="w-5 flex justify-center">{tick}</div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-zinc-700 dark:bg-mainlight/30 h-[1.5px] w-[90%] rounded-full"></div>
            <!-- {#if showAutoPlayUI} -->
            <div class="px-4 py-3 w-full space-x-2 flex justify-end">
                <button on:click={saveSettings} class="text-mainlight bg-mainred border-2 border-mainred hover:bg-mainred/30 transition-all cursor-pointer px-3 py-1 rounded-md">Save</button>
                <button on:click={() => settings = !settings} class="border-2 border-zinc-900/30 dark:border-mainlight/30 dark:hover:bg-mainlight/15 hover:bg-zinc-900/15 transition-all dark:hover:border-mainlight hover:border-zinc-900 cursor-pointer px-3 py-1 rounded-md">Later</button>
            </div>
            <!-- {/if} -->
        </div>
    </div>
    {/if}

    <!-- TOP NAV -->

    <div class={`${settings ? '' : ''} fixed w-full z-100 top-0 bg-mainlight xs:bg-stone-200 dark:bg-zinc-800 text-zinc-700 dark:text-mainlight text-[2.8vw] xs:text-sm flex justify-center transition duration-300 ${navShow ? '' : '-translate-y-[11.2vw] xs:-translate-y-[56px]'}`}>
        
        <div class="w-[1200px] flex justify-between items-center">

            <!-- PHONE -->
            {#if $phone}
            
            <div class="flex items-center justify-center h-[11.2vw] w-full">
                <a href="/" tabindex="0" aria-label="home">
                    <svg class="h-[4.5vw] fill-mainred dark:fill-mainlight transition-all duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860.59 118.52">
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
                </a>
            </div>
            
            <button tabindex={navShow ? 0 : -1} on:click={switchTheme} class={`absolute right-0 order-2 mx-3 cursor-pointer group outline-none`}>
                <div class="">
                    <Icon icon="mingcute:moon-line" class={`text-[4.8vw] xs:text-2xl ${isDark ? 'group-hover:hidden group-focus-visible:hidden' : 'hidden'}`} /><Icon icon="mingcute:moon-fill" class={`text-[4.8vw] xs:text-2xl hidden ${isDark ? 'group-hover:block group-focus-visible:block' : 'hidden'}`} />
                </div>
                <div class="">
                    <Icon icon="mingcute:sun-line" class={`text-[4.8vw] xs:text-2xl ${isDark ? 'hidden' : 'group-hover:hidden'}`} /><Icon icon="mingcute:sun-fill" class={`text-[4.8vw] xs:text-2xl hidden ${isDark ? 'hidden' : 'group-hover:block'}`} />
                </div>
            </button>
            {/if}

            <!-- TABLET - DESKTOP -->
            {#if !$phone}
            <!-- LEFT -->
            <div class="flex items-center relative">
                <!-- Bacaan Series Page -->
                <a tabindex={navShow ? 0 : -1} href="/series" class="outline-none focus-visible:bg-zinc-50/5 hover:bg-zinc-50/15 active:bg-zinc-50/15 cursor-pointer h-[11.2vw] xs:h-[56px] aspect-square">
                    {#if isDark}
                    <img transition:fade={{ duration: 150 }} src="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M10.7552 3.17711C11.1549 2.93817 11.6542 2.9412 12.051 3.18498L19.9314 8.02706L20.7167 6.74904L12.8363 1.90696C11.9634 1.37064 10.8648 1.36396 9.98549 1.88965L2.83889 6.16218C2.00844 6.65865 1.5 7.555 1.5 8.52253V19.7509C1.5 21.2697 2.73122 22.5009 4.25 22.5009H7.44938V21.0009H4.25C3.55964 21.0009 3 20.4413 3 19.7509V8.52253C3 8.08275 3.23111 7.67531 3.60858 7.44965L10.7552 3.17711Z' fill='%23f8f9fa'/%3e %3cpath d='M11 12.5C11 11.9477 11.4477 11.5 12 11.5C12.5523 11.5 13 11.9477 13 12.5C13 13.0523 12.5523 13.5 12 13.5C11.4477 13.5 11 13.0523 11 12.5Z' fill='%23f8f9fa'/%3e %3cpath d='M22.5 13.25H14.5V11.75H22.5V13.25Z' fill='%23f8f9fa'/%3e %3cpath d='M14.5 17.5H22.5V16H14.5V17.5Z' fill='%23f8f9fa'/%3e %3cpath d='M11 16.75C11 16.1977 11.4477 15.75 12 15.75C12.5523 15.75 13 16.1977 13 16.75C13 17.3023 12.5523 17.75 12 17.75C11.4477 17.75 11 17.3023 11 16.75Z' fill='%23f8f9fa'/%3e %3cpath d='M14.5 21.75H22.5V20.25H14.5V21.75Z' fill='%23f8f9fa'/%3e %3cpath d='M11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21Z' fill='%23f8f9fa'/%3e %3c/svg%3e" 
                    class="p-[3.2vw] xs:p-4 max-xs:w-[11.2vw] absolute" alt="">
                    {:else}
                    <img transition:fade={{ duration: 150 }} src="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M10.7552 3.17711C11.1549 2.93817 11.6542 2.9412 12.051 3.18498L19.9314 8.02706L20.7167 6.74904L12.8363 1.90696C11.9634 1.37064 10.8648 1.36396 9.98549 1.88965L2.83889 6.16218C2.00844 6.65865 1.5 7.555 1.5 8.52253V19.7509C1.5 21.2697 2.73122 22.5009 4.25 22.5009H7.44938V21.0009H4.25C3.55964 21.0009 3 20.4413 3 19.7509V8.52253C3 8.08275 3.23111 7.67531 3.60858 7.44965L10.7552 3.17711Z' fill='%233f3f46'/%3e %3cpath d='M11 12.5C11 11.9477 11.4477 11.5 12 11.5C12.5523 11.5 13 11.9477 13 12.5C13 13.0523 12.5523 13.5 12 13.5C11.4477 13.5 11 13.0523 11 12.5Z' fill='%233f3f46'/%3e %3cpath d='M22.5 13.25H14.5V11.75H22.5V13.25Z' fill='%233f3f46'/%3e %3cpath d='M14.5 17.5H22.5V16H14.5V17.5Z' fill='%233f3f46'/%3e %3cpath d='M11 16.75C11 16.1977 11.4477 15.75 12 15.75C12.5523 15.75 13 16.1977 13 16.75C13 17.3023 12.5523 17.75 12 17.75C11.4477 17.75 11 17.3023 11 16.75Z' fill='%233f3f46'/%3e %3cpath d='M14.5 21.75H22.5V20.25H14.5V21.75Z' fill='%233f3f46'/%3e %3cpath d='M11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21Z' fill='%233f3f46'/%3e %3c/svg%3e" 
                    class="p-[3.2vw] xs:p-4 max-xs:w-[11.2vw] absolute" alt="">
                    {/if}
                </a>
                <!-- Chapter List Pop Up -->
                <div class="relative">
                    <button on:click={toggleChaplist} tabindex={navShow ? 0 : -1} class="ml-[3.2vw] xs:ml-4 cursor-pointer focus-visible:underline outline-none hover:underline active:underline line-clamp-1">Sky-Breaking Sword Saint (3)</button> 
                    {#if chaplist}
                    <div transition:fade={{ duration: 150 }} class="fixed z-101 pt-2 pl-3">
                        <div class="bg-stone-100 dark:bg-zinc-800 rounded-md border border-stone-300 dark:border-zinc-700 w-72 h-64 
                    scrollbar scrollbar-thumb-zinc-700 dark:scrollbar-thumb-mainlight scrollbar-track-mainlight/0 overflow-y-scroll transition-colors duration-300 p-2">
                            <div class="w-full h-12 border-b border-zinc-400 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Sky-Breaking Sword Saint (4) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, commodi?</span> <span class="opacity-70 dark:opacity-40">#19</span></div>
                            <div class="w-full h-12 border-b border-zinc-400 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Sky-Breaking Sword Saint (3)</span> <span class="opacity-70 dark:opacity-40">#18</span></div>
                            <div class="w-full h-12 border-b border-zinc-400 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Sky-Breaking Sword Saint (2)</span> <span class="opacity-70 dark:opacity-40">#17</span></div>
                            <div class="w-full h-12 border-b border-zinc-400 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Sky-Breaking Sword Saint (1)</span> <span class="opacity-70 dark:opacity-40">#16</span></div>
                            <div class="w-full h-12 border-b border-zinc-400 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Miracle testing (4)</span> <span class="opacity-70 dark:opacity-40">#15</span></div>
                            <div class="w-full h-12 border-b border-zinc-400 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Miracle testing (3)</span> <span class="opacity-70 dark:opacity-40">#14</span></div>
                            <div class="w-full h-12 border-b border-zinc-400 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Miracle testing (2)</span> <span class="opacity-70 dark:opacity-40">#13</span></div>
                            <div class="w-full h-12 border-zinc-400 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Load more...</span></div>
                        </div>
                    </div>
                    {/if}
                </div>
            </div>

            <!-- RIGHT -->
            <div class="h-full flex items-center mr-[1.6vw] xs:mr-4">
                
                <button tabindex={navShow ? 0 : -1} on:click={switchTheme} class={`order-2 mx-3 cursor-pointer group outline-none`}>
                    <div class="">
                        <Icon icon="mingcute:moon-line" class={`text-[4.8vw] xs:text-2xl ${isDark ? 'group-hover:hidden group-focus-visible:hidden' : 'hidden'}`} /><Icon icon="mingcute:moon-fill" class={`text-[4.8vw] xs:text-2xl hidden ${isDark ? 'group-hover:block group-focus-visible:block' : 'hidden'}`} />
                    </div>
                    <div class="">
                        <Icon icon="mingcute:sun-line" class={`text-[4.8vw] xs:text-2xl ${isDark ? 'hidden' : 'group-hover:hidden'}`} /><Icon icon="mingcute:sun-fill" class={`text-[4.8vw] xs:text-2xl hidden ${isDark ? 'hidden' : 'group-hover:block'}`} />
                    </div>
                </button>

                <button tabindex={navShow ? 0 : -1} on:click={togglecomment} class=" outline-none order-3 mx-3 cursor-pointer group">
                    
                    {#if commentDisplay}
                    <Icon icon="mingcute:document-line" class={`text-[4.8vw] xs:text-2xl group-hover:hidden`} />
                    <Icon icon="mingcute:document-fill" class={`text-[4.8vw] xs:text-2xl hidden group-hover:block`} />
                    {:else if !commentDisplay}
                    <Icon icon="mingcute:comment-line" class={`text-[4.8vw] xs:text-2xl group-hover:hidden`} />
                    <Icon icon="mingcute:comment-fill" class={`text-[4.8vw] xs:text-2xl hidden group-hover:block`} />
                    {/if}

                </button>   
                {#if !commentDisplay}
                <button tabindex={navShow ? 0 : -1} on:click={() => settings = !settings} class="order-1 mx-3 cursor-pointer group outline-none"><Icon icon="iconamoon:settings" class={`text-[4.8vw] xs:text-2xl group-hover:hidden group-focus-visible:hidden`} /><Icon icon="iconamoon:settings-fill" class={`text-[4.8vw] xs:text-2xl hidden group-hover:block group-focus-visible:block`} /></button>   
                {/if}

                {#if !$tablet}
                <!-- <button tabindex={navShow ? 0 : -1} on:click={toggleAutoPlay} class={`mx-3 cursor-pointer group outline-none`}>
                    <div class="">
                        <Icon icon="iconamoon:player-play" class={`text-[4.8vw] xs:text-2xl ${!autoPlay ? 'group-hover:hidden group-focus-visible:hidden' : 'hidden'}`} /><Icon icon="iconamoon:player-play-fill" class={`text-[4.8vw] xs:text-2xl hidden ${!autoPlay ? 'group-hover:block group-focus-visible:block' : 'hidden'}`} />
                    </div>
                    <div class="">
                        <Icon icon="iconamoon:player-pause" class={`text-[4.8vw] xs:text-2xl ${!autoPlay ? 'hidden' : 'group-hover:hidden'}`} /><Icon icon="iconamoon:player-pause-fill" class={`text-[4.8vw] xs:text-2xl hidden ${!autoPlay ? 'hidden' : 'group-hover:block'}`} />
                    </div>
                </button> -->
                <!-- <div class="mx-3 cursor-pointer group"><Icon icon="iconamoon:lightning-1" class={`text-[4.8vw] xs:text-2xl group-hover:hidden`} /><Icon icon="iconamoon:lightning-1-fill" class={`text-[4.8vw] xs:text-2xl hidden group-hover:block`} /></div> -->

                <div class="order-3 flex items-center cursor-pointer ml-4"><Icon icon="ph:caret-left-bold" class={`text-[4.8vw] xs:text-2xl mr-3`} />Prev</div>
                <div class="order-3 border-r border-[1.5px] rounded-full h-4 mx-4 opacity-40"></div>
                <div class="order-3 flex items-center cursor-pointer">Next<Icon icon="ph:caret-right-bold" class={`text-[4.8vw] xs:text-2xl ml-3`} /></div>
                {/if}
            </div>
            {/if}

        </div>


        <!-- <div class="absolute bg-zinc-50 top-full w-full h-[0.8vw] xs:h-1 hover:h-3 cursor-pointer peer"><div class="w-1/3 bg-red-500 h-full"></div></div> -->
        <!-- <div
            class={`absolute bg-zinc-500 top-full w-full h-[0.8vw] xs:h-1 hover:h-3 transition-[height] duration-150 cursor-pointer peer`}
            role="button" tabindex="0" on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBarClick}}
            on:click={handleBarClick}
            on:mousemove={handleHoverMove}
            on:mouseleave={() => hoverPercent = null}
        >
            <div
                class="bg-mainlight h-full"
                style={`width: ${scrollPercent}%;`}
            ></div>
        </div> -->

        <!-- PROGRESS BAR -->
        {#if !commentDisplay}
        <div class="absolute bg-zinc-500 top-full w-full h-[0.8vw] xs:h-1 hover:h-3 transition-[height] duration-150 cursor-pointer peer">
            <div class="absolute w-full h-full bg-zinc-500 overflow-hidden">
                <div
                class="h-full bg-mainred"
                style={`width:${scrollPercent}%`}
                ></div>
            </div>

            <!-- Thumb -->
            <!-- <div
                class="absolute bottom-0 h-3 w-3 bg-mainred rounded-full pointer-events-none"
                style={`left:calc(${scrollPercent}% - 0.375rem); bottom: calc(0.5rem - 0.75rem);`}
            ></div> -->

            <!-- Invisible range overlay untuk drag/click -->
             
            <!-- {#if scrollPercent <= 100} -->
            <input
                type="range"
                min="0" max="100" step="0.1"
                value={scrollPercent}
                on:input={handleRangeInput}
                on:mousemove={handleHoverMove}
                on:mouseleave={() => hoverPercent = null}
                on:touchmove={handleTouchMove}
                on:touchstart={handleTouchMove}
                on:touchend={() => hoverPercent = null}
                class={`absolute inset-x-0 w-full h-full cursor-pointer transition-all outline-none accent-mainred appearance-none focus-visible:appearance-auto focus-visible:accent-sky-400 ${navShow && scrollPercent <= 100 && !hoverPercent ? 'range-custom' : 'range-before'}`}
            />
            <!-- {/if} -->
        </div>

        <!-- FLYING OBJECT -->
        {#if hoverPercent !== null}
        <div class="absolute bg-zinc-800 text-mainlight top-[calc(100%+24px)] py-0.5 px-1.5 rounded-md z-3" transition:fade={{ duration: 150 }}>{Math.round(hoverPercent)}%</div>
        {/if}
        {#if navShow && scrollPercent <= 100}
        <div class={`absolute bg-zinc-700/55 top-[calc(100%+16px)] py-[0.4vw] xs:py-0.5 px-[1.2vw] text-mainlight xs:px-1.5 rounded-[1.2vw] xs:rounded-md text-[2.4vw] xs:text-xs z-2 transition ${navShow?'':'opacity-0'} ${hoverPercent !== null ? 'opacity-0' : ''}`} transition:fade={{ duration: 150 }}>Direkomendasikan 13 tahun ke atas</div>
        {/if}
        {/if}

    </div>



    <!-- STOP BUTTON ON AUTOPLAY ACTIVE -->
    <!-- {#if autoPlay} -->
    <div class={`fixed w-full z-100 bottom-0 flex justify-center transition duration-300 ${autoPlay ? 'delay-500' : 'translate-y-[16.8vw] xs:translate-y-[84px] sm:translate-y-0 sm:translate-x-[84px]'}`}>
        <div class="absolute bottom-[3.2vw] right-[3.2vw] xs:bottom-[16px] xs:right-[16px] text-sm text-zinc-600 dark:text-mainlight space-x-[2.4vw] xs:space-x-3">
            <button bind:this={stopButton} on:click={handleAutoScroll} tabindex={autoPlay ? 0 : -1} class="p-[2.4vw] outline-none focus-visible:bg-zinc-700 xs:p-3 rounded-full relative bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-colors duration-300 group">
                <Icon icon="iconamoon:player-pause" class={`text-[4.8vw] xs:text-2xl`} />
                <!-- <Icon icon="iconamoon:player-pause-fill" class={`text-[4.8vw] xs:text-2xl hidden ${autoPlay ? 'group-hover:block' : 'hidden'}`} /> -->
            </button>
        </div>
    </div>
    <!-- {/if} -->


    <!-- NAV SHIT IDONTKNOW HOW TO ORDER -->
    <!-- {#if !commentDisplay} -->
    <div class={`${settings ? '' : ''} fixed w-full z-100 bottom-0 flex justify-center transition duration-300 ${navShow ? '' : 'translate-y-[16.8vw] xs:translate-y-[84px] sm:translate-x-[84px] sm:translate-y-[0]'}`}>


        <div class={`absolute bottom-[3.2vw] xs:bottom-[16px] right-[3.2vw] xs:right-[16px] text-sm text-zinc-600 dark:text-mainlight space-y-[2.4vw] flex flex-col xs:space-y-3 `}>

        <!-- DESKTOP FLYTING NAV -->
        {#if !$tablet && !commentDisplay}
            {#if scrollPercent <= 100}
            <!-- PLAY BUTTON -->
            <button transition:fade={{ duration: 150 }} tabindex={navShow ? 0 : -1} on:click={toggleAutoPlay} class="p-[2.4vw] xs:p-3 rounded-full relative bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-colors duration-300">
                <div class="">
                    <Icon icon="iconamoon:player-play" class={`text-[4.8vw] xs:text-2xl ${!autoPlay ? 'group-hover:hidden group-focus-visible:hidden' : 'hidden'}`} /><Icon icon="iconamoon:player-play-fill" class={`text-[4.8vw] xs:text-2xl hidden ${!autoPlay ? 'group-hover:block group-focus-visible:block' : 'hidden'}`} />
                </div>
                <div class="">
                    <Icon icon="iconamoon:player-pause" class={`text-[4.8vw] xs:text-2xl ${!autoPlay ? 'hidden' : 'group-hover:hidden'}`} /><Icon icon="iconamoon:player-pause-fill" class={`text-[4.8vw] xs:text-2xl hidden ${!autoPlay ? 'hidden' : 'group-hover:block'}`} />
                </div>
            </button>
            <!-- MAG BUTTON -->
            <button transition:fade={{ duration: 150 }} on:click={zoomIn} tabindex={navShow ? 0 : -1} class="p-[2.4vw] xs:p-3 rounded-full relative bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-colors duration-300">
                <Icon icon="ph:magnifying-glass-plus-bold" class={`text-2xl`} />
            </button>
            <button transition:fade={{ duration: 150 }} on:click={zoomOut} tabindex={navShow ? 0 : -1} class="p-[2.4vw] xs:p-3 rounded-full relative bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-colors duration-300">
                <Icon icon="ph:magnifying-glass-minus-bold" class={`text-2xl`} />
            </button>
            {/if}
            <!-- <button tabindex={navShow ? 0 : -1} class="p-[2.4vw] xs:p-3 rounded-full relative bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-colors duration-300">
                <Icon icon="mingcute:share-2-line" class={`text-2xl -translate-x-0.5`} />
            </button> -->
            <!-- GO TO TOP -->
            <button on:click={scrollToTop} class={`p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-all duration-300 ${!navShow && !autoPlay ? '-translate-y-[16.8vw] sm:translate-y-[0] xs:-translate-x-[84px] xs:-translate-y-[0] delay-300' : ''}`}>
                <Icon icon="mingcute:arrow-to-up-line" class={`text-2xl`} />
            </button>
        
        {:else}
            <button on:click={scrollToTop} class={`p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-all duration-300 ${!navShow && !autoPlay ? '-translate-y-[16.8vw] sm:translate-y-[0] sm:-translate-x-[84px] xs:-translate-y-[84px] delay-150' : 'translate-y-[16.8vw] sm:translate-y-[0] sm:translate-x-[84px]'}`}>
                <Icon icon="mingcute:arrow-to-up-line" class={`text-[4.8vw] xs:text-2xl`} />
            </button>
        {/if}
        </div>

        <!-- NAV TABLET - MOBILE -->
        {#if $tablet}
        <div class={`absolute bottom-[calc(6.4vw+10vw)] xs:bottom-[32px] text-sm text-zinc-600 dark:text-mainlight space-x-[2.4vw] xs:space-x-3 transition-all duration-300 ${navShow ? '' : 'translate-y-[16.8vw]'}`}>
            
            <button tabindex={navShow ? 0 : -1} class="outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight xs:bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-colors duration-300">
                <Icon icon="ph:caret-left-bold" class={`text-[4.8vw] xs:text-2xl`} />
            </button>

            <button tabindex={navShow ? 0 : -1} on:click={togglecomment} class={`${ $phone ? '' : 'hidden'} outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full bg-mainlight xs:bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-colors duration-300`}>
                <!-- <div class="relative">
                    <Icon icon="iconamoon:comment" class={`text-[4.8vw] xs:text-2xl`} />
                    <span class="absolute -top-[1.2vw] xs:-top-1.5 -right-[1.2vw] xs:-right-1.5 bg-zinc-800 active:bg-zinc-700 border-[0.4 vw] xs:border-2 border-mainlight text-zinc-600 dark:text-mainlight text-[1.6vw] xs:text-[8px] font-semibold rounded-full w-[4vw] xs:w-5 h-[4vw] xs:h-5 flex items-center justify-center">
                        1K
                    </span>
                </div> -->
                <div class="relative">
                    
                    {#if commentDisplay}
                    <Icon icon="mingcute:document-line" class={`text-[4.8vw] xs:text-2xl`} />
                    {:else if !commentDisplay}
                    <Icon icon="mingcute:comment-line" class={`text-[4.8vw] xs:text-2xl`} />
                    {/if}

                </div>
            </button>

            <button disabled={scrollPercent > 100 || commentDisplay} on:click={zoomIn} tabindex={navShow ? 0 : -1} class={`${ $phone ? 'hidden' : ''} ${scrollPercent > 100 || commentDisplay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-stone-200 dark:hover:bg-zinc-700 cursor-pointer'}  transition-all duration-300 outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full bg-mainlight xs:bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 border border-stone-300 dark:border-zinc-700 group`}>
                <div class="relative">
                    <Icon icon="ph:magnifying-glass-plus-bold" class={`text-[4.8vw] xs:text-2xl`} />
                </div>
            </button>
            
            <button disabled={scrollPercent > 100 || commentDisplay} on:click={toggleAutoPlay} tabindex={navShow ? 0 : -1} class={` ${scrollPercent > 100 || commentDisplay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-stone-200 dark:hover:bg-zinc-700 cursor-pointer'} transition-all duration-300 outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight xs:bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 border border-stone-300 dark:border-zinc-700 group`}>
                <div class="relative">
                    <Icon icon="iconamoon:player-pause" class={`text-[4.8vw] xs:text-2xl ${autoPlay ? '' : 'hidden'}`} />
                </div>
                <div class="relative">
                    <Icon icon="iconamoon:player-play" class={`text-[4.8vw] xs:text-2xl ${autoPlay ? 'hidden' : ''}`} />
                </div>
            </button>

            <button disabled={scrollPercent > 100 || commentDisplay} on:click={zoomOut} tabindex={navShow ? 0 : -1} class={`${ $phone ? 'hidden' : ''} ${scrollPercent > 100 || commentDisplay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-stone-200 dark:hover:bg-zinc-700 cursor-pointer'}  transition-all duration-300 outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full bg-mainlight xs:bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 border border-stone-300 dark:border-zinc-700 group`}>
                <div class="relative">
                    <Icon icon="ph:magnifying-glass-minus-bold" class={`text-[4.8vw] xs:text-2xl`} />
                </div>
            </button>

            <button disabled={commentDisplay} on:click={() => settings = !settings} tabindex={navShow ? 0 : -1} class={`${ $phone ? '' : 'hidden'} ${scrollPercent > 100 || commentDisplay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-stone-200 dark:hover:bg-zinc-700 cursor-pointer'} outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight xs:bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-colors duration-300`}>
                <Icon icon="iconamoon:settings" class={`text-[4.8vw] xs:text-2xl`} />
            </button>
            
            <button tabindex={navShow ? 0 : -1} class="outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight xs:bg-stone-100 dark:bg-zinc-800 active:bg-stone-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-stone-200 dark:hover:bg-zinc-700 border border-stone-300 dark:border-zinc-700 transition-colors duration-300">
                <Icon icon="ph:caret-right-bold" class={`text-[4.8vw] xs:text-2xl`} />
            </button>
        </div>
        {#if $phone}
        <div class={`absolute bottom-0 text-sm text-zinc-600 dark:text-mainlight transition-all duration-300 z-100 bg-mainlight dark:bg-zinc-800
        border border-b-0 border-stone-300 dark:border-zinc-700 rounded-t-xl w-[80vw] h-[80vw] flex flex-col items-center ${chaplist ? '' : 'translate-y-[calc(80vw-13vw)]'}`}>
            <div class="w-full text-[3.2vw]">
                <a tabindex={navShow ? 0 : -1} href="/series" class="outline-none focus-visible:bg-zinc-50/5 hover:bg-zinc-50/15 active:bg-zinc-50/15 cursor-pointer w-auto aspect-square">
                    {#if isDark}
                    <img transition:fade={{ duration: 150 }} src="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M10.7552 3.17711C11.1549 2.93817 11.6542 2.9412 12.051 3.18498L19.9314 8.02706L20.7167 6.74904L12.8363 1.90696C11.9634 1.37064 10.8648 1.36396 9.98549 1.88965L2.83889 6.16218C2.00844 6.65865 1.5 7.555 1.5 8.52253V19.7509C1.5 21.2697 2.73122 22.5009 4.25 22.5009H7.44938V21.0009H4.25C3.55964 21.0009 3 20.4413 3 19.7509V8.52253C3 8.08275 3.23111 7.67531 3.60858 7.44965L10.7552 3.17711Z' fill='%23f8f9fa'/%3e %3cpath d='M11 12.5C11 11.9477 11.4477 11.5 12 11.5C12.5523 11.5 13 11.9477 13 12.5C13 13.0523 12.5523 13.5 12 13.5C11.4477 13.5 11 13.0523 11 12.5Z' fill='%23f8f9fa'/%3e %3cpath d='M22.5 13.25H14.5V11.75H22.5V13.25Z' fill='%23f8f9fa'/%3e %3cpath d='M14.5 17.5H22.5V16H14.5V17.5Z' fill='%23f8f9fa'/%3e %3cpath d='M11 16.75C11 16.1977 11.4477 15.75 12 15.75C12.5523 15.75 13 16.1977 13 16.75C13 17.3023 12.5523 17.75 12 17.75C11.4477 17.75 11 17.3023 11 16.75Z' fill='%23f8f9fa'/%3e %3cpath d='M14.5 21.75H22.5V20.25H14.5V21.75Z' fill='%23f8f9fa'/%3e %3cpath d='M11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21Z' fill='%23f8f9fa'/%3e %3c/svg%3e" 
                    class="p-[3.2vw] xs:p-4 max-xs:w-[13vw] absolute" alt="">
                    {:else}
                    <img transition:fade={{ duration: 150 }} src="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M10.7552 3.17711C11.1549 2.93817 11.6542 2.9412 12.051 3.18498L19.9314 8.02706L20.7167 6.74904L12.8363 1.90696C11.9634 1.37064 10.8648 1.36396 9.98549 1.88965L2.83889 6.16218C2.00844 6.65865 1.5 7.555 1.5 8.52253V19.7509C1.5 21.2697 2.73122 22.5009 4.25 22.5009H7.44938V21.0009H4.25C3.55964 21.0009 3 20.4413 3 19.7509V8.52253C3 8.08275 3.23111 7.67531 3.60858 7.44965L10.7552 3.17711Z' fill='%233f3f46'/%3e %3cpath d='M11 12.5C11 11.9477 11.4477 11.5 12 11.5C12.5523 11.5 13 11.9477 13 12.5C13 13.0523 12.5523 13.5 12 13.5C11.4477 13.5 11 13.0523 11 12.5Z' fill='%233f3f46'/%3e %3cpath d='M22.5 13.25H14.5V11.75H22.5V13.25Z' fill='%233f3f46'/%3e %3cpath d='M14.5 17.5H22.5V16H14.5V17.5Z' fill='%233f3f46'/%3e %3cpath d='M11 16.75C11 16.1977 11.4477 15.75 12 15.75C12.5523 15.75 13 16.1977 13 16.75C13 17.3023 12.5523 17.75 12 17.75C11.4477 17.75 11 17.3023 11 16.75Z' fill='%233f3f46'/%3e %3cpath d='M14.5 21.75H22.5V20.25H14.5V21.75Z' fill='%233f3f46'/%3e %3cpath d='M11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21Z' fill='%233f3f46'/%3e %3c/svg%3e" 
                    class="p-[3.2vw] xs:p-4 max-xs:w-[13vw] absolute" alt="">
                    {/if}
                </a>
                <button on:click={toggleChaplist} class="h-[13vw] w-[calc(100%-13vw)] cursor-pointer ml-[13vw] flex items-center"><span class="line-clamp-1">Sky-Breaking Sword Saint (3)</span></button>
            </div>
            <div class="h-[1px] rounded-xl bg-zinc-900/15 dark:bg-mainlight/15 w-[90%]"></div>
            <div class="h-full w-full overflow-y-scroll text-[3.2vw]">
                <div class="w-full h-12 px-2 flex items-center justify-between hover:underline cursor-pointer">
                    <span class="line-clamp-1">Sky-Breaking Sword Saint (4) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, commodi?</span> 
                    <span class="opacity-70 dark:opacity-40">#19</span>
                </div>
                <!-- <div class="h-[1px] rounded-xl bg-zinc-900/15 dark:bg-mainlight/15 w-[90%] ml-[5%]"></div> -->
                <div class="w-full h-12 px-2 flex items-center justify-between hover:underline cursor-pointer bg-stone-200 dark:bg-zinc-700 transition-colors duration-300">
                    <span class="line-clamp-1">Sky-Breaking Sword Saint (3)</span> 
                    <span class="opacity-70 dark:opacity-40">#18</span>
                </div>
                <!-- <div class="h-[1px] rounded-xl bg-zinc-900/15 dark:bg-mainlight/15 w-[90%] ml-[5%]"></div> -->
                <div class="w-full h-12 px-2 flex items-center justify-between hover:underline cursor-pointer">
                    <span class="line-clamp-1">Sky-Breaking Sword Saint (2)</span> 
                    <span class="opacity-70 dark:opacity-40">#17</span>
                </div>
                <div class="h-[1px] rounded-xl bg-zinc-900/15 dark:bg-mainlight/15 w-[90%] ml-[5%]"></div>
                <div class="w-full h-12 px-2 flex items-center justify-between hover:underline cursor-pointer">
                    <span class="line-clamp-1">Sky-Breaking Sword Saint (1)</span> 
                    <span class="opacity-70 dark:opacity-40">#16</span>
                </div>
                <div class="h-[1px] rounded-xl bg-zinc-900/15 dark:bg-mainlight/15 w-[90%] ml-[5%]"></div>
                <div class="w-full h-12 px-2 flex items-center justify-between hover:underline cursor-pointer">
                    <span class="line-clamp-1">Miracle testing (4)</span> 
                    <span class="opacity-70 dark:opacity-40">#15</span>
                </div>
                <div class="h-[1px] rounded-xl bg-zinc-900/15 dark:bg-mainlight/15 w-[90%] ml-[5%]"></div>
                <div class="w-full h-12 px-2 flex items-center justify-between hover:underline cursor-pointer">
                    <span class="line-clamp-1">Miracle testing (3)</span> 
                    <span class="opacity-70 dark:opacity-40">#14</span>
                </div>
                <div class="h-[1px] rounded-xl bg-zinc-900/15 dark:bg-mainlight/15 w-[90%] ml-[5%]"></div>
                <div class="w-full h-12 px-2 flex items-center justify-between hover:underline cursor-pointer">
                    <span class="line-clamp-1">Miracle testing (2)</span> 
                    <span class="opacity-70 dark:opacity-40">#13</span>
                </div>
                <div class="h-[1px] rounded-xl bg-zinc-900/15 dark:bg-mainlight/15 w-[90%] ml-[5%]"></div>
                <div class="w-full h-12 px-2 flex items-center justify-between hover:underline cursor-pointer">
                    <span class="line-clamp-1">Load more...</span>
                </div>
            </div>
        </div>
        {/if}   
        {/if}
    </div>
    <!-- {/if} -->

    {#if !commentDisplay}
    <div bind:this={slotWrapper} class="w-full flex justify-center relative overflow-auto scroll-smooth focus-visible:opacity-50 outline-none" role="button" tabindex="-1" on:keydown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();handleAutoScroll();} }} on:click={handleAutoScroll}>
    <!-- <div bind:this={slotWrapper} class="relative overflow-auto scroll-smooth focus-visible:opacity-50 outline-none"> -->
        <slot />
    </div>


    <!-- AFTER READ -->
    <section class="w-full flex justify-center">
        <div class="w-full max-w-[700px] text-sm my-8 mx-8">
            <div class="flex items-center my-8"><div class="h-12 mr-4 bg-red-400 aspect-square rounded-full"></div>Creator name <div class="flex ml-2 bg-amber-300 font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Creator</div></div>
            <div class="h-[1px] w-full bg-zinc-300 my-8 mx-2 rounded-full"></div>
            <div class="flex flex-col items-center justify-center my-8">
                <div class="font-semibold tracking-wide text-lg">Reaksi Mu</div>
                <div class="font-semibold tracking-wide mb-6 text-zinc-400">1.2k reaksi</div>
                <div class="grid grid-cols-3 w-fit gap-6">
                    <div class="flex flex-col items-center space-y-2">
                        <div class="bg-red-400 h-20 rounded-full aspect-square"></div>
                        <div>Sedih</div>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="bg-red-400 h-20 rounded-full aspect-square"></div>
                        <div>Senang</div>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="bg-red-400 h-20 rounded-full aspect-square"></div>
                        <div>Marah</div>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="bg-red-400 h-20 rounded-full aspect-square"></div>
                        <div>Wow</div>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="bg-red-400 h-20 rounded-full aspect-square"></div>
                        <div>Love</div>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="bg-red-400 h-20 rounded-full aspect-square"></div>
                        <div>Meh</div>
                    </div>
                </div>
            </div>
            <div class="h-[1px] w-full bg-zinc-300 my-8 mx-2 rounded-full"></div>
            <div class="font-semibold tracking-wide text-zinc-500 flex justify-between my-8"><div>Comments (3.2K)</div><div>See all</div></div>
            <div class="flex my-8">
                <div><div class="h-12 mr-4 bg-red-400 aspect-square rounded-full"></div></div>
                <div>
                    <div class="flex text-zinc-900">username <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Creator</div> <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div> <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div> <div class="flex text-zinc-400 ml-2 font-[600] text-[12px] items-center font-work-sans tracking-tight"><Icon icon="material-symbols-light:crown-rounded" class={`text-[20px] mr-0.25`} /> top comment</div></div>
                    <div>
                        <div class="line-clamp-5 text-zinc-600 tracking-wide font-[400]">comments Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, saepe ad enim rerum doloremque labore! Odit dolorum mollitia incidunt veritatis. Voluptatem doloremque corporis sequi cumque quaerat tempore excepturi debitis aut nesciunt dolores recusandae exercitationem possimus saepe hic incidunt fuga, optio earum sit ad cupiditate velit est? Facere praesentium quod aut commodi, nisi neque saepe expedita maxime sit numquam doloribus quia tempora obcaecati sequi, repellat deserunt nulla incidunt officiis dolorem. Neque, eveniet, vero assumenda vel accusantium dignissimos aliquam nisi, quae at recusandae perspiciatis accusamus quo sunt dicta itaque distinctio voluptatibus. Eligendi eos tenetur esse voluptatum, consectetur atque est magni nemo sequi a? Modi, qui ea! Ea sint molestiae dolores dignissimos ipsam, cum voluptatem velit, voluptate obcaecati rem ullam saepe in molestias odio, labore ut.</div>
                        
                        <div class="flex space-x-1 my-4 w-full hidden">
                            <Icon icon="mingcute:large-arrow-up-fill" class={`text-[20px]`} />
                            <Icon icon="mingcute:large-arrow-down-fill" class={`text-[20px]`} />
                            <div class="ml-2">101</div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-start items-center ml-8 mr-4">
                    <Icon icon="mingcute:large-arrow-up-line" class={`text-[20px] text-emerald-500`} />
                    <div class="my-2">101</div>
                    <Icon icon="mingcute:large-arrow-down-line" class={`text-[20px] text-red-400`} />
                </div>
                <div>
                    <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[20px]`} />
                </div>
            </div>
            <div class="w-full flex justify-center rounded-md border border-zinc-300 p-4">
                <div class="tracking-wide">Add a comment ></div>
            </div>
            <div class="h-[1px] w-full bg-zinc-300 my-8 mx-2 rounded-full"></div>
            
            <div class="my-8">
                <div class="font-semibold tracking-wide text-lg">Rekomendasi untukmu</div>
                <!-- <div class="w-full bg-emerald-300 overflow-x-scroll"> -->
                    <div class="my-2 gap-4 grid grid-cols-5">
                        <div>
                            <div class="bg-red-400 w-full rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-2"></div>
                            <div class="tracking-tight text-zinc-400 text-[12px]">Gendre</div>
                            <div class="tracking-wide line-clamp-2">Lorem, ipsum dolor sit amet consectetur adipisicing.</div>
                            <div class="text-emerald-400 flex items-center"><Icon icon="mingcute:bookmark-fill" class="text-[12px] mr-1"/><span>1.2K</span></div>
                        </div>
                        <div>
                            <div class="bg-red-400 w-full rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-2"></div>
                            <div class="tracking-tight text-zinc-400 text-[12px]">Gendre</div>
                            <div class="tracking-wide line-clamp-2">Lorem, ipsum dolor sit amet consectetur adipisicing.</div>
                            <div class="text-emerald-400 flex items-center"><Icon icon="mingcute:bookmark-fill" class="text-[12px] mr-1"/><span>1.2K</span></div>
                        </div>
                        <div>
                            <div class="bg-red-400 w-full rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-2"></div>
                            <div class="tracking-tight text-zinc-400 text-[12px]">Gendre</div>
                            <div class="tracking-wide line-clamp-2">Lorem, ipsum dolor</div>
                            <div class="text-emerald-400 flex items-center"><Icon icon="mingcute:bookmark-fill" class="text-[12px] mr-1"/><span>1.2K</span></div>
                        </div>
                        <div>
                            <div class="bg-red-400 w-full rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-2"></div>
                            <div class="tracking-tight text-zinc-400 text-[12px]">Gendre</div>
                            <div class="tracking-wide line-clamp-2">Lorem, ipsum </div>
                            <div class="text-emerald-400 flex items-center"><Icon icon="mingcute:bookmark-fill" class="text-[12px] mr-1"/><span>1.2K</span></div>
                        </div>
                        <div>
                            <div class="bg-red-400 w-full rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-2"></div>
                            <div class="tracking-tight text-zinc-400 text-[12px]">Gendre</div>
                            <div class="tracking-wide line-clamp-2">Lorem, ipsum </div>
                            <div class="text-emerald-400 flex items-center"><Icon icon="mingcute:bookmark-fill" class="text-[12px] mr-1"/><span>1.2K</span></div>
                        </div>
                    </div>
                <!-- </div> -->
            </div>
        </div>
    </section>
    {/if}



    <!-- COMMENTS -->
    {#if commentDisplay}
    <!-- <div class="h-[100dvh] w-full pt-[56px]"> -->
        <!-- <div class="w-full h-full overflow-y-scroll scrollbar scrollbar-thumb-zinc-700 dark:scrollbar-thumb-mainlight scrollbar-track-mainlight/0 space-y-4"> -->
        <div role="button" tabindex="-1" on:keydown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();handleAutoScroll();} }} on:click={handleAutoScroll} class={`w-full h-full space-y-4 pt-[16vw] xs:pt-24`}>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
            <div>comment sect goese here</div>
        </div>
    <!-- </div> -->
    {/if}
</section>  

<style>
    /* Ini akan diterapkan ke html dan body secara global */
    :global(html),
    :global(body) {
        scrollbar-width: none;      
        -ms-overflow-style: none;   
    }

    :global(html::-webkit-scrollbar),
    :global(body::-webkit-scrollbar) {
        display: none;              
    }

    /* :global(html.hide-scroll),
    :global(html.hide-scroll body) {
    scrollbar-width: none;         
    -ms-overflow-style: none;    
    }

    :global(html.hide-scroll::-webkit-scrollbar),
    :global(html.hide-scroll body::-webkit-scrollbar) {
    display: none;               
    } */
    
    /* html, body {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    html::-webkit-scrollbar,
    body::-webkit-scrollbar {
        display: none;
    } */

    .range-custom::-webkit-slider-thumb {
    background-color: #ff7261;
    border: none;
    height: 1rem;
    width: 1rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    transform: scale(1);
    -webkit-appearance: none;
    }

    .range-custom[type="range"]::-moz-range-thumb {
    background-color: #ff7261;
    border: none;
    height: 1rem;
    width: 1rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    transform: scale(1);
    }

    .range-before::-webkit-slider-thumb {
    background-color: #ff7261;
    border: none;
    height: 1rem;
    width: 1rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    transform: scale(0);
    -webkit-appearance: none;
    }

    .range-before[type="range"]::-moz-range-thumb {
    background-color: #ff7261;
    border: none;
    height: 1rem;
    width: 1rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    transform: scale(0);
    }
</style>