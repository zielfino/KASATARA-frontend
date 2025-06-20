<script>
    // import "$lib/bacaan.css";
    // console.log('📚 Series layout active');
</script>

<section>
    <section class="w-full flex flex-col justify-center items-center">
        <div class="w-full overflow-hidden h-[600px] absolute top-0">
            <div style={`background-image: url('https://i.imgur.com/HHe6hQi.png')`} class="top-0 w-full h-[500px] bg-cover bg-center mask-b-from-60% mask-b-to-100% blur-sm opacity-50 scale-110"></div>
        </div>
        <div class="absolute top-0 w-full h-[500px] bg-zinc-900/60 z-2 mask-b-from-60% mask-b-to-100%"></div>
        <div class="w-full md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] xs:p-2 z-3">
            <slot />
        </div>
    </section>
</section>

<style>
</style>
