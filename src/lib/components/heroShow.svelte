<script lang="ts">
    import Card from "./util/card.svelte";
    import { cards } from '$lib/datadummy';
    import { top } from '$lib/topdummy';
    import { choice } from '$lib/choicedummy';
    import { newarr } from '$lib/newdummy';
    import { update } from '$lib/updatedummy';
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    type CardItem = {
		idfe: string;
        title: string;
        excerpt: string;
        likes: number;
        rating: number;
        pages: number;
        genre: string[];
        type: string;
        label: string;
        size?: string;
        image: string;
		order?: number | 'first' | 'last';
    };

    let topCard: CardItem;
    let choiceCard: CardItem;
    let newCard: CardItem;
    let updateCards: CardItem[] = [];
    
    function topShows() {
        const size = window.innerWidth <= 899.9 ? window.innerWidth <= 499.9 ? '2x1' : '2x1' : '2x2';

        topCard = {
            ...top,
            idfe: 'top',
            size,
            label: 'top'
        };
    }

    function choiceShows() {
        // const size = window.innerWidth <= 499.9 ? '1x1' : '2x1';

        choiceCard = {
            ...choice,
            idfe: 'choice',
            size: '2x1',
            // size,
            label: 'choice'
        };
    }

    function newShows() {
        const size = window.innerWidth <= 499.9 ? '1x1' : '2x1';
        newCard = {
            ...newarr,
            idfe: 'new',
            // size: '2x1',
            size,
            label: 'new'
        };
    }
    
    function updateShows() {
        const limit = window.innerWidth > 1100 ? 7 : window.innerWidth < 899.9 ? window.innerWidth < 499.9 ? 7 : 9 : 8;
        updateCards = update.slice(0, limit).map((card, i) => ({
            ...card,
		    idfe: `update-${i}`,
            size: '1x1'
        }));
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
            phone.set(window.innerWidth <= 499.9);
            desktop.set(window.innerWidth >= 899.9);
            desktopex.set(window.innerWidth >= 1300);
            desktoplarge.set(window.innerWidth >= 1100);
        };

        update(); // Initial check
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
			choiceCard.order = window.innerWidth >= 899.9 ? 2 : window.innerWidth <= 499.9 ? 18 : 12;
			list.push(choiceCard);
		}

		updateCards?.forEach((card, i) => {
			card.order = 3 + (i * 2); // 3, 5, 7, ...
			list.push(card);
		});

		if (newCard) {
			newCard.order = window.innerWidth >= 899.9 ? 'last' : window.innerWidth <= 499.9 ? 2 : 18;
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
</script>
<div class="grid grid-cols-2 xs:grid-cols-3 w-full max-w-[675px] md:max-w-[770px]
px-[8px] gap-[8px] my-2 xs:my-[8px]
md:grid-cols-4 lg:w-[946px] lg:max-w-[100%] md:p-0
lg:grid-cols-5 xl:w-[1100px]" style="direction:rtl">
    
    {#each orderedCards as card}
        <Card item={card} />
    {/each}
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