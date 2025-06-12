<!-- <script lang="ts">
    
  import { onMount, tick } from 'svelte';
  import Icon from '@iconify/svelte';
    import { writable } from 'svelte/store';
    import Card from './util/card.svelte';

  let widthKontainer = 0;

  onMount(() => {
    const resizeObserver = new ResizeObserver(() => {
      widthKontainer = sliderContainer.offsetWidth;
    });
    resizeObserver.observe(sliderContainer);
    widthKontainer = sliderContainer.offsetWidth;

    return () => resizeObserver.disconnect();
  });


  export let totalGroup = 4;
  let sliderContainer: HTMLDivElement;
  let slideWidth = 0;
  $: currentGroup = $phone ? 0 : 1;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let isTransitioning = false;
let displayGroup = 1;
    onMount(() => {
        (async () => {
            await tick();
            const updateSlideWidth = () => {
                const firstSlide = sliderContainer.querySelector('.slider-group') as HTMLElement;
                if (firstSlide) {
                slideWidth = firstSlide.offsetWidth + 8; // include gap
                scrollToIndex(currentGroup, true)
                }
            };

            updateSlideWidth();       // inisialisasi pertama
            scrollToIndex(1, false);  // scroll ke grup 1 asli

            const observer = new ResizeObserver(updateSlideWidth);
            observer.observe(sliderContainer);

            return () => observer.disconnect();
        })();

        // return () => {
        //     observer.disconnect()
        // };
    });

// onMount(
//     async () => {
//         await tick(); // pastikan DOM sudah render

//         const updateSlideWidth = () => {
//             const firstSlide = sliderContainer.querySelector('.slider-group') as HTMLElement;
//             if (firstSlide) {
//             slideWidth = firstSlide.offsetWidth + 8; // include gap
//             scrollToIndex(currentGroup, true)
//             }
//         };

//         updateSlideWidth();       // inisialisasi pertama
//         scrollToIndex(1, false);  // scroll ke grup 1 asli

//         const observer = new ResizeObserver(updateSlideWidth);
//         observer.observe(sliderContainer);

//         return () => observer.disconnect();
//     }
// );


function scrollToIndex(index: number, smooth: boolean = true) {
  sliderContainer.style.scrollBehavior = smooth ? 'smooth' : 'auto';
  sliderContainer.scrollTo({ left: index * slideWidth });
  
  // update displayGroup hanya jika bukan clone
  if (index >= 1 && index <= totalGroup) {
    displayGroup = index;
  }
}

  function nextSlide() {
    if (isTransitioning || window.innerWidth <= 500) return;
    currentGroup++;

    scrollToIndex(currentGroup, true);

    if (currentGroup === totalGroup+1) {
      isTransitioning = true;
      setTimeout(() => {
        scrollToIndex(1, false); // ke grup 1 asli
        currentGroup = 1;
        isTransitioning = false;
      }, 700); // delay harus sama seperti durasi scroll CSS
    }
  }

  function prevSlide() {
    if (isTransitioning || window.innerWidth <= 500) return;
    currentGroup--;

    scrollToIndex(currentGroup, true);

    if (currentGroup === 0) {
      isTransitioning = true;
      setTimeout(() => {
        scrollToIndex(totalGroup, false); // ke grup totalGroup asli
        currentGroup = totalGroup;
        isTransitioning = false;
      }, 700);
    }
  }

  function handlePointerDown(e: PointerEvent) {
    if (isTransitioning || window.innerWidth <= 500) return;
    isDragging = true;
    startX = e.clientX;
    scrollStart = sliderContainer.scrollLeft;
    sliderContainer.setPointerCapture(e.pointerId);
    sliderContainer.style.scrollBehavior = 'auto';
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging || isTransitioning || window.innerWidth <= 500) return;
    const dx = e.clientX - startX;
    sliderContainer.scrollLeft = scrollStart - dx;
  }

  function handlePointerUp() {
    if (isTransitioning || window.innerWidth <= 500) return;
    isDragging = false;
    sliderContainer.style.scrollBehavior = 'smooth';

    const index = Math.round(sliderContainer.scrollLeft / slideWidth);
    currentGroup = index;

    scrollToIndex(currentGroup, true);

    // Periksa apakah kita sedang di clone
    if (index === 0) {
      isTransitioning = true;
      setTimeout(() => {
        scrollToIndex(totalGroup, false);
        currentGroup = totalGroup;
        isTransitioning = false;
      }, 700);
    } else if (index === 5) {
      isTransitioning = true;
      setTimeout(() => {
        scrollToIndex(1, false);
        currentGroup = 1;
        isTransitioning = false;
      }, 700);
    }
  }
    const phone = writable(false);
    const desktop = writable(false);
    const desktopex = writable(false);
    const desktoplarge = writable(false);

    onMount(() => {
        const update = () => {
            phone.set(window.innerWidth <= 500);
            desktop.set(window.innerWidth >= 900);
            desktopex.set(window.innerWidth >= 1300);
            desktoplarge.set(window.innerWidth >= 1100);
        };

        update(); // Initial check
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    });




    // type Tag = {
    //     label: string;
    //     icon?: string;
    // };

    // let filter: Tag[] = [
    //     { label: 'Rekomendasi', icon: 'material-symbols:bolt' },
    //     { label: 'Baru Rilis', icon: 'mingcute:large-arrow-up-fill' },
    //     { label: 'Ringan', icon: 'fa6-solid:feather-pointed' },
    //     { label: 'Bacaan Pendek', icon: 'material-symbols:short-text-rounded' },
    //     { label: 'Banyak Chapter', icon: 'material-symbols:folder-copy-rounded' },
    //     { label: 'Upload Mingguan', icon: 'mingcute:calendar-month-fill' },
    //     { label: 'Upload Bulanan', icon: 'mingcute:calendar-month-fill' },
    //     { label: 'Upload Sesuai Mood Author', icon: 'material-symbols:person-rounded' },
    //     { label: 'Komik Adaptasi Novel', icon: 'material-symbols:person-4-rounded'},
    //     { label: 'Emosional' },
    //     { label: 'Sedang Ramai' },
    //     { label: 'Shounen' },
    //     { label: 'Shoujo' },
    //     { label: 'Sejarah' },
    //     { label: 'Dewasa' },
    //     { label: 'Lainnya' }
    // ];


    // export let slide = 4;
    export let jenis;
    import { update } from '$lib/updatedummy';
    // const komikCard = update.find(c => c.type === 'KOMIK');
    // const notwo = update.filter(c => c.type === 'KOMIK').at(1);
    $: filterCards = update.filter(c => c.type === jenis);














    let scrollTimeout: ReturnType<typeof setTimeout>;

function handleScroll() {
  if (isTransitioning || isDragging || window.innerWidth <= 500) return;

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const index = Math.round(sliderContainer.scrollLeft / slideWidth);
    currentGroup = index;
    scrollToIndex(currentGroup, true);

    // Looping jika scroll terlalu ke ujung (infinite effect)
    if (index === 0) {
      isTransitioning = true;
      setTimeout(() => {
        scrollToIndex(totalGroup, false);
        currentGroup = totalGroup;
        isTransitioning = false;
      }, 400);
    } else if (index === 5) {
      isTransitioning = true;
      setTimeout(() => {
        scrollToIndex(1, false);
        currentGroup = 1;
        isTransitioning = false;
      }, 400);
    }
  }, 100); // debounce 100ms
}

// function handlePointerUp() {
//   if (isTransitioning) return;
//   isDragging = false;
//   sliderContainer.style.scrollBehavior = 'smooth';

//   // Delay sedikit agar scroll position settle
//   setTimeout(() => {
//     const index = Math.round(sliderContainer.scrollLeft / slideWidth);
//     currentGroup = index;
//     scrollToIndex(currentGroup, true);

//     if (index === 0) {
//       isTransitioning = true;
//       setTimeout(() => {
//         scrollToIndex(4, false);
//         currentGroup = 4;
//         isTransitioning = false;
//       }, 400);
//     } else if (index === 5) {
//       isTransitioning = true;
//       setTimeout(() => {
//         scrollToIndex(1, false);
//         currentGroup = 1;
//         isTransitioning = false;
//       }, 400);
//     }
//   }, 50);
// }

</script> -->

<script lang="ts">
    import { onMount, tick } from 'svelte';
    import { writable } from 'svelte/store';
    import Icon from '@iconify/svelte';
    import Card from './util/card.svelte';
    import { update } from '$lib/updatedummy';

    // Props
    export let totalGroup: number = 4;
    export let jenis;

    // Refs
    let sliderContainer: HTMLDivElement;

    // Stores for layout breakpoints
    const phone = writable(false);
    const desktop = writable(false);
    const desktopex = writable(false);
    const desktoplarge = writable(false);

    // Reactive and local state
    let widthKontainer = 0;
    let slideWidth = 0;
    // let currentGroup = 1;
    $: currentGroup = $phone ? 0 : 1;
    let displayGroup = 1;
    let isDragging = false;
    let isTransitioning = false;
    let startX = 0;
    let scrollStart = 0;
    let scrollTimeout: ReturnType<typeof setTimeout>;
    $: filterCards = update.filter(c => c.type === jenis);

    // Initialize responsive stores
    onMount(() => {
        const updateSizes = () => {
            const w = window.innerWidth;
            phone.set(w <= 500);
            desktop.set(w >= 900);
            desktopex.set(w >= 1300);
            desktoplarge.set(w >= 1100);
        };

        updateSizes();
        window.addEventListener('resize', updateSizes);
        return () => window.removeEventListener('resize', updateSizes);
    });

    // Setup container resize observer and initial measurements
    onMount(() => {
        (async () => {
            await tick();
            const updateMeasurements = () => {
                const firstSlide = sliderContainer.querySelector('.slider-group') as HTMLElement;
                if (firstSlide) {
                    slideWidth = firstSlide.offsetWidth + 8; // include gap
                    scrollToIndex(currentGroup, true);
                }
            };

            updateMeasurements();
            scrollToIndex(1, false);

            const observer = new ResizeObserver(updateMeasurements);
            observer.observe(sliderContainer);
            return () => observer.disconnect();
        })();

        const resizeObserver = new ResizeObserver(() => {
            widthKontainer = sliderContainer.offsetWidth;
        });
        resizeObserver.observe(sliderContainer);
        widthKontainer = sliderContainer.offsetWidth;
        return () => resizeObserver.disconnect();
    });

    // Scroll utilities
    function scrollToIndex(index: number, smooth: boolean = true) {
        sliderContainer.style.scrollBehavior = smooth ? 'smooth' : 'auto';
        sliderContainer.scrollTo({ left: index * slideWidth });
        if (index >= 1 && index <= totalGroup) {
            displayGroup = index;
        }
    }

    function nextSlide() {
        if (isTransitioning || window.innerWidth <= 500) return;
        currentGroup++;
        scrollToIndex(currentGroup, true);
        if (currentGroup === totalGroup + 1) {
            isTransitioning = true;
            setTimeout(() => {
                scrollToIndex(1, false);
                currentGroup = 1;
                isTransitioning = false;
            }, 700);
        }
    }

    function prevSlide() {
        if (isTransitioning || window.innerWidth <= 500) return;
        currentGroup--;
        scrollToIndex(currentGroup, true);
        if (currentGroup === 0) {
            isTransitioning = true;
            setTimeout(() => {
                scrollToIndex(totalGroup, false);
                currentGroup = totalGroup;
                isTransitioning = false;
            }, 700);
        }
    }

    // Pointer & scroll handlers
    function handlePointerDown(e: PointerEvent) {
        if (isTransitioning || window.innerWidth <= 500) return;
        isDragging = true;
        startX = e.clientX;
        scrollStart = sliderContainer.scrollLeft;
        sliderContainer.setPointerCapture(e.pointerId);
        sliderContainer.style.scrollBehavior = 'auto';
    }

    function handlePointerMove(e: PointerEvent) {
        if (!isDragging || isTransitioning || window.innerWidth <= 500) return;
        const dx = e.clientX - startX;
        sliderContainer.scrollLeft = scrollStart - dx;
    }

    function handlePointerUp() {
        if (isTransitioning || window.innerWidth <= 500) return;
        isDragging = false;
        sliderContainer.style.scrollBehavior = 'smooth';
        const index = Math.round(sliderContainer.scrollLeft / slideWidth);
        currentGroup = index;
        scrollToIndex(currentGroup, true);
        if (index === 0) {
            resetTo(totalGroup);
        } else if (index === totalGroup + 1) {
            resetTo(1);
        }
    }

    function handleScroll() {
        if (isTransitioning || isDragging || window.innerWidth <= 500) return;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const index = Math.round(sliderContainer.scrollLeft / slideWidth);
            currentGroup = index;
            scrollToIndex(currentGroup, true);
            if (index === 0) resetTo(totalGroup, 400);
            else if (index === totalGroup + 1) resetTo(1, 400);
        }, 100);
    }

    function resetTo(group: number, delay = 700) {
        isTransitioning = true;
        setTimeout(() => {
            scrollToIndex(group, false);
            currentGroup = group;
            isTransitioning = false;
        }, delay);
    }
</script>



<section class="w-full flex justify-center py-2 max-xs:py-[1.6vw] portrait:py-0">
    <div class="w-full max-w-[calc(675px-16px)] xs:portrait:max-w-[calc(675px-16px)] md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] flex flex-col items-center justify-center relative max-xs:px-[1.6vw] max-xs:overflow-hidden">

        <!-- Slider -->
        <div class={`w-full relative
            ${jenis === 'VISUAL NOVEL' ? 
            'max-xs:min-h-[98.4vw] min-h-[calc((1100px/5)*2)] xs:portrait:min-h-[calc(100vw-180px)] min-[600px]:portrait:min-h-[calc(95vw-180px)] sm:portrait:min-h-[calc((1550px/5)*2-180px)] md:min-h-[calc((930px/5)*2+9px)] lg:min-h-[calc((913px/5)*2+9px)] xl:min-h-[calc((1070px/5)*2+8px)]' : 
            'max-xs:min-h-[145.65vw] min-h-[calc((1100px/5)*2)] xs:portrait:min-h-[calc(100vw)] min-[600px]:portrait:min-h-[calc(95vw)] sm:portrait:min-h-[calc((1550px/5)*2)] md:min-h-[calc((930px/5)*2+9px)] lg:min-h-[calc((913px/5)*2+9px)] xl:min-h-[calc((1070px/5)*2+8px)]'}
        `}>
            <div
                class="absolute top-0 left-0 w-full flex overflow-x-scroll scroll-smooth overflow-scroll-hidden overflow-hidden rounded-md max-xs:rounded-[1.2vw]"
                bind:this={sliderContainer}
                on:pointerdown={handlePointerDown}
                on:pointermove={handlePointerMove}
                on:pointerup={handlePointerUp}
                on:scroll={handleScroll}
            >

                <!-- PREV -->
            {#if !$phone}
                {#if totalGroup === 2}
                    <!-- Slide Group 2 -->
                    <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative mr-[8px] landscape:pb-[30px] xs:portrait:p-[2.2px]">
                        {#each filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 9 : $desktop ? 7 : $phone ? 4 : 5, $desktoplarge ? 19 : $desktop ? 15 : $phone ? 8 : 11) as card}
                            <Card item={{...card, size: '1x1', comments: "short", disable: true}} />
                        {/each}
                    </div>
                {/if}
                {#if totalGroup === 3}
                    <!-- Slide Group 3 -->
                    <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative mr-[8px] landscape:pb-[30px] xs:portrait:p-[2.2px]">
                        {#each filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 19 : $desktop ? 15 : $phone ? 8 : 11, $desktoplarge ? 29 : $desktop ? 23 : $phone ? 12 : 17) as card}
                            <Card item={{...card, size: '1x1', comments: "short", disable: true}} />
                        {/each}
                    </div>
                {/if}
                {#if totalGroup === 4}
                    <!-- Slide Group 4 -->
                    <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative mr-[8px] landscape:pb-[30px] xs:portrait:p-[2.2px]">
                        {#each filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 29 : $desktop ? 23 : $phone ? 12 : 17, $desktoplarge ? 39 : $desktop ? 31 : $phone ? 16 : 23) as card}
                            <Card item={{...card, size: '1x1', comments: "short", disable: true}} />
                        {/each}
                    </div>
                {/if}
            {/if}

                    <!-- Slide Group 1 -->
                    <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative mr-[8px] landscape:pb-[30px] xs:portrait:p-[2.2px]">
                        <Card item={{ ...filterCards[0], size: $phone ? '1x1' : '2x1', comments: "short" }} />
                        {#each filterCards.filter(c => c.type === jenis).slice(1, $desktoplarge ? 9 : $desktop ? 7 : $phone ? 4 : 5) as card}
                            <Card item={{...card, size: '1x1', comments: "short"}} />
                        {/each}
                    </div>

                    <!-- Slide Group 2 -->
                    <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative mr-[8px] landscape:pb-[30px] xs:portrait:p-[2.2px]">
                        {#each filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 9 : $desktop ? 7 : $phone ? 4 : 5, $desktoplarge ? 19 : $desktop ? 15 : $phone ? 8 : 11) as card}
                            <Card item={{...card, size: '1x1', comments: "short"}} />
                        {/each}
                    </div>

                    {#if totalGroup >= 3}
                    <!-- Slide Group 3 -->
                    <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative mr-[8px] landscape:pb-[30px] xs:portrait:p-[2.2px]">
                        {#each filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 19 : $desktop ? 15 : $phone ? 8 : 11, $desktoplarge ? 29 : $desktop ? 23 : $phone ? 12 : 17) as card}
                            <Card item={{...card, size: '1x1', comments: "short"}} />
                        {/each}
                    </div>
                    {/if}
                    {#if totalGroup >= 4}
                    <!-- Slide Group 4 -->
                    <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative mr-[8px] landscape:pb-[30px] xs:portrait:p-[2.2px]">
                        {#each filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 29 : $desktop ? 23 : $phone ? 12 : 17, $desktoplarge ? 39 : $desktop ? 31 : $phone ? 16 : 23) as card}
                            <Card item={{...card, size: '1x1', comments: "short"}} />
                        {/each}
                    </div>
                    {/if}

                    <!-- Slide Group 5 -->
                    {#if $phone && filterCards.filter(c => c.type === jenis).slice(totalGroup >= 4 ? 16 : totalGroup >= 3 ? 12 :8, totalGroup >= 4 ? 20 : totalGroup >= 3 ? 16 : 12).length}
                        <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] mr-0 lg:grid-cols-5 relative landscape:pb-[30px] xs:portrait:p-[2.2px]">
                            {#each filterCards.filter(c => c.type === jenis).slice(totalGroup >= 4 ? 16 : totalGroup >= 3 ? 12 :8, totalGroup >= 4 ? 20 : totalGroup >= 3 ? 16 : 12) as card}
                                <Card item={{...card, size: '1x1', comments: "short"}} />
                            {/each}
                        </div>
                    {/if}

                    <!-- {#if totalGroup >= 4}
                        {#if $phone && filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 39 : $desktop ? 31 : $phone ? 16 : 23, $desktoplarge ? 49 : $desktop ? 39 : $phone ? ( totalGroup >= 4 ? 20 : totalGroup >= 3 ? 16 : totalGroup >= 2 ? 12 : 29 ) : 29).length}
                            <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative landscape:pb-[30px] xs:portrait:p-[2.2px]">
                                {#each filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 49 : $desktop ? 31 : $phone ? 16 : 23, $desktoplarge ? 49 : $desktop ? 39 : $phone ? 20 : 29) as card}
                                    <Card item={{...card, size: '1x1', comments: "short"}} />
                                {/each}
                            </div>
                        {/if}
                    {:else if totalGroup >= 3}
                        {#if $phone && filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 39 : $desktop ? 31 : $phone ? 12 : 23, $desktoplarge ? 49 : $desktop ? 39 : $phone ? 16 : 29).length}
                            <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative landscape:pb-[30px] xs:portrait:p-[2.2px]">
                                {#each filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 49 : $desktop ? 31 : $phone ? 12 : 23, $desktoplarge ? 49 : $desktop ? 39 : $phone ? 16 : 29) as card}
                                    <Card item={{...card, size: '1x1', comments: "short"}} />
                                {/each}
                            </div>
                        {/if}
                    {:else if totalGroup >= 2}
                        {#if $phone && filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 39 : $desktop ? 31 : $phone ? 8 : 23, $desktoplarge ? 49 : $desktop ? 39 : $phone ? 12 : 29).length}
                            <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative landscape:pb-[30px] xs:portrait:p-[2.2px]">
                                {#each filterCards.filter(c => c.type === jenis).slice($desktoplarge ? 49 : $desktop ? 31 : $phone ? 8 : 23, $desktoplarge ? 49 : $desktop ? 39 : $phone ? 12 : 29) as card}
                                    <Card item={{...card, size: '1x1', comments: "short"}} />
                                {/each}
                            </div>
                        {/if}
                    {/if} -->
                
            <!-- NEXT -->
            {#if !$phone}
                <!-- Slide Group 1 -->
                <div class="slider-group grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 min-w-[100%] md:min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] max-xs:gap-[1.6vw] lg:grid-cols-5 relative mr-[8px] landscape:pb-[30px] xs:portrait:p-[2.2px]">
                    <Card item={{ ...filterCards[0], size: $phone ? '1x1' : '2x1', comments: "short", disable: true }} />
                    {#each filterCards.filter(c => c.type === jenis).slice(1, $desktoplarge ? 9 : $desktop ? 7 : $phone ? 4 : 5) as card}
                        <Card item={{...card, size: '1x1', comments: "short", disable: true}} />
                    {/each}
                </div>
            {/if}
            </div>
        </div>

        <!-- Navigation Buttons -->
        {#if !$phone}
            <div class="absolute xs:portrait:hidden h-full flex items-center -left-[6%] lg:-left-[4%] xl:-left-[5%] max-sm:hidden">
                <button tabindex="-1" class="cursor-pointer" on:click={prevSlide}>
                    <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="text-3xl text-stone-400" />
                </button>
            </div>
            <div class="absolute xs:portrait:hidden h-full flex items-center -right-[6%] lg:-right-[4%] xl:-right-[5%] max-sm:hidden">
                <button tabindex="-1" class="cursor-pointer" on:click={nextSlide}>
                    <Icon icon="material-symbols:arrow-forward-ios-rounded" class="text-3xl text-stone-400" />
                </button>
            </div>
        {/if}

        <!-- <div class="absolute z-10 bottom-0 right-0 bg-zinc-200 font-[700] text-lg tracking-[0.2rem] px-2 py-1 rounded-ss-[12px] text-transparent max-xs:hidden">
            <div class="absolute bg-zinc-50 text-zinc-900/50 text-base translate-y-1 tracking-[0.1rem] px-[7px] py-0.5 rounded-lg">
                {displayGroup}/{totalGroup}
            </div>
            {displayGroup}/{totalGroup}
        </div>
        <div class="absolute z-10 bottom-0 right-0 -translate-y-[36px] fill-zinc-200" style="width: 16px; height: 16px; max-xs:hidden">
            <svg viewBox="0 0 8 8" width="12" height="12"
                style="position: absolute; bottom: 0; right: 0;">
                <path d="M8 0 A8 8 0 0 1 0 8 L8 8 Z"/>
            </svg>
        </div>
        <div class="absolute z-10 bottom-0 right-0 -translate-x-[53.5px] fill-zinc-200" style="width: 16px; height: 16px; max-xs:hidden">
            <svg viewBox="0 0 8 8" width="12" height="12"
                style="position: absolute; bottom: 0; right: 0;">
                <path d="M8 0 A8 8 0 0 1 0 8 L8 8 Z"/>
            </svg>
        </div> -->


        <!-- Dots -->
        <!-- <p>Total Group: {totalGroup}</p>
<p>+1 = {totalGroup + 1}</p> -->
        {#if $desktoplarge}
            <div class="space-y-2 absolute top-4 -right-5 lg:-right-7 xl:-right-11 z-10
            flex flex-col justify-center items-center max-xs:hidden">
                {#each Array(totalGroup) as _, i}
                    <button
                        tabindex="-1"
                        aria-label={`Pindah ke slide ${displayGroup + 1}`}
                        class={`w-3 rounded-full cursor-pointer transition-all duration-300 delay-500 ease-out
                        ${i + 1 === currentGroup ? 'bg-zinc-900/50 aspect-[1/3]' : 'bg-zinc-900/20 aspect-[1/2]'}
                        `}
                        on:click={() => {
                        currentGroup = i + 1;
                        scrollToIndex(currentGroup, true);
                        }}
                    ></button>
                {/each}
            </div>
        {/if}
    </div>
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