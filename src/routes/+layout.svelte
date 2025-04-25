<script lang="ts">
    import { onMount } from "svelte";
    import "../app.css";
    import Icon from "@iconify/svelte";
    import { goto } from '$app/navigation';
    // let { children } = $props();

    let showNav: boolean = false;

    function home() {
        goto('/'); // Arahkan ke halaman root
    }
    function handleScroll(): void {
        showNav = window.scrollY > window.innerWidth * 0.5;
        console.log(showNav);
    }

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>
<!-- 4vw = 20px -->
<section class="bg-mainlight text-zinc-900 min-h-screen flex flex-col">
    <nav class={`fixed w-full z-[99] transition-all ${showNav ? 'translate-y-0 pointer-events-auto' : '-translate-y-full pointer-events-none'}`}>
        <div class="w-full h-[20vw] drop-shadow-md shadow-black bg-mainlight text-mainred fill-mainred flex items-center justify-between px-4">
            <a href="/" class={`fixed z-[100] top-[3.8vw] right-[3.2vw] h-[12vw] aspect-square rounded-full flex justify-center items-center transition-all
            ${showNav ? 'translate-y-0' : 'translate-y-[calc(100%+(3.8vw)*2)] bg-zinc-900/10 text-mainlight pointer-events-auto'}`}>
                <Icon icon="fa6-solid:magnifying-glass" class="text-[6vw]"/>
            </a>
            <!-- LEFT -->
            <button on:click={home} disabled={!showNav} aria-label="home">
                <svg class="h-[5vw]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860.59 118.52">
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
                <div class="h-[12vw] flex justify-center items-center text-[3.2vw]">100 <Icon icon="tabler:coin-filled" class="text-[6.4vw] ml-[1vw]"/></div>
                <div class="h-[12vw] aspect-square rounded-full flex justify-center items-center"></div>
            </div>
        </div>
    </nav>   
    <main class="min-h-screen">
        <slot />
    </main>
    <footer>
        <div class="flex flex-col justify-center items-center space-y-[3.2vw] py-[4.8vw] text-[3.2vw]">
            <div class="space-x-[2vw] flex text-mainred [&>a]:hover:text-red-800">
                <a href="/" target="_blank" class="h-[10vw] aspect-square flex justify-center items-center">
                    <Icon icon="fa6-brands:facebook-f" class="text-[6vw]"/>
                </a>
                <a href="/" target="_blank" class="h-[10vw] aspect-square flex justify-center items-center">
                    <Icon icon="fa6-brands:x-twitter" class="text-[6vw]"/>
                </a>
                <a href="/" target="_blank" class="h-[10vw] aspect-square flex justify-center items-center">
                    <Icon icon="fa6-brands:instagram" class="text-[6vw]"/>
                </a>
                <a href="/" target="_blank" class="h-[10vw] aspect-square flex justify-center items-center">
                    <Icon icon="fa6-brands:youtube" class="text-[6vw]"/>
                </a>
            </div>
            <div>About   |   Feedback   |   Help   |   Terms   |   Privacy    |   Contact</div>
            <div>&copy; agerr.co 2025 | KASATARA</div>
            <div class="mt-[6.4vw]">
                <svg class="h-[20vw] fill-mainred" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 979.68 484.56">
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
    </footer>
</section>