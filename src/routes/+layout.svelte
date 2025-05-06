<script lang="ts">
    import { onMount } from "svelte";
    import "../app.css";
    import Icon from "@iconify/svelte";
    import { goto } from '$app/navigation';
    import { writable } from "svelte/store";
    // let { children } = $props();

    let showNav: boolean = false;

    function home() {
        goto('/'); // Arahkan ke halaman root
    }
    function handleScroll(): void {
        const isMobile = window.innerWidth >= 500;
        const threshold = isMobile ? window.innerWidth * 0.5 : 250;
        showNav = window.scrollY > threshold;
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });


    const desktop = writable(false);

    onMount(() => {
        const update = () => {
            desktop.set(window.innerWidth >= 900);
        };

        update(); // Initial check
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    });
</script>
<!-- 4vw = 20px -->
<section class="bg-mainlight text-zinc-900 min-h-screen flex flex-col">

    <!-- Top Nav -->
    <nav class={`fixed w-full z-[99] transition-all ${showNav ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'}`}>
        <div class="w-full drop-shadow-md shadow-black bg-mainlight text-mainred fill-mainred flex items-center justify-between 
        px-[3.2vw] xs:px-[16px]
        h-[20vw] xs:h-[76px]">
            <a href="/" class={`fixed z-[100] aspect-square rounded-full flex justify-center items-center transition-all
            top-[3.8vw] right-[3.2vw] xs:top-[12px] xs:right-[16px]
            h-[12vw] xs:h-[50px]
            ${showNav ? 'translate-y-0' : 'translate-y-[calc(100%+(3.8vw)*2)] xs:translate-y-[calc(100%+(12px*2))] bg-zinc-900/10 text-mainlight pointer-events-auto'}`}>
                <Icon icon="fa6-solid:magnifying-glass" class="text-[6vw] xs:text-[24px]"/>
            </a>
            <!-- LEFT -->
            <button on:click={home} disabled={!showNav} aria-label="home">
                <svg class="h-[5vw] xs:h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860.59 118.52">
                    <path d="m171.55.14h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84L171.55.14Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                    <polygon points="312.24 69.44 264.81 118.2 224.41 118.2 267.58 73.82 219.56 73.82 209.18 49.25 256.95 .14 297.34 .14 253.83 44.87 301.86 44.87 312.24 69.44"/>
                    <path d="m386.18.14h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84L386.18.14Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                    <path d="m48.77,61.84c9.82,11.17,25.24,30.6,39.25,56.36h-33.5c-9.38-15.09-18.76-27.03-25.57-34.98v34.98H0V.14h28.96v40.46C37.28,31.54,49.35,17.17,59.61.14h33.04c-13.4,26.91-32.3,49.32-43.88,61.7Z"/>
                    <path d="m817.24.14h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84L817.24.14Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                    <path d="m581.98.14h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84L581.98.14Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                    <polygon points="517.7 .23 517.7 29.18 486.51 29.18 486.51 118.29 451.76 118.29 451.76 29.18 420.57 29.18 420.57 .23 517.7 .23"/>
                    <path d="m738.99,54.27c3.5-6.62,6.49-17.5.79-31.78C733.92,7.82,717.53.04,687.22.04c-18.54,0-39.86-.09-40.59,0l-14.39,17.77c.03.17,7.39,17.15,9.96,47.22,1.92,22.48-2.82,43.98-3.56,53.49h29.05c.49-6.66,1.08-16.3,1.45-28.06,7.46-1.7,14.26-3.46,20.44-5.3,3.38,6.4,8.77,18.02,12.69,33.36h29.73c-4.12-19.31-10.53-34.47-15.29-43.95,10.96-5.8,18.13-12.43,22.3-20.3Zm-25.58-13.56c-2.13,4.01-10.76,11.66-43.98,19.92-.19-13.3-.85-23.85-1.55-31.58,4.39-.27,9.46-.47,14.67-.44,20.42.09,28.14,2.14,30.52,5.08s.74,6.25.34,7.01Z"/>
                </svg>
            </button>
            <!-- RIGHT -->
            <div class="space-x-[2vw] flex">
                <div class="h-[12vw] xs:h-[76px] flex justify-center items-center 
                text-[3.2vw] xs:text-[16px]">100 <Icon icon="tabler:coin-filled" class="text-[6.4vw] xs:text-[32px] ml-[1vw]"/></div>
                <div class="h-[12vw] xs:h-[50px] aspect-square rounded-full flex justify-center items-center"></div>
            </div>
        </div>
    </nav>

    <!-- Bot Nav -->
    {#if !$desktop}
        <nav class="fixed bottom-0 w-full z-[99] xs:pb-[16px] flex justify-center">
            <div class="h-[20vw] xs:h-[76px] xs:rounded-[16px] xs:max-w-[400px] 
            w-full drop-shadow-md shadow-black bg-mainlight text-mainred fill-mainred flex justify-around items-center px-[2vw]">
                <div>
                    <div class="flex justify-center items-center flex-col 
                    h-[10vw] xs:h-[45px] aspect-square"> 
                        <div class="h-[10vw] xs:h-[45px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76.6318339501961 80.04623387654848" class="h-full">
                                <g stroke-linecap="round">
                                    <g transform="translate(10.257518941929675 34.878757027045765) rotate(0 28.18281437969563 5.140170465332133)" fill-rule="evenodd">
                                        <path d="M-1.3 -1.39 L29.06 -25.53 L55.54 0.47 L57.86 34.49 L39.23 34.3 L37.15 12.1 L21.79 13.95 L19.03 34.7 L0.81 36.86 L1.56 0.39" stroke="none" stroke-width="0" fill="#fa5252" fill-rule="evenodd"></path>
                                        <path d="M0 0 C10.89 -9.71, 18.85 -16.29, 28.14 -24.88 M0 0 C6.67 -5.74, 13.11 -11.36, 28.14 -24.88 M28.14 -24.88 C37.69 -17.02, 47.86 -6.06, 55.81 -0.58 M28.14 -24.88 C34.94 -17.89, 41.98 -11.35, 55.81 -0.58 M55.81 -0.58 C55.67 10.65, 56.47 20.38, 56.37 34.89 M55.81 -0.58 C56.66 10.9, 55.37 22.23, 56.37 34.89 M56.37 34.89 C51.87 33.5, 44.29 35.92, 38.51 34.83 M56.37 34.89 C51.44 34.34, 47.91 35.76, 38.51 34.83 M38.51 34.83 C38.73 26.67, 39.57 18.81, 38.57 12.89 M38.51 34.83 C37.48 26.45, 37.43 17.9, 38.57 12.89 M38.57 12.89 C30.43 12.78, 24.8 12.44, 20.36 13.02 M38.57 12.89 C34.4 12.79, 28.94 12.98, 20.36 13.02 M20.36 13.02 C20.75 20.55, 20 30.57, 19.73 34.87 M20.36 13.02 C21.09 20.94, 19.53 28.03, 19.73 34.87 M19.73 34.87 C14.87 35.67, 6.66 33.71, 0.42 35.16 M19.73 34.87 C13.35 35.8, 7.1 34.15, 0.42 35.16 M0.42 35.16 C2.06 25.18, -1.05 15.46, 0 0 M0.42 35.16 C-0.02 24.88, -0.6 12.96, 0 0 M0 0 C0 0, 0 0, 0 0 M0 0 C0 0, 0 0, 0 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="text-[3.2vw] xs:text-[16px] leading-none font-caveat-brush">
                            Home
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-center items-center flex-col 
                    h-[10vw] xs:h-[45px] aspect-square translate-y-[1.6vw] xs:translate-y-[8px]">
                        <div class="h-[10vw] xs:h-[45px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.90193329959584 70.31634381568136" class="h-full">
                                <g stroke-linecap="round">
                                    <g transform="translate(10.605492152565489 10.006453227626594) rotate(0 29.43193044398049 25.154945294027385)">
                                        <path d="M0 0 C22.52 1.51, 40.31 0.01, 58.86 0.31 M0 0 C11.62 0.41, 23.09 -0.42, 58.86 0.31 M58.86 0.31 C58.8 7.72, 60.14 17.51, 58.4 31.58 M58.86 0.31 C59.64 10.91, 58.83 20.12, 58.4 31.58 M58.4 31.58 C54.26 31.31, 50.68 33.47, 43.04 33.75 M58.4 31.58 C54.42 31.76, 51.2 33.07, 43.04 33.75 M43.04 33.75 C44.53 37.99, 45.45 44.99, 47.34 50.31 M43.04 33.75 C44.24 39, 46.34 43.73, 47.34 50.31 M47.34 50.31 C44.58 46.29, 38.7 45.35, 29.1 36.75 M47.34 50.31 C41.92 46.45, 38.01 43.59, 29.1 36.75 M29.1 36.75 C17.77 38.73, 10.25 38.18, 0.31 41.35 M29.1 36.75 C19.1 38.5, 10.21 39.38, 0.31 41.35 M0.31 41.35 C0.61 26.25, -1.64 11.41, 0 0 M0.31 41.35 C-0.08 26.18, 0.74 11.4, 0 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="text-[3.2vw] xs:text-[16px] leading-none font-caveat-brush opacity-0">
                            Bacaan
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-center items-center flex-col 
                    h-[10vw] xs:h-[45px] aspect-square translate-y-[1.6vw] xs:translate-y-[8px]"> 
                        <div class="h-[10vw] xs:h-[45px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75.12377844690377 83.65464768345012" class="h-full">
                                <g stroke-linecap="round">
                                    <g transform="translate(62.56705659498198 7.754143913107356) rotate(16.150310021680614 -7.765904571119677 10.293427525460274)">
                                        <path d="M0 0 C-1.26 0.35, -4.98 0.75, -7.53 2.11 C-10.08 3.48, -13.88 5.76, -15.3 8.21 C-16.72 10.65, -17.3 14.7, -16.07 16.76 C-14.84 18.83, -10.52 20.42, -7.94 20.59 C-5.35 20.75, -1.97 19.32, -0.56 17.76 C0.86 16.19, 0.87 13.23, 0.54 11.18 C0.21 9.14, -2.45 7.34, -2.54 5.48 C-2.63 3.62, -0.42 0.91, 0 0 M0 0 C-1.26 0.35, -4.98 0.75, -7.53 2.11 C-10.08 3.48, -13.88 5.76, -15.3 8.21 C-16.72 10.65, -17.3 14.7, -16.07 16.76 C-14.84 18.83, -10.52 20.42, -7.94 20.59 C-5.35 20.75, -1.97 19.32, -0.56 17.76 C0.86 16.19, 0.87 13.23, 0.54 11.18 C0.21 9.14, -2.45 7.34, -2.54 5.48 C-2.63 3.62, -0.42 0.91, 0 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                    </g>
                                </g>
                                <g stroke-linecap="round">
                                    <g transform="translate(40.89827917904199 24.84969486563196) rotate(0 -9.25990071061176 23.7444720981576)">
                                        <path d="M0 0 C0.55 0.93, 1.46 3.48, 3.28 5.6 C5.1 7.71, 13.3 8.03, 10.92 12.71 C8.54 17.39, -4.98 27.86, -11.01 33.67 C-17.04 39.49, -22.2 46.11, -25.27 47.6 C-28.34 49.1, -33.41 50.62, -29.44 42.67 C-25.47 34.71, -6.13 7.02, -1.47 -0.12 M0 0 C0.55 0.93, 1.46 3.48, 3.28 5.6 C5.1 7.71, 13.3 8.03, 10.92 12.71 C8.54 17.39, -4.98 27.86, -11.01 33.67 C-17.04 39.49, -22.2 46.11, -25.27 47.6 C-28.34 49.1, -33.41 50.62, -29.44 42.67 C-25.47 34.71, -6.13 7.02, -1.47 -0.12" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="text-[3.2vw] xs:text-[16px] leading-none font-caveat-brush opacity-0">
                            Karya
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-center items-center flex-col 
                    h-[10vw] xs:h-[45px] aspect-square translate-y-[1.6vw] xs:translate-y-[8px]"> 
                        <div class="h-[10vw] xs:h-[45px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 79.67066129671218 78.41984236948531" class="h-full">
                                <g stroke-linecap="round" transform="translate(10 10) rotate(0 13.799838262163746 13.799838262163746)">
                                    <path d="M6.9 0 C11.53 -0.7, 16.56 0.92, 20.7 0 M6.9 0 C10.67 0.61, 13.15 -0.36, 20.7 0 M20.7 0 C26.06 0.16, 27.11 2.86, 27.6 6.9 M20.7 0 C25.93 -1.51, 26.8 0.02, 27.6 6.9 M27.6 6.9 C27.09 9.27, 27.81 13.83, 27.6 20.7 M27.6 6.9 C27.33 9.63, 27.34 12.62, 27.6 20.7 M27.6 20.7 C26.58 25.65, 25.69 29.56, 20.7 27.6 M27.6 20.7 C29.89 23.03, 26.54 29.8, 20.7 27.6 M20.7 27.6 C17.92 26.26, 14.31 27.54, 6.9 27.6 M20.7 27.6 C17.95 27.91, 15.1 27.36, 6.9 27.6 M6.9 27.6 C1.6 28.17, 1.15 26.13, 0 20.7 M6.9 27.6 C3.51 29.38, -0.38 25.88, 0 20.7 M0 20.7 C0.13 17.65, -0.26 16.04, 0 6.9 M0 20.7 C0.58 16.42, -0.47 12.14, 0 6.9 M0 6.9 C-1.75 2.67, 2.6 0.46, 6.9 0 M0 6.9 C-1.45 2.11, 1.21 -0.98, 6.9 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                </g>
                                <g stroke-linecap="round" transform="translate(10.530755222767766 40.82016584515782) rotate(0 13.799838262163746 13.799838262163746)">
                                    <path d="M6.9 0 C12.47 1.1, 16.71 -1.16, 20.7 0 M6.9 0 C11.46 -0.42, 16.99 -0.08, 20.7 0 M20.7 0 C24.81 0.56, 28.15 0.99, 27.6 6.9 M20.7 0 C24.5 -2.28, 26.17 4.27, 27.6 6.9 M27.6 6.9 C27.63 10.71, 26.17 14.39, 27.6 20.7 M27.6 6.9 C27.21 10.93, 27.18 14.74, 27.6 20.7 M27.6 20.7 C27.99 27.26, 27.29 25.63, 20.7 27.6 M27.6 20.7 C28.84 27.5, 24.16 25.48, 20.7 27.6 M20.7 27.6 C17.98 27.5, 13.21 28.13, 6.9 27.6 M20.7 27.6 C16.83 27.38, 11.36 27.85, 6.9 27.6 M6.9 27.6 C3.45 28.43, 1.06 26.85, 0 20.7 M6.9 27.6 C1.92 28.18, -2.07 23.14, 0 20.7 M0 20.7 C-0.39 17.74, -0.11 12.55, 0 6.9 M0 20.7 C-0.58 15.13, -0.72 10.66, 0 6.9 M0 6.9 C0.3 2.76, 1.04 -0.16, 6.9 0 M0 6.9 C-1.09 1.32, 2.09 1.41, 6.9 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                </g>
                                <g stroke-linecap="round" transform="translate(41.540229549616924 10) rotate(0 13.799838262163746 13.799838262163746)">
                                    <path d="M6.9 0 C9.62 -1.33, 14.79 0.82, 20.7 0 M6.9 0 C12.68 0.11, 17.76 0.25, 20.7 0 M20.7 0 C25.85 -1.31, 26.9 0.32, 27.6 6.9 M20.7 0 C23.87 1.97, 26.45 1.25, 27.6 6.9 M27.6 6.9 C26.25 10.72, 27.33 12.7, 27.6 20.7 M27.6 6.9 C27.18 11.06, 27.67 15.66, 27.6 20.7 M27.6 20.7 C29.59 23.33, 26.38 29.51, 20.7 27.6 M27.6 20.7 C26.46 23.18, 23.81 28.72, 20.7 27.6 M20.7 27.6 C16.81 28.26, 15.34 28.39, 6.9 27.6 M20.7 27.6 C15.78 27.74, 11.73 27.83, 6.9 27.6 M6.9 27.6 C3.36 29.15, -0.33 25.81, 0 20.7 M6.9 27.6 C0.23 25.44, -0.06 25.31, 0 20.7 M0 20.7 C-0.07 16.77, 0.98 13.89, 0 6.9 M0 20.7 C-0.51 17.17, 0.2 13.56, 0 6.9 M0 6.9 C-1.26 2.14, 1.35 -0.85, 6.9 0 M0 6.9 C-0.21 3.71, 0.22 1.78, 6.9 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                </g>
                                <g stroke-linecap="round" transform="translate(42.07098477238469 40.82016584515782) rotate(0 13.799838262163746 13.799838262163746)">
                                    <path d="M6.9 0 C12.86 1.05, 18.64 -0.6, 20.7 0 M6.9 0 C10.31 0.18, 14.24 -0.46, 20.7 0 M20.7 0 C24.6 -1.98, 26.36 4.01, 27.6 6.9 M20.7 0 C24.15 -1.05, 26.08 2.45, 27.6 6.9 M27.6 6.9 C27.18 10.75, 27.36 15.27, 27.6 20.7 M27.6 6.9 C27.66 12.05, 28.22 15.17, 27.6 20.7 M27.6 20.7 C28.68 27.21, 24.31 25.75, 20.7 27.6 M27.6 20.7 C26.11 26.42, 23.21 28.47, 20.7 27.6 M20.7 27.6 C16.94 28.45, 12.9 29.02, 6.9 27.6 M20.7 27.6 C17.51 27.92, 13.89 28.17, 6.9 27.6 M6.9 27.6 C1.97 28.11, -1.8 23.42, 0 20.7 M6.9 27.6 C2.24 27.61, -0.25 24.65, 0 20.7 M0 20.7 C0.95 16.59, -0.48 9.22, 0 6.9 M0 20.7 C0.23 17.7, -0.32 14.32, 0 6.9 M0 6.9 C-0.95 1.45, 2.12 1.22, 6.9 0 M0 6.9 C-2.08 4.08, 1.62 -1.38, 6.9 0" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="text-[3.2vw] xs:text-[16px] leading-none font-caveat-brush opacity-0">
                            Dashboard
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-center items-center flex-col 
                    h-[10vw] xs:h-[45px] aspect-square translate-y-[1.6vw] xs:translate-y-[8px]"> 
                        <div class="h-[10vw] xs:h-[45px]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.2142045407237 78.39513957693389" class="h-full">
                                <g stroke-linecap="round">
                                    <g transform="translate(29.61390249427268 10.000000000000014) rotate(0 11.18805977140255 11.188059771402564)">
                                        <path d="M10.73 -0.27 C12.99 -0.37, 16.36 1.33, 18.34 2.88 C20.32 4.43, 22.19 6.67, 22.59 9.02 C22.98 11.36, 22.02 14.88, 20.73 16.94 C19.43 19, 16.97 20.49, 14.82 21.37 C12.67 22.26, 10.01 23.08, 7.84 22.28 C5.66 21.47, 3.02 18.64, 1.79 16.54 C0.55 14.45, 0 12.05, 0.42 9.69 C0.83 7.34, 2.49 4.11, 4.27 2.43 C6.05 0.75, 9.85 -0.02, 11.09 -0.37 C12.32 -0.73, 11.65 0.09, 11.68 0.28 M9.77 0.04 C11.95 -0.39, 15.81 0.73, 17.82 2.14 C19.83 3.55, 21.25 6.21, 21.85 8.49 C22.44 10.76, 22.34 13.68, 21.39 15.78 C20.45 17.88, 18.35 19.95, 16.18 21.07 C14.02 22.19, 10.69 23.01, 8.4 22.51 C6.11 22.01, 3.9 20.04, 2.43 18.08 C0.97 16.11, -0.61 13.15, -0.37 10.74 C-0.13 8.33, 2.12 5.34, 3.87 3.59 C5.62 1.84, 8.98 0.75, 10.12 0.25 C11.26 -0.25, 10.57 0.45, 10.7 0.58" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                    </g>
                                    <g transform="translate(40.18684878333943 66.36498720233978) rotate(0 2.2933898744783505 -13.401379025129529)">
                                        <path d="M-0.11 0.59 C5.26 0.5, 26.18 1.2, 31.33 -0.48 C36.47 -2.16, 33.1 -5.15, 30.76 -9.48 C28.42 -13.81, 24.69 -23.67, 17.29 -26.47 C9.9 -29.26, -6.34 -28.55, -13.58 -26.23 C-20.82 -23.9, -23.81 -17.09, -26.15 -12.51 C-28.49 -7.94, -32.18 -0.9, -27.63 1.24 C-23.07 3.39, -3.25 0.47, 1.18 0.38 M-1.63 -0.14 C3.63 -0.09, 25 2.72, 30.21 0.8 C35.42 -1.11, 31.67 -6.74, 29.65 -11.62 C27.63 -16.5, 25.52 -26.06, 18.08 -28.48 C10.63 -30.91, -7.36 -29.19, -15.02 -26.18 C-22.69 -23.18, -25.87 -14.84, -27.92 -10.44 C-29.96 -6.05, -32.06 -1.59, -27.28 0.19 C-22.5 1.97, -3.83 0.32, 0.77 0.23" stroke="#fa5252" stroke-width="5" fill="none"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="text-[3.2vw] xs:text-[16px] leading-none font-caveat-brush opacity-0">
                            Profile
                        </div>
                    </div>
                </div>
            </div>
        </nav>   
    {/if}

    <!-- Content -->
    <main class="min-h-screen">
        <slot />
    </main>

    <!-- Footer -->
    <footer>
        <div class="flex flex-col justify-center items-center space-y-[3.2vw] xs:space-y-[12px] py-[4.8vw] xs:py-[24px] text-[3.2vw] xs:text-[16px]">
            <div class="space-x-[2vw] xs:space-x-[10px] flex text-mainred [&>a]:hover:text-red-800">
                <a href="/" target="_blank" class="
                h-[10vw] xs:h-[32px] aspect-square flex justify-center items-center">
                    <Icon icon="fa6-brands:facebook-f" class="text-[6vw] xs:text-[24px]"/>
                </a>
                <a href="/" target="_blank" class="
                h-[10vw] xs:h-[32px] aspect-square flex justify-center items-center">
                    <Icon icon="fa6-brands:x-twitter" class="text-[6vw] xs:text-[24px]"/>
                </a>
                <a href="/" target="_blank" class="
                h-[10vw] xs:h-[32px] aspect-square flex justify-center items-center">
                    <Icon icon="fa6-brands:instagram" class="text-[6vw] xs:text-[24px]"/>
                </a>
                <a href="/" target="_blank" class="
                h-[10vw] xs:h-[32px] aspect-square flex justify-center items-center">
                    <Icon icon="fa6-brands:youtube" class="text-[6vw] xs:text-[24px]"/>
                </a>
            </div>
            <div>About   |   Feedback   |   Help   |   Terms   |   Privacy    |   Contact</div>
            <div>&copy; agerr.co 2025 | KASATARA</div>
            <div class="mt-[6.4vw] xs:mt-[32px]">
                <svg class="h-[20vw] xs:h-[100px] fill-mainred" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 979.68 484.56">
                    <path d="m290.64,228.28h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84l-43.35-118.06Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                    <polygon points="431.33 297.58 383.9 346.34 343.51 346.34 386.67 301.96 338.65 301.96 328.27 277.39 376.04 228.28 416.43 228.28 372.92 273.01 420.95 273.01 431.33 297.58"/>
                    <path d="m505.27,228.28h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84l-43.35-118.06Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                    <path d="m167.86,289.98c9.82,11.17,25.24,30.6,39.25,56.36h-33.5c-9.38-15.09-18.76-27.03-25.57-34.98v34.98h-28.96v-118.06h28.96v40.46c8.33-9.06,20.4-23.42,30.66-40.46h33.04c-13.4,26.91-32.3,49.32-43.88,61.7Z"/>
                    <path d="m936.33,228.28h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84l-43.35-118.06Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                    <path d="m701.07,228.28h-30.85l-43.42,118.24h30.85l10.78-29.35h34.43l10.71,29.18h30.84l-43.35-118.06Zm-24.13,65.72l8.71-23.72,8.71,23.72h-17.42Z"/>
                    <polygon points="636.79 228.37 636.79 257.32 605.6 257.32 605.6 346.43 570.85 346.43 570.85 257.32 539.66 257.32 539.66 228.37 636.79 228.37"/>
                    <path d="m858.08,282.41c3.5-6.62,6.49-17.5.79-31.78-5.85-14.67-22.25-22.45-52.56-22.45-18.54,0-39.86-.09-40.59,0l-14.39,17.77c.03.17,7.39,17.15,9.96,47.22,1.92,22.48-2.82,43.98-3.56,53.49h29.05c.49-6.66,1.08-16.3,1.45-28.06,7.46-1.7,14.26-3.46,20.44-5.3,3.38,6.4,8.77,18.02,12.69,33.36h29.73c-4.12-19.31-10.53-34.47-15.29-43.95,10.96-5.8,18.13-12.43,22.3-20.3Zm-25.58-13.56c-2.13,4.01-10.76,11.66-43.98,19.92-.19-13.3-.85-23.85-1.55-31.58,4.39-.27,9.46-.47,14.67-.44,20.42.09,28.14,2.14,30.52,5.08,2.39,2.94.74,6.25.34,7.01Z"/>
                    <polygon points="675.89 363.91 653.54 456.2 646.68 484.56 618.32 477.69 304.98 401.82 356.93 384.38 625.19 449.33 645.87 363.91 675.89 363.91"/>
                    <polygon points="697.61 145.05 683.75 206.46 713.67 206.46 726.07 151.47 732.48 123.02 704.02 116.6 179.81 5.54 151.16 0 145.62 28.64 124.09 139.95 155.55 130.92 174.27 34.19 697.61 145.05"/>
                    <polygon points="379.6 206.46 349.26 206.46 325.03 122.03 36.79 210.08 102.74 409.75 264.93 363.91 355.39 363.91 110.78 437.79 82.74 445.84 0 190.28 345.03 85.94 379.6 206.46"/>
                </svg>
            </div>
        </div>
        <div class="h-[20vw] xs:h-[100px] md:hidden"></div>
    </footer>
</section>