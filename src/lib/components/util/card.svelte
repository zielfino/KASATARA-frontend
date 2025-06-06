<script lang="ts">
    import Icon from "@iconify/svelte";
    import Top from "./top.svelte";
    import Choice from "./choice.svelte";
    import { writable } from "svelte/store";
    import { onMount } from "svelte";

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


    const phone = writable(false);
    const desktop = writable(false);

    onMount(() => {
        const update = () => {
            phone.set(window.innerWidth <= 499.9);
            desktop.set(window.innerWidth >= 900);
        };

        update();
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    });
</script>

<div
    class={`group relative
    flex flex-col outline-none
    ${
        item.size === '1x1'
        ? 'col-span-1 xs:aspect-[1/1]'
        : item.size === '2x1'
        ? 'col-span-2'
        : 'col-span-2 row-span-2'
    }`}
    style="direction:ltr"
>   
    <div class={`z-10 xs:drop-shadow-xs landscape:lg:drop-shadow-none xs:bg-mainlight xs:border xs:border-zinc-900/15 relative w-full h-full p-3 max-xs:p-[2.4vw] rounded-md max-xs:rounded-[1.2vw] xs:rounded-lg flex justify-center items-center max-xs:border max-xs:border-zinc-900/30 overflow-hidden
    ${
        item.size === '2x1'
        ? 'min-h-[50vw] xs:min-h-0 md:h-[186.5px] lg:h-full'
        : 'aspect-square'
    }`}>
        <!-- LABLE -->
        {#if item.label !== 'none'}
            {#if item.size == '2x2'}
                <div class="absolute top-0 right-0 w-18 z-5">
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
                <div class="absolute top-0 right-0 w-16 max-xs:w-[13vw] z-10">
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
                        text-[14px] max-xs:text-[2.8vw] font-[700] 
                        rounded-es-[80%]
                        pt-[9%] pr-[9%]"
                        >UP</div>
                    {:else if item.label === 'top'}<Top />
                    {:else if item.label === 'choice'}<Choice />
                    {/if}
                </div>
            {:else}
                <div class="absolute top-0 right-0 w-16 max-xs:w-[16vw] z-10">
                    {#if item.label === 'new'}
                        <div class="absolute z-10 top-0 right-0 
                        w-12 max-xs:w-[11vw] aspect-[10/8]
                        bg-zinc-900 tracking-widest
                        text-right text-amber-300 text-[13px] max-xs:text-[2.6vw]
                        font-caveat font-[700] 
                        rounded-es-[80%]
                        pt-[10%] pr-[14%]"
                        >
                            <div class="rotate-5">NEW</div>
                        </div>
                    {:else if item.label === 'up'}
                        <div class="absolute z-10 top-0 right-0 
                        w-8.5 max-xs:w-[8.4vw] aspect-square
                        bg-emerald-500 
                        text-right text-mainlight
                        text-[12px] max-xs:text-[2.4vw] font-[700] 
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
        {#if !$phone}
            {#if item.size == '2x2' || item.size == '2x1' }
                <div class="absolute top-0 left-0 w-full h-full z-[1] bg-stone-900/80"
                    style="
                    mask-image: linear-gradient(to bottom, rgba(0, 0, 20, 0.8) 10%, transparent 60%, transparent 80%, rgba(0, 0, 20, 0.8) 100%);
                    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 20, 0.8) 10%, transparent 60%, transparent 80%, rgba(0, 0, 20, 0.8) 100%);
                    ">
                </div>
            {/if}
        {:else}
            <div class="absolute top-0 left-0 mask-linear-50 w-full h-full z-[1] bg-stone-900/80"
                style="
                mask-image: linear-gradient(160deg, rgba(0, 0, 20, 0.8) 10%, transparent 75%, transparent 100%, rgba(0, 0, 20, 0.8) 100%);
                -webkit-mask-image: linear-gradient(160deg, rgba(0, 0, 20, 0.8) 10%, transparent 75%, transparent 100%, rgba(0, 0, 20, 0.8) 100%);
                ">
            </div>
        {/if}
        

        <!-- H O V E R E D -->
        {#if !$phone }
            <div class={`absolute w-full h-full top-0 left-0 z-10 opacity-0 landscape:group-hover:opacity-100 landscape:group-focus:opacity-100 landscape:group-focus-within:opacity-100 transition-opacity
            ${item.genre[0] === 'Fantasy' ? 'bg-purple-600' : 
            item.genre[0] === 'Action' ? 'bg-indigo-600' : 
            item.genre[0] === 'Comedy' ? 'bg-amber-600' : 
            item.genre[0] === 'Drama' ? 'bg-cyan-600' : 
            item.genre[0] === 'Horror' ? 'bg-rose-600' : 
            'bg-gray-800'}`}>

                <!-- MAIN HOVER -->
                <div class="absolute top-0 left-0 p-3">
                    <h3 class={`text-left font-semibold line-clamp-1 text-mainlight 
                    ${item.size === '2x2' ? 'text-[24px]' : 'text-[16px] max-xs:text-[3.2vw]'}
                    ${item.size === '2x1' ? 'max-xs:text-[3.6vw]' : 'max-xs:text-[3.2vw]'} `}>{item.title}</h3>
                    <div class={`bg-mainlight h-[0.5px] ${item.size === '2x2' ? 'm-1 mb-1.5' : 'm-0.5'}`}></div>
                    <h4 class={`text-mainlight text-justify font-semibold
                    ${item.size === '2x2' ? 'text-[14px] max-xs:text-[2.8vw] line-clamp-12 xl:line-clamp-14' : 'text-[12px] max-xs:text-[2.4vw] line-clamp-5 xl:line-clamp-6'}`}>
                        {item.excerpt}
                    </h4>
                </div>

                <!-- TAGS -->
                <div class={`absolute bottom-0 left-0 p-3 w-full flex leading-[80%]
                ${item.size === '2x2' ? 'space-x-1.5' : 'space-x-1'}`}>
                    {#if item.size !== '1x1'}
                        <span class={`rounded-md max-xs:rounded-[1.2vw] max-xs:border-[0.3vw] border-2 font-[600] flex w-min h-min justify-center items-center
                        ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'} 
                        ${item.genre[0] === 'Fantasy' ? 'border-purple-100 text-purple-900 bg-purple-100' : 
                        item.genre[0] === 'Action' ? 'border-indigo-100 text-indigo-900 bg-indigo-100' : 
                        item.genre[0] === 'Comedy' ? 'border-amber-100 text-amber-800 bg-amber-100' : 
                        item.genre[0] === 'Drama' ? 'border-cyan-100 text-cyan-900 bg-cyan-100' : 
                        item.genre[0] === 'Horror' ? 'border-rose-100 text-rose-900 bg-rose-100' : 
                        'border-gray-700 text-gray-700 bg-gray-100'}`}>{ item.genre[0] }</span>

                        <span class={`rounded-md max-xs:rounded-[1.2vw] max-xs:border-[0.3vw] border-2 font-[600] flex w-min h-min justify-center items-center
                        ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'} 
                        ${item.genre[0] === 'Fantasy' ? 'border-purple-100 text-purple-900 bg-purple-100' : 
                        item.genre[0] === 'Action' ? 'border-indigo-100 text-indigo-900 bg-indigo-100' : 
                        item.genre[0] === 'Comedy' ? 'border-amber-100 text-amber-800 bg-amber-100' : 
                        item.genre[0] === 'Drama' ? 'border-cyan-100 text-cyan-900 bg-cyan-100' : 
                        item.genre[0] === 'Horror' ? 'border-rose-100 text-rose-900 bg-rose-100' : 
                        'border-gray-700 text-gray-700 bg-gray-100'}`}>{ item.type }</span>
                    {/if}
                    <span class={`rounded-md max-xs:rounded-[1.2vw] max-xs:border-[0.3vw] border-2 font-[600] flex w-min h-min justify-center items-center
                    ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'} 
                    ${item.genre[0] === 'Fantasy' ? 'border-purple-100 text-purple-900 bg-purple-100' : 
                    item.genre[0] === 'Action' ? 'border-indigo-100 text-indigo-900 bg-indigo-100' : 
                    item.genre[0] === 'Comedy' ? 'border-amber-100 text-amber-800 bg-amber-100' : 
                    item.genre[0] === 'Drama' ? 'border-cyan-100 text-cyan-900 bg-cyan-100' : 
                    item.genre[0] === 'Horror' ? 'border-rose-100 text-rose-900 bg-rose-100' : 
                    'border-gray-700 text-gray-700 bg-gray-100'}`}>
                        <Icon icon="fa6-solid:copy" class="mr-1" /> {item.pages}
                    </span>
                    
                    <span class={`rounded-md max-xs:rounded-[1.2vw] max-xs:border-[0.3vw] border-2 font-[600] flex w-min h-min justify-center items-center
                    ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'} 
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
        {/if}

        <!-- PHONE -->
        <!-- <div class="absolute w-full bottom-0 left-0 z-11 transition-opacity cursor-pointer">
            <div class="bg-zinc-900/50">
                {#if $phone}
                    {#if item.size === '1x1'}
                        <div class="grid grid-cols-1 m-[1vw] gap-[1vw]">
                            <div class="space-y-[1vw]">
                                <div class="flex justify-between bg-zinc-900 text-mainlight text-[3.2vw] px-[2vw] py-[1vw] rounded-md max-xs:rounded-[1.2vw]">
                                    <div>Chapter 1</div>
                                    <div>1 hour ago</div>
                                </div>
                                <div class="flex justify-between bg-zinc-900 text-mainlight text-[3.2vw] px-[2vw] py-[1vw] rounded-md max-xs:rounded-[1.2vw]">
                                    <div>Chapter 1</div>
                                    <div>1 hour ago</div>
                                </div>
                                <div class="flex justify-between bg-zinc-900 text-mainlight text-[3.2vw] px-[2vw] py-[1vw] rounded-md max-xs:rounded-[1.2vw]">
                                    <div>Chapter 1</div>
                                    <div>1 hour ago</div>
                                </div>
                            </div>
                        </div>
                    {:else}
                        <div class="grid grid-cols-2 m-[1vw] gap-[1vw]">
                            <div class="space-y-[1vw]">
                                <div class="flex justify-between bg-zinc-900 text-mainlight text-[3.2vw] px-[2vw] py-[1vw] rounded-md max-xs:rounded-[1.2vw]">
                                    <div>Chapter 1</div>
                                    <div>1 hour ago</div>
                                </div>
                                <div class="flex justify-between bg-zinc-900 text-mainlight text-[3.2vw] px-[2vw] py-[1vw] rounded-md max-xs:rounded-[1.2vw]">
                                    <div>Chapter 1</div>
                                    <div>1 hour ago</div>
                                </div>
                            </div>
                            <div class="space-y-[1vw]">
                                <div class="flex justify-between bg-zinc-900 text-mainlight text-[3.2vw] px-[2vw] py-[1vw] rounded-md max-xs:rounded-[1.2vw]">
                                    <div>Chapter 1</div>
                                    <div>1 hour ago</div>
                                </div>
                                <div class="flex justify-between bg-zinc-900 text-mainlight text-[3.2vw] px-[2vw] py-[1vw] rounded-md max-xs:rounded-[1.2vw]">
                                    <div>Chapter 1</div>
                                    <div>1 hour ago</div>
                                </div>
                            </div>
                        </div>
                    {/if}
                {/if}
            </div>
        </div> -->

        <!-- BACKGROUND IMAGE -->
        <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center" style={`background-image: url('${item.image}');`}></div>   

        <!-- D I S P L A Y E D -->
        <div class="relative w-full h-full z-3">

            <!-- MAIN DISPLAY -->
            <div class="absolute top-0 left-0 w-3/4">

                <!-- TITLE -->
                <h3 class={`text-left font-semibold line-clamp-3
                ${item.size === '1x1' ? 'text-zinc-900 max-xs:text-mainlight' : 'text-mainlight'} 
                ${item.size === '2x1' ? 'max-xs:text-[3.6vw]' : 'max-xs:text-[3.2vw]'} 
                ${item.size === '2x2' ? 'text-[24px] max-[500px]:text-[4.8vw]' : 'text-[16px]'}`}>
                    {item.title}
                </h3>

                <!-- LIKES -->
                <h4 class={`flex items-center text-[14px] max-xs:text-[2.8vw] ${item.size === '1x1' ? 'text-emerald-600/75  max-xs:text-emerald-400/85' : 'text-emerald-400/85'}`}>
                    <Icon icon="fa6-solid:heart" class="mr-1" />{formatLikes(item.likes)}
                </h4>
            </div>

            <!-- TAGS -->
            <div class={`absolute bottom-0 left-0 flex space-x-1 leading-[80%]
            ${item.size === '2x2' ? 'space-x-1.5' : 'space-x-1'}`}>
                <span class={`rounded-md max-xs:border-[0.3vw] border-2 font-[600] flex w-min
                max-xs:rounded-[1.2vw]
                ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'}
                ${item.genre[0] === 'Fantasy' ? 'border-purple-800 text-purple-900 bg-purple-100' : 
                item.genre[0] === 'Action' ? 'border-indigo-800 text-indigo-900 bg-indigo-100' : 
                item.genre[0] === 'Comedy' ? 'border-amber-700 text-amber-800 bg-amber-100' : 
                item.genre[0] === 'Drama' ? 'border-cyan-800 text-cyan-900 bg-cyan-100' : 
                item.genre[0] === 'Horror' ? 'border-rose-800 text-rose-900 bg-rose-100' : 
                'border-gray-700 text-gray-700 bg-gray-100'}`}>{ item.genre[0] }</span>

                <span class={`rounded-md max-xs:border-[0.3vw] border-2 font-[600] flex w-min
                max-xs:rounded-[1.2vw]
                ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'}
                ${item.type === 'KOMIK' ? 'border-sky-600 text-sky-700 bg-sky-100' : 
                item.type === 'NOVEL' ? 'border-amber-600 text-amber-700 bg-amber-100' : 
                'border-gray-600 text-gray-600 bg-gray-100'}`}>{ item.type }</span>

                {#if $phone }

                    <span class={`rounded-md max-xs:border-[0.3vw] border-2 font-[600] flex w-min
                    max-xs:rounded-[1.2vw]
                    ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'}
                    border-gray-600 text-gray-600 bg-gray-100 flex justify-center items-center`}>
                        <Icon icon="fa6-solid:star" class="mr-1" /> { item.rating }
                    </span>

                    {#if item.size === '2x1' }
                        <span class={`rounded-md max-xs:border-[0.3vw] border-2 font-[600] flex w-min
                        max-xs:rounded-[1.2vw]
                        ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'}
                        border-gray-600 text-gray-600 bg-gray-100 flex justify-center items-center`}>
                            <Icon icon="fa6-solid:copy" class="mr-1" /> {item.pages}
                        </span>
                    {/if}
                {/if}

            </div>
        </div>

        
    </div>
    {#if !$phone}
        <div class={`z-20 portrait:hidden absolute w-[calc(100%-2px)] translate-x-[1px] bottom-0 opacity-0 group-focus:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100 transition-all ease-out group-hover:translate-y-[calc(100%-8px)] group-focus:translate-y-[calc(100%-8px)] group-focus-within:translate-y-[calc(100%-8px)] rounded-b-lg flex justify-center items-center
        px-2 pb-1 space-x-1
        ${item.size === '2x2' ? 'text-[13px]' : 'text-[12px]'}
        ${item.genre[0] === 'Fantasy' ? 'bg-purple-600 text-purple-900' : 
        item.genre[0] === 'Action' ? 'bg-indigo-600 text-indigo-900' : 
        item.genre[0] === 'Comedy' ? 'bg-amber-600 text-amber-800' : 
        item.genre[0] === 'Drama' ? 'bg-cyan-600 text-cyan-900' : 
        item.genre[0] === 'Horror' ? 'bg-rose-600 text-rose-900' : 
        'bg-gray-600 text-gray-700'}
        `}>
            <div class="w-full">
                <div
                role="button" 
                aria-label="chapter"
		        tabindex="0" 
                class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-sky-400     
                ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                `}>
                    <div>Chapter 105</div>
                    <div>1 hour ago</div>
                </div>
                <div
                role="button" 
                aria-label="chapter"
		        tabindex="0" 
                class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-sky-400     
                ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                `}>
                    <div>Chapter 104</div>
                    <div>1 day ago</div>
                </div>
                <div
                role="button" 
                aria-label="chapter"
		        tabindex="0" 
                class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-sky-400     
                ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                `}>
                    <div>Chapter 103</div>
                    <div>6 days ago</div>
                </div>
            </div>
            {#if item.size !== '1x1'}
                <div class="w-full">
                    <div
                    role="button" 
                    aria-label="chapter"             
                    tabindex="0"
                    class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-sky-400     
                    ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                    item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                    item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                    item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                    item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                    'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                    `}>
                        <div>Chapter 102</div>
                        <div>1 week ago</div>
                    </div>
                    <div
                    role="button" 
                    aria-label="chapter"             
                    tabindex="0"
                    class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-sky-400     
                    ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                    item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                    item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                    item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                    item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                    'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                    `}>
                        <div>Chapter 101</div>
                        <div>3 weeks ago</div>
                    </div>
                    <div
                    role="button" 
                    aria-label="chapter"             
                    tabindex="0"
                    class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-sky-400     
                    ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                    item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                    item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                    item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                    item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                    'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                    `}>
                        <div>Chapter 100</div>
                        <div>1 month ago</div>
                    </div>
                </div>
            {/if}
        </div>
    {/if}
    <div>
        {#if !$desktop}
            {#if item.size === '1x1'}
                <div class="grid grid-cols-1 mt-[1vw] xs:mt-[4px] gap-[1vw] xs:gap-[4px] landscape:hidden">
                    <div class="space-y-[1vw] xs:space-y-[4px]">
                        <div
                        role="button" 
                        aria-label="chapter"             
                        tabindex="0" 
                        class="flex justify-between cursor-pointer whitespace-nowrap bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus:ring-2 focus:ring-sky-400">
                            <div>Chapter 105</div>
                            <div>1 hour ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"             
                        tabindex="0" 
                        class="flex justify-between cursor-pointer whitespace-nowrap bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus:ring-2 focus:ring-sky-400">
                            <div>Chapter 104</div>
                            <div>1 week ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"             
                        tabindex="0" 
                        class="flex justify-between cursor-pointer whitespace-nowrap bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus:ring-2 focus:ring-sky-400">
                            <div>Chapter 103</div>
                            <div>1 month ago</div>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="grid grid-cols-2 mt-[1vw] xs:mt-[4px] gap-[1vw] xs:gap-[4px] landscape:hidden">
                    <div class="space-y-[1vw] xs:space-y-[4px]">
                        <div
                        role="button" 
                        aria-label="chapter"             
                        tabindex="0" 
                        class="flex justify-between cursor-pointer whitespace-nowrap bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus:ring-2 focus:ring-sky-400">
                            <div>Chapter 4</div>
                            <div>1 hour ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"             
                        tabindex="0" 
                        class="flex justify-between cursor-pointer whitespace-nowrap bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus:ring-2 focus:ring-sky-400">
                            <div>Chapter 3</div>
                            <div>1 week ago</div>
                        </div>
                    </div>
                    <div class="space-y-[1vw]">
                        <div
                        role="button" 
                        aria-label="chapter"             
                        tabindex="0" 
                        class="flex justify-between cursor-pointer whitespace-nowrap bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus:ring-2 focus:ring-sky-400">
                            <div>Chapter 2</div>
                            <div>2 weeks ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"             
                        tabindex="0" 
                        class="flex justify-between cursor-pointer whitespace-nowrap bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus:ring-2 focus:ring-sky-400">
                            <div>Chapter 1</div>
                            <div>1 month ago</div>
                        </div>
                    </div>
                </div>
            {/if}
        {/if}
    </div>
</div>