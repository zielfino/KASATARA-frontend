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
		{ disabled: false,label: 'Rekomendasi', icon: 'material-symbols:bolt', color: 'text-amber-300' },
		{ disabled: false,label: 'Baru Rilis', icon: 'mingcute:large-arrow-up-fill', color: 'text-emerald-400' },
		{ disabled: false,label: 'Banyak Chapter', icon: 'material-symbols:folder-copy-rounded' },
		{ disabled: false,label: 'Komik', icon: 'mingcute:calendar-month-fill' },
		{ disabled: false,label: 'Novel', icon: 'mingcute:calendar-month-fill' },
		{ disabled: false,label: 'Indie', icon: 'fa6-solid:feather-pointed', color: 'text-rose-200' },
		{ disabled: true,label: 'Ringan', icon: 'fa6-solid:feather-pointed', color: 'text-rose-200' },
		{ disabled: true,label: 'Bacaan Pendek', icon: 'material-symbols:short-text-rounded' },
		{ disabled: true,label: 'Upload Mingguan', icon: 'mingcute:calendar-month-fill' },
		{ disabled: true,label: 'Upload Bulanan', icon: 'mingcute:calendar-month-fill' },
		{ disabled: true,label: 'Upload Sesuai Mood Author', icon: 'material-symbols:person-rounded' },
		{ disabled: true,label: 'Komik Adaptasi Novel', icon: 'material-symbols:person-4-rounded' },
		{ disabled: true,label: 'Emosional' },
		{ disabled: true,label: 'Sedang Ramai' },
		{ disabled: true,label: 'Shounen' },
		{ disabled: true,label: 'Shoujo' },
		{ disabled: true,label: 'Sejarah' },
		{ disabled: true,label: 'Dewasa' },
		{ disabled: true,label: 'Lainnya' }
	];



	// SNAP SYSTEN
	let scroller: HTMLDivElement;
	let isDragging = false;
	let startX = 0;
	let scrollStart = 0;
	let preventClick = false;
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

	onMount(() => {
		buttonRefs = Array.from(scroller.querySelectorAll('button'));

		updateSnapEnabled(); // 🔁 cek awal

		window.addEventListener('resize', updateSnapEnabled);
		return () => window.removeEventListener('resize', updateSnapEnabled);
	});



	// DRAG CONTROL
	function startDrag(e: MouseEvent | TouchEvent) {
		if (window.innerWidth < 500) return;
		isDragging = true;
		startX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
		scrollStart = scroller.scrollLeft;
	}

	function duringDrag(e: MouseEvent | TouchEvent) {
		if (window.innerWidth < 500) return;
		if (!isDragging) return;
		const x = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
		const walk = startX - x;
		scroller.scrollLeft = scrollStart + walk;
		preventClick = true;
	}

	function endDrag() {
		if (window.innerWidth < 500) return;
		if (!isDragging) return;
		isDragging = false;
		setTimeout(() => (preventClick = false), 0);
		if (isSnapEnabled) 
		snapToNearest();
	}

	// DRAG FUNCTION
	let buttonRefs: HTMLButtonElement[] = [];

	function snapToNearest() {
		if (!isSnapEnabled) return;
		const containerLeft = scroller.getBoundingClientRect().left;
		const containerRight = scroller.getBoundingClientRect().right;
		const lastBtn = buttonRefs[buttonRefs.length - 1];
		const lastRight = lastBtn.getBoundingClientRect().right;

		let snapIndex = 0;
		let minDelta = Infinity;

		buttonRefs.forEach((btn, i) => {
			const rect = btn.getBoundingClientRect();
			const visibleWidth = rect.right - Math.max(rect.left, containerLeft);
			const delta = Math.abs(rect.left - containerLeft);
			const isHalfVisible = visibleWidth > rect.width / 2;

			if (delta < minDelta) {
				minDelta = delta;
				snapIndex = isHalfVisible ? i : i + 1;
			}
		});

		if (lastRight <= containerRight) {
			// terakhir sudah full visible → snap ke terdekat
			let closest = 0;
			let closestDelta = Infinity;
			buttonRefs.forEach((btn, i) => {
				const delta = Math.abs(btn.getBoundingClientRect().left - containerLeft);
				if (delta < closestDelta) {
					closestDelta = delta;
					closest = i;
				}
			});
			snapIndex = closest;
		}

		const target = buttonRefs[Math.min(snapIndex, buttonRefs.length - 1)];
		if (target) {
			const filler = 16; // left filler
			scroller.scrollTo({ left: target.offsetLeft - filler, behavior: 'smooth' });
		}
	}

	// SCROLL CONTROL
	let scrollTimeout: ReturnType<typeof setTimeout>;
	function onScroll() {
		if (window.innerWidth < 500) return;
		if (!isSnapEnabled) return;
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(snapToNearest, 80);
	}

	onMount(() => {
		buttonRefs = Array.from(scroller.querySelectorAll('button'));
	});

	// CLICK CONTROL
	// import { tick } from 'svelte';
	// const isBrowser = typeof window !== 'undefined';
	// let heroFilter: string = filter[0].label;
	
	// onMount(() => {
	// 	if (!isBrowser) return;
	// 	sessionStorage.setItem('heroFilter', heroFilter);
	// 	const storedType = sessionStorage.getItem('heroFilter');

	// 	if (storedType && filter.map(item => item.label).includes(storedType)) {
	// 		heroFilter = storedType;
	// 	} else {
	// 		sessionStorage.setItem('heroFilter', heroFilter);
	// 	}
	// });

	// async function changeHeroFilter(to: string) {
	// 	heroFilter = to;
	// 	sessionStorage.setItem('heroFilter', to);
	// 	await tick();
	// }

	import { tick } from 'svelte';
	import { heroFilter } from '$lib/stores/heroFilter';

	let current: string;
	const unsubscribe = heroFilter.subscribe(v => current = v);

	onMount(() => {
		// pastikan nilai awal sudah tercache
		if (!filter.find(tag => tag.label === current)) {
		heroFilter.set(filter[0].label);
		}
		return unsubscribe;
	});

	async function changeHeroFilter(to: string) {
		heroFilter.set(to);
		await tick();
	}
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

<div class="w-full sm:max-w-[calc(675px-16px)] md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] xs:pl-1.5 mt-3 md:mt-6 font-work-sans">
	<div 
		role="button" 
		tabindex="-1"
		bind:this={scroller}
		on:scroll={onScroll}
		on:mousedown={startDrag}
		on:touchstart={startDrag}
		on:mousemove|passive={duringDrag}
		on:touchmove|passive={duringDrag}
		on:mouseup={endDrag}
		on:touchend={endDrag}
		on:mouseleave={endDrag}
		aria-label="Kategori Filter"
		class="
		text-sm font-work-sans font-[400] tracking-tight space-x-2
		xs:w-[calc(100%+16px)] xs:-translate-x-[16px]
		flex overflow-x-scroll overflow-scroll-hidden
		xs:mask-x-from-98% xs:mask-x-to-100%
		cursor-grab active:cursor-grabbing outline-none">
		<!-- LEFT FILLER -->
		<div class="min-w-[16px] opacity-0 mr-0 max-xs:min-w-[1.6vw]">•</div>

		<!-- LOOP FILTER -->
		{#each filter as tag, i}
			<button
			tabindex={tag.label === current || tag.disabled ? -1 : 0}
			on:click={(e) => {
				if (preventClick || tag.label === current || tag.disabled) {
					e.preventDefault();
					e.stopPropagation();
					return;
				}
				changeHeroFilter(tag.label);
			}}
			class={`  
				flex justify-center items-center
				max-xs:py-[0.8vw] py-1 
				text-nowrap rounded-full
				border border-zinc-900/15
				outline-none 
				max-xs:text-[2.8vw]
				${tag.label === current ? 'text-mainlight bg-zinc-900 cursor-grab active:cursor-grabbing pointer-events-none' : 
				tag.disabled ? 'opacity-30 cursor-grab active:cursor-grabbing pointer-events-none' :
				'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
			`}>
				<!-- ICON -->
				{#if tag.icon}
					<Icon icon={tag.icon} class={`
						max-xs:ml-[1.6vw] max-xs:mr-[0.8vw] ml-2 mr-1
						${tag.label === current  ? 
						tag.color : 
						''}
					`} />
				{/if}
				<!-- LABEL -->
				<span 
					class={`${tag.icon ? 'max-xs:mr-[3.2vw] mr-4' : 'max-xs:mx-[3.2vw] mx-4'}`}
				>
					{tag.label}
				</span>
			</button>
		{/each}

		<!-- RIGHT FILLER -->
		<div class="px-[4vw] py-1 max-xs:hidden"></div>
	</div>
</div>