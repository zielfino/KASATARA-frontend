<script>
    import Icon from "@iconify/svelte";
    export let title;
    export let type;
    export let color;


</script>

<!-- Berita Terbaru -->
<div class="w-full">
    <div class={`
    w-full flex flex-col items-center justify-center relative
    ${type === 'news' ? '' 
    : 'px-[1.6vw] xs:px-2'}
    `}>
        <a href="/news" class={`w-full flex flex-col items-center justify-center relative overflow-hidden ring-sky-400 outline-none focus-visible:ring-1
            font-semibold group
            md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px]
            px-[3.2vw] py-[4.8vw] xs:px-[16px] xs:py-[14px]
            md:rounded-lg md:px-6
            ${color === 'dark' ? 'bg-zinc-900 text-mainlight' : 'bg-mainlight text-zinc-900'}
            ${type === 'news' ? '' 
            : 'rounded-md border border-zinc-900/15 pointer-events-none xs:max-w-[calc(675px-16px)]'}
            `}>

            {#if type === 'news'}
                <div class="absolute w-full h-full md:rounded-lg flex justify-center items-center max-xs:hidden
                md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] bg-indigo-400
                translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out
                ">click me</div>
            {/if}


            <div class={`w-full font-semibold flex items-center 
            ${color === 'dark' ? 'bg-zinc-900 text-mainlight' : 'bg-mainlight text-zinc-900'} md:rounded-lg
            md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px]
            ${type === 'news' ? 'justify-between' 
            : 'justify-center'}
            `}>
                
                <div class="flex items-center space-x-[1vw] xs:space-x-[5px]">
                    <div class="text-[3.6vw] xs:text-[18px] uppercase font-bold tracking-tight">{title}</div>
                    <div><Icon icon="material-symbols:arrow-forward-ios" class="text-[3.6vw] xs:text-[18px]" /></div>
                    <p class=" text-[2.8vw] xs:text-[16px] line-clamp-1 mr-[2vw] xs:mr-[10px]">
                        {#if type === 'news'}
                        Fitur komentar telah di perbaharui.
                        {:else}
                        hello there Lorem ipsum dolor sit amet.
                        {/if}
                    </p>
                </div>
                {#if type === 'news'}
                    <div class={`text-[2.8vw] xs:text-[16px] text-nowrap
                    ${color === 'dark' ? 'text-mainlight/30' : 'text-zinc-900/30'}`}>32 Feb 2025</div>
                {/if}
            </div>
        </a>
    </div>
</div>