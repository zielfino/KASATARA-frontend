<script lang="ts">
    // export const ssr = false;
    // export const prerender = true;

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
        scrollY = window.scrollY;
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
    let scrollY = 0;
    
    // function handleScroll() {
    //     scrollY = window.scrollY;
    // }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        // panggil sekali biar scroll awal tetap terdeteksi
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    $: if (slotWrapper && scrollY >= slotWrapper.offsetHeight - window.innerHeight) {
        navShow = true;
    }

    // $: if (scrollY >= slotWrapper.offsetHeight) {
    //     navShow = true;
    // }


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
        if (window.scrollY > 10 && scrollY < slotWrapper.offsetHeight - window.innerHeight) {
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
    import News from "$lib/components/news.svelte";
    import Footer from "$lib/components/Footer.svelte";
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
        navShow = true
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




    let rating: number = 0;
    let hoverRating: number = 0;

    function setRating(value: number) {
        rating = value;
    }

    function setHover(value: number) {
        if (rating === 0) {
            hoverRating = value;
        }
    }

    function clearHover() {
        if (rating === 0) {
            hoverRating = 0;
        }
    }



    let textarea: HTMLTextAreaElement;
    
    function autoGrow() {
        textarea.style.height = 'auto'; // reset dulu biar bisa shrink
        textarea.style.height = textarea.scrollHeight + 'px';
    }
</script>


<section class="bg-mainlight dark:bg-zinc-900 transition-all duration-300 flex flex-col items-center justify-center w-full relative">

    <!-- SETTINGS POP UP -->
    {#if settings}
    <div transition:fade={{ duration: 150 }} class="fixed w-full left-0 top-0 backdrop-blur-xs h-full bg-zinc-900/80 text-zinc-700 dark:text-mainlight z-150 flex justify-center items-center">
        <div class="min-w-64 min-h-64 max-xs:min-w-[51.2vw] max-xs:min-h-[51.2vw] bg-zinc-200 dark:bg-zinc-900 border rounded-xl max-xs:rounded-[2.4vw] border-mainlight/20 flex flex-col items-center max-xs:text-[2.8vw]">
            <div class="w-full flex justify-between items-center">
                <div class="px-6 max-xs:px-[4.8vw] py-4 max-xs:py-[4.8vw] max-xs:text-[3.2vw] font-work-sans">Settings</div>
                <button on:click={() => settings = !settings} class="cursor-pointer p-[3.2vw] xs:p-4 mr-[1.6vw] xs:mr-2 max-xs:text-[4.8vw]"><Icon icon="maki:cross" /></button>
            </div>
            <div class="bg-zinc-400 dark:bg-mainlight/20 h-[1px] w-[90%] rounded-full"></div>
            <div class="px-[3.2vw] xs:px-4 py-[2.4vw] xs:py-3 pb-[3.2vw] xs:pb-4 spaxe-y-[2.4] xs:space-y-3">
                <div>
                    <div class="mb-[1.6vw] xs:mb-2">Read Mode</div>
                    <div class="flex space-x-[3.2vw] xs:space-x-4 justify-center">
                        <button on:click={() => marathonMode = false} class={`flex flex-col justify-center items-center text-[2.8vw] xs:text-sm font-[400] leading-[1] tracking-wide w-[21vw] xs:w-24 h-[21vw] xs:h-24 rounded-[2.4vw] xs:rounded-xl text-center
                        ${marathonMode ? 'hover:border-[0.6vw] xs:hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border border-zinc-400 dark:border-mainlight/30' 
                        : 'border-[0.6vw] xs:border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-[7.4vw] xs:text-4xl mb-[0.8vw] xs:mb-1" icon="mingcute:walk-fill" />
                            Normal <br>Mode
                        </button>
                        <button on:click={() => marathonMode = true}  class={`flex flex-col justify-center items-center text-[2.8vw] xs:text-sm font-[400] leading-[1] tracking-wide w-[21vw] xs:w-24 h-[21vw] xs:h-24 rounded-[2.4vw] xs:rounded-xl text-center
                        ${!marathonMode ? 'hover:border-[0.6vw] xs:hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border border-zinc-400 dark:border-mainlight/30' 
                        : 'border-[0.6vw] xs:border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-[7.4vw] xs:text-4xl mb-[0.8vw] xs:mb-1" icon="mingcute:run-fill" />
                            Marathon Mode
                        </button>
                    </div>
                </div>
                
                <div>
                    <div class="mb-[1.6vw] xs:mb-2">Read Quality</div>
                    <div class="flex space-x-[3.2vw] xs:space-x-4 justify-center">
                        <button on:click={() => readQuality = 'low'} class={`flex flex-col justify-center items-center text-[2.8vw] xs:text-sm font-[400] leading-[1] tracking-wide w-[21vw] xs:w-24 h-[21vw] xs:h-24 rounded-[2.4vw] xs:rounded-xl text-center
                        ${readQuality !== 'low' ? 'hover:border-[0.6vw] xs:hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border border-zinc-400 dark:border-mainlight/30' 
                        : 'border-[0.6vw] xs:border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-[12.8vw] xs:text-5xl mb-[0.8vw] xs:mb-1" icon="mdi:quality-low" />
                            Data Saver
                        </button>
                        <button on:click={() => readQuality = 'mid'}  class={`flex flex-col justify-center items-center text-[2.8vw] xs:text-sm font-[400] leading-[1] tracking-wide w-[21vw] xs:w-24 h-[21vw] xs:h-24 rounded-[2.4vw] xs:rounded-xl text-center
                        ${readQuality !== 'mid' ? 'hover:border-[0.6vw] xs:hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border border-zinc-400 dark:border-mainlight/30' 
                        : 'border-[0.6vw] xs:border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-[12.8vw] xs:text-5xl mb-[0.8vw] xs:mb-1" icon="mdi:quality-medium" />
                            Normal Quality
                        </button>
                        <button on:click={() => readQuality = 'high'}  class={`flex flex-col justify-center items-center text-[2.8vw] xs:text-sm font-[400] leading-[1] tracking-wide w-[21vw] xs:w-24 h-[21vw] xs:h-24 rounded-[2.4vw] xs:rounded-xl text-center
                        ${readQuality !== 'high' ? 'hover:border-[0.6vw] xs:hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border border-zinc-400 dark:border-mainlight/30' 
                        : 'border-[0.6vw] xs:border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-[9.6vw] xs:text-5xl mb-[0.8vw] xs:mb-1" icon="mdi:quality-high" />
                            Full Quality
                        </button>
                    </div>
                </div>

                <div class="w-full">
                    <div class="mb-[1.6vw] xs:mb-2">Scroll Speed</div>
                    <div class="flex space-x-[3.2vw] xs:space-x-4 w-full">
                        <div class="xs:min-w-64 min-w-[51.2vw] w-full">
                            <!-- <label for="autoscroll" class="block text-lg font-semibold mb-2">Autoscroll Speed</label> -->
                            
                            <div class="relative w-full flex flex-col items-center justify-center">
                                <input
                                id="autoscroll"
                                type="range"
                                min="0.5"
                                max="1.5"
                                step="0.05"
                                bind:value={speed}
                                class="w-[94%] h-[1.6vw] xs:h-2 bg-neutral-600 rounded-[1.6vw] xs:rounded-lg cursor-pointer accent-mainred outline-none"
                                />
                                <div class="flex w-[93.5%] xs:w-[95%] justify-between items-center mt-[1.6vw] xs:mt-2">
                                    <Icon icon="ph:line-vertical" class="text-[3.6vw] xs:text-lg"/> 
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical" class="text-[3.6vw] xs:text-lg"/> 
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical" class="text-[3.6vw] xs:text-lg"/> 
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical" class="text-[3.6vw] xs:text-lg"/> 
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical-bold" class="text-[2.4vw] xs:text-[12px]"/>
                                    <Icon icon="ph:line-vertical" class="text-[3.6vw] xs:text-lg"/> 
                                </div>
                                <div class="flex w-full justify-between text-[2.4vw] xs:text-xs text-neutral-400 mt-[0.8vw] xs:mt-1 px-[0.8vw] xs:px-1">
                                    {#each ticks as tick}
                                    <div class="w-[4vw] xs:w-5 flex justify-center">{tick}</div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-zinc-400 dark:bg-mainlight/20 h-[0.2vw] xs:h-[1px] w-[90%] rounded-full"></div>
            <!-- {#if showAutoPlayUI} -->
            <div class="px-[3.2vw] xs:px-4 py-[2.4vw] xs:py-3 w-full space-x-[3.2vw] xs:space-x-2 flex justify-end">
                <button on:click={saveSettings} class="text-mainlight bg-mainred border border-mainred hover:bg-mainred/30 transition-all cursor-pointer px-[3.2vw] xs:px-3 py-[1.6vw] xs:py-1 rounded-[1.2vw] xs:rounded-md">Save</button>
                <button on:click={() => settings = !settings} class="border border-zinc-900/30 dark:border-mainlight/30 dark:hover:bg-mainlight/15 hover:bg-zinc-900/15 transition-all dark:hover:border-mainlight hover:border-zinc-900 cursor-pointer px-[3.2vw] xs:px-3 py-[1.6vw] xs:py-1 rounded-[1.2vw] xs:rounded-md">Later</button>
            </div>
            <!-- {/if} -->
        </div>
    </div>
    {/if}

    <!-- TOP NAV -->

    <div class={`${settings ? '' : ''} border-b border-zinc-300 dark:border-zinc-700/40 fixed w-full z-100 top-0 bg-mainlight xs:bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-mainlight text-[2.8vw] xs:text-sm flex justify-center transition duration-300 ${navShow ? '' : '-translate-y-[11.2vw] xs:-translate-y-[56px]'}`}>
        
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
                        <div class="bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-300 dark:border-zinc-700 w-72 h-64 
                    scrollbar scrollbar-thumb-zinc-700 dark:scrollbar-thumb-mainlight scrollbar-track-mainlight/0 overflow-y-scroll transition-all duration-300 p-2">
                            <div class="w-full h-12 border-b border-zinc-300 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Sky-Breaking Sword Saint (4) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, commodi?</span> <span class="opacity-70 dark:opacity-40">#19</span></div>
                            <div class="w-full h-12 border-b border-zinc-300 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Sky-Breaking Sword Saint (3)</span> <span class="opacity-70 dark:opacity-40">#18</span></div>
                            <div class="w-full h-12 border-b border-zinc-300 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Sky-Breaking Sword Saint (2)</span> <span class="opacity-70 dark:opacity-40">#17</span></div>
                            <div class="w-full h-12 border-b border-zinc-300 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Sky-Breaking Sword Saint (1)</span> <span class="opacity-70 dark:opacity-40">#16</span></div>
                            <div class="w-full h-12 border-b border-zinc-300 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Miracle testing (4)</span> <span class="opacity-70 dark:opacity-40">#15</span></div>
                            <div class="w-full h-12 border-b border-zinc-300 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Miracle testing (3)</span> <span class="opacity-70 dark:opacity-40">#14</span></div>
                            <div class="w-full h-12 border-b border-zinc-300 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Miracle testing (2)</span> <span class="opacity-70 dark:opacity-40">#13</span></div>
                            <div class="w-full h-12 border-zinc-300 px-2 flex items-center justify-between hover:underline cursor-pointer"><span class="line-clamp-1">Load more...</span></div>
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
            class={`absolute bg-zinc-500 top-full w-full h-[0.8vw] xs:h-1 hover:h-3 transition-[height] duration-300 cursor-pointer peer`}
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
        {#if !commentDisplay && scrollPercent <= 100}
        <div transition:fade={{duration: 150}} class="absolute bg-zinc-500 top-full w-full h-[0.8vw] xs:h-1 hover:h-3 transition-[height] duration-300 cursor-pointer peer">
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
            <div class={`absolute bg-zinc-700/55 top-[calc(100%+16px)] py-[0.4vw] xs:py-0.5 px-[1.2vw] text-mainlight xs:px-1.5 rounded-[1.2vw] xs:rounded-md text-[2.4vw] xs:text-xs z-2 transition ${hoverPercent !== null || navShow ? 'opacity-0' : ''}`} transition:fade={{ duration: 150 }}>Direkomendasikan 13 tahun ke atas</div>
            {/if}
        {/if}

    </div>



    <!-- STOP BUTTON ON AUTOPLAY ACTIVE -->
    <!-- {#if autoPlay} -->
    <div class={`fixed w-full z-100 bottom-0 flex justify-center transition duration-300 ${autoPlay ? 'delay-500' : 'translate-y-[16.8vw] xs:translate-y-[84px] sm:translate-y-0 sm:translate-x-[84px]'}`}>
        <div class="absolute bottom-[3.2vw] right-[3.2vw] xs:bottom-[16px] xs:right-[16px] text-sm text-zinc-600 dark:text-mainlight space-x-[2.4vw] xs:space-x-3">
            <button bind:this={stopButton} on:click={handleAutoScroll} tabindex={autoPlay ? 0 : -1} class="p-[2.4vw] outline-none focus-visible:bg-zinc-700 xs:p-3 rounded-full relative bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300 group">
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
            <button transition:fade={{ duration: 150 }} tabindex={navShow ? 0 : -1} on:click={toggleAutoPlay} class="p-[2.4vw] xs:p-3 rounded-full relative bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300">
                <div class="">
                    <Icon icon="iconamoon:player-play" class={`text-[4.8vw] xs:text-2xl ${!autoPlay ? 'group-hover:hidden group-focus-visible:hidden' : 'hidden'}`} /><Icon icon="iconamoon:player-play-fill" class={`text-[4.8vw] xs:text-2xl hidden ${!autoPlay ? 'group-hover:block group-focus-visible:block' : 'hidden'}`} />
                </div>
                <div class="">
                    <Icon icon="iconamoon:player-pause" class={`text-[4.8vw] xs:text-2xl ${!autoPlay ? 'hidden' : 'group-hover:hidden'}`} /><Icon icon="iconamoon:player-pause-fill" class={`text-[4.8vw] xs:text-2xl hidden ${!autoPlay ? 'hidden' : 'group-hover:block'}`} />
                </div>
            </button>
            <!-- MAG BUTTON -->
            <button transition:fade={{ duration: 150 }} on:click={zoomIn} tabindex={navShow ? 0 : -1} class="p-[2.4vw] xs:p-3 rounded-full relative bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300">
                <Icon icon="ph:magnifying-glass-plus-bold" class={`text-2xl`} />
            </button>
            <button transition:fade={{ duration: 150 }} on:click={zoomOut} tabindex={navShow ? 0 : -1} class="p-[2.4vw] xs:p-3 rounded-full relative bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300">
                <Icon icon="ph:magnifying-glass-minus-bold" class={`text-2xl`} />
            </button>
            {/if}
            <!-- <button tabindex={navShow ? 0 : -1} class="p-[2.4vw] xs:p-3 rounded-full relative bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300">
                <Icon icon="mingcute:share-2-line" class={`text-2xl -translate-x-0.5`} />
            </button> -->
            <!-- GO TO TOP -->
            <button on:click={scrollToTop} class={`p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300 ${!navShow && !autoPlay ? '-translate-y-[16.8vw] sm:translate-y-[0] xs:-translate-x-[84px] xs:-translate-y-[0] delay-300' : ''}`}>
                <Icon icon="mingcute:arrow-to-up-line" class={`text-2xl`} />
            </button>
        
        {:else}
            <button on:click={scrollToTop} class={`p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300 ${!navShow && !autoPlay ? '-translate-y-[16.8vw] sm:translate-y-[0] sm:-translate-x-[84px] xs:-translate-y-[84px] delay-150' : 'translate-y-[16.8vw] sm:translate-y-[0] sm:translate-x-[84px]'}`}>
                <Icon icon="mingcute:arrow-to-up-line" class={`text-[4.8vw] xs:text-2xl`} />
            </button>
        {/if}
        </div>

        <!-- NAV TABLET - MOBILE -->
        {#if $tablet}
        <div class={`absolute bottom-[calc(6.4vw+10vw)] xs:bottom-[32px] text-sm text-zinc-600 dark:text-mainlight space-x-[2.4vw] xs:space-x-3 transition-all duration-300 ${navShow ? '' : 'translate-y-[16.8vw]'}`}>
            
            <button tabindex={navShow ? 0 : -1} class="outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight xs:bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300">
                <Icon icon="ph:caret-left-bold" class={`text-[4.8vw] xs:text-2xl`} />
            </button>

            <button tabindex={navShow ? 0 : -1} on:click={togglecomment} class={`${ $phone ? '' : 'hidden'} outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full bg-mainlight xs:bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300`}>
                <!-- <div class="relative">
                    <Icon icon="iconamoon:comment" class={`text-[4.8vw] xs:text-2xl`} />
                    <span class="absolute -top-[1.2vw] xs:-top-1.5 -right-[1.2vw] xs:-right-1.5 bg-zinc-800 active:bg-zinc-700 border-[0.4 vw] xs:border border-mainlight text-zinc-600 dark:text-mainlight text-[1.6vw] xs:text-[8px] font-semibold rounded-full w-[4vw] xs:w-5 h-[4vw] xs:h-5 flex items-center justify-center">
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

            <button disabled={scrollPercent > 100 || commentDisplay} on:click={zoomIn} tabindex={navShow ? 0 : -1} class={`${ $phone ? 'hidden' : ''} ${scrollPercent > 100 || commentDisplay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer'}  transition-all duration-300 outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full bg-mainlight xs:bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 group`}>
                <div class="relative">
                    <Icon icon="ph:magnifying-glass-plus-bold" class={`text-[4.8vw] xs:text-2xl`} />
                </div>
            </button>
            
            <button disabled={scrollPercent > 100 || commentDisplay} on:click={toggleAutoPlay} tabindex={navShow ? 0 : -1} class={` ${scrollPercent > 100 || commentDisplay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer'} transition-all duration-300 outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight xs:bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 group`}>
                <div class="relative">
                    <Icon icon="iconamoon:player-pause" class={`text-[4.8vw] xs:text-2xl ${autoPlay ? '' : 'hidden'}`} />
                </div>
                <div class="relative">
                    <Icon icon="iconamoon:player-play" class={`text-[4.8vw] xs:text-2xl ${autoPlay ? 'hidden' : ''}`} />
                </div>
            </button>

            <button disabled={scrollPercent > 100 || commentDisplay} on:click={zoomOut} tabindex={navShow ? 0 : -1} class={`${ $phone ? 'hidden' : ''} ${scrollPercent > 100 || commentDisplay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer'}  transition-all duration-300 outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full bg-mainlight xs:bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 group`}>
                <div class="relative">
                    <Icon icon="ph:magnifying-glass-minus-bold" class={`text-[4.8vw] xs:text-2xl`} />
                </div>
            </button>

            <button disabled={commentDisplay} on:click={() => settings = !settings} tabindex={navShow ? 0 : -1} class={`${ $phone ? '' : 'hidden'} ${scrollPercent > 100 || commentDisplay ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer'} outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight xs:bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300`}>
                <Icon icon="iconamoon:settings" class={`text-[4.8vw] xs:text-2xl`} />
            </button>
            
            <button tabindex={navShow ? 0 : -1} class="outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-mainlight xs:bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 transition-all duration-300">
                <Icon icon="ph:caret-right-bold" class={`text-[4.8vw] xs:text-2xl`} />
            </button>
        </div>
        {#if $phone}
        <div class={`absolute bottom-0 text-sm text-zinc-600 dark:text-mainlight transition-all duration-300 z-100 bg-mainlight dark:bg-zinc-800
        border border-b-0 border-zinc-300 dark:border-zinc-700 rounded-t-xl w-[80vw] h-[80vw] flex flex-col items-center ${chaplist ? '' : 'translate-y-[calc(80vw-13vw)]'}`}>
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
                <div class="w-full h-12 px-2 flex items-center justify-between hover:underline cursor-pointer bg-zinc-200 dark:bg-zinc-700 transition-all duration-300">
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
    <section
    class="w-full bg-zinc-100 dark:bg-zinc-800/30 flex flex-col items-center justify-center border-t border-zinc-300 dark:border-zinc-800 transition-all duration-300">
        <div class="w-full max-w-[700px] px-[3.2vw] xs:px-4 text-sm my-[6.4vw] max-xs:mb-[0vw] xs:my-8 mx-8">
            <div class="flex items-center w-min whitespace-nowrap text-zinc-900 dark:text-mainlight transition-all duration-300 max-xs:text-[2.8vw]"><div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>Creator name <div class="flex ml-[1.6vw] xs:ml-2 text-zinc-900 bg-amber-300 font-[500] tracking-wide rounded-sm py-[0.4vw] xs:py-0.5 px-[1.2vw] xs:px-1.5 text-[2vw] xs:text-[10px] font-work-sans">Creator</div></div>
            <div class="h-[1px] w-[96%] mx-[2%] bg-zinc-300 my-[6.4vw] xs:my-8 rounded-full dark:bg-zinc-800 transition-all duration-300"></div>
            <div class="flex flex-col items-center justify-center my-[6.4vw] xs:my-8 text-zinc-900 dark:text-mainlight transition-all duration-300">
                <div class="font-semibold tracking-wide text-[3.2vw] xs:text-[16px] text-center">Kamu belum berikan rating untuk komik ini!</div>
                <!-- <div class="flex space-x-2 my-4 cursor-pointer">
                    <div class="group">
                        <Icon icon="mingcute:star-line" class={`text-[32px] group-hover:hidden`} />
                        <Icon icon="mingcute:star-fill" class={`text-[32px] group-hover:block hidden`} />
                    </div>
                    <div><Icon icon="mingcute:star-line" class={`text-[32px]`} /></div>
                    <div><Icon icon="mingcute:star-line" class={`text-[32px]`} /></div>
                    <div><Icon icon="mingcute:star-line" class={`text-[32px]`} /></div>
                    <div><Icon icon="mingcute:star-line" class={`text-[32px]`} /></div>
                </div> -->
                <div class="flex pl-[1.6vw] xs:pl-2 my-[3.2vw] xs:my-4 text-amber-400 dark:text-mainlight transition-all duration-300">
                    {#each Array(5) as _, i}
                        <button
                            on:click={() => setRating(i + 1)}
                            on:mouseenter={() => setHover(i + 1)}
                            on:mouseleave={clearHover}
                        >
                            <Icon
                                icon={(rating > 0 ? rating : hoverRating) > i ? "mingcute:star-fill" : "mingcute:star-line"}
                                class="text-[10vw] xs:text-[42px] pr-[1.6vw] xs:pr-2 cursor-pointer"
                            />
                        </button>
                    {/each}
                </div>

            </div>
            <div class="h-[1px] w-[96%] mx-[2%] bg-zinc-300 my-[6.4vw] xs:my-8 rounded-full dark:bg-zinc-800 transition-all duration-300"></div>
            <div class="flex flex-col items-center justify-center my-[6.4vw] xs:my-8 text-zinc-900 dark:text-mainlight transition-all duration-300">
                <div class="font-semibold tracking-wide text-[3.2vw] xs:text-[16px]">Berikan Reaksi Mu</div>
                <div class="font-semibold tracking-wide mb-[4.8vw] xs:mb-6 text-zinc-400 text-[2.4vw] xs:text-[12px]">1.2k reaksi</div>
                <div class="grid grid-cols-3 w-fit gap-[4.8vw] xs:gap-6">
                    <div class="flex flex-col items-center space-y-[1.6vw] xs:space-y-2">
                        <div class="bg-red-400 h-[16vw] xs:h-20 rounded-full aspect-square"></div>
                        <div class="text-[2.4vw] xs:text-[12px] tracking-wide font-work-sans">Sedih</div>
                    </div>
                    <div class="flex flex-col items-center space-y-[1.6vw] xs:space-y-2">
                        <div class="bg-red-400 h-[16vw] xs:h-20 rounded-full aspect-square"></div>
                        <div class="text-[2.4vw] xs:text-[12px] tracking-wide font-work-sans">Senang</div>
                    </div>
                    <div class="flex flex-col items-center space-y-[1.6vw] xs:space-y-2">
                        <div class="bg-red-400 h-[16vw] xs:h-20 rounded-full aspect-square"></div>
                        <div class="text-[2.4vw] xs:text-[12px] tracking-wide font-work-sans">Marah</div>
                    </div>
                    <div class="flex flex-col items-center space-y-[1.6vw] xs:space-y-2">
                        <div class="bg-red-400 h-[16vw] xs:h-20 rounded-full aspect-square"></div>
                        <div class="text-[2.4vw] xs:text-[12px] tracking-wide font-work-sans">Wow</div>
                    </div>
                    <div class="flex flex-col items-center space-y-[1.6vw] xs:space-y-2">
                        <div class="bg-red-400 h-[16vw] xs:h-20 rounded-full aspect-square"></div>
                        <div class="text-[2.4vw] xs:text-[12px] tracking-wide font-work-sans">Love</div>
                    </div>
                    <div class="flex flex-col items-center space-y-[1.6vw] xs:space-y-2">
                        <div class="bg-red-400 h-[16vw] xs:h-20 rounded-full aspect-square"></div>
                        <div class="text-[2.4vw] xs:text-[12px] tracking-wide font-work-sans">Meh</div>
                    </div>
                </div>
            </div>
            
            <div class="h-[1px] w-[96%] mx-[2%] bg-zinc-300 my-[6.4vw] xs:my-8 rounded-full dark:bg-zinc-800 transition-all duration-300"></div>
            
            <div class="space-y-[1.6vw] xs:space-y-2 my-[6.4vw] xs:my-8">
                <div class="flex justify-between items-center bg-purple-800 border border-purple-700 p-[1.6vw] xs:p-2 rounded-[1.2vw] xs:rounded-md text-mainlight cursor-pointer hover:bg-purple-700 transition-all mb-[4.8vw] xs:mb-6">
                    <div class="flex items-center">
                        <div class="h-[8vw] xs:h-10 rounded-[0.8vw] xs:rounded-sm aspect-square bg-red-400 mr-[2.4vw] xs:mr-3"></div>
                        <div class="max-xs:text-[3.6vw]">Baca versi novelnya</div>
                    </div>
                    <div class="bg-mainlight/30 h-[6.4vw] xs:h-[32px] flex items-center justify-center aspect-square rounded-full text-mainlight mr-[1.6vw] xs:mr-2"><Icon icon="material-symbols:arrow-forward-ios-rounded" class={`text-[3.2vw] xs:text-[16px] translate-x-[5%]`} /></div>
                </div>
                <div class="flex items-start justify-between text-zinc-900 dark:text-mainlight transition-all duration-300">
                    <div>
                        <div class="text-[3.2vw] xs:text-[16px] max-sm:text-[14px] tracking-wide font-[700] flex items-center cursor-pointer hover:underline w-min whitespace-nowrap"><span class="mr-[0.8vw] xs:mr-1">Omnicient Reader Viewpoint</span> <Icon icon="material-symbols:arrow-forward-ios-rounded" class={`text-[12px] inline-block opacity-40`} /></div>
                        <div class="sm:text-[12px] xs:text-[10px] text-[2.4vw] opacity-50 font-[600]">HEATS(REDICE STUDIO), 이범근(REDICE STUDIO), 산지직송</div>
                    </div>
                    <div class="group cursor-pointer">
                        <Icon icon="mingcute:bookmark-line" class={`text-[20px] mr-[0.8vw] xs:mr-1 group-hover:hidden`} />
                        <Icon icon="mingcute:bookmark-fill" class={`text-[20px] mr-[0.8vw] xs:mr-1 group-hover:block hidden`} />
                    </div>
                </div>
                <div class="flex max-xs:mt-[3.2vw] items-center font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300 max-sm:text-[12px] max-xs:text-[3.2vw]"><Icon icon="mingcute:star-fill" class={`text-[4vw] xs:text-[20px] mr-[0.8vw] xs:mr-1 max-xs:-translate-y-[5%]`} /><span class="mr-2">9.9</span><span class="opacity-30">2.231 votes</span></div>
                <!-- <div class="flex items-center font-work-sans"><Icon icon="mingcute:bookmark-fill" class={`text-[20px] mr-[0.8vw] xs:mr-1`} /><span class="mr-2">3.9K</span></div> -->
                <!-- <div class="flex items-center font-work-sans"><Icon icon="icon-park-solid:slightly-smiling-face" class={`text-[20px] mr-[0.8vw] xs:mr-1`} /><span class="mr-2">3.9K</span></div> -->
                    
            </div>

            <div class="h-[1px] w-[96%] mx-[2%] bg-zinc-300 my-[6.4vw] xs:my-8 rounded-full dark:bg-zinc-800 transition-all duration-300"></div>

            <div class="font-semibold tracking-wide text-zinc-500 flex justify-between my-[3.2vw] xs:my-4 max-xs:text-[3.2vw] font-work-sans w-full dark:text-zinc-400 transition-all duration-300"><div>Comments (3.2K)</div><button tabindex="-1" on:keydown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();e.stopPropagation();togglecomment()} }} on:click={(e) => {e.preventDefault();e.stopPropagation();togglecomment()}} class="hover:underline cursor-pointer">See all</button></div>
            <div class="flex max-xs:mt-[6.4vw] my-[3.2vw] xs:my-4 max-xs:text-[3.6vw]">
                <div><div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full max-xs:hidden"></div></div>
                <div class="">
                    <div class="flex w-full items-center">
                        <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full xs:hidden"></div>
                        <div class="flex items-center text-zinc-900 dark:text-mainlight transition-all duration-300 xs:mb-2">username 
                            <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                            <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                            <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                            <div class="flex text-amber-500/70 dark:text-amber-300/80 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                        </div>
                        <div class="flex justify-end flex-1 xs:hidden">
                            <div class="cursor-pointer h-fit hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 p-1 rounded-full text-zinc-900 dark:text-mainlight transition-all duration-300">
                                <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                            </div>
                        </div>
                    </div>
                    <div class="flex max-xs:mt-[2.4vw]">
                        <div>
                            <div class="line-clamp-7 text-zinc-600 dark:text-zinc-400 transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">comments Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, saepe ad enim rerum doloremque labore! Odit dolorum mollitia incidunt veritatis. Voluptatem doloremque corporis sequi cumque quaerat tempore excepturi debitis aut nesciunt dolores recusandae exercitationem possimus saepe hic incidunt fuga, optio earum sit ad cupiditate velit est? Facere praesentium quod aut commodi, nisi neque saepe expedita maxime sit numquam doloribus quia tempora obcaecati sequi, repellat deserunt nulla incidunt officiis dolorem. Neque, eveniet, vero assumenda vel accusantium dignissimos aliquam nisi, quae at recusandae perspiciatis accusamus quo sunt dicta itaque distinctio voluptatibus. Eligendi eos tenetur esse voluptatum, consectetur atque est magni nemo sequi a? Modi, qui ea! Ea sint molestiae dolores dignissimos ipsam, cum voluptatem velit, voluptate obcaecati rem ullam saepe in molestias odio, labore ut.</div>
                        </div>
                    </div>
                    <div class="flex justify-end items-center space-x-[2.4vw] mr-[4.8vw] xs:mr-4 max-xs:mt-[1.6vw] xs:hidden h-fit">
                        <div class="group cursor-pointer">
                            <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                            <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                        </div>
                        <div class="my-2 font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                        <div class="group cursor-pointer">
                            <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                            <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col justify-start items-center ml-4 mr-[1.6vw] xs:mr-4 max-xs:mt-[1.6vw] max-xs:hidden h-fit">
                    <div class="group cursor-pointer">
                        <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                        <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                    </div>
                    <div class="my-2 font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300">101</div>
                    <div class="group cursor-pointer">
                        <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                        <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                    </div>
                </div>
                <div class="flex justify-end flex-1 max-xs:hidden h-fit">
                    <div class="cursor-pointer h-fit hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 p-1 rounded-full text-zinc-900 dark:text-mainlight transition-all duration-300">
                        <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-center rounded-md border border-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800 p-[3.2vw] xs:p-4 hover:bg-zinc-100 cursor-pointer my-[6.4vw] xs:my-8 text-zinc-900 dark:text-mainlight transition-all duration-300">
                <div class="tracking-wide max-sm:text-[12px] max-xs:text-[3.2vw]">Add a comment <Icon icon="material-symbols:arrow-forward-ios-rounded" class={`text-[4vw] xs:text-[20px] inline-block`} /></div>
            </div>
            <div class="h-[1px] w-[96%] mx-[2%] bg-zinc-300 my-[6.4vw] xs:my-8 rounded-full dark:bg-zinc-800 transition-all duration-300"></div>

            <!-- <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-[3.2vw] xs:text-[16px] tracking-wide font-[700]">Omnicient Reader Viewpoint</div>
                        <div class="text-[12px] text-zinc-500 font-[600]">HEATS(REDICE STUDIO),이범근(REDICE STUDIO),산지직송</div>
                    </div>
                    <div class="group cursor-pointer">
                        <Icon icon="mingcute:bookmark-line" class={`text-[20px] mr-[0.8vw] xs:mr-1 group-hover:hidden`} />
                        <Icon icon="mingcute:bookmark-fill" class={`text-[20px] mr-[0.8vw] xs:mr-1 group-hover:block hidden`} />
                    </div>
                </div>
                <div class="flex items-center font-work-sans"><Icon icon="mingcute:star-fill" class={`text-[20px] mr-[0.8vw] xs:mr-1`} /><span class="mr-2">9.9</span><span class="opacity-40">2.231 Orange</span></div>
                <div class="flex items-center font-work-sans"><Icon icon="mingcute:bookmark-fill" class={`text-[20px] mr-[0.8vw] xs:mr-1`} /><span class="mr-2">3.9K</span></div>
                <div class="flex items-center font-work-sans"><Icon icon="icon-park-solid:slightly-smiling-face" class={`text-[20px] mr-[0.8vw] xs:mr-1`} /><span class="mr-2">3.9K</span></div>
                    
            </div> -->

            <!-- <div class="h-[1px] w-[96%] mx-[2%] bg-zinc-300 my-[6.4vw] xs:my-8 rounded-full dark:bg-zinc-800 transition-all duration-300"></div> -->
            
            <div class="my-[6.4vw] xs:my-8 text-zinc-900 dark:text-mainlight transition-all duration-300">
                <div class="font-semibold tracking-wide text-[3.2vw] xs:text-[16px]">Rekomendasi untukmu</div>
                <!-- <div class="w-full bg-emerald-300 overflow-x-scroll"> -->
                    <div class="my-[1.6vw] xs:my-2 gap-[3.2vw] xs:gap-4 xs:grid grid-cols-5 max-xs:overflow-x-scroll max-xs:flex overflow-hidden rounded-[1.2vw] xs:rounded-t-md">
                        <div class="max-xs:min-w-[28vw] max-xs:pb-[4vw]">
                            <div class="bg-red-400 w-full max-xs:w-[28vw] rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-[1.6vw] xs:mb-2"></div>
                            <div class="tracking-tight text-zinc-400 dark:text-zinc-500 transition-all duration-300 text-[12px] max-sm:text-[10px] max-xs:text-[2.4vw]">Gendre</div>
                            <div class="tracking-wide line-clamp-2 max-sm:text-[12px] max-xs:text-[3.2vw]">Lorem, ipsum dolor sit amet consectetur adipisicing.</div>
                            <div class="text-emerald-400 flex items-center max-sm:text-[12px] max-xs:text-[2.4vw]"><Icon icon="mingcute:bookmark-fill" class="text-[12px] max-xs:text-[2.4vw] mr-[0.8vw] xs:mr-1"/><span>1.2K</span></div>
                        </div>
                        <div class="max-xs:min-w-[28vw] max-xs:pb-[4vw]">
                            <div class="bg-red-400 w-full max-xs:w-[28vw] rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-[1.6vw] xs:mb-2"></div>
                            <div class="tracking-tight text-zinc-400 dark:text-zinc-500 transition-all duration-300 text-[12px] max-sm:text-[10px] max-xs:text-[2.4vw]">Gendre</div>
                            <div class="tracking-wide line-clamp-2 max-sm:text-[12px] max-xs:text-[3.2vw]">Lorem, ipsum dolor sit amet consectetur adipisicing.</div>
                            <div class="text-emerald-400 flex items-center max-sm:text-[12px] max-xs:text-[2.4vw]"><Icon icon="mingcute:bookmark-fill" class="text-[12px] max-xs:text-[2.4vw] mr-[0.8vw] xs:mr-1"/><span>1.2K</span></div>
                        </div>
                        <div class="max-xs:min-w-[28vw] max-xs:pb-[4vw]">
                            <div class="bg-red-400 w-full max-xs:w-[28vw] rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-[1.6vw] xs:mb-2"></div>
                            <div class="tracking-tight text-zinc-400 dark:text-zinc-500 transition-all duration-300 text-[12px] max-sm:text-[10px] max-xs:text-[2.4vw]">Gendre</div>
                            <div class="tracking-wide line-clamp-2 max-sm:text-[12px] max-xs:text-[3.2vw]">Lorem, ipsum dolor</div>
                            <div class="text-emerald-400 flex items-center max-sm:text-[12px] max-xs:text-[2.4vw]"><Icon icon="mingcute:bookmark-fill" class="text-[12px] max-xs:text-[2.4vw] mr-[0.8vw] xs:mr-1"/><span>1.2K</span></div>
                        </div>
                        <div class="max-xs:min-w-[28vw] max-xs:pb-[4vw]">
                            <div class="bg-red-400 w-full max-xs:w-[28vw] rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-[1.6vw] xs:mb-2"></div>
                            <div class="tracking-tight text-zinc-400 dark:text-zinc-500 transition-all duration-300 text-[12px] max-sm:text-[10px] max-xs:text-[2.4vw]">Gendre</div>
                            <div class="tracking-wide line-clamp-2 max-sm:text-[12px] max-xs:text-[3.2vw]">Lorem, ipsum </div>
                            <div class="text-emerald-400 flex items-center max-sm:text-[12px] max-xs:text-[2.4vw]"><Icon icon="mingcute:bookmark-fill" class="text-[12px] max-xs:text-[2.4vw] mr-[0.8vw] xs:mr-1"/><span>1.2K</span></div>
                        </div>
                        <div class="max-xs:min-w-[28vw] max-xs:pb-[4vw]">
                            <div class="bg-red-400 w-full max-xs:w-[28vw] rounded-[1.2vw] xs:rounded-md aspect-[3/4] mb-[1.6vw] xs:mb-2"></div>
                            <div class="tracking-tight text-zinc-400 dark:text-zinc-500 transition-all duration-300 text-[12px] max-sm:text-[10px] max-xs:text-[2.4vw]">Gendre</div>
                            <div class="tracking-wide line-clamp-2 max-sm:text-[12px] max-xs:text-[3.2vw]">Lorem, ipsum </div>
                            <div class="text-emerald-400 flex items-center max-sm:text-[12px] max-xs:text-[2.4vw]"><Icon icon="mingcute:bookmark-fill" class="text-[12px] max-xs:text-[2.4vw] mr-[0.8vw] xs:mr-1"/><span>1.2K</span></div>
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
        <div class={`w-full h-full pt-[16vw] xs:pt-24 p-[3.2vw] xs:p-4 max-w-[800px] to-zinc-900 dark:text-mainlight`}>
            <div class="font-semibold tracking-wide text-zinc-500 flex justify-between my-[3.2vw] xs:my-4 max-xs:text-[3.2vw] font-work-sans w-full dark:text-zinc-400 transition-all duration-300">
                <div>Comments (3.2K)</div>
                <!-- <button tabindex="-1" on:keydown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();e.stopPropagation();togglecomment()} }} on:click={(e) => {e.preventDefault();e.stopPropagation();togglecomment()}} class="hover:underline cursor-pointer">See all</button> -->
            </div>

            <div class="border space-y-[1.6vw] xs:space-y-2 rounded-md border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px] p-[3.2vw] xs:p-4 my-[3.2vw] xs:my-4">
                <textarea name="" id="" bind:this={textarea} on:input={autoGrow} class="h-[9.6vw] overflow-scroll-hidden xs:h-12 w-full outline-none resize-none" placeholder="Please log in to leave a comment"></textarea>
                <!-- <div class="h-[19.2vw] xs:h-24">Please log in to leave a comment</div> -->
                <div>spoiler</div>
                <div class="flex justify-between">
                    <div class="flex space-x-[1.6vw] xs:space-x-2">
                        <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]">A</div>
                        <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]">B</div>
                        <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]">C</div>
                        <div class="font-work-sans flex items-center aspect-square justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[1.6vw] xs:px-2 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]">D</div>
                    </div>
                    <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[2.4vw] xs:px-3 h-[6.4vw] xs:h-8 rounded-[1.2vw] xs:rounded-md text-[2.8vw] xs:text-[14px]">send</div>
                </div>
            </div>

            <div class="my-[3.2vw] xs:my-4 flex space-x-[1.6vw] xs:space-x-2">
                <div class="flex items-center justify-center transition-all duration-300 text-mainlight dark:text-zinc-900 bg-zinc-700 dark:bg-mainlight px-[3.2vw] xs:px-3 h-[8vw] xs:h-[32px] rounded-[1.2vw] xs:rounded-md text-[3.6vw] xs:text-[16px]">Top</div>
                <div class="flex items-center justify-center transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[3.2vw] xs:px-3 h-[8vw] xs:h-[32px] rounded-[1.2vw] xs:rounded-md text-[3.6vw] xs:text-[16px]">Terbaru</div>
                <div class="flex items-center justify-center transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[3.2vw] xs:px-3 h-[8vw] xs:h-[32px] rounded-[1.2vw] xs:rounded-md text-[3.6vw] xs:text-[16px]">Terlama</div>
            </div>

            <!-- induk -->
            <div class="flex max-xs:text-[3.6vw]">
                <div class="">
                    <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                        <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                        <div class="flex items-center text-zinc-900 dark:text-mainlight transition-all duration-300">username 
                            <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                            <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                            <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                            <div class="flex text-amber-500/70 dark:text-amber-300/80 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                        </div>
                        <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                            12 Hours ago
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <div class="text-zinc-900 dark:text-zinc-100 transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
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
                        <div class="flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 dark:bg-zinc-800 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                            </div>
                            <div class="my-2 font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                            </div>
                        </div>
                        <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[4.8vw] xs:px-4 rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px]">reply?</div>
                        <div class="flex justify-end flex-1 h-full">
                            <div class="cursor-pointer flex justify-center items-center hover:bg-zinc-300 dark:hover:bg-zinc-700 aspect-square text-zinc-900 dark:text-mainlight bg-zinc-200/70 dark:bg-zinc-800 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- reply -->
            <div class="flex max-xs:text-[3.6vw]">
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">

                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                        <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                        <div class="flex items-center text-zinc-900 dark:text-mainlight transition-all duration-300">username 
                            <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                            <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                            <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                            <div class="hidden flex text-amber-500/70 dark:text-amber-300/80 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                        </div>
                        <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                            12 Hours ago
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <div class="text-zinc-900 dark:text-zinc-100 transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                is it true like that? just thas all?
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                        <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 dark:bg-zinc-800 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                            </div>
                            <div class="my-2 font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                            </div>
                        </div>
                        <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45 dark:opacity-30">reply?</div>
                        <div class="flex justify-end flex-1 h-full">
                            <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900 dark:text-mainlight rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- reply reply -->
            <div class="flex max-xs:text-[3.6vw]">
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">

                    </div>
                </div>
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">

                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                        <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                        <div class="flex items-center text-zinc-900 dark:text-mainlight transition-all duration-300">username 
                            <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                            <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                            <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                            <div class="hidden flex text-amber-500/70 dark:text-amber-300/80 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                        </div>
                        <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                            12 Hours ago
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <div class="text-zinc-900 dark:text-zinc-100 transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                ofc thats all what do you want?
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                        <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 dark:bg-zinc-800 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                            </div>
                            <div class="my-2 font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                            </div>
                        </div>
                        <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45 dark:opacity-30">reply?</div>
                        <div class="flex justify-end flex-1 h-full">
                            <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900 dark:text-mainlight rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">
                                
                            </div>
                        </div>
                        <div class="opacity-40 dark:opacity-30 hover:opacity-100 cursor-pointer font-open-sans text-[2.8vw] xs:text-[14px] duration-300 transition-all">show reply (102)...</div>
                    </div>
                </div>
            </div>
            
            <!-- reply reply -->
            <div class="flex max-xs:text-[3.6vw]">
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">

                    </div>
                </div>
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">

                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                        <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                        <div class="flex items-center text-zinc-900 dark:text-mainlight transition-all duration-300">username 
                            <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                            <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                            <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                            <div class="hidden flex text-amber-500/70 dark:text-amber-300/80 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                        </div>
                        <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                            12 Hours ago
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <div class="text-zinc-900 dark:text-zinc-100 transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                no just asking
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                        <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 dark:bg-zinc-800 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                            </div>
                            <div class="my-2 font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                            </div>
                        </div>
                        <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45 dark:opacity-30">reply?</div>
                        <div class="flex justify-end flex-1 h-full">
                            <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900 dark:text-mainlight rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                            </div>
                        </div>
                    </div>
                    <div class="flex hidden">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">
                                
                            </div>
                        </div>
                        <div class="opacity-40 dark:opacity-30 hover:opacity-100 cursor-pointer font-open-sans text-[2.8vw] xs:text-[14px] duration-300 transition-all">show reply (102)...</div>
                    </div>
                </div>
            </div>
            
            <!-- reply reply reply -->
            <div class="flex max-xs:text-[3.6vw]">
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">

                    </div>
                </div>
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">

                    </div>
                </div>
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">

                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                        <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                        <div class="flex items-center text-zinc-900 dark:text-mainlight transition-all duration-300">username 
                            <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                            <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                            <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                            <div class="hidden flex text-amber-500/70 dark:text-amber-300/80 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                        </div>
                        <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                            12 Hours ago
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <div class="text-zinc-900 dark:text-zinc-100 transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                maybe he want her to get something better
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                        <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 dark:bg-zinc-800 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                            </div>
                            <div class="my-2 font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                            </div>
                        </div>
                        <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45 dark:opacity-30">reply?</div>
                        <div class="flex justify-end flex-1 h-full">
                            <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900 dark:text-mainlight rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- reply -->
            <div class="flex max-xs:text-[3.6vw]">
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">

                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                        <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                        <div class="flex items-center text-zinc-900 dark:text-mainlight transition-all duration-300">username 
                            <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                            <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                            <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                            <div class="hidden flex text-amber-500/70 dark:text-amber-300/80 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                        </div>
                        <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                            12 Hours ago
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <div class="text-zinc-900 dark:text-zinc-100 transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">
                                thanks for da spiler
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center mt-[1.6vw] xs:mt-1 mb-[3.2vw] xs:mb-2 h-[4vw] xs:h-[20px] space-x-[2.4vw] xs:space-x-3">
                        <div class="hidden flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 dark:bg-zinc-800 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                            </div>
                            <div class="my-2 font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                            </div>
                        </div>
                        <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:opacity-100 cursor-pointer rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px] opacity-45 dark:opacity-30">reply?</div>
                        <div class="flex justify-end flex-1 h-full">
                            <div class="cursor-pointer flex justify-center items-center hover:opacity-100 aspect-square text-zinc-900 dark:text-mainlight rounded-[1.2vw] xs:rounded-md h-full opacity-30">
                                <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                            <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">
                                
                            </div>
                        </div>
                        <div class="opacity-40 dark:opacity-30 hover:opacity-100 cursor-pointer font-open-sans text-[2.8vw] xs:text-[14px] duration-300 transition-all">show reply (102)...</div>
                    </div>
                </div>
            </div>

            <div class="flex max-xs:text-[3.6vw]">
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">
                        
                    </div>
                </div>
                <div class="mt-[3.2vw] mb-[1.6vw] xs:mt-4 xs:mb-2 opacity-40 dark:opacity-30 font-open-sans text-[2.8vw] xs:text-[14px] hover:opacity-100 cursor-pointer duration-300 transition-all">show more reply...</div>
            </div>

            <!-- induk -->
            <div class="flex max-xs:text-[3.6vw]">
                <div class="">
                    <div class="flex w-full items-center mb-[2.4vw] xs:mb-3 mt-[3.2vw] xs:mt-4">
                        <div class="h-[9.6vw] xs:h-12 mr-[3.2vw] xs:mr-4 bg-red-400 aspect-square rounded-full"></div>
                        <div class="flex items-center text-zinc-900 dark:text-mainlight transition-all duration-300">username 
                            <!-- <div class="flex ml-2 bg-amber-300 h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans text-zinc-900">Creator</div>  -->
                            <!-- <div class="flex ml-2 bg-rose-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Admin</div>  -->
                            <!-- <div class="flex ml-2 bg-indigo-500 text-mainlight h-min font-[500] tracking-wide rounded-sm py-0.5 px-1.5 text-[10px] font-work-sans">Moderator</div>  -->
                            <div class="flex text-amber-500/70 dark:text-amber-300/80 transition-all duration-300 ml-[1.6vw] xs:ml-2 font-[600] text-[2.4vw] xs:text-[12px] items-center font-work-sans tracking-tight whitespace-nowrap"><Icon icon="material-symbols-light:crown-rounded" class={`text-[4vw] xs:text-[20px] mr-0.25`} /> top comment</div>
                        </div>
                        <div class="flex duration-300 transition-all justify-end flex-1 font-work-sans font-[400] opacity-50 text-[2.8vw] xs:text-[14px]">
                            12 Hours ago
                        </div>
                    </div>
                    <div class="flex">
                        <div>
                            <div class="text-zinc-900 dark:text-zinc-100 transition-all duration-300 tracking-wide font-[400] max-xs:text-[3.2vw] max-sm:text-[12px]">comments Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, saepe ad enim rerum doloremque labore! Odit dolorum mollitia incidunt veritatis. Voluptatem doloremque corporis sequi cumque quaerat tempore excepturi debitis aut nesciunt dolores recusandae exercitationem possimus saepe hic incidunt fuga, optio earum sit ad cupiditate velit est? Facere praesentium quod aut commodi, nisi neque saepe expedita maxime sit numquam doloribus quia tempora obcaecati sequi, repellat deserunt nulla incidunt officiis dolorem. Neque, eveniet, vero assumenda vel accusantium dignissimos aliquam nisi, quae at recusandae perspiciatis accusamus quo sunt dicta itaque distinctio voluptatibus. Eligendi eos tenetur esse voluptatum, consectetur atque est magni nemo sequi a? Modi, qui ea! Ea sint molestiae dolores dignissimos ipsam, cum voluptatem velit, voluptate obcaecati rem ullam saepe in molestias odio, labore ut.</div>
                        </div>
                    </div>
                    <div class="flex items-center mt-[1.6vw] xs:mt-3 h-[40px] space-x-[2.4vw] xs:space-x-3 mb-[3.2vw] xs:mb-4">
                        <div class="flex items-center space-x-[3.2vw] xs:space-x-3 bg-zinc-200/70 dark:bg-zinc-800 px-[2.4vw] xs:px-3 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-up-line" class={`text-[4vw] xs:text-[20px] text-emerald-500 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-up-fill" class={`text-[4vw] xs:text-[20px] text-emerald-500 hidden group-hover:block`} />
                            </div>
                            <div class="my-2 font-work-sans text-zinc-900 dark:text-mainlight transition-all duration-300 text-[2.8vw] xs:text-[14px]">101</div>
                            <div class="group cursor-pointer">
                                <Icon icon="mingcute:large-arrow-down-line" class={`text-[4vw] xs:text-[20px] text-red-400 group-hover:hidden`} />
                                <Icon icon="mingcute:large-arrow-down-fill" class={`text-[4vw] xs:text-[20px] text-red-400 hidden group-hover:block`} />
                            </div>
                        </div>
                        <div class="font-work-sans flex items-center justify-center tracking-wide transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[3.2vw] xs:px-4 rounded-[1.2vw] xs:rounded-md h-full text-[2.8vw] xs:text-[14px]">reply?</div>
                        <div class="flex justify-end flex-1 h-full">
                            <div class="cursor-pointer flex justify-center items-center hover:bg-zinc-300 dark:hover:bg-zinc-700 aspect-square text-zinc-900 dark:text-mainlight bg-zinc-200/70 dark:bg-zinc-800 rounded-[1.2vw] xs:rounded-md transition-all duration-300 h-full">
                                <Icon icon="ph:dots-three-outline-vertical-fill" class={`text-[4vw] xs:text-[20px] transition-all duration-300`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex max-xs:text-[3.6vw]">
                <div class="pl-[2.4vw] xs:pl-3 pr-[4.8vw] xs:pr-6">
                    <div class="bg-zinc-400 dark:bg-zinc-500 h-full w-[1.5px] transition-all duration-300">
                        
                    </div>
                </div>
                <div class="mt-[3.2vw] mb-[1.6vw] xs:mt-4 xs:mb-2 opacity-40 dark:opacity-30 font-open-sans text-[2.8vw] xs:text-[14px] hover:opacity-100 cursor-pointer duration-300 transition-all">show more reply...</div>
            </div>

            <div class="flex justify-center w-full my-[3.2vw] xs:my-4">
                <div class="flex items-center justify-center transition-all duration-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer bg-zinc-200/70 dark:bg-zinc-800 px-[2.4vw] xs:px-2 h-[8vw] xs:h-[32px] rounded-[1.2vw] xs:rounded-md text-[3.6vw] xs:text-[16px]">show more...</div>
            </div>

        </div>
    <!-- </div> -->
    {/if}


    <Footer />
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

	.overflow-scroll-hidden {
		overflow: auto;
		scrollbar-width: none;       /* Firefox */
		-ms-overflow-style: none;    /* Internet Explorer 10+ */
	}

	.overflow-scroll-hidden::-webkit-scrollbar {
		display: none;               /* Safari & Chrome */
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