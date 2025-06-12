<script lang="ts">
  import { onMount, tick } from 'svelte';

  const realGroups = ['grup1', 'grup2', 'grup3', 'grup4', 'grup5', 'grup6', 'grup7', 'grup8'];
  const fakeStart = ['grup7', 'grup8']; // clone dari akhir
  const fakeEnd = ['grup1', 'grup2'];   // clone dari awal
  const sliderList = [...fakeStart, ...realGroups, ...fakeEnd];

  let currentIndex = 2; // index grup1 asli
  let displayGroup = 1;
  let isDragging = false;
  let isTransitioning = false;
  let slideWidth = 0;

  let startX = 0;
  let scrollStart = 0;

  let sliderContainer: HTMLDivElement;
  let items: HTMLElement[] = [];

  function scrollToIndex(index: number, smooth = true) {
    if (!items[index]) return;
    sliderContainer.style.scrollBehavior = smooth ? 'smooth' : 'auto';
    sliderContainer.scrollTo({
      left: items[index].offsetLeft - (sliderContainer.offsetWidth - items[index].offsetWidth) / 2,
    });
    currentIndex = index;

    // Update display group if real
    if (index >= 2 && index < realGroups.length + 2) {
      displayGroup = index - 1;
    }
  }

function fixLoop(index: number) {
  const realStart = fakeStart.length;
  const realEnd = realStart + realGroups.length - 1;
  const last = sliderList.length - 1;

  if (index === realStart - 1) {
    // fake group terakhir dari head (fg8)
    isTransitioning = true;
    setTimeout(() => {
      scrollToIndex(realEnd, false); // ke rg8
      currentIndex = realEnd;
      isTransitioning = false;
    }, 550);
  } else if (index === realEnd + 1) {
    // fake group pertama dari tail (fg1)
    isTransitioning = true;
    setTimeout(() => {
      scrollToIndex(realStart, false); // ke rg1
      currentIndex = realStart;
      isTransitioning = false;
    }, 550);
  } else if (index === 0) {
    scrollToIndex(1, true);
    setTimeout(() => fixLoop(1), 400);
  } else if (index === last) {
    scrollToIndex(last - 1, true);
    setTimeout(() => fixLoop(last - 1), 400);
  }
}

  function getMostVisibleIndex(): number {
    const containerRect = sliderContainer.getBoundingClientRect();
    let maxVisible = 0;
    let bestIndex = currentIndex;

    items.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const visibleWidth = Math.min(rect.right, containerRect.right) - Math.max(rect.left, containerRect.left);
      if (visibleWidth > maxVisible) {
        maxVisible = visibleWidth;
        bestIndex = idx;
      }
    });

    return bestIndex;
  }

  function handlePointerDown(e: PointerEvent) {
    if (isTransitioning) return;
    isDragging = true;
    startX = e.clientX;
    scrollStart = sliderContainer.scrollLeft;
    sliderContainer.releasePointerCapture(e.pointerId);
    sliderContainer.style.scrollBehavior = 'auto';
  }

  function handlePointerMove(e: PointerEvent) {
    if (!isDragging || isTransitioning) return;
    const dx = e.clientX - startX;
    sliderContainer.scrollLeft = scrollStart - dx;
  }

  function handlePointerUp() {
    if (isTransitioning || !isDragging) return;
    isDragging = false;
    const bestIndex = getMostVisibleIndex();
    scrollToIndex(bestIndex, true);
    fixLoop(bestIndex);
  }

  function handleClick(i: number) {
    if (isTransitioning || Math.abs(i - currentIndex) !== 1) return;
    scrollToIndex(i, true);
    fixLoop(i);
  }

onMount(async () => {
  await tick();
  items = Array.from(sliderContainer.querySelectorAll('.slider-item')) as HTMLElement[];
  slideWidth = items[0]?.offsetWidth ?? 0;

  currentIndex = fakeStart.length; // = 2 (untuk 2 clone di awal)
  scrollToIndex(currentIndex, false);
});
</script>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>

<div
  bind:this={sliderContainer}
  class="flex gap-2 overflow-x-auto no-scrollbar select-none px-[1.6vw] py-4"
  on:pointerdown={handlePointerDown}
  on:pointermove={handlePointerMove}
  on:pointerup={handlePointerUp}
>
  {#each sliderList as group, i}
    <button
      class={`slider-item shrink-0 aspect-[4/5] min-w-[80vw] xs:min-w-[600px]
              rounded-md flex items-center justify-center text-xl font-bold 
              transition-all duration-300 cursor-pointer
              ${i === currentIndex ? 'opacity-100' : Math.abs(i - currentIndex) === 1 ? 'opacity-60' : 'opacity-20'}
              ${(i - 2) % 2 === 0 ? 'bg-blue-400' : 'bg-mainred'}`}
      on:click={() => handleClick(i)}
    >
      {group}
    </button>
  {/each}
</div>
