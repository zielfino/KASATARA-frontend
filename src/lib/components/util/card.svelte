<script lang="ts">
    import Icon from "@iconify/svelte";
    import Top from "./top.svelte";
    import Choice from "./choice.svelte";

    export let item;
    
    function formatLikes(n: number): string {
        if (n >= 1_000_000) {
        const v = n / 1_000_000;
        return v % 1 === 0 ? `${v.toFixed(0)}M` : `${v.toFixed(1)}M`;
        }
        if (n >= 1_000) {
        const v = n / 1_000;
        return v % 1 === 0 ? `${v.toFixed(0)}K` : `${v.toFixed(1)}K`;
        }
        return n.toString();
    }
</script>

<div 
    class={`relative bg-mainlight flex justify-center items-center p-3 rounded-lg overflow-hidden ${
        item.size === '1x1'
        ? 'col-span-1 aspect-[1/1]'
        : item.size === '2x1'
        ? 'col-span-2 md:h-[186.5px] lg:h-full min-h-[182.8px]'
        : 'col-span-2 row-span-2 aspect-[1/1]'
    }`}
    style="direction:ltr"
>
    
    <!-- LABLE -->
    {#if item.label !== 'none'}
        {#if item.size == '2x2'}
            <div class="absolute top-0 right-0 w-24 z-10">
                {#if item.label === 'new'}
                    <div class="absolute z-10 top-0 right-0 
                    w-15 aspect-[10/8]
                    bg-zinc-900 tracking-widest
                    text-right text-amber-300 text-[17px] 
                    font-caveat font-[700] 
                    rounded-es-[80%]
                    pt-[6%] pr-[10%]"
                    >
                        <div class="rotate-5">NEW</div>
                    </div>
                {:else if item.label === 'up'}
                    <div class="absolute z-10 top-0 right-0 
                    w-11.5 aspect-square
                    bg-emerald-500 
                    text-right text-mainlight
                    text-[16px] font-[700] 
                    rounded-es-[80%]
                    pt-[8%] pr-[8%]"
                    >UP</div>
                {:else if item.label === 'top'}<Top />
                {:else if item.label === 'choice'}<Choice />
                {/if}
            </div>
        {:else if item.size == '2x1'}
            <div class="absolute top-0 right-0 w-20 z-10">
                {#if item.label === 'new'}
                    <div class="absolute z-10 top-0 right-0 
                    w-13.5 aspect-[10/8]
                    bg-zinc-900 tracking-widest
                    text-right text-amber-300 text-[15px] 
                    font-caveat font-[700] 
                    rounded-es-[80%]
                    pt-[8%] pr-[12%]"
                    >
                        <div class="rotate-5">NEW</div>
                    </div>
                {:else if item.label === 'up'}
                    <div class="absolute z-10 top-0 right-0 
                    w-10 aspect-square
                    bg-emerald-500 
                    text-right text-mainlight
                    text-[14px] font-[700] 
                    rounded-es-[80%]
                    pt-[9%] pr-[9%]"
                    >UP</div>
                {:else if item.label === 'top'}<Top />
                {:else if item.label === 'choice'}<Choice />
                {/if}
            </div>
        {:else}
            <div class="absolute top-0 right-0 w-16 z-10">
                {#if item.label === 'new'}
                    <div class="absolute z-10 top-0 right-0 
                    w-12 aspect-[10/8]
                    bg-zinc-900 tracking-widest
                    text-right text-amber-300 text-[13px] 
                    font-caveat font-[700] 
                    rounded-es-[80%]
                    pt-[10%] pr-[14%]"
                    >
                        <div class="rotate-5">NEW</div>
                    </div>
                {:else if item.label === 'up'}
                    <div class="absolute z-10 top-0 right-0 
                    w-8.5 aspect-square
                    bg-emerald-500 
                    text-right text-mainlight
                    text-[12px] font-[700] 
                    rounded-es-[80%]
                    pt-[10%] pr-[10%]"
                    >UP</div>
                {:else if item.label === 'top'}<Top />
                {:else if item.label === 'choice'}<Choice />
                {/if}
            </div>
        {/if}
    {/if}

    <!-- BACKGROUND DIM -->
    {#if item.size == '2x2' || item.size == '2x1'}
        <div class="absolute top-0 left-0 w-full h-full z-[1] bg-stone-900/80"
            style="
            mask-image: linear-gradient(to bottom, black 10%, transparent 60%, transparent 80%, black 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 10%, transparent 60%, transparent 80%, black 100%);
            ">
        </div>
    {/if}
    
    <!-- H O V E R E D -->
    <div class={`absolute w-full h-full top-0 left-0 z-10 opacity-0 hover:opacity-100 transition-opacity cursor-pointer
    ${item.genre[0] === 'Fantasy' ? 'bg-purple-600' : 
    item.genre[0] === 'Action' ? 'bg-indigo-600' : 
    item.genre[0] === 'Comedy' ? 'bg-amber-600' : 
    item.genre[0] === 'Drama' ? 'bg-cyan-600' : 
    item.genre[0] === 'Horror' ? 'bg-rose-600' : 
    'bg-gray-800'}`}>

        <!-- MAIN HOVER -->
        <div class="absolute top-0 left-0 p-3">
            <h3 class={`text-left font-semibold line-clamp-1 text-mainlight ${item.size === '2x2' ? 'text-[24px]' : 'text-[16px]'}`}>{item.title}</h3>
            <div class={`bg-mainlight h-[0.5px] ${item.size === '2x2' ? 'm-1 mb-1.5' : 'm-0.5'}`}></div>
            <h4 class={`text-mainlight text-justify font-semibold
            ${item.size === '2x2' ? 'text-[14px] line-clamp-12 xl:line-clamp-14' : 'text-[12px] line-clamp-5 xl:line-clamp-6'}`}>
                {item.excerpt}
            </h4>
        </div>

        <!-- TAGS -->
        <div class={`absolute bottom-0 left-0 p-3 w-full flex leading-[80%]
        ${item.size === '2x2' ? 'space-x-1.5' : 'space-x-1'}`}>
            {#if item.size !== '1x1'}
                <span class={`rounded-md border-2 font-[600] flex w-min h-min justify-center items-center
                ${item.size === '2x2' ? 'text-[12px] py-[3px] px-[7px]' : 'text-[10px] py-[1px] px-[3px]'} 
                ${item.genre[0] === 'Fantasy' ? 'border-purple-100 text-purple-900 bg-purple-100' : 
                item.genre[0] === 'Action' ? 'border-indigo-100 text-indigo-900 bg-indigo-100' : 
                item.genre[0] === 'Comedy' ? 'border-amber-100 text-amber-800 bg-amber-100' : 
                item.genre[0] === 'Drama' ? 'border-cyan-100 text-cyan-900 bg-cyan-100' : 
                item.genre[0] === 'Horror' ? 'border-rose-100 text-rose-900 bg-rose-100' : 
                'border-gray-700 text-gray-700 bg-gray-100'}`}>{ item.genre[0] }</span>

                <span class={`rounded-md border-2 font-[600] flex w-min h-min justify-center items-center
                ${item.size === '2x2' ? 'text-[12px] py-[3px] px-[7px]' : 'text-[10px] py-[1px] px-[3px]'} 
                ${item.genre[0] === 'Fantasy' ? 'border-purple-100 text-purple-900 bg-purple-100' : 
                item.genre[0] === 'Action' ? 'border-indigo-100 text-indigo-900 bg-indigo-100' : 
                item.genre[0] === 'Comedy' ? 'border-amber-100 text-amber-800 bg-amber-100' : 
                item.genre[0] === 'Drama' ? 'border-cyan-100 text-cyan-900 bg-cyan-100' : 
                item.genre[0] === 'Horror' ? 'border-rose-100 text-rose-900 bg-rose-100' : 
                'border-gray-700 text-gray-700 bg-gray-100'}`}>{ item.type }</span>
            {/if}
            <span class={`rounded-md border-2 font-[600] flex w-min h-min justify-center items-center
            ${item.size === '2x2' ? 'text-[12px] py-[3px] px-[7px]' : 'text-[10px] py-[1px] px-[3px]'} 
            ${item.genre[0] === 'Fantasy' ? 'border-purple-100 text-purple-900 bg-purple-100' : 
            item.genre[0] === 'Action' ? 'border-indigo-100 text-indigo-900 bg-indigo-100' : 
            item.genre[0] === 'Comedy' ? 'border-amber-100 text-amber-800 bg-amber-100' : 
            item.genre[0] === 'Drama' ? 'border-cyan-100 text-cyan-900 bg-cyan-100' : 
            item.genre[0] === 'Horror' ? 'border-rose-100 text-rose-900 bg-rose-100' : 
            'border-gray-700 text-gray-700 bg-gray-100'}`}>
                <Icon icon="fa6-solid:copy" class="mr-1" /> {item.pages}
            </span>
            
            <span class={`rounded-md border-2 font-[600] flex w-min h-min justify-center items-center
            ${item.size === '2x2' ? 'text-[12px] py-[3px] px-[7px]' : 'text-[10px] py-[1px] px-[3px]'} 
            ${item.genre[0] === 'Fantasy' ? 'border-purple-100 text-purple-900 bg-purple-100' : 
            item.genre[0] === 'Action' ? 'border-indigo-100 text-indigo-900 bg-indigo-100' : 
            item.genre[0] === 'Comedy' ? 'border-amber-100 text-amber-800 bg-amber-100' : 
            item.genre[0] === 'Drama' ? 'border-cyan-100 text-cyan-900 bg-cyan-100' : 
            item.genre[0] === 'Horror' ? 'border-rose-100 text-rose-900 bg-rose-100' : 
            'border-gray-700 text-gray-700 bg-gray-100'}`}>
                <Icon icon="fa6-solid:star" class="mr-1" /> { item.rating }
            </span>
            
        </div>

        <!-- BUTTON -->
        <!-- <div class={`absolute px-2.5 py-1 z-20 cursor-pointer font-semibold
        ${item.size === '2x2' ? 'rounded-lg right-3 bottom-3 text-[18px]' : 'rounded-ss-xl xl:rounded-lg right-0 bottom-0 xl:right-3 xl:bottom-3 text-[16px]'} 
        ${item.genre[0] === 'Fantasy' ? 'text-purple-900 bg-purple-100' : 
        item.genre[0] === 'Action' ? 'text-indigo-900 bg-indigo-100' : 
        item.genre[0] === 'Comedy' ? 'text-amber-800 bg-amber-100' : 
        item.genre[0] === 'Drama' ? 'text-cyan-900 bg-cyan-100' : 
        item.genre[0] === 'Horror' ? 'text-rose-900 bg-rose-100' : 
        'text-gray-700 bg-gray-100'}
        `}>BACA</div> -->
    </div>

    <!-- BACKGROUND IMAGE -->
    <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center" style={`background-image: url('${item.image}');`}></div>   

    <!-- D I S P L A Y E D -->
    <div class="relative w-full h-full z-3">

        <!-- MAIN DISPLAY -->
        <div class="absolute top-0 left-0 w-3/4">

            <!-- TITLE -->
            <h3 class={`text-left font-semibold line-clamp-3 
            ${item.size === '1x1' ? 'text-zinc-900' : 'text-mainlight'} 
            ${item.size === '2x2' ? 'text-[24px]' : 'text-[16px]'}`}>
                {item.title}
            </h3>

            <!-- LIKES -->
            <h4 class={`flex items-center text-[14px] ${item.size === '1x1' ? 'text-emerald-600/75' : 'text-emerald-400/85'}`}>
                <Icon icon="fa6-solid:heart" class="mr-1" />{formatLikes(item.likes)}
            </h4>
        </div>

        <!-- TAGS -->
        <div class={`absolute bottom-0 left-0 flex space-x-1 leading-[80%]
        ${item.size === '2x2' ? 'space-x-1.5' : 'space-x-1'}`}>
            <span class={`rounded-md border-2 font-[600] flex w-min
            ${item.size === '2x2' ? 'text-[12px] py-[3px] px-[7px]' : 'text-[10px] py-[1px] px-[3px]'}
            ${item.genre[0] === 'Fantasy' ? 'border-purple-800 text-purple-900 bg-purple-100' : 
            item.genre[0] === 'Action' ? 'border-indigo-800 text-indigo-900 bg-indigo-100' : 
            item.genre[0] === 'Comedy' ? 'border-amber-700 text-amber-800 bg-amber-100' : 
            item.genre[0] === 'Drama' ? 'border-cyan-800 text-cyan-900 bg-cyan-100' : 
            item.genre[0] === 'Horror' ? 'border-rose-800 text-rose-900 bg-rose-100' : 
            'border-gray-700 text-gray-700 bg-gray-100'}`}>{ item.genre[0] }</span>

            <span class={`rounded-md border-2 font-[600] flex w-min
            ${item.size === '2x2' ? 'text-[12px] py-[3px] px-[7px]' : 'text-[10px] py-[1px] px-[3px]'}
            ${item.type === 'KOMIK' ? 'border-sky-600 text-sky-700 bg-sky-100' : 
            item.type === 'NOVEL' ? 'border-amber-600 text-amber-700 bg-amber-100' : 
            'border-gray-600 text-gray-600 bg-gray-100'}`}>{ item.type }</span>
        </div>
    </div>
</div>