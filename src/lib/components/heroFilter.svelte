<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	type Tag = {
		label: string;
		icon?: string;
	};

	const filter: Tag[] = [
		{ label: 'Rekomendasi', icon: 'material-symbols:bolt' },
		{ label: 'Baru Rilis', icon: 'mingcute:large-arrow-up-fill' },
		{ label: 'Ringan', icon: 'fa6-solid:feather-pointed' },
		{ label: 'Bacaan Pendek', icon: 'material-symbols:short-text-rounded' },
		{ label: 'Banyak Chapter', icon: 'material-symbols:folder-copy-rounded' },
		{ label: 'Upload Mingguan', icon: 'mingcute:calendar-month-fill' },
		{ label: 'Upload Bulanan', icon: 'mingcute:calendar-month-fill' },
		{ label: 'Upload Sesuai Mood Author', icon: 'material-symbols:person-rounded' },
		{ label: 'Komik Adaptasi Novel', icon: 'material-symbols:person-4-rounded' },
		{ label: 'Emosional' },
		{ label: 'Sedang Ramai' },
		{ label: 'Shounen' },
		{ label: 'Shoujo' },
		{ label: 'Sejarah' },
		{ label: 'Dewasa' },
		{ label: 'Lainnya' }
	];

	let scroller: HTMLDivElement;
	let isDragging = false;
	let startX = 0;
	let scrollStart = 0;

	function startDrag(e: MouseEvent | TouchEvent) {
		isDragging = true;
		startX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
		scrollStart = scroller.scrollLeft;
	}

	function duringDrag(e: MouseEvent | TouchEvent) {
		if (!isDragging) return;
		const x = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
		const walk = startX - x;
		scroller.scrollLeft = scrollStart + walk;
	}

	function endDrag() {
		if (!isDragging) return;
		isDragging = false;
		snapToNearest();
	}

	let buttonRefs: HTMLButtonElement[] = [];

	function snapToNearest() {
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

	// track scroll end with timeout
	let scrollTimeout: ReturnType<typeof setTimeout>;
	function onScroll() {
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(snapToNearest, 80);
	}

	onMount(() => {
		buttonRefs = Array.from(scroller.querySelectorAll('button'));
	});
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

<!-- Outer wrapper -->
<div class="w-full md:max-w-[770px] lg:max-w-[946px] xl:max-w-[1100px] pl-1.5">
    <!-- <div class="text-sm font-work-sans space-x-2 w-[calc(100%+16px)] bg-red-200 -translate-x-[16px] font-[400] tracking-tight mt-5 flex overflow-x-scroll overflow-scroll-hidden mask-x-from-98% mask-x-to-100%"> -->

		<!-- Scrollable content -->
		<div
			bind:this={scroller}
			class="text-sm font-work-sans space-x-2 w-[calc(100%+16px) -translate-x-[16px] font-[400] tracking-tight mt-5 flex overflow-x-scroll overflow-scroll-hidden mask-x-from-98% mask-x-to-100% cursor-grab active:cursor-grabbing"
			on:scroll={onScroll}
			on:mousedown={startDrag}
			on:touchstart={startDrag}
			on:mousemove|passive={duringDrag}
			on:touchmove|passive={duringDrag}
			on:mouseup={endDrag}
			on:touchend={endDrag}
			on:mouseleave={endDrag}
			aria-label="Kategori Filter"
			role="group"
		>
			<!-- Left filler -->
			<div class="w-[16px] aspect-square opacity-0" aria-hidden="true">•</div>

			<!-- Loop kategori -->
			{#each filter as tag, i}
				<button
					class="flex justify-center items-center
        py-1 border-1 focus:outline-none focus:bg-zinc-900/6 rounded-full border-zinc-900/15 text-nowrap text-zinc-900/70 hover:bg-zinc-900/3 active:bg-zinc-900/9 cursor-pointer active:cursor-grabbing"
				>
					{#if tag.icon}
						<Icon icon={tag.icon} class="ml-2 mr-1" />
					{/if}
					<span class={`mr-4 ${tag.icon ? 'mr-4' : 'mx-4'}`}>{tag.label}</span>
				</button>
			{/each}

			<!-- Right filler -->
			<div class="px-[4vw] py-1" aria-hidden="true" />
		</div>

	<!-- </div> -->
</div>