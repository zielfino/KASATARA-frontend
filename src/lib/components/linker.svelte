<script>
    import Icon from "@iconify/svelte";
    export let title;
    export let link;
</script>
  
<div class="w-full">
    <a href="/{link}" class="w-full font-bold xs:font-[600] uppercase tracking-wide flex justify-between md:justify-start md:space-x-2 items-center bg-zinc-200/50 md:bg-transparent
    px-[3.2vw] py-[2.8vw] xs:px-[16px] xs:py-[14px] md:p-0 md:mb-4
    text-[3.6vw] xs:text-[20px] md:w-min text-nowrap md:landscape:hover:underline">
        <div>{title}</div>
        <div><Icon icon="material-symbols:arrow-forward-ios-rounded" /></div>
    </a>
</div> 