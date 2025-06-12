<script lang="ts">
    import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { tick } from 'svelte';

  type Group = {
    id: number;
    title: string;
    image: string;
  };

  // === 👇🏻 Real groups (no FG manual anymore!)
  const realGroups: Group[] = [
    { id: 1, title: 'Kingdom', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 2, title: 'One Piece', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 3, title: 'Bleach', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 4, title: 'Jujutsu', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 5, title: 'Naruto', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 6, title: 'Chainsaw', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 7, title: 'Dragon Ball', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 8, title: 'Attack on Titan', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 9, title: 'Naruto', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 10, title: 'Chainsaw', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 11, title: 'Dragon Ball', image: 'https://i.imgur.com/dMc3mbP.png' },
    { id: 12, title: 'Attack on Titan', image: 'https://i.imgur.com/dMc3mbP.png' }
  ];

  // === 👇🏻 Fake Groups (auto generated)
  const fakeStart = realGroups.slice(-2); // last 2
  const fakeEnd = realGroups.slice(0, 2); // first 2
  const groups = [...fakeStart, ...realGroups, ...fakeEnd];

  let container: HTMLDivElement;
  let items: HTMLDivElement[] = [];
  let currentIndex = fakeStart.length; // start at first real group
  let totalGroup = realGroups.length; // start at first real group

  async function scrollToIndex(index: number, smooth = true) {
    const el = items[index];
    if (!el) return;

    currentIndex = index;

    el.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      inline: 'center',
      block: 'nearest'
    });

    await tick();
    updateTabIndexes();

    if (index < fakeStart.length || index >= fakeStart.length + realGroups.length) {
      setTimeout(() => {
        teleportToRealGroup(index);
      }, 400); // delay for smooth snap first
    }
  }

  function updateTabIndexes() {
    items.forEach((item, idx) => {
      const isVisible = Math.abs(idx - currentIndex) <= 1;
      item.setAttribute('tabindex', isVisible ? '0' : '-1');
      item.classList.toggle('pointer-events-none', !isVisible);
    });
  }

  function handleClick(index: number) {
    if (index === currentIndex) {
      if (index >= fakeStart.length && index < fakeStart.length + realGroups.length) {
        window.location.href = '/komik';
      }
    } else {
      scrollToIndex(index);
    }
  }

  function teleportToRealGroup(index: number) {
    const total = groups.length;
    const rgStart = fakeStart.length;
    const rgEnd = rgStart + realGroups.length - 1;

    let targetIndex = -1;

    if (index < rgStart) {
      // from fakeStart (left) → go to last real
      targetIndex = rgEnd;
    } else if (index > rgEnd) {
      // from fakeEnd (right) → go to first real
      targetIndex = rgStart;
    }

    if (targetIndex !== -1) {
      scrollToIndex(targetIndex, false);
    }
  }

  async function ensureValidStartSnap() {
    await tick();

    const visible = items.filter((item) => {
      const rect = item.getBoundingClientRect();
      const center = window.innerWidth / 2;
      return rect.left < center && rect.right > center;
    });

    if (!visible.length) return;

    const index = items.indexOf(visible[0]);

    if (index < fakeStart.length || index >= fakeStart.length + realGroups.length) {
      const fallback = fakeStart.length; // go to realGroups[0]
      await scrollToIndex(fallback);
    } else {
      scrollToIndex(index, false);
    }
  }

onMount(() => {
  // console.log(currentIndex)
  items = Array.from(container.querySelectorAll('[data-group]'));
  scrollToIndex(currentIndex, false);

  setTimeout(() => {
    ensureValidStartSnap();
  }, 200);

  // Debounced Resize Handler
  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleResize = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      scrollToIndex(currentIndex, false);
    }, 150); // delay after resize stops
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    if (resizeTimeout) clearTimeout(resizeTimeout);
  };
});

</script>
<div class="w-full p-[1.6vw] xs:p-2 overflow-hidden relative">
  <div class="absolute h-[calc(100%-18px)] right-0 flex justify-center items-center">
    <button on:click={() => scrollToIndex(currentIndex+1)} class="h-[9vw] xs:h-12 -translate-x-[4.8vw] xs:-translate-x-6 rounded-full aspect-square bg-zinc-900/40 hover:bg-zinc-900/60 text-[3.2vw] xs:text-[16px] text-mainlight z-4 flex justify-center items-center cursor-pointer">
      <Icon icon="material-symbols:arrow-forward-ios-rounded" />
    </button>
  </div>
  <div class="absolute h-[calc(100%-18px)] left-0 flex justify-center items-center">
    <button on:click={() => scrollToIndex(currentIndex-1)} class="h-[9vw] xs:h-12 translate-x-[4.8vw] xs:translate-x-6 rounded-full aspect-square bg-zinc-900/40 hover:bg-zinc-900/60 text-[3.2vw] xs:text-[16px] text-mainlight z-4 flex justify-center items-center cursor-pointer">
      <Icon icon="material-symbols:arrow-back-ios-new-rounded" />
    </button>
  </div>
  <!-- SCROLL CONTAINER -->
  <div
    bind:this={container}
    class="rounded-md flex overflow-hidden w-full gap-[1.6vw] xs:gap-2 border-x border-zinc-900/20 drop-shadow-md"
    style="scroll-snap-type: x mandatory; touch-action: none;"
  >
    {#each groups as group, index}
      <button
        data-group
        tabindex="-1"
        class={`aspect-[4/5] w-full min-w-[70vw] xs:min-w-[350px] rounded-md focus-visible:border-sky-400 focus-visible:bg-sky-200/90 outline-none
        flex justify-center items-center border border-zinc-900/20 transition-all duration-300 ease-in-out cursor-pointer flex-col overflow-hidden pointer-events-auto
        `}
        on:click={() => handleClick(index)}
      >
        <div class="w-full h-full relative flex justify-center items-center text-mainlight font-semibold px-2 py-1 bg-cover bg-center"
                style="background-image: url('{group.image}');">
          <div class="absolute z-3 bottom-8 text-[3.2vw] xs:text-xl">{group.title} {group.id}</div>
          <div class="absolute z-2 h-1/2 w-full bottom-0 bg-zinc-900/75 mask-t-form-0% mask-t-to-100%"></div>
          <div class={`absolute w-full h-full bg-zinc-900 transition-all duration-500 ${currentIndex === index ? 'opacity-0' : currentIndex === index + totalGroup ? 'opacity-0' : currentIndex === index - totalGroup ? 'opacity-0' : 'opacity-50'}`}></div>
        </div>
      </button>
    {/each}
  </div>
</div>
