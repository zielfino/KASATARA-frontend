<script lang="ts">
    import Icon from "@iconify/svelte";

    export let ison = false;
</script>


<div class={`w-full bg-mainlight border border-zinc-900/15 rounded-md h-[64px] flex justify-center items-center text-[16px] space-x-2
${ ison === true ? 'md:hidden' : 'max-md:hidden'}
`}>
    <button tabindex="-1" class="outline-none pointer-events-none"><Icon class="" icon="material-symbols:arrow-back-ios-new-rounded" /></button>
    <button tabindex="-1" class="outline-none pointer-events-none"><span class="underline">1</span></button>
    <button class="outline-none cursor-pointer focus-visible:underline focus-visible:text-sky-400 hover:text-sky-400 hover:underline"><span class="text-zinc-900/50">2</span></button>
    <button class="outline-none cursor-pointer focus-visible:underline focus-visible:text-sky-400 hover:text-sky-400 hover:underline"><span class="text-zinc-900/50">3</span></button>
    <button class="outline-none cursor-pointer focus-visible:underline focus-visible:text-sky-400 hover:text-sky-400 hover:underline"><span class="text-zinc-900/50">4</span></button>
    <button class="outline-none cursor-pointer focus-visible:underline focus-visible:text-sky-400 hover:text-sky-400 hover:underline"><span class="text-zinc-900/50">5</span></button>
    <button class="outline-none cursor-pointer focus-visible:underline focus-visible:text-sky-400 hover:text-sky-400 hover:underline"><Icon icon="material-symbols:arrow-forward-ios-rounded" /></button>
</div>