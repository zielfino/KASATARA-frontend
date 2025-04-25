<script>
    import Icon from "@iconify/svelte";
    export let title;
    export let link;
</script>
  
<a href="/{link}">
    <div class="w-full font-bold uppercase tracking-wide flex justify-between items-center px-[3.2vw] py-[2.8vw] bg-zinc-200/50 
    text-[3.6vw]">
        <div>{title}</div>
        <div><Icon icon="material-symbols:arrow-forward-ios" /></div>
    </div>
</a> 