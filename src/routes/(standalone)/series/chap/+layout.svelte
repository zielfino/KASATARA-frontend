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

    // === Scroll Handler ===
    function handleScroll() {
        const currentY = window.scrollY;
        navShow = currentY < lastScrollY;
        lastScrollY = currentY;
    }

    // === Resize Handler ===
    function updateDeviceFlags() {
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
    let scrollPercent = 0;
    let hoverPercent: number | null = null;

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
        const contentH = slotWrapper.offsetHeight;
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
        navShow = !navShow 
        if (autoPlay) {
            autoPlay = false 
            localStorage.setItem("autoPlay", 'false')    
            setTimeout(() => {
                navShow = !navShow;
            }, 300);
        }
    }
</script>


<section class="bg-zinc-900 flex justify-center w-full relative">
    {#if settings}
    <div transition:fade={{ duration: 150 }} class="fixed w-full h-full bg-zinc-900/80 z-150 text-mainlight flex justify-center items-center">
        <div class="min-w-64 min-h-64 bg-zinc-900 border-2 rounded-xl border-mainlight/30 flex flex-col items-center">
            <div class="w-full flex justify-between items-center">
                <div class="px-6 py-4">Settings</div>
                <button on:click={() => settings = !settings} class="cursor-pointer p-4 mr-2"><Icon icon="maki:cross" /></button>
            </div>
            <div class="bg-mainlight/30 h-[1.5px] w-[90%] rounded-full"></div>
            <div class="px-4 py-3 pb-4 space-y-3">
                <div>
                    <div class="mb-2">Read Mode</div>
                    <div class="flex space-x-4 justify-center">
                        <button on:click={() => marathonMode = false} class={`flex flex-col justify-center items-center text-sm font-[400] leading-[1] tracking-wide w-24 h-24 rounded-xl text-center
                        ${marathonMode ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-mainlight' 
                        : 'border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-4xl mb-1" icon="mingcute:walk-fill" />
                            Normal Mode
                        </button>
                        <button on:click={() => marathonMode = true}  class={`flex flex-col justify-center items-center text-sm font-[400] leading-[1] tracking-wide w-24 h-24 rounded-xl text-center
                        ${!marathonMode ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-mainlight' 
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
                        ${readQuality !== 'low' ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-mainlight' 
                        : 'border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-5xl mb-1" icon="mdi:quality-low" />
                            Data Saver
                        </button>
                        <button on:click={() => readQuality = 'mid'}  class={`flex flex-col justify-center items-center text-sm font-[400] leading-[1] tracking-wide w-24 h-24 rounded-xl text-center
                        ${readQuality !== 'mid' ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-mainlight' 
                        : 'border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-5xl mb-1" icon="mdi:quality-medium" />
                            Normal Quality
                        </button>
                        <button on:click={() => readQuality = 'high'}  class={`flex flex-col justify-center items-center text-sm font-[400] leading-[1] tracking-wide w-24 h-24 rounded-xl text-center
                        ${readQuality !== 'high' ? 'hover:border-3 hover:bg-mainred/5 hover:border-mainred/30 cursor-pointer transition-all border-2 border-mainlight' 
                        : 'border-3 border-mainred bg-mainred/15 pointer-events-none'}`}>
                            <Icon class="text-5xl mb-1" icon="mdi:quality-high" />
                            Full Quality
                        </button>
                    </div>
                </div>

                <div class="w-full">
                    <div class="mb-2">Scroll Speed</div>
                    <div class="flex space-x-4 w-full">
                        <div class="min-w-64 w-full text-white">
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
            <div class="bg-mainlight/30 h-[1.5px] w-[90%] rounded-full"></div>
            <!-- {#if showAutoPlayUI} -->
            <div class="px-4 py-3 w-full space-x-2 flex justify-end">
                <button on:click={saveSettings} class="bg-mainred border-2 border-mainred hover:bg-mainred/30 transition-all cursor-pointer px-3 py-1 rounded-md">Save</button>
                <button on:click={() => settings = !settings} class="bg-zinc-900 border-2 border-mainlight/30 hover:bg-mainred/15 transition-all hover:border-mainred cursor-pointer px-3 py-1 rounded-md">Later</button>
            </div>
            <!-- {/if} -->
        </div>
    </div>
    {/if}
    <div class={`${settings ? '' : ''} fixed w-full z-100 top-0 bg-zinc-800 text-mainlight text-[2.8vw] xs:text-sm flex justify-center transition duration-300 ${navShow ? '' : '-translate-y-[11.2vw] xs:-translate-y-[56px]'}`}>
        <div class="w-[1200px] flex justify-between items-center">
            <div class="flex items-center">
                <!-- Bacaan Series Page -->
                <a tabindex={navShow ? 0 : -1} href="/series" class="outline-none focus-visible:bg-zinc-50/5 hover:bg-zinc-50/15 active:bg-zinc-50/15 cursor-pointer">
                    <img src="data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath d='M10.7552 3.17711C11.1549 2.93817 11.6542 2.9412 12.051 3.18498L19.9314 8.02706L20.7167 6.74904L12.8363 1.90696C11.9634 1.37064 10.8648 1.36396 9.98549 1.88965L2.83889 6.16218C2.00844 6.65865 1.5 7.555 1.5 8.52253V19.7509C1.5 21.2697 2.73122 22.5009 4.25 22.5009H7.44938V21.0009H4.25C3.55964 21.0009 3 20.4413 3 19.7509V8.52253C3 8.08275 3.23111 7.67531 3.60858 7.44965L10.7552 3.17711Z' fill='%23f8f9fa'/%3e %3cpath d='M11 12.5C11 11.9477 11.4477 11.5 12 11.5C12.5523 11.5 13 11.9477 13 12.5C13 13.0523 12.5523 13.5 12 13.5C11.4477 13.5 11 13.0523 11 12.5Z' fill='%23f8f9fa'/%3e %3cpath d='M22.5 13.25H14.5V11.75H22.5V13.25Z' fill='%23f8f9fa'/%3e %3cpath d='M14.5 17.5H22.5V16H14.5V17.5Z' fill='%23f8f9fa'/%3e %3cpath d='M11 16.75C11 16.1977 11.4477 15.75 12 15.75C12.5523 15.75 13 16.1977 13 16.75C13 17.3023 12.5523 17.75 12 17.75C11.4477 17.75 11 17.3023 11 16.75Z' fill='%23f8f9fa'/%3e %3cpath d='M14.5 21.75H22.5V20.25H14.5V21.75Z' fill='%23f8f9fa'/%3e %3cpath d='M11 21C11 20.4477 11.4477 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21Z' fill='%23f8f9fa'/%3e %3c/svg%3e" 
                    class="p-[3.2vw] xs:p-4 max-xs:w-[11.2vw]" alt="">
                </a>
                <!-- Chapter List Pop Up -->
                <button tabindex={navShow ? 0 : -1} class="ml-[3.2vw] xs:ml-4 cursor-pointer focus-visible:underline outline-none hover:underline active:underline line-clamp-1">Sky-Breaking Sword Saint (3)</button> 
            </div>
            <div class="h-full flex items-center mr-4">
                {#if !$tablet}    
                <button tabindex={navShow ? 0 : -1} on:click={toggleAutoPlay} class={`mx-3 cursor-pointer group outline-none`}>
                    <div class="">
                        <Icon icon="iconamoon:player-play" class={`text-[4.8vw] xs:text-2xl ${!autoPlay ? 'group-hover:hidden group-focus-visible:hidden' : 'hidden'}`} /><Icon icon="iconamoon:player-play-fill" class={`text-[4.8vw] xs:text-2xl hidden ${!autoPlay ? 'group-hover:block group-focus-visible:block' : 'hidden'}`} />
                    </div>
                    <div class="">
                        <Icon icon="iconamoon:player-pause" class={`text-[4.8vw] xs:text-2xl ${!autoPlay ? 'hidden' : 'group-hover:hidden'}`} /><Icon icon="iconamoon:player-pause-fill" class={`text-[4.8vw] xs:text-2xl hidden ${!autoPlay ? 'hidden' : 'group-hover:block'}`} />
                    </div>
                </button>
                <!-- <div class="mx-3 cursor-pointer group"><Icon icon="iconamoon:lightning-1" class={`text-[4.8vw] xs:text-2xl group-hover:hidden`} /><Icon icon="iconamoon:lightning-1-fill" class={`text-[4.8vw] xs:text-2xl hidden group-hover:block`} /></div> -->
                <button tabindex={navShow ? 0 : -1} on:click={() => settings = !settings} class="mx-3 cursor-pointer group outline-none"><Icon icon="iconamoon:settings" class={`text-[4.8vw] xs:text-2xl group-hover:hidden group-focus-visible:hidden`} /><Icon icon="iconamoon:settings-fill" class={`text-[4.8vw] xs:text-2xl hidden group-hover:block group-focus-visible:block`} /></button>   
                <div class="mx-3 cursor-pointer group"><Icon icon="mingcute:comment-line" class={`text-[4.8vw] xs:text-2xl group-hover:hidden`} /><Icon icon="mingcute:comment-fill" class={`text-[4.8vw] xs:text-2xl hidden group-hover:block`} /></div>   
                <!-- <div class="mx-3 cursor-pointer relative">
                    <Icon icon="mingcute:comment-line" class={`text-[4.8vw] xs:text-2xl`} />
                    <span class="absolute -top-1.5 -right-1.5 bg-zinc-800 border-2 border-mainlight text-mainlight text-[8px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        1K
                    </span>
                </div> -->
                <div class="flex items-center cursor-pointer ml-4"><Icon icon="ph:caret-left-bold" class={`text-[4.8vw] xs:text-2xl mr-3`} />Prev</div>
                <div class="border-r border-[1.5px] rounded-full h-4 mx-4 opacity-40"></div>
                <div class="flex items-center cursor-pointer">Next<Icon icon="ph:caret-right-bold" class={`text-[4.8vw] xs:text-2xl ml-3`} /></div>
                {/if}
            </div>
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
                class={`absolute inset-x-0 w-full h-full cursor-pointer transition-all outline-none accent-mainred appearance-none focus-visible:appearance-auto focus-visible:accent-sky-400 ${navShow ? 'range-custom' : 'range-before'}`}
            />
        </div>








        {#if hoverPercent !== null}
        <div class="absolute bg-zinc-800 top-[calc(100%+24px)] py-0.5 px-1.5 rounded-md z-3" transition:fade={{ duration: 150 }}>{Math.round(hoverPercent)}%</div>
        {/if}
        {#if navShow}
        <div class={`absolute bg-zinc-700/35 top-[calc(100%+16px)] py-[0.4vw] xs:py-0.5 px-[1.2vw] xs:px-1.5 rounded-[1.2vw] xs:rounded-md text-[2.4vw] xs:text-xs z-2 transition ${navShow?'':'opacity-0'} ${hoverPercent ? 'opacity-0' : ''}`} transition:fade={{ duration: 150 }}>Direkomendasikan 13 tahun ke atas</div>
        {/if}
    </div>
    <!-- {#if autoPlay} -->
    <div class={`fixed w-full z-100 bottom-0 flex justify-center transition duration-300 ${autoPlay ? 'delay-500' : 'translate-y-[16.8vw] xs:translate-y-[84px]'}`}>
        <div class="absolute bottom-[16px] right-[16px] text-sm text-mainlight space-x-[2.4vw] xs:space-x-3">
            <button bind:this={stopButton} on:click={handleAutoScroll} tabindex={autoPlay ? 0 : -1} class="p-[2.4vw] outline-none focus-visible:bg-zinc-700 xs:p-3 rounded-full relative bg-zinc-800 active:bg-zinc-700 cursor-pointer hover:bg-zinc-700 group">
                <Icon icon="iconamoon:player-pause" class={`text-[4.8vw] xs:text-2xl ${autoPlay ? 'group-hover:hidden' : ''}`} />
                <Icon icon="iconamoon:player-pause-fill" class={`text-[4.8vw] xs:text-2xl hidden ${autoPlay ? 'group-hover:block' : 'hidden'}`} />
            </button>
        </div>
    </div>
    <!-- {/if} -->
    <div class={`${settings ? '' : ''} fixed w-full z-100 bottom-0 flex justify-center transition duration-300 ${navShow ? '' : 'translate-y-[16.8vw] xs:translate-y-[84px]'}`}>
        {#if !$tablet}
        <div class="absolute bottom-[16px] right-[16px] text-sm text-mainlight space-x-[2.4vw] xs:space-x-3">
            <button tabindex={navShow ? 0 : -1} class="p-[2.4vw] xs:p-3 rounded-full relative bg-zinc-800 active:bg-zinc-700 cursor-pointer hover:bg-zinc-700">
                <Icon icon="mingcute:share-2-line" class={`text-2xl -translate-x-0.5`} />
            </button>
        </div>
        {/if}
        {#if $tablet}
        <div class="absolute bottom-[6.4vw] xs:bottom-[32px] text-sm text-mainlight space-x-[2.4vw] xs:space-x-3">
            
            <button tabindex={navShow ? 0 : -1} class="outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-zinc-800 active:bg-zinc-700 cursor-pointer hover:bg-zinc-700">
                <Icon icon="ph:caret-left-bold" class={`text-[4.8vw] xs:text-2xl`} />
            </button>

            <button tabindex={navShow ? 0 : -1} class="outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full bg-zinc-800 active:bg-zinc-700 cursor-pointer hover:bg-zinc-700 group">
                <!-- <div class="relative">
                    <Icon icon="iconamoon:comment" class={`text-[4.8vw] xs:text-2xl`} />
                    <span class="absolute -top-[1.2vw] xs:-top-1.5 -right-[1.2vw] xs:-right-1.5 bg-zinc-800 active:bg-zinc-700 border-[0.4 vw] xs:border-2 border-mainlight text-mainlight text-[1.6vw] xs:text-[8px] font-semibold rounded-full w-[4vw] xs:w-5 h-[4vw] xs:h-5 flex items-center justify-center">
                        1K
                    </span>
                </div> -->
                <div class="relative">
                    <Icon icon="mingcute:comment-line" class={`text-[4.8vw] xs:text-2xl`} /><Icon icon="mingcute:comment-fill" class={`text-[4.8vw] xs:text-2xl hidden`} />
                </div>
            </button>
            
            <button on:click={toggleAutoPlay} tabindex={navShow ? 0 : -1} class="outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-zinc-800 active:bg-zinc-700 cursor-pointer hover:bg-zinc-700 group">
                <div class="relative">
                    <Icon icon="iconamoon:player-pause" class={`text-[4.8vw] xs:text-2xl ${autoPlay ? 'group-hover:hidden' : 'hidden'}`} /><Icon icon="iconamoon:player-pause-fill" class={`text-[4.8vw] xs:text-2xl hidden ${autoPlay ? 'group-hover:block' : 'hidden'}`} />
                </div>
                <div class="relative">
                    <Icon icon="iconamoon:player-play" class={`text-[4.8vw] xs:text-2xl ${autoPlay ? 'hidden' : 'group-hover:hidden'}`} /><Icon icon="iconamoon:player-play-fill" class={`text-[4.8vw] xs:text-2xl hidden ${autoPlay ? 'hidden' : 'group-hover:block'}`} />
                </div>
            </button>

            <button on:click={() => settings = !settings} tabindex={navShow ? 0 : -1} class="outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-zinc-800 active:bg-zinc-700 cursor-pointer hover:bg-zinc-700">
                <Icon icon="iconamoon:settings" class={`text-[4.8vw] xs:text-2xl`} />
            </button>
            
            <button tabindex={navShow ? 0 : -1} class="outline-none focus-visible:bg-zinc-700 p-[2.4vw] xs:p-3 rounded-full relative bg-zinc-800 active:bg-zinc-700 cursor-pointer hover:bg-zinc-700">
                <Icon icon="ph:caret-right-bold" class={`text-[4.8vw] xs:text-2xl`} />
            </button>
        </div>
        {/if}
    </div>
    <div bind:this={slotWrapper} class="relative overflow-auto scroll-smooth focus-visible:opacity-50 outline-none" role="button" tabindex="0" on:keydown={(e) => {if (e.key === 'Enter' || e.key === ' ') {e.preventDefault();handleAutoScroll();} }} on:click={handleAutoScroll}>
        <slot />
    </div>
</section>  

<style>
    /* Ini akan diterapkan ke html dan body secara global */
    :global(html),
    :global(body) {
        scrollbar-width: none;      /* Firefox */
        -ms-overflow-style: none;   /* IE 10+ / Edge */
    }

    :global(html::-webkit-scrollbar),
    :global(body::-webkit-scrollbar) {
        display: none;              /* Chrome, Safari, Opera */
    }
    
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