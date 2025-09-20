<script>
    import Slaideres from "$lib/components/slaideres.svelte";
    import TitleLink from "$lib/components/util/titleLink.svelte";

</script>

<section class="max-xs:bg-zinc-900">
    <div class="max-xs:bg-zinc-200 max-xs:rounded-t-[1.8vw] max-xs:px-0 max-md:px-2">
        
        <!-- Latest Comics -->
        <div class="max-xs:pl-[1.6vw] max-xs:pt-[3vw]"><TitleLink title="Komik Terbaru" tipe="Komik" link="/browse" /></div>
        <Slaideres jenis="KOMIK" />

        <!-- Latest Novels -->
        <div class="max-xs:pl-[1.6vw] max-xs:pt-[3vw]"><TitleLink title="Novel Terbaru" tipe="Novel" link="/browse" /></div>
        <Slaideres totalGroup={3} jenis="NOVEL" />

        <!-- <TitleLink title="Novel Terbaru" link="/" />
        <Slaideres totalGroup={3} jenis="NOVEL" /> -->

        <!-- <TitleLink title="Visual Novel Terbaru" link="/" />
        <Slaideres totalGroup={2} jenis="VISUAL NOVEL" /> -->

    </div>
</section>