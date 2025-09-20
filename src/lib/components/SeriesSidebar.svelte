<script lang="ts">
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    
    export let excerpt: boolean = true;
    
	let someValue: boolean = false;
	let mounted: boolean = false;

onMount(() => {
	const checkWidth = () => {
		someValue = window.innerWidth < 700;
	};

	checkWidth();
	window.addEventListener('resize', checkWidth);

	return () => window.removeEventListener('resize', checkWidth);
});
</script>

<!-- <div class="bg-mainlight rounded-2xl border-[0.2vw] xs:border border-zinc-900/15 
flex flex-col justify-start items-center relative overflow-hidden h-fit text-[2.4vw] xs:text-[12px]
text-center"> -->
    <div class="hidden">
    <div style={`background-image: url('https://i.imgur.com/HHe6hQi.png')`} class="bg-cover bg-center w-full aspect-[4/5] absolute -translate-y-2 scale-105
    mask-b-from-0 mask-b-to-100 blur-sm opacity-50"></div>
    <div class="z-4 mt-[9.6vw] xs:mt-12 mb-8">
        <div class="bg-red-300 aspect-[2/3] w-[150px] rounded-lg bg-cover bg-center" style={`background-image: url('https://i.imgur.com/HHe6hQi.png')`}></div>
        <div class="text-[3.6vw] xs:text-[18px] font-semibold mt-4">Overgeared</div>
        <div class="text-[2.4vw] xs:text-[12px] font-light">Lee Dong‑Wook, <br> Team Argo (REDICE)</div>
    </div>
    
    </div>

    <div class={`flex justify-around items-center text-[2.4vw] xs:text-[12px] px-4
    ${excerpt ? 'w-[90%] mt-[6.4vw] xs:mt-8' : someValue ? 'w-[90%] mt-[9.6vw] xs:mt-12' : 'w-[230px] mt-[9.6vw] xs:mt-12' }`}>
        <div class="flex justify-center items-center"><Icon icon="material-symbols:trophy" class="text-[3.6vw] xs:text-[18px] mr-0.5" />#2</div>
        <div class="flex justify-center items-center"><Icon icon="mingcute:bookmark-line" class="text-[3.6vw] xs:text-[18px] mr-1 group-hover:hidden" />1.2M</div>
        <div class="flex justify-center items-center group"><Icon icon="mingcute:eye-line" class="text-[3.6vw] xs:text-[18px] mr-1 group-hover:hidden" /><Icon icon="mingcute:eye-close-line" class="text-[3.6vw] xs:text-[18px] mr-1 hidden group-hover:block" />65.7M</div>
        {#if !excerpt && someValue}
        <div class="flex justify-center items-center group"><Icon icon="mingcute:emoji-line" class="text-[3.6vw] xs:text-[18px] mr-1 group-hover:hidden" /><Icon icon="mingcute:emoji-2-line" class="text-[3.6vw] xs:text-[18px] mr-1 hidden group-hover:block" />34.2M</div>
        <div class="flex justify-center items-center"><Icon icon="mingcute:comment-2-line" class="text-[3.6vw] xs:text-[18px] mr-1" />200K</div>
        {/if}
    </div>

    <!-- <div class="w-[80%] flex justify-around items-center text-[2.4vw] xs:text-[12px] px-8 mt-4"> -->
        <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:like" class="text-[3.6vw] xs:text-[18px] mr-1" />1.2M</div> -->
        <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:star" class="text-[3.6vw] xs:text-[18px] mr-1" />1.2M</div> -->
        <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:thumbs-up" class="text-[3.6vw] xs:text-[18px] mr-1" />test</div> -->
    <!-- </div> -->
    {#if !someValue}

    <div class={`flex justify-around items-center text-[2.4vw] xs:text-[12px] px-8
    ${excerpt ? 'w-[90%] mt-4' : 'w-[200px] mt-2 mb-4' }`}>
    {#if excerpt}
        <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:like" class="text-[3.6vw] xs:text-[18px] mr-1" />1.2M</div> -->
        <div class="flex justify-center items-center group"><Icon icon="mingcute:book-2-line" class="text-[3.6vw] xs:text-[18px] mr-1" />Komik</div>
        <!-- <div class="flex justify-center items-center"><Icon icon="mingcute:clapperboard-line" class="text-[3.6vw] xs:text-[18px] mr-1" />Komik</div> -->
        <div class="flex justify-center items-center group"><Icon icon="lucide:clapperboard" class="text-[3.6vw] xs:text-[18px] mr-1" />Fantasy, Comedy</div>
        <!-- <div class="flex justify-center items-center"><Icon icon="mingcute:clapperboard-line" class="text-[3.6vw] xs:text-[18px] mr-1" />Fantasy, Comedy</div> -->
        <!-- <div class="flex justify-center items-center"><Icon icon="icon-park-outline:thumbs-up" class="text-[3.6vw] xs:text-[18px] mr-1" />test</div> -->
    {/if}
        {#if !excerpt}
        <div class="flex justify-center items-center group"><Icon icon="mingcute:emoji-line" class="text-[3.6vw] xs:text-[18px] mr-1 group-hover:hidden" /><Icon icon="mingcute:emoji-2-line" class="text-[3.6vw] xs:text-[18px] mr-1 hidden group-hover:block" />34.2M</div>
        <div class="flex justify-center items-center"><Icon icon="mingcute:comment-2-line" class="text-[3.6vw] xs:text-[18px] mr-1" />200K</div>
        {/if}

    </div>

    {/if}
    <div class="border-zinc-300 border-[0.2vw] xs:border w-[90%] my-[3.2vw] xs:my-4"></div>
    {#if excerpt}
    <p class="px-text-[2.4vw] 2xs:text-[12px] text-justify indent-4 px-[3.2vw] xs:px-4 line-clamp-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique perspiciatis non, neque, nesciunt possimus ipsam eveniet, repudiandae a fugiat enim dicta obcaecati itaque praesentium sint aspernatur tempora dolorem necessitatibus quae molestiae debitis sapiente placeat suscipit minus dolor. Minima accusantium ad amet hic magni, alias error modi odio repellendus illum harum voluptates animi tempore. At odit, temporibus magnam eos soluta ad inventore recusandae nesciunt culpa exercitationem minima perferendis ratione maxime, vero, aspernatur reiciendis eius sed pariatur adipisci saepe. Libero, id ipsam. Eveniet, velit deleniti aperiam et maxime, eum fuga quis ipsa quia accusantium, maiores accusamus aliquam modi ipsam cum magni praesentium. ipsum dolor sit amet consectetur adipisicing elit. Porro consequatur dignissimos perferendis excepturi quia iure numquam exercitationem voluptates ut id nobis voluptatibus amet ab vero, laborum error eos culpa sunt velit, est adipisci placeat perspiciatis? Natus expedita ad debitis eius ipsum, esse non suscipit voluptatum a explicabo voluptatibus facilis illum corporis, accusamus doloremque exercitationem repellat at, cum placeat. Sequi eos iure molestiae, voluptatem cum hic minus vitae minima quam saepe vero quis, ab expedita recusandae numquam. Eligendi natus quasi quidem. Doloremque quasi assumenda, repudiandae explicabo voluptate autem voluptatem aperiam suscipit excepturi, velit cumque quae debitis porro, perferendis ex ea eligendi?</p>

    <div class="border-zinc-300 border-[0.2vw] xs:border w-[90%] my-[3.2vw] xs:my-4"></div>
    {/if}
    <div class="w-full px-[3.2vw] xs:px-4 uppercase">
        <button  on:click|stopPropagation={() => goto('/series/chap')}  class="w-full px-[3.2vw] xs:px-4 py-[4vw] xs:py-5 rounded-lg font-work-sans cursor-pointer
        border-2 border-purple-600 hover:bg-mainlight hover:text-purple-600
        outline-none focus-visible:ring-2 focus-visible:ring-sky-400
        bg-purple-600 text-mainlight transition text-[2.4vw] xs:text-[12px]">baca eps pertama</button>
    </div>

    <div class="w-full p-[3.2vw] xs:p-4 pt-[1.6vw] xs:pt-2 space-y-2">
        <div class="w-full rounded-lg text-[2.4vw] xs:text-[12px] font-work-sans
        border-[0.2vw] xs:border border-zinc-900/30
        bg-mainlight text-zinc-600 transition flex justify-between items-center">
            <div class="ml-[3.2vw] xs:ml-4">
                <span>Novel Tersedia</span>
                <span class="opacity-50">372 Chap</span>
            </div>
            <button class="w-[12.8vw] xs:w-[64px] py-[0.8vw] xs:py-1 bg-zinc-900 rounded-full text-mainlight text-[2.8vw] xs:text-[14px] cursor-not-allowed m-[1.6vw] xs:m-2 opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Baca</button>
            <!-- <button class="w-[12.8vw] xs:w-[64px] py-[0.8vw] xs:py-1 bg-zinc-900 rounded-full text-mainlight text-[2.8vw] xs:text-[14px] hover:bg-zinc-600 m-[1.6vw] xs:m-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Baca</button> -->
        </div>
        <div class="w-full rounded-lg text-[2.4vw] xs:text-[12px] font-work-sans
        border-[0.2vw] xs:border border-zinc-900/30
        bg-mainlight text-zinc-600 transition flex justify-between items-center">
            <div class="ml-[3.2vw] xs:ml-4">
                <span>Tiket Gratis</span>
                <span class="opacity-50">1 Chap</span>
            </div>
            <button class="w-[12.8vw] xs:w-[64px] py-[0.8vw] xs:py-1 bg-zinc-900 rounded-full text-mainlight text-[2.8vw] xs:text-[14px] cursor-not-allowed m-[1.6vw] xs:m-2 opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Claim</button>
            <!-- <button class="w-[12.8vw] xs:w-[64px] py-[0.8vw] xs:py-1 bg-zinc-900 rounded-full text-mainlight text-[2.8vw] xs:text-[14px] hover:bg-zinc-600 m-[1.6vw] xs:m-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-400">Claim</button> -->
        </div>
    </div>
<!-- </div> -->

<!-- <div class="bg-mainlight rounded-2xl border-[0.2vw] xs:border border-zinc-900/15
flex flex-col justify-start items-center relative overflow-hidden h-fit text-[2.4vw] xs:text-[12px]
text-center">
    <div class="my-[3.2vw] xs:my-4">rekomendasi</div>
</div>

<div class="bg-mainlight rounded-2xl border-[0.2vw] xs:border border-zinc-900/15
flex flex-col justify-start items-center relative overflow-hidden h-fit text-[2.4vw] xs:text-[12px]
text-center">
    <div class="my-[3.2vw] xs:my-4">upgrade</div>
</div> -->