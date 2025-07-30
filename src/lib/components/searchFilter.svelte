<!-- SOLVED 6/4/2025 | for Desktop to Mobile -->

<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	// DUMMY DATA SEMENTARA
	type Tag = {
		disabled: boolean;
		label: string;
		icon?: string;
		color?: string;
	};

	const filter: Tag[] = [
		{ disabled: false,label: 'Semua' },
		{ disabled: false,label: 'Daily' },
		{ disabled: false,label: 'Weekly' },
		{ disabled: false,label: 'Komik' },
		{ disabled: false,label: 'Novel' },
		{ disabled: false,label: 'Visual Novel' },
		{ disabled: true,label: 'Official' },
		{ disabled: true,label: 'Indie' },
		// { disabled: true,label: 'Ringan', icon: 'fa6-solid:feather-pointed', color: 'text-rose-200' },
		// { disabled: true,label: 'Bacaan Pendek', icon: 'material-symbols:short-text-rounded' },
		// { disabled: true,label: 'Upload Mingguan', icon: 'mingcute:calendar-month-fill' },
		// { disabled: true,label: 'Upload Bulanan', icon: 'mingcute:calendar-month-fill' },
		// { disabled: true,label: 'Upload Sesuai Mood Author', icon: 'material-symbols:person-rounded' },
		// { disabled: true,label: 'Komik Adaptasi Novel', icon: 'material-symbols:person-4-rounded' },
		// { disabled: true,label: 'Emosional' },
		// { disabled: true,label: 'Sedang Ramai' },
		// { disabled: true,label: 'Shounen' },
		// { disabled: true,label: 'Shoujo' },
		// { disabled: true,label: 'Sejarah' },
		// { disabled: true,label: 'Dewasa' },
		// { disabled: true,label: 'Lainnya' }
	];	
	const genrelist: Tag[] = [
		{ disabled: false, label: 'Action' },
		{ disabled: false, label: 'Romance' },
		{ disabled: false, label: 'Horror' },
		{ disabled: false, label: 'Comedy' },
		{ disabled: false, label: 'Drama' },
		{ disabled: true, label: 'Short' },
	];



	// SNAP SYSTEN
	let scroller: HTMLDivElement;
	let isDragging = false;
	let startX = 0;
	let scrollStart = 0;
	// let preventClick = false;
	let isSnapEnabled = true;

	// SNAP CONTROL
	function updateSnapEnabled() {
		const width = window.innerWidth;
		const isPortrait = window.matchMedia('(orientation: portrait)').matches;

		if (width < 500) {
			isSnapEnabled = false;
		} else if (width >= 500 && width < 1100) {
			isSnapEnabled = !isPortrait; // aktif hanya jika landscape
		} else {
			isSnapEnabled = true;
		}
	}

	// onMount(() => {
	// 	buttonRefs = Array.from(scroller.querySelectorAll('button'));

	// 	updateSnapEnabled(); // 🔁 cek awal

	// 	window.addEventListener('resize', updateSnapEnabled);
	// 	return () => window.removeEventListener('resize', updateSnapEnabled);
	// });



	// DRAG CONTROL
	// function startDrag(e: MouseEvent | TouchEvent) {
	// 	if (window.innerWidth < 500) return;
	// 	isDragging = true;
	// 	startX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
	// 	scrollStart = scroller.scrollLeft;
	// }

	// function duringDrag(e: MouseEvent | TouchEvent) {
	// 	if (window.innerWidth < 500) return;
	// 	if (!isDragging) return;
	// 	const x = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
	// 	const walk = startX - x;
	// 	scroller.scrollLeft = scrollStart + walk;
	// 	preventClick = true;
	// }

	// function endDrag() {
	// 	if (window.innerWidth < 500) return;
	// 	if (!isDragging) return;
	// 	isDragging = false;
	// 	setTimeout(() => (preventClick = false), 0);
	// 	if (isSnapEnabled) 
	// 	snapToNearest();
	// }

	// DRAG FUNCTION
	// let buttonRefs: HTMLButtonElement[] = [];

	// function snapToNearest() {
	// 	if (!isSnapEnabled) return;
	// 	const containerLeft = scroller.getBoundingClientRect().left;
	// 	const containerRight = scroller.getBoundingClientRect().right;
	// 	const lastBtn = buttonRefs[buttonRefs.length - 1];
	// 	const lastRight = lastBtn.getBoundingClientRect().right;

	// 	let snapIndex = 0;
	// 	let minDelta = Infinity;

	// 	buttonRefs.forEach((btn, i) => {
	// 		const rect = btn.getBoundingClientRect();
	// 		const visibleWidth = rect.right - Math.max(rect.left, containerLeft);
	// 		const delta = Math.abs(rect.left - containerLeft);
	// 		const isHalfVisible = visibleWidth > rect.width / 2;

	// 		if (delta < minDelta) {
	// 			minDelta = delta;
	// 			snapIndex = isHalfVisible ? i : i + 1;
	// 		}
	// 	});

	// 	if (lastRight <= containerRight) {
	// 		// terakhir sudah full visible → snap ke terdekat
	// 		let closest = 0;
	// 		let closestDelta = Infinity;
	// 		buttonRefs.forEach((btn, i) => {
	// 			const delta = Math.abs(btn.getBoundingClientRect().left - containerLeft);
	// 			if (delta < closestDelta) {
	// 				closestDelta = delta;
	// 				closest = i;
	// 			}
	// 		});
	// 		snapIndex = closest;
	// 	}

	// 	const target = buttonRefs[Math.min(snapIndex, buttonRefs.length - 1)];
	// 	if (target) {
	// 		const filler = 16; // left filler
	// 		scroller.scrollTo({ left: target.offsetLeft - filler, behavior: 'smooth' });
	// 	}
	// }

	// SCROLL CONTROL
	// let scrollTimeout: ReturnType<typeof setTimeout>;
	// function onScroll() {
	// 	if (window.innerWidth < 500) return;
	// 	if (!isSnapEnabled) return;
	// 	clearTimeout(scrollTimeout);
	// 	scrollTimeout = setTimeout(snapToNearest, 80);
	// }

	// onMount(() => {
	// 	buttonRefs = Array.from(scroller.querySelectorAll('button'));
	// });

	// CLICK CONTROL
	// import { tick } from 'svelte';
	// const isBrowser = typeof window !== 'undefined';
	// let searchFilter: string = filter[0].label;
	
	// onMount(() => {
	// 	if (!isBrowser) return;
	// 	sessionStorage.setItem('searchFilter', searchFilter);
	// 	const storedType = sessionStorage.getItem('searchFilter');

	// 	if (storedType && filter.map(item => item.label).includes(storedType)) {
	// 		searchFilter = storedType;
	// 	} else {
	// 		sessionStorage.setItem('searchFilter', searchFilter);
	// 	}
	// });

	// async function searchgeHeroFilter(to: string) {
	// 	searchFilter = to;
	// 	sessionStorage.setItem('searchFilter', to);
	// 	await tick();
	// }

	import { tick } from 'svelte';
	import { searchFilter } from '$lib/stores/searchFilter';

	let current: string;
	const unsubscribe = searchFilter.subscribe(v => current = v);

	import { searchText } from '$lib/stores/searchText';
	$: keyword = $searchText;
	$: visibleTags = keyword === ""
		? filter.filter(tag => tag.label !== 'Semua')
		: filter.filter(tag => tag.label !== 'Daily' && tag.label !== 'Weekly');

	onMount(() => {
		// pastikan nilai awal sudah tercache
		if (!filter.find(tag => tag.label === current)) {
		searchFilter.set(filter[0].label);
		}
		return unsubscribe;
	});

	async function searchgeHeroFilter(to: string) {
		searchFilter.set(to);
		await tick();
	}

  import { page } from '$lib/stores/page';	
//   import { createPageStore } from '$lib/stores/page';

// import { browser } from '$app/environment';
// import { writable } from 'svelte/store';
// export const page = browser ? createPageStore(window.location.pathname).page : writable(1);

</script>

<style>
	.overflow-scroll-hidden {
		overflow: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.overflow-scroll-hidden::-webkit-scrollbar {
		display: none;
	}
</style>

<div class="w-full sm:max-w-[calc(675px-16px)] md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] font-work-sans
flex justify-between">
	<div class="items-center
		text-sm font-work-sans font-[400] tracking-tight space-x-2
		flex overflow-x-scroll overflow-scroll-hidden
		outline-none">

		<!-- LOOP FILTER -->
		{#each visibleTags  as tag, i}
			<button
			tabindex={tag.label === current || tag.disabled ? -1 : 0}
			on:click={(e) => {
				if (tag.label === current || tag.disabled) {
					e.preventDefault();
					e.stopPropagation();
					return;
				}
				searchgeHeroFilter(tag.label);
				page.set(1)
			}}
			class={`  
				flex justify-center items-center
				max-xs:py-[0.8vw] py-1 h-fit
				text-nowrap rounded-full
				border border-zinc-900/15
				outline-none 
				max-xs:text-[2.8vw]
				${tag.label === current ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
				tag.disabled ? 'opacity-30 pointer-events-none' :
				'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
			`}>
				<!-- LABEL -->
				<span 
					class={`max-xs:mx-[3.2vw] mx-4 h-fit`}
				>
					{tag.label}
				</span>
			</button>
		{/each}
	</div>

</div>