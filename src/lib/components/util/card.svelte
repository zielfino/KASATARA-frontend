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
        ? 'col-span-1 aspect-[3/4]'
        : 'col-span-2 row-span-2'
    }
    ${
        item.type === "VISUAL NOVEL" ? 'portrait:focus-visible:ring-1 portrait:focus-visible:ring-sky-400 focus-visible:bg-sky-200/90 rounded-lg' : ''
    }
    `}
    style="direction:ltr"
>   
    <div class={`z-10 xs:drop-shadow-xs landscape:lg:drop-shadow-none xs:bg-mainlight xs:border xs:border-zinc-900/15 relative w-full h-full p-3 max-xs:p-[2.4vw] rounded-md max-xs:rounded-[1.6vw] xs:rounded-lg flex justify-center items-center max-xs:border max-xs:border-zinc-900/30 overflow-hidden
     portrait:group-focus-visible:border-1 portrait:group-focus-visible:ring-1 portrait:group-focus-visible:border-sky-400 portrait:group-focus-visible:ring-sky-400 portrait:group-focus-visible:bg-sky-200/90
    ${
        item.size === '2x1'
        ? 'min-h-[calc((50vw*4/3)-(1.2vw*3))] xs:min-h-[221px] xs:aspect-[2/1] xs:portrait:aspect-auto xs:portrait:min-h-[40vw] sm:portrait:min-h-[283.83px] sm:aspect-auto sm:min-h-[285.76px] md:min-h-[248.66px] lg:min-h-[243.73px] xl:min-h-[284.8px] h-full'
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
                        pt-[14%] pr-[18%]"
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

        <!-- FLAG -->
        <div class="z-10 absolute h-[5vw] xs:h-5 top-[2.4vw] xs:top-3 left-[2.4vw] xs:left-3">
            {#if item.region === "KR"}
            <svg class="h-full w-max drop-shadow-lg drop-shadow-zinc-900/30" width="45" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.4" y="0.4" width="44.2" height="31.2" rx="2.8" fill="white" stroke="#F5F5F5" stroke-width="0.8"></rect>
                <mask id="mask0_2108_628" maskUnits="userSpaceOnUse" x="0" y="0" width="45" height="32" style="mask-type: luminance;">
                    <rect x="0.4" y="0.4" width="44.2" height="31.2" rx="2.8" fill="white" stroke="white" stroke-width="0.8"></rect>
                </mask>
                <g mask="url(#mask0_2108_628)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5002 23.4666C26.6424 23.4666 30.0002 20.1237 30.0002 16C30.0002 11.8762 26.6424 8.53331 22.5002 8.53331C18.3581 8.53331 15.0002 11.8762 15.0002 16C15.0002 20.1237 18.3581 23.4666 22.5002 23.4666Z" fill="#E01B41"></path>
                    <mask id="mask1_2108_628" maskUnits="userSpaceOnUse" x="15" y="8" width="16" height="16" style="mask-type: luminance;">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5002 23.4666C26.6424 23.4666 30.0002 20.1237 30.0002 16C30.0002 11.8762 26.6424 8.53331 22.5002 8.53331C18.3581 8.53331 15.0002 11.8762 15.0002 16C15.0002 20.1237 18.3581 23.4666 22.5002 23.4666Z" fill="white"></path>
                    </mask>
                    <g mask="url(#mask1_2108_628)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0001 17.0666C17.143 19.0666 20.3573 20.2666 22.5001 17.0666C24.643 13.8666 28.9287 13.8666 30.0001 17.0666C31.0715 20.2666 30.0001 23.4666 30.0001 23.4666H15.0001C15.0001 23.4666 12.8573 15.0666 15.0001 17.0666Z" fill="#0E4B9C"></path>
                    </g>
                    <path opacity="0.75" fill-rule="evenodd" clip-rule="evenodd" d="M9.92138 5.69009C10.0691 5.43529 10.396 5.34772 10.6513 5.49451L11.5823 6.02962C11.8377 6.1764 11.9249 6.50196 11.7771 6.75676L9.09798 11.3766C8.95021 11.6314 8.6234 11.719 8.36802 11.5722L7.43704 11.0371C7.18167 10.8903 7.09444 10.5647 7.24221 10.3099L9.92138 5.69009ZM33.4177 6.02965C33.1623 6.17644 33.0751 6.50199 33.2228 6.75679L35.902 11.3766C36.0498 11.6314 36.3766 11.719 36.632 11.5722L37.5629 11.0371C37.8183 10.8903 37.9055 10.5648 37.7578 10.31L35.0786 5.69013C34.9308 5.43532 34.604 5.34775 34.3487 5.49454L33.4177 6.02965ZM30.634 7.62965C30.3787 7.77644 30.2914 8.10199 30.4392 8.35679L33.1184 12.9766C33.2661 13.2314 33.593 13.319 33.8483 13.1722L34.7793 12.6371C35.0347 12.4903 35.1219 12.1648 34.9741 11.91L32.295 7.29013C32.1472 7.03532 31.8204 6.94775 31.565 7.09454L30.634 7.62965ZM7.24221 21.6901C7.09444 21.4353 7.18167 21.1097 7.43704 20.963L8.36803 20.4278C8.6234 20.2811 8.95021 20.3686 9.09798 20.6234L11.7771 25.2433C11.9249 25.4981 11.8377 25.8236 11.5823 25.9704L10.6513 26.5055C10.396 26.6523 10.0691 26.5647 9.92138 26.3099L7.24221 21.6901ZM10.2207 19.363C9.96529 19.5097 9.87806 19.8353 10.0258 20.0901L12.705 24.7099C12.8528 24.9647 13.1796 25.0523 13.4349 24.9055L14.3659 24.3704C14.6213 24.2236 14.7085 23.8981 14.5608 23.6433L11.8816 19.0234C11.7338 18.7686 11.407 18.6811 11.1516 18.8278L10.2207 19.363ZM33.1184 19.0234C33.2661 18.7686 33.593 18.681 33.8483 18.8278L34.7793 19.3629C35.0347 19.5097 35.1219 19.8353 34.9741 20.0901L32.295 24.7099C32.1472 24.9647 31.8204 25.0523 31.565 24.9055L30.634 24.3704C30.3787 24.2236 30.2914 23.898 30.4392 23.6432L33.1184 19.0234ZM36.632 20.4278C36.3766 20.281 36.0498 20.3686 35.902 20.6234L33.2228 25.2432C33.0751 25.498 33.1623 25.8236 33.4177 25.9704L34.3486 26.5055C34.604 26.6523 34.9308 26.5647 35.0786 26.3099L37.7578 21.6901C37.9055 21.4353 37.8183 21.1097 37.5629 20.9629L36.632 20.4278ZM13.4349 7.09451C13.1796 6.94772 12.8528 7.03529 12.705 7.29009L10.0258 11.9099C9.87806 12.1647 9.96529 12.4903 10.2207 12.6371L11.1516 13.1722C11.407 13.319 11.7338 13.2314 11.8816 12.9766L14.5608 8.35676C14.7085 8.10196 14.6213 7.7764 14.3659 7.62962L13.4349 7.09451Z" fill="#262626"></path>
                </g>
            </svg>
            {:else if item.region === "CN"}
                <svg class="h-full w-max drop-shadow-lg drop-shadow-zinc-900/30" width="45" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="45" height="32" rx="3.2" fill="white"></rect><mask id="mask0_2108_614" maskUnits="userSpaceOnUse" x="0" y="0" width="45" height="32" style="mask-type: luminance;"><rect width="45" height="32" rx="3.2" fill="white"></rect></mask><g mask="url(#mask0_2108_614)"><rect width="45" height="32" fill="#F1361D"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M16.1881 4.96107L17.7445 5.22524L18.9119 6.28363L19.1772 4.73412L20.2403 3.57198L18.6839 3.30781L17.5166 2.24942L17.2512 3.79893L16.1881 4.96107ZM20.357 10.3807L21.7057 9.56348L23.2842 9.59983L22.4634 8.25709L22.4999 6.68564L21.1511 7.50284L19.5727 7.4665L20.3935 8.80924L20.357 10.3807ZM18.5274 19.1532L17.2081 20.0168L17.1895 18.445L16.3221 17.1316L17.9009 17.1131L19.2201 16.2495L19.2387 17.8213L20.1061 19.1347L18.5274 19.1532ZM19.6731 15.0902L21.2424 14.917L22.6576 15.6141L22.4836 14.0518L23.1838 12.6429L21.6145 12.8161L20.1994 12.119L20.3733 13.6813L19.6731 15.0902Z" fill="#FFDC42"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.7142 13.1625L6.9356 15.8442L8.32978 11.4378L4.60028 8.6888L9.24055 8.6472L10.7142 4.26651L12.1879 8.6472L16.8282 8.6888L13.0987 11.4378L14.4928 15.8442L10.7142 13.1625Z" fill="#FFDC42"></path></g></svg>
            {:else if item.region === "JP"}
            <svg class="h-full w-max drop-shadow-lg drop-shadow-zinc-900/30" width="45" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.4" y="0.4" width="44.2" height="31.2" rx="2.8" fill="white" stroke="#F5F5F5" stroke-width="0.8"></rect>
                <!-- <mask id="mask0_2108_624" maskUnits="userSpaceOnUse" x="0" y="0" width="45" height="32" style="mask-type: luminance;">
                    <rect x="0.4" y="0.4" width="44.2" height="31.2" rx="2.8" fill="white" stroke="white" stroke-width="0.8"></rect>
                </mask> -->
                
                <g mask="url(#mask0_2108_624)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4999 25.6C27.8255 25.6 32.1428 21.3019 32.1428 16C32.1428 10.6981 27.8255 6.40001 22.4999 6.40001C17.1743 6.40001 12.8571 10.6981 12.8571 16C12.8571 21.3019 17.1743 25.6 22.4999 25.6Z" fill="url(#paint0_linear_2108_624)"></path>
                </g>
                <defs>
                    <linearGradient id="paint0_linear_2108_624" x1="12.8571" y1="6.40001" x2="12.8571" y2="25.6" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#D81441"></stop><stop offset="1" stop-color="#BB0831"></stop>
                    </linearGradient>
                </defs>
            </svg>
            {:else if item.region === "ID"}
            <svg class="h-full w-max drop-shadow-lg drop-shadow-zinc-900/30 rounded-[1.8px]" width="45" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="45" height="32" rx="2.8" fill="#FF0000" />
                <rect y="16" width="45" height="16" fill="#FFFFFF" />
            </svg>

            {:else}
                <div  class="h-full aspect-[4/3] rounded-[0.4vw] xs:rounded-xs drop-shadow-lg drop-shadow-zinc-900/30 bg-gray-600" ></div>
            {/if}
        </div>

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
                        <Icon icon="fa6-solid:copy" class="mr-1" /> { item.chapter?.[0]?.number ?? 0}
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

        <!-- BACKGROUND IMAGE -->
        <div class="absolute w-full h-full top-0 left-0 bg-cover bg-center max-xs:scale-101"
        style={`${!item.imageLong && item.size === "2x1" ? `background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${item.image}");` : ""}`}>
            <img src="{item.imageLong && item.size === "2x1" ? item.imageLong : item.image}" alt="" 
            class={`w-full h-full object-center duration-150 transition-all rounded-md max-xs:rounded-[1.4vw]
            ${!item.imageLong && item.size === "2x1" ? "object-contain backdrop-blur-md" : "object-cover landscape:group-hover:scale-105 landscape:group-focus-visible:scale-105 landscape:group-focus-within:scale-105"}`} />
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
        <div class={`z-20 portrait:hidden absolute bottom-0 opacity-0 group-focus-visible:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100 transition-all ease-out group-hover:translate-y-[calc(100%-8px)] group-focus-visible:translate-y-[calc(100%-8px)] group-focus-within:translate-y-[calc(100%-8px)] rounded-b-lg flex justify-center items-center
        px-2 pb-1 space-x-1
        ${item.size === '2x2' ? 'text-[13px]' : 'text-[12px]'}
        ${item.size === '2x2' ? 'w-[calc(100%-0.7%)] translate-x-[0.4%] md:w-[calc(100%-0.4%)] md:translate-x-[0.2%]' : 
        item.size === '2x1' ? 'w-[calc(100%-0.16%)] translate-x-[0.1%] md:w-[calc(100%-0.2%)] md:translate-x-[0.1%]' :
        'w-[calc(100%-0.7%)] translate-x-[0.4%] md:w-[calc(100%-0.57%)] md:translate-x-[0.3%]'}
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
            {#each Array(item.size !== '1x1' ? item.size == '2x2' ? 2 : 3 :  1) as _, i}
                <div class="w-full">
                    {#if item.comments === 'short'}
                        {#if item.chapter}                        
                            {#each item.chapter.slice(0 + (i*1), 1 + (i*1) ) as chap, n}
                                <div
                                role="button" 
                                aria-label="chapter"
                                on:click|stopPropagation={() => goto('/series/chap')}
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
                                    <div>Chapter {chap.number}</div>
                                    <div>{formatTimeAgo(24 * 6 * (1 * i + n) + 1)}</div>
                                </div>
                            {/each}
                        {:else}
                            <div
                            role="button" 
                            aria-label="chapter"
                            on:click|stopPropagation={() => goto('/series/chap')}
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
                            {#each item.chapter.slice(0 + (i*3), 3 + (i*3) ) as chap, n}
                                <div
                                role="button" 
                                aria-label="chapter"
                                on:click|stopPropagation={() => goto('/series/chap')}
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
                                    <div>Chapter {chap.number}</div>
                                    <div>{formatTimeAgo(24 * 6 * (3 * i + n) + 1)}</div>
                                </div>
                            {/each}
                        {:else}
                            <div
                            role="button" 
                            aria-label="chapter"
                            on:click|stopPropagation={() => goto('/series/chap')}
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
                            on:click|stopPropagation={() => goto('/series/chap')}
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
                            on:click|stopPropagation={() => goto('/series/chap')}
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
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>{item.disable}</div>
                            <div>1 hour ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 104</div>
                            <div>1 week ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 103</div>
                            <div>1 month ago</div>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="grid grid-cols-2 xs:grid-cols-3 mt-[1vw] xs:mt-[4px] gap-[1vw] xs:gap-[4px] landscape:hidden">
                    <div class="space-y-[1vw] xs:space-y-[4px] w-full">
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 4</div>
                            <div>1 hour ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 3</div>
                            <div>1 week ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 3</div>
                            <div>1 week ago</div>
                        </div>
                    </div>
                    <div class="space-y-[1vw] xs:space-y-[4px] w-full">
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 4</div>
                            <div>1 hour ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 3</div>
                            <div>1 week ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 3</div>
                            <div>1 week ago</div>
                        </div>
                    </div>
                    {#if !$phone}
                    <div class="space-y-[1vw] xs:space-y-[4px] w-full">
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 2</div>
                            <div>2 weeks ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
                            <div>Chapter 1</div>
                            <div>1 month ago</div>
                        </div>
                        <div
                        role="button" 
                        aria-label="chapter"
                        on:click|stopPropagation={() => goto('/series/chap')}
                        on:keydown|stopPropagation={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                            console.log('Klik dengan keyboard');
                            e.preventDefault(); // untuk Space biar gak scroll
                            }
                        }}             
                        tabindex={item.disable === true ? -1 : 0} 
                        class="flex justify-between w-full cursor-pointer whitespace-nowrap transition-all duration-300 ease-out bg-white text-zinc-900 border border-zinc-900/15 hover:bg-mainlight/90 xs:drop-shadow-xs active:bg-zinc-200 text-[3.2vw] xs:text-[12px] px-[2vw] xs:px-[8px] py-[1vw] xs:py-[4px] rounded-md max-xs:rounded-[1.6vw] outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:bg-sky-200/90">
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