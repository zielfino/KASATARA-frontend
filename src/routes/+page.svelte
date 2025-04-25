<script lang="ts">
    import LeaderboardSwitch from '$lib/components/leaderboardSwitch.svelte';
import Linker from '$lib/components/linker.svelte';
    import MainContenSwitch from '$lib/components/mainContenSwitch.svelte';
    import Breakline from '$lib/components/util/breakline.svelte';
    import Icon from '@iconify/svelte';

    type Bacaan = {
        id: number;
        title: string;
        chapter: number;
        author: string;
        genre: string;
    };

    let bacaan: Bacaan[] = [
        { id: 1, title: 'Mounth Hua Sect', chapter: 300, author: 'Tan Feli', genre: 'comedy' },
        { id: 2, title: 'Nobleese', chapter: 150, author: 'Tan Feli', genre: 'horror' },
        { id: 3, title: 'Damn Reincarnation', chapter: 100, author: 'Tan Feli', genre: 'drama' },
        { id: 4, title: 'Tower of God', chapter: 200, author: 'Tan Feli', genre: 'fantasy' },
        { id: 5, title: 'The God of Highscholl', chapter: 400, author: 'Tan Feli', genre: 'fantasy' },
        { id: 6, title: 'Girls of The Wild', chapter: 40, author: 'Tan Feli', genre: 'romance' },
        { id: 7, title: 'Eleceed', chapter: 20, author: 'Tan Feli', genre: 'fantasy' }
    ];

    const genreClass: Record<string, string> = {
        fantasy: 'text-purple-500',
        romance: 'text-pink-500',
        comedy: 'text-amber-500',
        'slice of life': 'text-sky-500',
        drama: 'text-emerald-500',
        horror: 'text-red-500'
    };

    function genreColor(genre: string): string {
        return genreClass[genre] || 'text-gray-500';
    }

    const [first] = bacaan;
</script>

<svelte:head>
    <!-- BASIC SEO -->
        <title>KASATARA - Beranda</title>
        <meta name="description" content="BacaKomik adalah platform untuk membaca komik dan novel digital secara gratis dan legal." />
        <meta name="keywords" content="komik, baca komik online, novel, webtoon, manga gratis, baca novel" />
        <!-- <meta name="author" content="BacaKomik Team" /> -->
        <meta name="robots" content="index, follow" />
        <meta charset="UTF-8" />
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0" /> -->

    <!-- OPEN GRAPH (untuk Facebook & LinkedIn) -->
        <meta property="og:title" content="BacaKomik - Platform Komik & Novel Gratis" />
        <meta property="og:description" content="Nikmati berbagai judul komik dan novel terbaru hanya di BacaKomik." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bacakomik.com/" />
        <meta property="og:image" content="https://bacakomik.com/og-image.jpg" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="BacaKomik" />

    <!-- TWITTER CARD -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BacaKomik - Platform Komik & Novel Gratis" />
        <meta name="twitter:description" content="Nikmati berbagai judul komik dan novel terbaru hanya di BacaKomik." />
        <meta name="twitter:image" content="https://bacakomik.com/og-image.jpg" />
        <meta name="twitter:site" content="@bacakomik" />
        <meta name="twitter:creator" content="@bacakomik" />

    <!-- FAVICON -->
        <!-- <link rel="icon" href="/favicon.ico" /> -->
</svelte:head>

<section>

    <!-- H E R O    S E C T I O N -->
        <!-- Slider Mobile -->
        <section class="w-full aspect-square bg-mainred text-zinc-900 relative">
            <div class="flex justify-center items-center w-full h-full">
                SLIDER MOBILE
            </div>
        </section>

    <!-- C O N T E N T -->
        <!-- Konten Utama -->
        <section>
            <!-- Tombol Rekomendasi -->
            <Linker 
                title="Rekomendasi Hari Ini"
                link="todays"
            />

            <!-- Switch Komik Novel -->
             <MainContenSwitch/>

            <!-- Bacaan Rekomendasi -->
            <div class="grid grid-cols-3 w-full" style="direction:rtl">
                <div class="col-span-2 row-span-2 aspect-[1/1] bg-blue-400 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-300 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-500 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-500 flex justify-center items-center"></div>
                <div class="col-span-2 aspect-[2/1] bg-blue-600 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-400 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-300 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-200 flex justify-center items-center"></div>
            </div>
        </section>


        <!-- Berita Terbaru -->
        <section>
            <a href="/news">
                <div class="w-full font-semibold flex justify-between items-center px-[3.2vw] py-[2.8vw]
                bg-mainred text-mainlight">
                    <div class="flex items-center space-x-[1vw]">
                        <div class="text-[3.6vw] uppercase font-bold tracking-tight">PENGUMUMAN</div>
                        <div><Icon icon="material-symbols:arrow-forward-ios" /></div>
                        <p class=" text-[2.8vw] line-clamp-1 mr-[2vw]">Fitur baru dapakatkan koin dari menonton iklan baru</p>
                    </div>
                    <div class="text-[2.8vw] text-stone-300/80 text-nowrap">32 Feb 2025</div>
                </div>
            </a>
        </section>


        <!-- Konten Tambahan -->
        <section>
            <!-- Terakhir Di Update -->
            <div class="grid grid-cols-3 w-full" style="direction: rtl;">
                <div class="col-span-2 aspect-[2/1] bg-blue-600 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-300 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-400 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-500 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-400 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-300 flex justify-center items-center"></div>
                <div class="col-span-2 aspect-[2/1] bg-blue-200 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-400 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-500 flex justify-center items-center"></div>
                <div class="col-span-1 aspect-[1/1] bg-blue-400 flex justify-center items-center"></div>
            </div>

            <div>
                <!-- Tombol 'Papan Peringkat' -->
                <Linker 
                    title="Papan Peringkat"
                    link="leaderboard"
                />

                <!-- Switch Peringkat -->
                 <LeaderboardSwitch/>

                <!-- Peringkat -->
                <div>
                    <!-- pertama -->
                    {#if first}
                        <div>
                            <div class="flex justify-center items-center h-[50vw] px-[3.2vw] pt-[3.2vw]">
                                <div class="bg-blue-400 w-full h-full"></div>
                            </div>
                            <div class="flex items-center justify-between space-x-[3.2vw] pl-[4.8vw] pr-[7.2vw] pt-[3.2vw] pb-[4.8vw]">
                                <div class="font-bold text-[4.8vw] mr-[4.8vw]">
                                    #{first.id}
                                </div>
                                <div class="flex-1 leading-[1.4] text-[3.2vw] capitalize">
                                    <div class={genreColor(first.genre)}>{first.genre}</div>
                                    <div class="text-[4.8vw] font-bold">{first.title}</div>
                                    <div class="text-[3.2vw]">{first.author}</div>
                                </div>
                                <div class="text-[3.2vw]">
                                    {first.chapter} chapter
                                </div>
                            </div>
                        </div>
                    {/if}
                    <!-- 2 - 7 -->
                    <div>
                        <Breakline />
                        {#each bacaan.slice(1) as item (item.id)}
                            <div class="flex items-center justify-between space-x-[3.2vw] pl-[4.8vw] pr-[7.2vw] py-[1vw]">
                                <div class="font-bold text-[4.8vw] mr-[4.8vw]">
                                    #{item.id}
                                </div>
                                <div class="bg-blue-400 rounded-[1vw] h-[16vw] aspect-square">
                                    
                                </div>
                                <div class="flex-1 leading-[1.4] text-[2.8vw] capitalize">
                                    <div class={genreColor(item.genre)}>{item.genre}</div>
                                    <div class="text-[3.2vw] font-bold">{item.title}</div>
                                    <div class="text-[2.8vw] text-stone-500">{item.author}</div>
                                </div>
                                <div class="text-[3.2vw]">
                                    {item.chapter} chapter
                                </div>
                            </div>
                            <Breakline />
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <!-- Santara (Canvas) -->
        <section>
            <div class="w-full flex flex-col justify-center items-center">
                <div class="w-2/3 flex justify-center items-center flex-col text-center space-y-[3.2vw] h-[75vw]">
                    <h6 class="text-[4.8vw] font-nunito font-black leading-none">SANTARA</h6>
                    <p class="text-[3.2vw]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum laboriosam aut iusto, consequuntur quam dignissimos!</p>
                    <button class="text-[3.2vw] bg-mainred px-[3.2vw] py-[2.8vw] text-mainlight rounded-[2vw]">Lihat Karya Lainnya</button>
                </div>
                <div class="w-full grid grid-cols-3">
                    <div class="bg-blue-300 w-full col-span-2"></div>
                    <div class="bg-blue-400 w-full aspect-square"></div>
                    <div class="bg-blue-400 w-full aspect-square"></div>
                    <div class="bg-blue-500 w-full aspect-square"></div>
                    <div class="bg-blue-600 w-full aspect-square"></div>
                </div>
            </div>
        </section>
</section>
