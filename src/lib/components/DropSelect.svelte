<script lang="ts">
  import { onMount } from 'svelte';
  import { onClickOutside } from './useClickOutside'; // helper click luar
  export let options: string[] = [];
  export let selected: string = '';
  // export let placeholder: string = 'Pilih opsi...';
  export let onChange: (value: string) => void = () => {};

  let isOpen = false;
  let container: HTMLElement;

  function selectOption(option: string) {
    selected = option;
    isOpen = false;
    onChange(option);
  }

  function toggle() {
    isOpen = !isOpen;
  }

  onMount(() => {
    const clickOutside = onClickOutside(() => isOpen = false, container);
    return () => clickOutside.destroy(); // Cleanup
  });
</script>

<div bind:this={container} class="relative w-full max-w-xs text-sm">
  <button
    on:click={toggle}
    class="w-full  rounded-md border border-zinc-900/15 px-3 py-2 text-left flex justify-between items-center hover:border-zinc-900/50
    outline-none focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 focus-visible:border-1"
  >
    <span>{selected}</span>
    <svg
      class="w-4 h-4 text-gray-500 transform transition-transform duration-200"
      class:rotate-180={isOpen}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isOpen}
    <ul class="absolute z-11 mt-1 w-full bg-mainlight border border-zinc-900/15 rounded-md shadow-lg max-h-60 overflow-auto">
      {#each options as option (option)}
        <li>
            <button
            tabindex={option === selected ? -1 : 0} 
            on:click={() => selectOption(option)}
            class={`px-4 py-2 cursor-pointer transition-all text-zic-900 w-full outline-none
            ${option === selected ? 'bg-zinc-900/10' : 'focus-visible:bg-sky-400/10 xs:hover:bg-zinc-900/5'}
            `}
            >
                {option}
            </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
