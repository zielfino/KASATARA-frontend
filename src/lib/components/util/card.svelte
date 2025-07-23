<script lang="ts">
    import Icon from "@iconify/svelte";
    import Top from "./top.svelte";
    import Choice from "./choice.svelte";
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    export let item;
    export let showChapter = true;
    
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
	const landscape = writable(false);

    onMount(() => {
        const update = () => {
            phone.set(window.innerWidth <= 500);
            desktop.set(window.innerWidth >= 900);
			landscape.set(window.innerWidth > window.innerHeight);
        };

        update();
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    });
    
    
    function lightenHexColor(hex: string, amount: number = 0.85) {
        const parsed = hex.replace('#', '');
        if (parsed.length !== 6) return hex;

        const r = parseInt(parsed.slice(0, 2), 16);
        const g = parseInt(parsed.slice(2, 4), 16);
        const b = parseInt(parsed.slice(4, 6), 16);

        // Interpolasi linear ke putih
        const newR = Math.round(r + (255 - r) * amount);
        const newG = Math.round(g + (255 - g) * amount);
        const newB = Math.round(b + (255 - b) * amount);

        return `rgb(${newR}, ${newG}, ${newB})`;
    }

    function formatTimeAgo(hours: number): string {
        if (hours < 1) {
            return 'less than an hour ago';
        }

        // lebih dari atau sama 1 bulan (anggap 30 hari)
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (months >= 1) {
            return months === 1
            ? '1 month ago'
            : `${months} months ago`;
        }

        if (weeks >= 1) {
            return weeks === 1
            ? '1 week ago'
            : `${weeks} weeks ago`;
        }

        if (days >= 1) {
            return days === 1
            ? '1 day ago'
            : `${days} days ago`;
        }

        const hrs = Math.floor(hours);
        return hrs === 1
            ? '1 hour ago'
            : `${hrs} hours ago`;
    }
</script>

<button
    on:click={() => goto('/series')}
    role={'button'} 
    aria-label="card"
    tabindex={item.disable === true ? -1 : 0}
    class={`group relative
    flex flex-col outline-none
    ${
        item.size === '1x1' && item.type === "VISUAL NOVEL"
        ? 'col-span-1 xs:h-full'
        : item.size === '2x1'
        ? 'col-span-2 xs:col-span-3'
        : item.size === '1x1'
        ? 'col-span-1 xs:aspect-[3/4]'
        : 'col-span-2 row-span-2'
    }
    ${
        item.type === "VISUAL NOVEL" ? 'portrait:focus-visible:ring-1 portrait:focus-visible:ring-sky-400 focus-visible:bg-sky-200/90 rounded-lg' : ''
    }
    `}
    style="direction:ltr"
>   
    <div class={`z-10 xs:drop-shadow-xs landscape:lg:drop-shadow-none xs:bg-mainlight xs:border xs:border-zinc-900/15 relative w-full h-full p-3 max-xs:p-[2.4vw] rounded-md max-xs:rounded-[1.2vw] xs:rounded-lg flex justify-center items-center max-xs:border max-xs:border-zinc-900/30 overflow-hidden
     portrait:group-focus-visible:border-1 portrait:group-focus-visible:ring-1 portrait:group-focus-visible:border-sky-400 portrait:group-focus-visible:ring-sky-400 portrait:group-focus-visible:bg-sky-200/90
    ${
        item.size === '2x1'
        ? 'aspect-[9.2/4] xs:min-h-[221px] xs:aspect-[2/1] xs:portrait:aspect-auto xs:portrait:min-h-[40vw] sm:portrait:min-h-[283.83px] sm:aspect-auto sm:min-h-[285.76px] md:min-h-[248.66px] lg:min-h-[243.73px] xl:min-h-[284.8px] h-full'
        : 'aspect-[3/4]'
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
            <div class={`absolute top-0 left-0 w-full h-full z-[1]`}
            style={`
            background-color: 
            ${item.color ? `${item.color}` :
            item.genre[0] === 'Fantasy' ? '#9810fa' : 
            item.genre[0] === 'Action' ? '#4f46e5' : 
            item.genre[0] === 'Comedy' ? 'oklch(66.6% 0.179 58.318)' : 
            item.genre[0] === 'Drama' ? 'oklch(60.9% 0.126 221.723)' : 
            item.genre[0] === 'Horror' ? 'oklch(57.7% 0.245 27.325)' : 
            item.genre[0] === 'Romance' ? 'oklch(58.6% 0.253 17.585)' : 
            '#4a5565'};
            mask-image: linear-gradient(5deg, rgba(0, 0, 0, 1) 5%, transparent 25%);
            -webkit-mask-image: linear-gradient(5deg, rgba(0, 0, 0, 1) 5%, transparent 25%);
            `}>
            </div>
            <!-- {#if item.size == '2x2' || item.size == '2x1' }
                <div class="absolute top-0 left-0 w-full h-full z-[1] bg-stone-900/80"
                    style="
                    mask-image: linear-gradient(170deg, rgba(0, 0, 20, 0.8) 20%, transparent 80%, transparent 100%, rgba(0, 0, 20, 0.8) 100%);
                    -webkit-mask-image: linear-gradient(170deg, rgba(0, 0, 20, 0.8) 20%, transparent 80%, transparent 100%, rgba(0, 0, 20, 0.8) 100%);
                    ">
                </div>
            {/if}
        {:else}
            <div class="absolute top-0 left-0 mask-linear-50 w-full h-full z-[1] bg-stone-900/80"
                style="
                mask-image: linear-gradient(160deg, rgba(0, 0, 20, 0.8) 10%, transparent 75%, transparent 100%, rgba(0, 0, 20, 0.8) 100%);
                -webkit-mask-image: linear-gradient(160deg, rgba(0, 0, 20, 0.8) 10%, transparent 75%, transparent 100%, rgba(0, 0, 20, 0.8) 100%);
                ">
            </div> -->
        {/if}
        
        {#if item.type === "VISUAL NOVEL" && !$desktop && !$landscape}
            <div class="absolute top-0 left-0 w-full h-full z-21 active:bg-stone-900/30 xs:group-focus-within:bg-stone-900/10 hover:bg-stone-900/20 cursor-pointer transition-all duration-300 ease-out">
            <!-- <div class={`absolute top-0 left-0 w-full h-full z-21 active:bg-stone-900/30 xs:group-focus-within:bg-stone-900/10 hover:bg-stone-900/20 cursor-pointer transition-all duration-300 ease-out
            ${item.genre[0] === 'Fantasy' ? 'bg-purple-600 text-purple-900' : 
            item.genre[0] === 'Action' ? 'bg-indigo-600 text-indigo-900' : 
            item.genre[0] === 'Comedy' ? 'bg-amber-600 text-amber-800' : 
            item.genre[0] === 'Drama' ? 'bg-cyan-600 text-cyan-900' : 
            item.genre[0] === 'Horror' ? 'bg-rose-600 text-rose-900' : 
            item.genre[0] === 'Romance' ? 'bg-pink-600 text-pink-900' : 
            'bg-gray-600 text-gray-700'}`}> -->
            </div>
        {/if}

        <!-- H O V E R E D -->
        {#if !$phone }
            <!-- <div class={`absolute w-full h-full top-0 left-0 z-20 opacity-0 landscape:group-hover:opacity-100 landscape:group-focus-visible:opacity-100 landscape:group-focus-within:opacity-100 transition-opacity cursor-pointer
            ${item.genre[0] === 'Fantasy' ? 'bg-purple-600' : 
            item.genre[0] === 'Action' ? 'bg-indigo-600' : 
            item.genre[0] === 'Comedy' ? 'bg-amber-600' : 
            item.genre[0] === 'Drama' ? 'bg-cyan-600' : 
            item.genre[0] === 'Horror' ? 'bg-rose-600' : 
            item.genre[0] === 'Romance' ? 'bg-pink-600' : 
            'bg-gray-600'}`}> -->
            <div class="absolute w-full h-full top-0 left-0 z-20 opacity-0 landscape:group-hover:opacity-100 landscape:group-focus-visible:opacity-100 landscape:group-focus-within:opacity-100 transition-opacity cursor-pointer duration-300 ease-out"
            style={`background-image:
            linear-gradient(170deg,
                ${item.color ? item.color :
                item.genre[0] === 'Fantasy' ? '#9810fa' :
                item.genre[0] === 'Action'  ? '#4f46e5' :
                item.genre[0] === 'Comedy'  ? 'oklch(66.6% 0.179 58.318)' :
                item.genre[0] === 'Drama'   ? 'oklch(60.9% 0.126 221.723)' :
                item.genre[0] === 'Horror'  ? 'oklch(57.7% 0.245 27.325)' :
                item.genre[0] === 'Romance' ? 'oklch(58.6% 0.253 17.585)' :
                '#4a5565'
                } ${item.size === "2x2" ? "5%" : "15%"},
                transparent ${item.size === "2x2" ? "35%" : "40%"}
            ),
            linear-gradient(180deg,
                transparent ${item.size === "2x2" ? "85%" : "55%"},
                ${item.color ? item.color :
                item.genre[0] === 'Fantasy' ? '#9810fa' :
                item.genre[0] === 'Action'  ? '#4f46e5' :
                item.genre[0] === 'Comedy'  ? 'oklch(66.6% 0.179 58.318)' :
                item.genre[0] === 'Drama'   ? 'oklch(60.9% 0.126 221.723)' :
                item.genre[0] === 'Horror'  ? 'oklch(57.7% 0.245 27.325)' :
                item.genre[0] === 'Romance' ? 'oklch(58.6% 0.253 17.585)' :
                '#4a5565'
                } ${item.size === "2x2" ? "100%" : "95%"}
            )`}
            >

                <!-- MAIN HOVER -->
                <div class="absolute top-0 left-0 p-3 min-w-full">
                    <h3 class={`text-left font-semibold line-clamp-3 leading-tight
                    ${item.size === '2x2' ? 'text-[24px]' : 'text-[16px] max-xs:text-[3.2vw]'}
                    ${item.size === '2x1' ? 'max-xs:text-[3.6vw]' : 'max-xs:text-[3.2vw]'}
                    `}
                    style={`color: ${
                    item.color ? lightenHexColor(item.color) :
                    item.genre[0] === 'Fantasy' ? '#f3e8ff' :       // text-purple-100
                    item.genre[0] === 'Action' ? '#e0e7ff' :        // text-indigo-100
                    item.genre[0] === 'Comedy' ? '#fef3c7' :        // text-amber-100
                    item.genre[0] === 'Drama' ? '#cffafe' :         // text-cyan-100
                    item.genre[0] === 'Horror' ? '#ffe4e6' :        // text-rose-100
                    item.genre[0] === 'Romance' ? '#fce7f3' :       // text-pink-100
                    '#f5f5f5'                                       // text-gray-100
                    }`}>
                        {item.title}
                    </h3>
                    <!-- <div class={`bg-mainlight h-[0.5px] ${item.size === '2x2' ? 'm-1 mb-1.5' : 'm-0.5'}`}></div> -->
                    <!-- <h4 class={`text-mainlight text-justify font-semibold
                    ${item.size === '2x2' ? 'text-[14px] max-xs:text-[2.8vw] line-clamp-12 xl:line-clamp-14' : 'text-[12px] max-xs:text-[2.4vw] line-clamp-5 xl:line-clamp-6'}`}>
                        {item.excerpt}
                    </h4> -->
                </div>

                <!-- TAGS -->
                <div class={`absolute bottom-0 left-0 p-3 w-full flex leading-[80%]
                ${item.size === '2x2' ? 'space-x-1.5' : 'space-x-1'}`}>
                    {#if item.size !== '1x1'}
                        <span class={`rounded-md max-xs:rounded-[1.2vw] max-xs:border-[0.3vw] border-2 font-[600] flex w-min h-min justify-center items-center whitespace-nowrap
                        ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'} 
                        `}
                        style={`
                        color: ${
                            item.color
                            ? item.color
                            : item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5'
                        };
                        background-color: ${
                            item.color
                            ? lightenHexColor(item.color)
                            : item.genre[0] === 'Fantasy' ? '#a855f7' :
                                item.genre[0] === 'Action' ? '#6366f1' :
                                item.genre[0] === 'Comedy' ? '#f59e0b' :
                                item.genre[0] === 'Drama' ? '#06b6d4' :
                                item.genre[0] === 'Horror' ? '#f43f5e' :
                                item.genre[0] === 'Romance' ? '#ec4899' :
                                '#737373'
                        };
                        border-color: ${
                            item.color
                            ? lightenHexColor(item.color)
                            : item.genre[0] === 'Fantasy' ? '#c084fc' :
                                item.genre[0] === 'Action' ? '#a5b4fc' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#67e8f9' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#f9a8d4' :
                                '#d4d4d4'
                        };
                        `}>{ item.genre[0] }</span>

                        <span class={`rounded-md max-xs:rounded-[1.2vw] max-xs:border-[0.3vw] border-2 font-[600] flex w-min h-min justify-center items-center whitespace-nowrap
                        ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'} 
                        `}
                        style={`
                        color: ${
                            item.color
                            ? item.color
                            : item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5'
                        };
                        background-color: ${
                            item.color
                            ? lightenHexColor(item.color)
                            : item.genre[0] === 'Fantasy' ? '#a855f7' :
                                item.genre[0] === 'Action' ? '#6366f1' :
                                item.genre[0] === 'Comedy' ? '#f59e0b' :
                                item.genre[0] === 'Drama' ? '#06b6d4' :
                                item.genre[0] === 'Horror' ? '#f43f5e' :
                                item.genre[0] === 'Romance' ? '#ec4899' :
                                '#737373'
                        };
                        border-color: ${
                            item.color
                            ? lightenHexColor(item.color)
                            : item.genre[0] === 'Fantasy' ? '#c084fc' :
                                item.genre[0] === 'Action' ? '#a5b4fc' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#67e8f9' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#f9a8d4' :
                                '#d4d4d4'
                        };
                        `}>{ item.type }</span>
                    {/if}
                    <span class={`rounded-md max-xs:rounded-[1.2vw] max-xs:border-[0.3vw] border-2 font-[600] flex w-min h-min justify-center items-center whitespace-nowrap
                    ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'} 
                    `}
                        style={`
                        color: ${
                            item.color
                            ? item.color
                            : item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5'
                        };
                        background-color: ${
                            item.color
                            ? lightenHexColor(item.color)
                            : item.genre[0] === 'Fantasy' ? '#a855f7' :
                                item.genre[0] === 'Action' ? '#6366f1' :
                                item.genre[0] === 'Comedy' ? '#f59e0b' :
                                item.genre[0] === 'Drama' ? '#06b6d4' :
                                item.genre[0] === 'Horror' ? '#f43f5e' :
                                item.genre[0] === 'Romance' ? '#ec4899' :
                                '#737373'
                        };
                        border-color: ${
                            item.color
                            ? lightenHexColor(item.color)
                            : item.genre[0] === 'Fantasy' ? '#c084fc' :
                                item.genre[0] === 'Action' ? '#a5b4fc' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#67e8f9' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#f9a8d4' :
                                '#d4d4d4'
                        };
                        `}>
                        <Icon icon="fa6-solid:copy" class="mr-1" /> { item.chapter ? item.chapter[0] : item.pages}
                    </span>
                    
                    <span class={`rounded-md max-xs:rounded-[1.2vw] max-xs:border-[0.3vw] border-2 font-[600] flex w-min h-min justify-center items-center whitespace-nowrap
                    ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'} 
                    `}
                        style={`
                        color: ${
                            item.color
                            ? item.color
                            : item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5'
                        };
                        background-color: ${
                            item.color
                            ? lightenHexColor(item.color)
                            : item.genre[0] === 'Fantasy' ? '#a855f7' :
                                item.genre[0] === 'Action' ? '#6366f1' :
                                item.genre[0] === 'Comedy' ? '#f59e0b' :
                                item.genre[0] === 'Drama' ? '#06b6d4' :
                                item.genre[0] === 'Horror' ? '#f43f5e' :
                                item.genre[0] === 'Romance' ? '#ec4899' :
                                '#737373'
                        };
                        border-color: ${
                            item.color
                            ? lightenHexColor(item.color)
                            : item.genre[0] === 'Fantasy' ? '#c084fc' :
                                item.genre[0] === 'Action' ? '#a5b4fc' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#67e8f9' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#f9a8d4' :
                                '#d4d4d4'
                        };
                        `}>
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
        <!-- <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center"></div>    -->
        <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center"
        style={`${!item.imageLong && item.size === "2x1" ? `background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${item.image}");` : ""}`}>
            <img src="{item.imageLong && item.size === "2x1" ? item.imageLong : item.image}" alt="" 
            class={`w-full h-full object-center duration-150 transition-all landscape:group-hover:scale-105 landscape:group-focus-visible:scale-105 landscape:group-focus-within:scale-105
            ${!item.imageLong && item.size === "2x1" ? "object-contain backdrop-blur-md" : "object-cover"}`} />
        </div>

        <!-- D I S P L A Y E D -->
        <div class="relative w-full h-full z-3">

            <!-- MAIN DISPLAY -->
            <!-- <div class="absolute top-0 left-0 w-3/4"> -->

                <!-- TITLE -->
                <!-- <h3 class={`text-left font-semibold line-clamp-3
                ${item.size === '1x1' ? 'text-zinc-900 max-xs:text-mainlight' : 'text-mainlight'} 
                ${item.size === '2x1' ? 'max-xs:text-[3.6vw]' : 'max-xs:text-[3.2vw]'} 
                ${item.size === '2x2' ? 'text-[24px] max-xs:text-[4.8vw]' : 'text-[16px]'}`}>
                    {item.title}
                </h3> -->

                <!-- LIKES -->
                <!-- <h4 class={`flex items-center text-[14px] max-xs:text-[2.8vw] ${item.size === '1x1' ? 'text-emerald-600/75  max-xs:text-emerald-400/85' : 'text-emerald-400 text-shadow-md text-shadow-zinc-900/10'}`}>
                    <Icon icon="fa6-solid:heart" class="mr-1" />{formatLikes(item.likes)}
                </h4> -->
            <!-- </div> -->

            <!-- TAGS -->
            <div class={`absolute bottom-0 left-0 flex space-x-1 leading-[80%] landscape:group-hover:opacity-0 landscape:group-focus-visible:opacity-0 landscape:group-focus-within:opacity-0 transition-opacity
            ${item.size === '2x2' ? 'space-x-1.5' : 'space-x-1'}`}>
                <span class={`rounded-md max-xs:border-[0.3vw] border-2 font-[600] flex w-min
                max-xs:rounded-[1.2vw] whitespace-nowrap
                ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'}
                ${item.genre[0] === 'Fantasy' ? 'border-purple-800 text-purple-900 bg-purple-100' : 
                item.genre[0] === 'Action' ? 'border-indigo-800 text-indigo-900 bg-indigo-100' : 
                item.genre[0] === 'Comedy' ? 'border-amber-700 text-amber-800 bg-amber-100' : 
                item.genre[0] === 'Drama' ? 'border-cyan-800 text-cyan-900 bg-cyan-100' : 
                item.genre[0] === 'Horror' ? 'border-rose-800 text-rose-900 bg-rose-100' : 
                item.genre[0] === 'Romance' ? 'border-pink-800 text-pink-900 bg-pink-100' : 
                'border-gray-700 text-gray-700 bg-gray-100'}`}>{ item.genre[0] }</span>

                <span class={`rounded-md max-xs:border-[0.3vw] border-2 font-[600] flex w-min
                max-xs:rounded-[1.2vw] whitespace-nowrap
                ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'}
                ${item.type === 'KOMIK' ? 'border-sky-600 text-sky-700 bg-sky-100' : 
                item.type === 'NOVEL' ? 'border-amber-600 text-amber-700 bg-amber-100' : 
                'border-gray-600 text-gray-600 bg-gray-100'}`}>{ item.type }</span>

                {#if $phone }

                    <span class={`rounded-md max-xs:border-[0.3vw] border-2 font-[600] flex w-min
                    max-xs:rounded-[1.2vw] whitespace-nowrap
                    ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'}
                    border-gray-600 text-gray-600 bg-gray-100 flex justify-center items-center`}>
                        <Icon icon="fa6-solid:star" class="mr-1" /> { item.rating }
                    </span>

                    {#if item.size === '2x1' }
                        <span class={`rounded-md max-xs:border-[0.3vw] border-2 font-[600] flex w-min
                        max-xs:rounded-[1.2vw] whitespace-nowrap
                        ${item.size === '2x2' ? 'text-[12px] max-xs:text-[2.4vw] max-xs:py-[0.6vw] py-[3px] max-xs:px-[1.4vw] px-[7px]' : 'max-xs:text-[2vw] text-[10px] max-xs:py-[0.2vw] py-[1px] max-xs:px-[0.6vw] px-[3px]'}
                        border-gray-600 text-gray-600 bg-gray-100 flex justify-center items-center`}>
                            <Icon icon="fa6-solid:copy" class="mr-1" /> {item.pages}
                        </span>
                    {/if}
                {/if}

            </div>
        </div>

    </div>


    <!-- CHAPTER HOVER -->
    {#if !$phone && item.type !== 'VISUAL NOVEL'}
        <div class={`z-20 portrait:hidden absolute w-[calc(100%-0.7%)] translate-x-[0.4%] md:w-[calc(100%-0.4%)] md:translate-x-[0.2%] bottom-0 opacity-0 group-focus-visible:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100 transition-all ease-out group-hover:translate-y-[calc(100%-8px)] group-focus-visible:translate-y-[calc(100%-8px)] group-focus-within:translate-y-[calc(100%-8px)] rounded-b-lg flex justify-center items-center
        px-2 pb-1 space-x-1
        ${item.size === '2x2' ? 'text-[13px]' : 'text-[12px]'}
        `}
        style={`
        color: ${
            item.color
            ? item.color
            : item.genre[0] === 'Fantasy' ? '#59168b ' :
                item.genre[0] === 'Action' ? '#312c85' :
                item.genre[0] === 'Comedy' ? 'oklch(47.3% 0.137 46.201)' :
                item.genre[0] === 'Drama' ? '#104e64 ' :
                item.genre[0] === 'Horror' ? '#8b0836 ' :
                item.genre[0] === 'Romance' ? '#861043 ' :
                '#f5f5f5'
        };
        background-color: 
            ${item.color ? `${item.color}` :
                item.genre[0] === 'Fantasy' ? '#9810fa' : 
                item.genre[0] === 'Action' ? '#4f46e5' : 
                item.genre[0] === 'Comedy' ? 'oklch(66.6% 0.179 58.318)' : 
                item.genre[0] === 'Drama' ? 'oklch(60.9% 0.126 221.723)' : 
                item.genre[0] === 'Horror' ? 'oklch(57.7% 0.245 27.325)' : 
                item.genre[0] === 'Romance' ? 'oklch(58.6% 0.253 17.585)' : 
                '#4a5565'
        };`}>
        <!-- <div class={`z-20 portrait:hidden absolute w-[calc(100%-0.7%)] translate-x-[0.4%] md:w-[calc(100%-0.4%)] md:translate-x-[0.2%] bottom-0 opacity-0 group-focus-visible:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100 transition-all ease-out group-hover:translate-y-[calc(100%-8px)] group-focus-visible:translate-y-[calc(100%-8px)] group-focus-within:translate-y-[calc(100%-8px)] rounded-b-lg flex justify-center items-center
        px-2 pb-1 space-x-1 bg-zinc-700 text-zinc-900
        ${item.size === '2x2' ? 'text-[13px]' : 'text-[12px]'}
        `}> -->
            {#each Array(item.size !== '1x1' ? item.size == '2x2' ? 2 : 3 :  1) as _, i}
                <div class="w-full">
                    {#if item.comments === 'short'}
                        {#if item.chapter}                        
                            {#each item.chapter.slice(0, 1) as chapter, n}
                                <div
                                role="button" 
                                aria-label="chapter"
                                on:click|stopPropagation={() => console.log('Klik di div child saja')}
                                on:keydown|stopPropagation={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                    console.log('Klik dengan keyboard');
                                    e.preventDefault(); // untuk Space biar gak scroll
                                    }
                                }}
                                tabindex={item.disable === true ? -1 : 0}
                                class={`flex justify-between my-1 px-2 py-1 duration-300 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90`}
                                style={` 
                                background-color:
                                    ${item.color ? lightenHexColor(item.color) :
                                    item.genre[0] === 'Fantasy' ? '#f3e8ff' :         
                                    item.genre[0] === 'Action' ? '#e0e7ff' :        
                                    item.genre[0] === 'Comedy' ? '#fef3c7' :      
                                    item.genre[0] === 'Drama' ? '#cffafe' :         
                                    item.genre[0] === 'Horror' ? '#ffe4e6' :          
                                    item.genre[0] === 'Romance' ? '#fce7f3' :        
                                    '#f5f5f5'}                             
                                `}
                                on:mouseover={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                    item.color ? lightenHexColor(item.color, 0.7) :
                                    item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                    item.genre[0] === 'Action' ? '#c7d2fe' :
                                    item.genre[0] === 'Comedy' ? '#fde68a' :
                                    item.genre[0] === 'Drama' ? '#a5f3fc' :
                                    item.genre[0] === 'Horror' ? '#fecdd3' :
                                    item.genre[0] === 'Romance' ? '#fbcfe8' :
                                    '#e5e5e5';
                                }}
                                on:focus={(e) => {
                                    // Sama dengan hover
                                    e.currentTarget.style.backgroundColor =
                                    item.color ? lightenHexColor(item.color, 0.7) :
                                    item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                    item.genre[0] === 'Action' ? '#c7d2fe' :
                                    item.genre[0] === 'Comedy' ? '#fde68a' :
                                    item.genre[0] === 'Drama' ? '#a5f3fc' :
                                    item.genre[0] === 'Horror' ? '#fecdd3' :
                                    item.genre[0] === 'Romance' ? '#fbcfe8' :
                                    '#e5e5e5';
                                }}
                                on:mouseout={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                    item.color ? lightenHexColor(item.color) :
                                    item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                    item.genre[0] === 'Action' ? '#e0e7ff' :
                                    item.genre[0] === 'Comedy' ? '#fef3c7' :
                                    item.genre[0] === 'Drama' ? '#cffafe' :
                                    item.genre[0] === 'Horror' ? '#ffe4e6' :
                                    item.genre[0] === 'Romance' ? '#fce7f3' :
                                    '#f5f5f5';
                                }}
                                on:blur={(e) => {
                                    // Sama dengan mouseout
                                    e.currentTarget.style.backgroundColor =
                                    item.color ? lightenHexColor(item.color) :
                                    item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                    item.genre[0] === 'Action' ? '#e0e7ff' :
                                    item.genre[0] === 'Comedy' ? '#fef3c7' :
                                    item.genre[0] === 'Drama' ? '#cffafe' :
                                    item.genre[0] === 'Horror' ? '#ffe4e6' :
                                    item.genre[0] === 'Romance' ? '#fce7f3' :
                                    '#f5f5f5';
                                }}>
                                    <div>Chapter {chapter -1*i}</div>
                                    <div>{formatTimeAgo(24 * 6 * (1 * i + n) + 1)}</div>
                                </div>
                            {/each}
                        {:else}
                            <div
                            role="button" 
                            aria-label="chapter"
                            on:click|stopPropagation={() => console.log('Klik di div child saja')}
                            on:keydown|stopPropagation={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                console.log('Klik dengan keyboard');
                                e.preventDefault(); // untuk Space biar gak scroll
                                }
                            }}
                            tabindex={item.disable === true ? -1 : 0}
                            class={`flex justify-between my-1 px-2 py-1 duration-300 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90`}
                            style={` 
                            background-color:
                                ${item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :         
                                item.genre[0] === 'Action' ? '#e0e7ff' :        
                                item.genre[0] === 'Comedy' ? '#fef3c7' :      
                                item.genre[0] === 'Drama' ? '#cffafe' :         
                                item.genre[0] === 'Horror' ? '#ffe4e6' :          
                                item.genre[0] === 'Romance' ? '#fce7f3' :        
                                '#f5f5f5'}                             
                            `}
                            on:mouseover={(e) => {
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color, 0.7) :
                                item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                item.genre[0] === 'Action' ? '#c7d2fe' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#a5f3fc' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#fbcfe8' :
                                '#e5e5e5';
                            }}
                            on:focus={(e) => {
                                // Sama dengan hover
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color, 0.7) :
                                item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                item.genre[0] === 'Action' ? '#c7d2fe' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#a5f3fc' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#fbcfe8' :
                                '#e5e5e5';
                            }}
                            on:mouseout={(e) => {
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5';
                            }}
                            on:blur={(e) => {
                                // Sama dengan mouseout
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5';
                            }}>
                                <div>Chapter {100-i}</div>
                                <div>1 {i===1 ?  'week' : 'hour'} ago</div>
                            </div>
                        {/if}
                    {:else}
                        {#if item.chapter}                        
                            {#each item.chapter.slice(0, 3) as chapter, n}
                                <div
                                role="button" 
                                aria-label="chapter"
                                on:click|stopPropagation={() => console.log('Klik di div child saja')}
                                on:keydown|stopPropagation={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                    console.log('Klik dengan keyboard');
                                    e.preventDefault(); // untuk Space biar gak scroll
                                    }
                                }}
                                tabindex={item.disable === true ? -1 : 0}
                                class={`flex justify-between my-1 px-2 py-1 duration-300 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90`}
                                style={` 
                                background-color:
                                    ${item.color ? lightenHexColor(item.color) :
                                    item.genre[0] === 'Fantasy' ? '#f3e8ff' :         
                                    item.genre[0] === 'Action' ? '#e0e7ff' :        
                                    item.genre[0] === 'Comedy' ? '#fef3c7' :      
                                    item.genre[0] === 'Drama' ? '#cffafe' :         
                                    item.genre[0] === 'Horror' ? '#ffe4e6' :          
                                    item.genre[0] === 'Romance' ? '#fce7f3' :        
                                    '#f5f5f5'}                             
                                `}
                                on:mouseover={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                    item.color ? lightenHexColor(item.color, 0.7) :
                                    item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                    item.genre[0] === 'Action' ? '#c7d2fe' :
                                    item.genre[0] === 'Comedy' ? '#fde68a' :
                                    item.genre[0] === 'Drama' ? '#a5f3fc' :
                                    item.genre[0] === 'Horror' ? '#fecdd3' :
                                    item.genre[0] === 'Romance' ? '#fbcfe8' :
                                    '#e5e5e5';
                                }}
                                on:focus={(e) => {
                                    // Sama dengan hover
                                    e.currentTarget.style.backgroundColor =
                                    item.color ? lightenHexColor(item.color, 0.7) :
                                    item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                    item.genre[0] === 'Action' ? '#c7d2fe' :
                                    item.genre[0] === 'Comedy' ? '#fde68a' :
                                    item.genre[0] === 'Drama' ? '#a5f3fc' :
                                    item.genre[0] === 'Horror' ? '#fecdd3' :
                                    item.genre[0] === 'Romance' ? '#fbcfe8' :
                                    '#e5e5e5';
                                }}
                                on:mouseout={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                    item.color ? lightenHexColor(item.color) :
                                    item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                    item.genre[0] === 'Action' ? '#e0e7ff' :
                                    item.genre[0] === 'Comedy' ? '#fef3c7' :
                                    item.genre[0] === 'Drama' ? '#cffafe' :
                                    item.genre[0] === 'Horror' ? '#ffe4e6' :
                                    item.genre[0] === 'Romance' ? '#fce7f3' :
                                    '#f5f5f5';
                                }}
                                on:blur={(e) => {
                                    // Sama dengan mouseout
                                    e.currentTarget.style.backgroundColor =
                                    item.color ? lightenHexColor(item.color) :
                                    item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                    item.genre[0] === 'Action' ? '#e0e7ff' :
                                    item.genre[0] === 'Comedy' ? '#fef3c7' :
                                    item.genre[0] === 'Drama' ? '#cffafe' :
                                    item.genre[0] === 'Horror' ? '#ffe4e6' :
                                    item.genre[0] === 'Romance' ? '#fce7f3' :
                                    '#f5f5f5';
                                }}>
                                    <div>Chapter {chapter -3*i}</div>
                                    <div>{formatTimeAgo(24 * 6 * (3 * i + n) + 1)}</div>
                                </div>
                            {/each}
                        {:else}
                            <div
                            role="button" 
                            aria-label="chapter"
                            on:click|stopPropagation={() => console.log('Klik di div child saja')}
                            on:keydown|stopPropagation={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                console.log('Klik dengan keyboard');
                                e.preventDefault(); // untuk Space biar gak scroll
                                }
                            }}
                            tabindex={item.disable === true ? -1 : 0}
                            class={`flex justify-between my-1 px-2 py-1 duration-300 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90`}
                            style={` 
                            background-color:
                                ${item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :         
                                item.genre[0] === 'Action' ? '#e0e7ff' :        
                                item.genre[0] === 'Comedy' ? '#fef3c7' :      
                                item.genre[0] === 'Drama' ? '#cffafe' :         
                                item.genre[0] === 'Horror' ? '#ffe4e6' :          
                                item.genre[0] === 'Romance' ? '#fce7f3' :        
                                '#f5f5f5'}                             
                            `}
                            on:mouseover={(e) => {
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color, 0.7) :
                                item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                item.genre[0] === 'Action' ? '#c7d2fe' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#a5f3fc' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#fbcfe8' :
                                '#e5e5e5';
                            }}
                            on:focus={(e) => {
                                // Sama dengan hover
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color, 0.7) :
                                item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                item.genre[0] === 'Action' ? '#c7d2fe' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#a5f3fc' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#fbcfe8' :
                                '#e5e5e5';
                            }}
                            on:mouseout={(e) => {
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5';
                            }}
                            on:blur={(e) => {
                                // Sama dengan mouseout
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5';
                            }}>
                                <div>Chapter {100-i}</div>
                                <div>1 {i===1 ?  'week' : 'hour'} ago</div>
                            </div>
                            <div
                            role="button" 
                            aria-label="chapter"
                            on:click|stopPropagation={() => console.log('Klik di div child saja')}
                            on:keydown|stopPropagation={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                console.log('Klik dengan keyboard');
                                e.preventDefault(); // untuk Space biar gak scroll
                                }
                            }}
                            tabindex={item.disable === true ? -1 : 0}
                            class={`flex justify-between my-1 px-2 py-1 duration-300 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90`}
                            style={` 
                            background-color:
                                ${item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :         
                                item.genre[0] === 'Action' ? '#e0e7ff' :        
                                item.genre[0] === 'Comedy' ? '#fef3c7' :      
                                item.genre[0] === 'Drama' ? '#cffafe' :         
                                item.genre[0] === 'Horror' ? '#ffe4e6' :          
                                item.genre[0] === 'Romance' ? '#fce7f3' :        
                                '#f5f5f5'}                             
                            `}
                            on:mouseover={(e) => {
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color, 0.7) :
                                item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                item.genre[0] === 'Action' ? '#c7d2fe' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#a5f3fc' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#fbcfe8' :
                                '#e5e5e5';
                            }}
                            on:focus={(e) => {
                                // Sama dengan hover
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color, 0.7) :
                                item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                item.genre[0] === 'Action' ? '#c7d2fe' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#a5f3fc' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#fbcfe8' :
                                '#e5e5e5';
                            }}
                            on:mouseout={(e) => {
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5';
                            }}
                            on:blur={(e) => {
                                // Sama dengan mouseout
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5';
                            }}>
                                <div>Chapter {100-i}</div>
                                <div>1 {i===1 ?  'week' : 'hour'} ago</div>
                            </div>
                            <div
                            role="button" 
                            aria-label="chapter"
                            on:click|stopPropagation={() => console.log('Klik di div child saja')}
                            on:keydown|stopPropagation={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                console.log('Klik dengan keyboard');
                                e.preventDefault(); // untuk Space biar gak scroll
                                }
                            }}
                            tabindex={item.disable === true ? -1 : 0}
                            class={`flex justify-between my-1 px-2 py-1 duration-300 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90`}
                            style={` 
                            background-color:
                                ${item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :         
                                item.genre[0] === 'Action' ? '#e0e7ff' :        
                                item.genre[0] === 'Comedy' ? '#fef3c7' :      
                                item.genre[0] === 'Drama' ? '#cffafe' :         
                                item.genre[0] === 'Horror' ? '#ffe4e6' :          
                                item.genre[0] === 'Romance' ? '#fce7f3' :        
                                '#f5f5f5'}                             
                            `}
                            on:mouseover={(e) => {
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color, 0.7) :
                                item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                item.genre[0] === 'Action' ? '#c7d2fe' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#a5f3fc' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#fbcfe8' :
                                '#e5e5e5';
                            }}
                            on:focus={(e) => {
                                // Sama dengan hover
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color, 0.7) :
                                item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                                item.genre[0] === 'Action' ? '#c7d2fe' :
                                item.genre[0] === 'Comedy' ? '#fde68a' :
                                item.genre[0] === 'Drama' ? '#a5f3fc' :
                                item.genre[0] === 'Horror' ? '#fecdd3' :
                                item.genre[0] === 'Romance' ? '#fbcfe8' :
                                '#e5e5e5';
                            }}
                            on:mouseout={(e) => {
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5';
                            }}
                            on:blur={(e) => {
                                // Sama dengan mouseout
                                e.currentTarget.style.backgroundColor =
                                item.color ? lightenHexColor(item.color) :
                                item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                                item.genre[0] === 'Action' ? '#e0e7ff' :
                                item.genre[0] === 'Comedy' ? '#fef3c7' :
                                item.genre[0] === 'Drama' ? '#cffafe' :
                                item.genre[0] === 'Horror' ? '#ffe4e6' :
                                item.genre[0] === 'Romance' ? '#fce7f3' :
                                '#f5f5f5';
                            }}>
                                <div>Chapter {100-i}</div>
                                <div>1 {i===1 ?  'week' : 'hour'} ago</div>
                            </div>
                        {/if}
                        <!-- <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}
                        tabindex={item.disable === true ? -1 : 0}
                        class={`flex justify-between my-1 px-2 py-1 duration-300 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90`}
                        style={` 
                        background-color:
                            ${item.color ? lightenHexColor(item.color) :
                            item.genre[0] === 'Fantasy' ? '#f3e8ff' :         
                            item.genre[0] === 'Action' ? '#e0e7ff' :        
                            item.genre[0] === 'Comedy' ? '#fef3c7' :      
                            item.genre[0] === 'Drama' ? '#cffafe' :         
                            item.genre[0] === 'Horror' ? '#ffe4e6' :          
                            item.genre[0] === 'Romance' ? '#fce7f3' :        
                            '#f5f5f5'}                             
                        `}
                        on:mouseover={(e) => {
                            e.currentTarget.style.backgroundColor =
                            item.color ? lightenHexColor(item.color, 0.7) :
                            item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                            item.genre[0] === 'Action' ? '#c7d2fe' :
                            item.genre[0] === 'Comedy' ? '#fde68a' :
                            item.genre[0] === 'Drama' ? '#a5f3fc' :
                            item.genre[0] === 'Horror' ? '#fecdd3' :
                            item.genre[0] === 'Romance' ? '#fbcfe8' :
                            '#e5e5e5';
                        }}
                        on:focus={(e) => {
                            // Sama dengan hover
                            e.currentTarget.style.backgroundColor =
                            item.color ? lightenHexColor(item.color, 0.7) :
                            item.genre[0] === 'Fantasy' ? '#e9d5ff' :
                            item.genre[0] === 'Action' ? '#c7d2fe' :
                            item.genre[0] === 'Comedy' ? '#fde68a' :
                            item.genre[0] === 'Drama' ? '#a5f3fc' :
                            item.genre[0] === 'Horror' ? '#fecdd3' :
                            item.genre[0] === 'Romance' ? '#fbcfe8' :
                            '#e5e5e5';
                        }}
                        on:mouseout={(e) => {
                            e.currentTarget.style.backgroundColor =
                            item.color ? lightenHexColor(item.color) :
                            item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                            item.genre[0] === 'Action' ? '#e0e7ff' :
                            item.genre[0] === 'Comedy' ? '#fef3c7' :
                            item.genre[0] === 'Drama' ? '#cffafe' :
                            item.genre[0] === 'Horror' ? '#ffe4e6' :
                            item.genre[0] === 'Romance' ? '#fce7f3' :
                            '#f5f5f5';
                        }}
                        on:blur={(e) => {
                            // Sama dengan mouseout
                            e.currentTarget.style.backgroundColor =
                            item.color ? lightenHexColor(item.color) :
                            item.genre[0] === 'Fantasy' ? '#f3e8ff' :
                            item.genre[0] === 'Action' ? '#e0e7ff' :
                            item.genre[0] === 'Comedy' ? '#fef3c7' :
                            item.genre[0] === 'Drama' ? '#cffafe' :
                            item.genre[0] === 'Horror' ? '#ffe4e6' :
                            item.genre[0] === 'Romance' ? '#fce7f3' :
                            '#f5f5f5';
                        }}>
                            <div>Chapter {102+i*-3}</div>
                            <div>1 hour ago</div>   
                        </div> -->
                        <!-- <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}
                        tabindex={item.disable === true ? -1 : 0}
                        class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90     
                        ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                        item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                        item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                        item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                        item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                        item.genre[0] === 'Romance' ? 'bg-pink-100 hover:bg-pink-200' : 
                        'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                        `}>
                            <div>Chapter {101+i*-3}</div>
                            <div>1 day ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}
                        tabindex={item.disable === true ? -1 : 0}
                        class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90     
                        ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                        item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                        item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                        item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                        item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                        item.genre[0] === 'Romance' ? 'bg-pink-100 hover:bg-pink-200' : 
                        'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                        `}>
                            <div>Chapter {100+i*-3}</div>
                            <div>6 days ago</div>
                        </div> -->
                    {/if}
                </div>
            {/each}
            <!-- {#if item.size !== '1x1'}
                <div class="w-full">
                    <div
                    role="button" 
                    aria-label="chapter"             
                    tabindex={item.disable === true ? -1 : 0}
                    class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90     
                    ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                    item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                    item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                    item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                    item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                    item.genre[0] === 'Romance' ? 'bg-pink-100 hover:bg-pink-200' : 
                    'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                    `}>
                        <div>Chapter 102</div>
                        <div>1 week ago</div>
                    </div>
                    <div
                    role="button" 
                    aria-label="chapter"             
                    tabindex={item.disable === true ? -1 : 0}
                    class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90     
                    ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                    item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                    item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                    item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                    item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                    item.genre[0] === 'Romance' ? 'bg-pink-100 hover:bg-pink-200' : 
                    'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                    `}>
                        <div>Chapter 101</div>
                        <div>3 weeks ago</div>
                    </div>
                    <div
                    role="button" 
                    aria-label="chapter"             
                    tabindex={item.disable === true ? -1 : 0}
                    class={`flex justify-between my-1 px-2 py-1 rounded-md cursor-pointer transition-colors outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90     
                    ${item.genre[0] === 'Fantasy' ? 'bg-purple-100 hover:bg-purple-200' : 
                    item.genre[0] === 'Action' ? 'bg-indigo-100 hover:bg-indigo-200' : 
                    item.genre[0] === 'Comedy' ? 'bg-amber-100 hover:bg-amber-200' : 
                    item.genre[0] === 'Drama' ? 'bg-cyan-100 hover:bg-cyan-200' : 
                    item.genre[0] === 'Horror' ? 'bg-rose-100 hover:bg-rose-200' : 
                    item.genre[0] === 'Romance' ? 'bg-pink-100 hover:bg-pink-200' : 
                    'text-gray-700 bg-gray-100 hover:bg-gray-200'}
                    `}>
                        <div>Chapter 100</div>
                        <div>1 month ago</div>
                    </div>
                </div>
            {/if} -->
        </div>
    {/if}

    <!-- CHAPTER LIST -->
    {#if showChapter}
    <div class="w-full">
        {#if !$desktop && item.type !== 'VISUAL NOVEL'}
            {#if item.size === '1x1'}
                <div class="grid grid-cols-1 mt-[1vw] xs:mt-[4px] gap-[1vw] xs:gap-[4px] landscape:hidden w-full">
                    <div class="space-y-[1vw] xs:space-y-[4px] w-full">
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>{item.disable}</div>
                            <div>1 hour ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 104</div>
                            <div>1 week ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 103</div>
                            <div>1 month ago</div>
                        </div>
                    </div>
                </div>
            <!-- {:else if item.size === '2x2'}
                <div class="grid grid-cols-1 mt-[1vw] xs:mt-[4px] gap-[1vw] xs:gap-[4px] landscape:hidden w-full">
                    <div class="space-y-[1vw] xs:space-y-[4px] w-full">
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>{item.disable}</div>
                            <div>1 hour ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 104</div>
                            <div>1 week ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 103</div>
                            <div>1 month ago</div>
                        </div>
                    </div>
                </div> -->
            {:else}
                <div class="grid grid-cols-2 xs:grid-cols-3 mt-[1vw] xs:mt-[4px] gap-[1vw] xs:gap-[4px] landscape:hidden">
                    <div class="space-y-[1vw] xs:space-y-[4px] w-full">
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 4</div>
                            <div>1 hour ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 3</div>
                            <div>1 week ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 3</div>
                            <div>1 week ago</div>
                        </div>
                    </div>
                    <div class="space-y-[1vw] xs:space-y-[4px] w-full">
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 4</div>
                            <div>1 hour ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 3</div>
                            <div>1 week ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 3</div>
                            <div>1 week ago</div>
                        </div>
                    </div>
                    {#if !$phone}
                    <div class="space-y-[1vw] xs:space-y-[4px] w-full">
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 2</div>
                            <div>2 weeks ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 1</div>
                            <div>1 month ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => console.log('Klik di div child saja')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.2vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 1</div>
                            <div>1 month ago</div>
                        </div>
                    </div>
                    {/if}
                </div>
            {/if}
        {/if}
    </div>
    {/if}
</button>