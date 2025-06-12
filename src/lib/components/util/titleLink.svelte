<script>
    import Icon from "@iconify/svelte";
    export let title;
    export let link;
    export let outer = true;

</script>

<div class={`${outer === true ?
'pt-4 max-xs:pt-[3vw] max-xs:mb-[2vw] max-xs:pb-[0.4vw] flex justify-center items-center' :
''}`}>
    <div class='w-full max-w-[calc(675px-16px)] md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] max-xs:px-[1.6vw] px-1.5'>
        <div class="text-xl max-xs:text-[4vw] font-work-sans font-[600] tracking-tight flex justify-between">
            <a href="{link}" class="outline-none underline-offset-1 focus-visible:underline hover:underline focus-visible:decoration-sky-400 focus-visible:text-sky-400">{title}</a>
            <a tabindex="-1" href="{link}" class="text-base flex justify-center items-center"><Icon icon="material-symbols:arrow-forward-ios-rounded" /></a>
        </div>
    </div>
</div>