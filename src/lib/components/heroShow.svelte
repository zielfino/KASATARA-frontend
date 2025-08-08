<script lang="ts">
    import Card from "./util/card.svelte";
    // import { cards } from '$lib/datadummy';
    // import { top } from '$lib/topdummy';
    // import { choice } from '$lib/choicedummy';
    // import { newarr } from '$lib/newdummy';
    // import { update } from '$lib/updatedummy';
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { heroFilter } from '$lib/stores/heroFilter';
    import { masterDummy } from "$lib/masterdatadummy";

    type CardItem = {
		idfe: string;
		id?: number;
        title: string;
        excerpt: string;
        likes: number;
        rating: number;
        pages: number;
        genre: string[];
        type: string;
        chapter?: number[];
        label: string;
        size?: string;
        image: string;
		order?: number | 'first' | 'last';
    };

    let topCard: CardItem;
    let choiceCard: CardItem;
    let newCard: CardItem;
    let updateCards: CardItem[] = [];
    let excludedIds = [] as number[];

    function topShows() {
        const size = window.innerWidth <= 900
            ? window.innerWidth <= 500
                ? '2x1'
                : '1x1'
            : '2x2';

        const top = masterDummy
            .slice() // pastikan tidak mengubah original masterDummy
            .sort((b, a) => (a.likes ?? 0) - (b.likes ?? 0))[0]; // ambil satu teratas

        if (!top) return; // jika tidak ada data

        topCard = {
            ...top,
            idfe: 'top',
            size,
            label: 'top'
        };
        excludedIds[0] = top.id;
    }

    function choiceShows() {
        const size = window.innerWidth <= 900 ? '1x1' : '2x1';

        const choice = masterDummy.find(i => i.id === 70) || masterDummy.find(i => i.id === 1);

        if (!choice) return; 

        choiceCard = {
            ...choice,
            idfe: 'choice',
            // size: '2x1',
            size,
            label: 'choice'
        };
        excludedIds[1] = choice.id;
    }

    function newShows() {
        const size = window.innerWidth <= 900 ? '1x1' : '2x1';

        const newBacaan = masterDummy
        .slice()
        .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        })[0]

        if (!newBacaan) return; 
        newCard = {
            ...newBacaan,
            idfe: 'new',
            // size: '2x1',
            size,
            label: 'new'
        };
        excludedIds[2] = newBacaan.id;
    }
    
    function updateShows() {
        if ($heroFilter === "Rekomendasi") {
            const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
            const limit = typeof window !== 'undefined' ? window.innerWidth > 1100 ? 10 : window.innerWidth < 900 ? window.innerWidth < 500 ? 2 : 6 : 14 : 14;
            updateCards = masterDummy
            .filter(card => !excludedIds.includes(card.id))
            .filter(card => card.release === 1)
            .sort((a, b) => {
                const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                return dateB - dateA;
            })
            .slice(0, limit)
            .map((card, i) => {
            const updatedTime = card.updatedAt ? new Date(card.updatedAt).getTime() : 0;
            const isRecent = Date.now() - updatedTime < THREE_DAYS;
            return {
                ...card,
                idfe: `update-${i}`,
                size: '1x1',
                label: (i < 3 || isRecent) ? 'up' : ''
            }});
            // .map((card, i) => ({
            //     ...card,
            //     idfe: `update-${i}`,
            //     size: '1x1',
            //     label: 'up'
            // }));
        } else {
            // opsional: apa yang dilakukan jika bukan Rekomendasi
            const limit = typeof window !== 'undefined' ? window.innerWidth < 1100 ? window.innerWidth < 900 ? window.innerWidth < 500 ? 6 : 9 : 12 : 15 : 15;
            
            updateCards = masterDummy
                .filter(card => {
                    if ($heroFilter === "Banyak Chapter") {
                        return card.release === 1;
                    } else if ($heroFilter === "Novel") {
                        return card.type === "NOVEL" && card.release !== 3;
                    } else if ($heroFilter === "Komik") {
                        return card.type === "KOMIK" && card.release !== 3;
                    } else if ($heroFilter === "Indie") {
                        return card.release === 3;
                    }
                    return true;
                })
                .sort((b, a) => {
                    if ($heroFilter === "Banyak Chapter") {
                        return ((a.chapter?.[0]?.number ?? 0) - (b.chapter?.[0]?.number ?? 0));
                    }
                    return 0; 
                })
                .slice(0, limit)
                .map((card, i) => ({
                ...card,
                idfe: `update-${i}`,
                size: '1x1'
            }));
        }
    }

    onMount(() => {
        topShows();
        choiceShows();
        newShows();
        updateShows();

        window.addEventListener('resize', topShows);
        window.addEventListener('resize', choiceShows);
        window.addEventListener('resize', newShows);
        window.addEventListener('resize', updateShows);
        return () => {
            window.removeEventListener('resize', topShows);
            window.removeEventListener('resize', choiceShows);
            window.removeEventListener('resize', newShows);
            window.removeEventListener('resize', updateShows);
        };
    });


    const phone = writable(false);
    const desktop = writable(false);
    const desktopex = writable(false);
    const desktoplarge = writable(false);

    onMount(() => {
        const update = () => {
            phone.set(window.innerWidth <= 500);
            desktop.set(window.innerWidth >= 900);
            desktopex.set(window.innerWidth >= 1300);
            desktoplarge.set(window.innerWidth >= 1100);
        };

        update();
        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    });



	// ORDER
	$: orderedCards = (() => {
		const list: CardItem[] = [];

		// Assign order
		if (topCard) {
			topCard.order = 'first';
			list.push(topCard);
		}

		if (choiceCard) {
			choiceCard.order = window.innerWidth >= 900 ? window.innerWidth >= 1100 ? 1 : 28 : window.innerWidth <= 500 ? 2 : 1;
			list.push(choiceCard);
		}

		updateCards?.forEach((card, i) => {
			card.order = 3 + (i * 2); // 3, 5, 7, ...
			list.push(card);
		});

		if (newCard) {
			newCard.order = window.innerWidth >= 900 ? window.innerWidth >= 1100 ? 1 : 20 : window.innerWidth <= 499 ? 2 : 2;
			list.push(newCard);
		}

		// Sort with custom comparator
		list.sort((a, b) => {
            const getOrderValue = (o: number | 'first' | 'last' | undefined) =>
                o === 'first' ? -Infinity :
                o === 'last' ? Infinity :
                typeof o === 'number' ? o : Infinity;

	        return getOrderValue(a.order) - getOrderValue(b.order);
		});

		return list;
	})();

    $: {
        $heroFilter;
        updateShows();
    }
</script>
<div class="grid grid-cols-2 xs:grid-cols-3 w-full max-w-[675px] md:max-w-[770px]
max-xs:px-[1.6vw] px-[8px] gap-[8px] my-2 xs:my-[8px]
md:grid-cols-4 lg:w-[946px] lg:max-w-[100%] md:p-0
lg:grid-cols-5 xl:w-[1100px]" style={`direction: ${$heroFilter === "Rekomendasi" ? 'rtl' : 'ltr'}`}>
    
    {#if $heroFilter === 'Rekomendasi'}
        {#each orderedCards as card}
            <Card item={card} showChapter={false} />
        {/each}
    {:else if $heroFilter === 'Baru Rilis'}
        {#each updateCards as card}
            <Card item={card} showChapter={false} />
        {/each}
    {:else if $heroFilter === 'Banyak Chapter'}
        {#each updateCards as card}
            <Card item={card} showChapter={false} />
        {/each}
    {:else if $heroFilter === 'Komik'}
        {#each updateCards as card}
            <Card item={card} showChapter={false} />
        {/each}
    {:else if $heroFilter === 'Novel'}
        {#each updateCards as card}
            <Card item={card} showChapter={false} />
        {/each}
    {:else}
        {#each updateCards as card}
            <Card item={card} showChapter={false} />
        {/each}
    {/if}
    <!-- {#if topCard}
        <Card item={topCard} />
    {/if}
    {#if choiceCard}
        <Card item={choiceCard} />
    {/if}
    {#each updateCards as card}
        <Card item={card} />
    {/each}
    {#if newCard}
        <Card item={newCard} />
    {/if} -->
    
</div>