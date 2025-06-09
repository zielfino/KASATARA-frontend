<script>
    import Slaideres from "$lib/components/slaideres.svelte";
    import TitleLink from "$lib/components/util/titleLink.svelte";

</script>

<section class="max-xs:bg-zinc-900">
    <div class="max-xs:bg-zinc-200 max-xs:rounded-t-xl max-xs:px-0 max-md:px-2">
        
        <TitleLink title="Komik Terbaru" link="/" />
        <Slaideres jenis="KOMIK" />

        <!-- <TitleLink title="Novel Terbaru" link="/" />
        <Slaideres totalGroup={3} jenis="NOVEL" /> -->

        <!-- <TitleLink title="Visual Novel Terbaru" link="/" />
        <Slaideres totalGroup={2} jenis="VISUAL NOVEL" /> -->

    </div>
</section>