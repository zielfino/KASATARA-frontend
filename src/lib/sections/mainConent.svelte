<script>
    import HeroFilter from "$lib/components/heroFilter.svelte";
    import HeroShow from "$lib/components/heroShow.svelte";
    import News from "$lib/components/news.svelte";

</script>

<section class="max-xs:bg-zinc-900">
    <div class="flex flex-col justify-center items-center min-[900px] max-xs:bg-zinc-200 max-xs:rounded-b-xl max-xs:pb-[0.2vw]">

        <HeroFilter />
        <HeroShow />

    </div>

    <News title="PENGUMUMAN" type="news" color="dark"/>

</section>
