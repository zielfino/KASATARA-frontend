<script lang="ts">
    
  import { onMount, tick } from 'svelte';
  import Icon from '@iconify/svelte';

    export let type;


  let sliderContainer: HTMLDivElement;
  let slideWidth = 0;
  let currentGroup = 1;
  let totalGroup = 4;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let isTransitioning = false;
let displayGroup = 1;

onMount(
    async () => {
  await tick(); // pastikan DOM sudah render

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
});


function scrollToIndex(index: number, smooth: boolean = true) {
  sliderContainer.style.scrollBehavior = smooth ? 'smooth' : 'auto';
  sliderContainer.scrollTo({ left: index * slideWidth });
  
  // update displayGroup hanya jika bukan clone
  if (index >= 1 && index <= totalGroup) {
    displayGroup = index;
  }
}

  function nextSlide() {
    if (isTransitioning) return;
    currentGroup++;

    scrollToIndex(currentGroup, true);

    if (currentGroup === 5) {
      isTransitioning = true;
      setTimeout(() => {
        scrollToIndex(1, false); // ke grup 1 asli
        currentGroup = 1;
        isTransitioning = false;
      }, 600); // delay harus sama seperti durasi scroll CSS
    }
  }

  function prevSlide() {
    if (isTransitioning) return;
    currentGroup--;

    scrollToIndex(currentGroup, true);

    if (currentGroup === 0) {
      isTransitioning = true;
      setTimeout(() => {
        scrollToIndex(4, false); // ke grup 4 asli
        currentGroup = 4;
        isTransitioning = false;
      }, 600);
    }
  }

  function handlePointerDown(e: PointerEvent) {
    if (isTransitioning) return;
    isDragging = true;
    startX = e.clientX;
    scrollStart = sliderContainer.scrollLeft;
    sliderContainer.setPointerCapture(e.pointerId);
    sliderContainer.style.scrollBehavior = 'auto';
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging || isTransitioning) return;
    const dx = e.clientX - startX;
    sliderContainer.scrollLeft = scrollStart - dx;
  }

  function handlePointerUp() {
    if (isTransitioning) return;
    isDragging = false;
    sliderContainer.style.scrollBehavior = 'smooth';

    const index = Math.round(sliderContainer.scrollLeft / slideWidth);
    currentGroup = index;

    scrollToIndex(currentGroup, true);

    // Periksa apakah kita sedang di clone
    if (index === 0) {
      isTransitioning = true;
      setTimeout(() => {
        scrollToIndex(4, false);
        currentGroup = 4;
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
  }
</script>


<section class="w-full flex justify-center py-2 bg-zinc-200 ">
    <div class="w-full max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] flex flex-col items-center justify-center relative">

        <!-- Slider -->
        <div class="w-full relative min-h-[calc(770px/5)] lg:min-h-[calc(913px/5)] xl:min-h-[calc(1070px/5)]">
            <div
                class="absolute top-0 left-0 w-full flex overflow-x-scroll scroll-smooth overflow-scroll-hidden overflow-hidden rounded-lg"
                bind:this={sliderContainer}
                on:pointerdown={handlePointerDown}
                on:pointermove={handlePointerMove}
                on:pointerup={handlePointerUp}
            >

                <!-- Slide Group 4 -->
                <div class="slider-group grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5 mr-[8px]" style="direction: rtl;">
                    <div class="rounded-lg col-span-2 md:h-[186.5px] lg:h-full w-full bg-green-600 flex justify-center items-center">Slide 4 - A</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-green-300 flex justify-center items-center">B</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-green-400 flex justify-center items-center">C</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-green-400 flex justify-center items-center">D</div>
                </div>
                
                <!-- Slide Group 1 -->
                <div class="grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5 relative mr-[8px]" style="direction: rtl;">
                    
                    <div 
                    class="relative bg-mainlight flex justify-center items-center p-3 col-span-2 rounded-lg overflow-hidden"
                    style="direction:ltr"
                    >

                        <!-- HOVER -->
                        <div class="absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 transition-opacity bg-purple-600">
                            <div class="absolute top-0 left-0 p-3">
                                <h3 class="text-left font-semibold line-clamp-1 text-mainlight text-[16px]">Return Of The Mount Hua Sect</h3>
                                <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                                <h4 class="text-mainlight text-justify font-semibold text-[12px] line-clamp-5 xl:line-clamp-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta enim voluptatem laborum impedit placeat!
                                    Aliqua error repudiandae commodi iusto a quasi similique quam...
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 p-3 w-full flex leading-[80%] space-x-1">
                                <!-- GENRE -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    Fantasy
                                </span>
                                <!-- TYPE -->
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>

                        <!-- BACKGROUND IMAGE -->
                        <div
                            class="absolute w-full h-full top-0 left-0 bg-cover bg-center"
                            style="background-image: url('https://i.imgur.com/kyLUJIS.png');"
                        ></div>

                        <!-- DISPLAYED -->
                        <div class="relative w-full h-full z-3">
                            <div class="absolute top-0 left-0 w-3/4">
                                <h3 class="text-left font-semibold line-clamp-3 text-zinc-900 text-[16px]">Return Of The Mount Hua Sect</h3>
                                <h4 class="flex items-center text-[14px] text-emerald-600/75">
                                    <Icon icon="fa6-solid:heart" class="mr-1" /> 1.3K
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 flex space-x-1 leading-[80%]">
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-800 text-purple-900 bg-purple-100 font-[600]">
                                    Fantasy
                                </span>
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-sky-600 text-sky-700 bg-sky-100 font-[600]">
                                    {type}
                                </span> -->
                            </div>
                        </div>
                    </div>
                    <div 
                    class="relative bg-mainlight flex justify-center items-center p-3 col-span-1 rounded-lg overflow-hidden aspect-[1/1]"
                    style="direction:ltr"
                    >

                        <!-- HOVER -->
                        <div class="absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 transition-opacity bg-purple-600">
                            <div class="absolute top-0 left-0 p-3">
                                <h3 class="text-left font-semibold line-clamp-1 text-mainlight text-[16px]">Return Of The Mount Hua Sect</h3>
                                <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                                <h4 class="text-mainlight text-justify font-semibold text-[12px] line-clamp-5 xl:line-clamp-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta enim voluptatem laborum impedit placeat!
                                    Aliqua error repudiandae commodi iusto a quasi similique quam...
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 p-3 w-full flex leading-[80%] space-x-1">
                                <!-- GENRE -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    Fantasy
                                </span>
                                <!-- TYPE -->
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>

                        <!-- BACKGROUND IMAGE -->
                        <div
                            class="absolute w-full h-full top-0 left-0 bg-cover bg-center"
                            style="background-image: url('https://i.imgur.com/kyLUJIS.png');"
                        ></div>

                        <!-- DISPLAYED -->
                        <div class="relative w-full h-full z-3">
                            <div class="absolute top-0 left-0 w-3/4">
                                <h3 class="text-left font-semibold line-clamp-3 text-zinc-900 text-[16px]">Return Of The Mount Hua Sect</h3>
                                <h4 class="flex items-center text-[14px] text-emerald-600/75">
                                    <Icon icon="fa6-solid:heart" class="mr-1" /> 1.3K
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 flex space-x-1 leading-[80%]">
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-800 text-purple-900 bg-purple-100 font-[600]">
                                    Fantasy
                                </span>
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-sky-600 text-sky-700 bg-sky-100 font-[600]">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>
                    </div>
                    <div 
                    class="relative bg-mainlight flex justify-center items-center p-3 col-span-1 rounded-lg overflow-hidden aspect-[1/1]"
                    style="direction:ltr"
                    >

                        <!-- HOVER -->
                        <div class="absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 transition-opacity bg-purple-600">
                            <div class="absolute top-0 left-0 p-3">
                                <h3 class="text-left font-semibold line-clamp-1 text-mainlight text-[16px]">Return Of The Mount Hua Sect</h3>
                                <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                                <h4 class="text-mainlight text-justify font-semibold text-[12px] line-clamp-5 xl:line-clamp-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta enim voluptatem laborum impedit placeat!
                                    Aliqua error repudiandae commodi iusto a quasi similique quam...
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 p-3 w-full flex leading-[80%] space-x-1">
                                <!-- GENRE -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    Fantasy
                                </span>
                                <!-- TYPE -->
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>

                        <!-- BACKGROUND IMAGE -->
                        <div
                            class="absolute w-full h-full top-0 left-0 bg-cover bg-center"
                            style="background-image: url('https://i.imgur.com/kyLUJIS.png');"
                        ></div>

                        <!-- DISPLAYED -->
                        <div class="relative w-full h-full z-3">
                            <div class="absolute top-0 left-0 w-3/4">
                                <h3 class="text-left font-semibold line-clamp-3 text-zinc-900 text-[16px]">Return Of The Mount Hua Sect</h3>
                                <h4 class="flex items-center text-[14px] text-emerald-600/75">
                                    <Icon icon="fa6-solid:heart" class="mr-1" /> 1.3K
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 flex space-x-1 leading-[80%]">
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-800 text-purple-900 bg-purple-100 font-[600]">
                                    Fantasy
                                </span>
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-sky-600 text-sky-700 bg-sky-100 font-[600]">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>
                    </div>
                    <div 
                    class="relative bg-mainlight flex justify-center items-center p-3 col-span-1 rounded-lg overflow-hidden aspect-[1/1]"
                    style="direction:ltr"
                    >

                        <!-- HOVER -->
                        <div class="absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 transition-opacity bg-purple-600">
                            <div class="absolute top-0 left-0 p-3">
                                <h3 class="text-left font-semibold line-clamp-1 text-mainlight text-[16px]">Return Of The Mount Hua Sect</h3>
                                <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                                <h4 class="text-mainlight text-justify font-semibold text-[12px] line-clamp-5 xl:line-clamp-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta enim voluptatem laborum impedit placeat!
                                    Aliqua error repudiandae commodi iusto a quasi similique quam...
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 p-3 w-full flex leading-[80%] space-x-1">
                                <!-- GENRE -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    Fantasy
                                </span>
                                <!-- TYPE -->
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>

                        <!-- BACKGROUND IMAGE -->
                        <div
                            class="absolute w-full h-full top-0 left-0 bg-cover bg-center"
                            style="background-image: url('https://i.imgur.com/kyLUJIS.png');"
                        ></div>

                        <!-- DISPLAYED -->
                        <div class="relative w-full h-full z-3">
                            <div class="absolute top-0 left-0 w-3/4">
                                <h3 class="text-left font-semibold line-clamp-3 text-zinc-900 text-[16px]">Return Of The Mount Hua Sect</h3>
                                <h4 class="flex items-center text-[14px] text-emerald-600/75">
                                    <Icon icon="fa6-solid:heart" class="mr-1" /> 1.3K
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 flex space-x-1 leading-[80%]">
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-800 text-purple-900 bg-purple-100 font-[600]">
                                    Fantasy
                                </span>
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-sky-600 text-sky-700 bg-sky-100 font-[600]">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Slide Group 2 -->
                <div class="slider-group grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5 mr-[8px]" style="direction: rtl;">
                    <div class="rounded-lg col-span-2 md:h-[186.5px] lg:h-full w-full bg-yellow-600 flex justify-center items-center">Slide 2 - A</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-yellow-300 flex justify-center items-center">B</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-yellow-400 flex justify-center items-center">C</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-yellow-400 flex justify-center items-center">D</div>
                </div>

                <!-- Slide Group 3 -->
                <div class="slider-group grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5 mr-[8px]" style="direction: rtl;">
                    <div class="rounded-lg col-span-2 md:h-[186.5px] lg:h-full w-full bg-cyan-600 flex justify-center items-center">Slide 3 - A</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-cyan-300 flex justify-center items-center">B</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-cyan-400 flex justify-center items-center">C</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-cyan-400 flex justify-center items-center">D</div>
                </div>

                <!-- Slide Group 4 -->
                <div class="slider-group grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5 mr-[8px]" style="direction: rtl;">
                    <div class="rounded-lg col-span-2 md:h-[186.5px] lg:h-full w-full bg-green-600 flex justify-center items-center">Slide 4 - A</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-green-300 flex justify-center items-center">B</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-green-400 flex justify-center items-center">C</div>
                    <div class="rounded-lg col-span-1 aspect-[1/1] bg-green-400 flex justify-center items-center">D</div>
                </div>
                
                <!-- Slide Group 1 -->
                <div class="grid grid-cols-4 min-w-[770px] lg:min-w-[946px] xl:min-w-[1100px] gap-[8px] lg:grid-cols-5 relative mr-[8px]" style="direction: rtl;">
                    
                    <div 
                    class="relative bg-mainlight flex justify-center items-center p-3 col-span-2 rounded-lg overflow-hidden"
                    style="direction:ltr"
                    >

                        <!-- HOVER -->
                        <div class="absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 transition-opacity bg-purple-600">
                            <div class="absolute top-0 left-0 p-3">
                                <h3 class="text-left font-semibold line-clamp-1 text-mainlight text-[16px]">Return Of The Mount Hua Sect</h3>
                                <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                                <h4 class="text-mainlight text-justify font-semibold text-[12px] line-clamp-5 xl:line-clamp-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta enim voluptatem laborum impedit placeat!
                                    Aliqua error repudiandae commodi iusto a quasi similique quam...
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 p-3 w-full flex leading-[80%] space-x-1">
                                <!-- GENRE -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    Fantasy
                                </span>
                                <!-- TYPE -->
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>

                        <!-- BACKGROUND IMAGE -->
                        <div
                            class="absolute w-full h-full top-0 left-0 bg-cover bg-center"
                            style="background-image: url('https://i.imgur.com/kyLUJIS.png');"
                        ></div>

                        <!-- DISPLAYED -->
                        <div class="relative w-full h-full z-3">
                            <div class="absolute top-0 left-0 w-3/4">
                                <h3 class="text-left font-semibold line-clamp-3 text-zinc-900 text-[16px]">Return Of The Mount Hua Sect</h3>
                                <h4 class="flex items-center text-[14px] text-emerald-600/75">
                                    <Icon icon="fa6-solid:heart" class="mr-1" /> 1.3K
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 flex space-x-1 leading-[80%]">
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-800 text-purple-900 bg-purple-100 font-[600]">
                                    Fantasy
                                </span>
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-sky-600 text-sky-700 bg-sky-100 font-[600]">
                                    {type}
                                </span> -->
                            </div>
                        </div>
                    </div>
                    <div 
                    class="relative bg-mainlight flex justify-center items-center p-3 col-span-1 rounded-lg overflow-hidden aspect-[1/1]"
                    style="direction:ltr"
                    >

                        <!-- HOVER -->
                        <div class="absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 transition-opacity bg-purple-600">
                            <div class="absolute top-0 left-0 p-3">
                                <h3 class="text-left font-semibold line-clamp-1 text-mainlight text-[16px]">Return Of The Mount Hua Sect</h3>
                                <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                                <h4 class="text-mainlight text-justify font-semibold text-[12px] line-clamp-5 xl:line-clamp-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta enim voluptatem laborum impedit placeat!
                                    Aliqua error repudiandae commodi iusto a quasi similique quam...
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 p-3 w-full flex leading-[80%] space-x-1">
                                <!-- GENRE -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    Fantasy
                                </span>
                                <!-- TYPE -->
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>

                        <!-- BACKGROUND IMAGE -->
                        <div
                            class="absolute w-full h-full top-0 left-0 bg-cover bg-center"
                            style="background-image: url('https://i.imgur.com/kyLUJIS.png');"
                        ></div>

                        <!-- DISPLAYED -->
                        <div class="relative w-full h-full z-3">
                            <div class="absolute top-0 left-0 w-3/4">
                                <h3 class="text-left font-semibold line-clamp-3 text-zinc-900 text-[16px]">Return Of The Mount Hua Sect</h3>
                                <h4 class="flex items-center text-[14px] text-emerald-600/75">
                                    <Icon icon="fa6-solid:heart" class="mr-1" /> 1.3K
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 flex space-x-1 leading-[80%]">
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-800 text-purple-900 bg-purple-100 font-[600]">
                                    Fantasy
                                </span>
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-sky-600 text-sky-700 bg-sky-100 font-[600]">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>
                    </div>
                    <div 
                    class="relative bg-mainlight flex justify-center items-center p-3 col-span-1 rounded-lg overflow-hidden aspect-[1/1]"
                    style="direction:ltr"
                    >

                        <!-- HOVER -->
                        <div class="absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 transition-opacity bg-purple-600">
                            <div class="absolute top-0 left-0 p-3">
                                <h3 class="text-left font-semibold line-clamp-1 text-mainlight text-[16px]">Return Of The Mount Hua Sect</h3>
                                <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                                <h4 class="text-mainlight text-justify font-semibold text-[12px] line-clamp-5 xl:line-clamp-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta enim voluptatem laborum impedit placeat!
                                    Aliqua error repudiandae commodi iusto a quasi similique quam...
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 p-3 w-full flex leading-[80%] space-x-1">
                                <!-- GENRE -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    Fantasy
                                </span>
                                <!-- TYPE -->
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>

                        <!-- BACKGROUND IMAGE -->
                        <div
                            class="absolute w-full h-full top-0 left-0 bg-cover bg-center"
                            style="background-image: url('https://i.imgur.com/kyLUJIS.png');"
                        ></div>

                        <!-- DISPLAYED -->
                        <div class="relative w-full h-full z-3">
                            <div class="absolute top-0 left-0 w-3/4">
                                <h3 class="text-left font-semibold line-clamp-3 text-zinc-900 text-[16px]">Return Of The Mount Hua Sect</h3>
                                <h4 class="flex items-center text-[14px] text-emerald-600/75">
                                    <Icon icon="fa6-solid:heart" class="mr-1" /> 1.3K
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 flex space-x-1 leading-[80%]">
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-800 text-purple-900 bg-purple-100 font-[600]">
                                    Fantasy
                                </span>
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-sky-600 text-sky-700 bg-sky-100 font-[600]">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>
                    </div>
                    <div 
                    class="relative bg-mainlight flex justify-center items-center p-3 col-span-1 rounded-lg overflow-hidden aspect-[1/1]"
                    style="direction:ltr"
                    >

                        <!-- HOVER -->
                        <div class="absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 transition-opacity bg-purple-600">
                            <div class="absolute top-0 left-0 p-3">
                                <h3 class="text-left font-semibold line-clamp-1 text-mainlight text-[16px]">Return Of The Mount Hua Sect</h3>
                                <div class="bg-mainlight h-[0.5px] m-0.5"></div>
                                <h4 class="text-mainlight text-justify font-semibold text-[12px] line-clamp-5 xl:line-clamp-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta enim voluptatem laborum impedit placeat!
                                    Aliqua error repudiandae commodi iusto a quasi similique quam...
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 p-3 w-full flex leading-[80%] space-x-1">
                                <!-- GENRE -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    Fantasy
                                </span>
                                <!-- TYPE -->
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-100 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>

                        <!-- BACKGROUND IMAGE -->
                        <div
                            class="absolute w-full h-full top-0 left-0 bg-cover bg-center"
                            style="background-image: url('https://i.imgur.com/kyLUJIS.png');"
                        ></div>

                        <!-- DISPLAYED -->
                        <div class="relative w-full h-full z-3">
                            <div class="absolute top-0 left-0 w-3/4">
                                <h3 class="text-left font-semibold line-clamp-3 text-zinc-900 text-[16px]">Return Of The Mount Hua Sect</h3>
                                <h4 class="flex items-center text-[14px] text-emerald-600/75">
                                    <Icon icon="fa6-solid:heart" class="mr-1" /> 1.3K
                                </h4>
                            </div>

                            <!-- TAGS -->
                            <div class="absolute bottom-0 left-0 flex space-x-1 leading-[80%]">
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-800 text-purple-900 bg-purple-100 font-[600]">
                                    Fantasy
                                </span>
                                <!-- <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-sky-600 text-sky-700 bg-sky-100 font-[600]">
                                    {type}
                                </span> -->
                                <!-- PAGES -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:copy" class="mr-1" /> 150
                                </span>
                                <!-- RATING -->
                                <span class="text-[10px] py-0.5 px-1.5 rounded-full border-2 border-purple-900 text-purple-900 bg-purple-100 font-[600] flex items-center justify-center">
                                    <Icon icon="fa6-solid:star" class="mr-1" /> 4.7
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="absolute h-full flex items-center -left-[3%] lg:-left-[4%] xl:-left-[5%]">
            <button class="cursor-pointer" on:click={prevSlide}>
                <Icon icon="material-symbols:arrow-back-ios-rounded" class="text-3xl text-stone-400" />
            </button>
        </div>
        <div class="absolute h-full flex items-center -right-[3%] lg:-right-[4%] xl:-right-[5%]">
            <button class="cursor-pointer" on:click={nextSlide}>
                <Icon icon="material-symbols:arrow-forward-ios-rounded" class="text-3xl text-stone-400" />
            </button>
        </div>

        <div class="absolute z-10 bottom-0 right-0 bg-zinc-200 font-[700] text-lg tracking-[0.2rem] px-2 py-1 rounded-ss-[12px] text-transparent">
            <div class="absolute bg-zinc-50 text-zinc-900/50 text-base translate-y-1 tracking-[0.1rem] px-[7px] py-0.5 rounded-lg">
                {displayGroup}/{totalGroup}
            </div>
            {displayGroup}/{totalGroup}
        </div>
        <div class="absolute z-10 bottom-0 right-0 -translate-y-[36px] fill-zinc-200" style="width: 16px; height: 16px;">
            <svg viewBox="0 0 8 8" width="12" height="12"
                style="position: absolute; bottom: 0; right: 0;">
                <path d="M8 0 A8 8 0 0 1 0 8 L8 8 Z"/>
            </svg>
        </div>
        <div class="absolute z-10 bottom-0 right-0 -translate-x-[53.5px] fill-zinc-200" style="width: 16px; height: 16px;">
            <svg viewBox="0 0 8 8" width="12" height="12"
                style="position: absolute; bottom: 0; right: 0;">
                <path d="M8 0 A8 8 0 0 1 0 8 L8 8 Z"/>
            </svg>
        </div>


        <!-- Dots -->
        <!-- <div class="flex justify-center items-center space-x-4 mt-4 w-full absolute -bottom-6">
            {#each Array(totalGroup) as _, i}
                <button
                    aria-label={`Pindah ke slide ${displayGroup + 1}`}
                    class={`h-3 aspect-square rounded-full cursor-pointer transition-colors duration-300
                    ${i + 1 === currentGroup ? 'bg-zinc-900/50' : 'bg-zinc-900/20'}
                    `}
                    on:click={() => {
                    currentGroup = i + 1;
                    scrollToIndex(currentGroup, true);
                    }}
                ></button>
            {/each}
        </div> -->
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