<script lang="ts">import { onMount, onDestroy, tick } from 'svelte';
	import { page } from '$lib/stores/page';
	import { contentFilter, setSafeContentFilter } from '$lib/components/browse/contentFilter';
	import { scheduleFilter, setSafeScheduleFilter } from './scheduleFilter';
	import { typeFilter, setSafetypeFilter } from './typeFilter';
	// import SearchFilter from '../searchFilter.svelte';
    import { getToday, setDayforWeekly, weeklySchedule, type Day } from './weeklySchedule';
    import { setWeekForMonthly, getCurrentWeek, monthySchedule } from './monthlySchedule';
    import { dailySchedule, getCurrentHour, setHourForDaily } from '$lib/components/browse/dailySchedule';

	type Tag = {
		disabled: boolean;
		label: string;
	};

	const content: Tag[] = [
		{ disabled: false, label: 'Schedule' },
		{ disabled: false, label: 'Official' },
		{ disabled: false, label: 'Indie' },
		{ disabled: false, label: 'Mirror' },
		{ disabled: false, label: 'Semua' },
	];

	const schedule: Tag[] = [
		{ disabled: false, label: 'Daily' },
		{ disabled: false, label: 'Weekly' },
		{ disabled: false, label: 'Monthly' },
	];

	const type: Tag[] = [
		{ disabled: false,label: 'Semua' },
		{ disabled: false,label: 'Komik' },
		{ disabled: false,label: 'Novel' },
		{ disabled: false,label: 'Visual Novel' },
	];	

	const hoursForWeek = ['03:00', '09:00', '15:00', '21:00']
	const daysForWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	const weeksForMonth = ['Week 1', 'Week 2', 'Week 3', 'Week 4']

	let currentContent: string;
	let currentSchedule: string;
	let currentType: string;
	let currentDaily: string;
	let currentWeekly: string;
	let currentMonthly: string;

	// Langganan store
	const unsubscribeContent = contentFilter.subscribe(v => currentContent = v);
	const unsubscribeSchedule = scheduleFilter.subscribe(v => currentSchedule = v);
	const unsubscribeType = typeFilter.subscribe(v => currentType = v);
	const unsubscribeDaily = dailySchedule.subscribe(v => currentDaily = v);
	const unsubscribeWeekly = weeklySchedule.subscribe(v => currentWeekly = v);
	const unsubscribeMonthly = monthySchedule.subscribe(v => currentMonthly = v);

	// Inisialisasi
	onMount(() => {
		if (!content.find(tag => tag.label === currentContent)) {
			// set default jika currentContent tidak valid
			setSafeContentFilter(content[0].label);
			setSafeScheduleFilter(schedule[0].label);
			setSafetypeFilter(schedule[0].label);
		}

		setHourForDaily(getCurrentHour())
		setDayforWeekly(getToday())
		setWeekForMonthly(getCurrentWeek())
	});

	// Hapus langganan saat komponen dihancurkan
	onDestroy(() => {
		unsubscribeContent();
		unsubscribeSchedule();
		unsubscribeType();
		unsubscribeDaily();
		unsubscribeWeekly();
		unsubscribeMonthly();
	});

	// Fungsi setter
	async function setContent(to: string) {
		setSafeContentFilter(to);
		await tick();
	}

	async function setSchedule(to: string) {
		setSafeScheduleFilter(to);
		await tick();
	}

	async function setType(to: string) {
		setSafetypeFilter(to);
		await tick();
	}
</script>




<section>

	<!-- CONTENT FILTER -->
	<div class="text-sm font-work-sans font-[400] tracking-tight xs:space-x-2 space-x-[1.6vw] flex items-center outline-none my-2 xs:my-[8px]">

		<!-- LOOP FILTER -->
		{#each content  as tag, i}
			<button
			tabindex={tag.label === currentContent || tag.disabled ? -1 : 0}
			on:click={(e) => {
				if (tag.label === currentContent || tag.disabled) {
					e.preventDefault();
					e.stopPropagation();
					return;
				}
				setContent(tag.label);
				setType("Semua");
				page.set(1)
			}}
			class={`  
				flex justify-center items-center
				max-xs:py-[0.8vw] py-1 h-fit
				text-nowrap rounded-full
				border border-zinc-900/15
				outline-none 
				max-xs:text-[2.8vw]
				${tag.label === currentContent ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
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
	
	{#if $contentFilter === 'Schedule'}
		<div class="text-sm font-work-sans font-[400] tracking-tight xs:space-x-2 space-x-[1.6vw] flex items-center outline-none my-2 xs:my-[8px]">
			<div class="font-[600] flex justify-between xs:space-x-2 space-x-[1.6vw] text-nowrap max-xs:text-[2.8vw]"><span>Schedule</span><span>:</span></div>  
			{#each schedule  as tag, i}
				<button
				tabindex={tag.label === currentSchedule || tag.disabled ? -1 : 0}
				on:click={(e) => {
					if (tag.label === currentSchedule || tag.disabled) {
						e.preventDefault();
						e.stopPropagation();
						return;
					}
					setSchedule(tag.label);
					page.set(1)
				}}
				class={`  
					flex justify-center items-center
					max-xs:py-[0.8vw] py-1 h-fit
					text-nowrap rounded-full
					border border-zinc-900/15
					outline-none 
					max-xs:text-[2.8vw]
					${tag.label === currentSchedule ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
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
		{#if $scheduleFilter === "Daily"}
			<div class="text-sm font-work-sans font-[400] tracking-tight xs:space-x-2 space-x-[1.6vw] flex items-center outline-none my-2 xs:my-[8px]"> 
				{#each hoursForWeek  as tag, i}
					<button
					tabindex={tag === currentDaily ? -1 : 0}
					on:click={(e) => {
						if (tag === currentDaily) {
							e.preventDefault();
							e.stopPropagation();
							return;
						}
						setHourForDaily(tag);
						page.set(1)
					}}
					class={`  
						flex justify-center items-center
						max-xs:py-[0.8vw] py-1 h-fit
						text-nowrap rounded-full
						border border-zinc-900/15
						outline-none 
						max-xs:text-[2.8vw]
						${tag === currentDaily ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
						'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
					`}>
						<!-- LABEL -->
						<span 
							class={`max-xs:mx-[3.2vw] mx-4 h-fit`}
						>
							{tag}
						</span>
					</button>
				{/each}
			</div>
		{:else if $scheduleFilter === "Weekly"}
			<div class="text-sm font-work-sans font-[400] tracking-tight xs:space-x-2 space-x-[1.6vw] flex items-center outline-none my-2 xs:my-[8px]"> 
				{#each daysForWeek  as tag, i}
					<button
					tabindex={tag === currentWeekly ? -1 : 0}
					on:click={(e) => {
						if (tag === currentWeekly) {
							e.preventDefault();
							e.stopPropagation();
							return;
						}
						setDayforWeekly(tag);
						page.set(1)
					}}
					class={`  
						flex justify-center items-center
						max-xs:py-[0.8vw] py-1 h-fit
						text-nowrap rounded-full
						border border-zinc-900/15
						outline-none 
						max-xs:text-[2.8vw]
						${tag === currentWeekly ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
						'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
					`}>
						<!-- LABEL -->
						<span 
							class={`max-xs:mx-[3.2vw] mx-4 h-fit`}
						>
							{tag}
						</span>
					</button>
				{/each}
			</div>
		{:else if $scheduleFilter === "Monthly"}
			<div class="text-sm font-work-sans font-[400] tracking-tight xs:space-x-2 space-x-[1.6vw] flex items-center outline-none my-2 xs:my-[8px]"> 
				{#each weeksForMonth  as tag, i}
					<button
					tabindex={tag === currentMonthly ? -1 : 0}
					on:click={(e) => {
						if (tag === currentMonthly) {
							e.preventDefault();
							e.stopPropagation();
							return;
						}
						setWeekForMonthly(tag);
						page.set(1)
					}}
					class={`  
						flex justify-center items-center
						max-xs:py-[0.8vw] py-1 h-fit
						text-nowrap rounded-full
						border border-zinc-900/15
						outline-none 
						max-xs:text-[2.8vw]
						${tag === currentMonthly ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
						'max-xs:text-zinc-900 text-zinc-900/70 max-xs:bg-white hover:bg-zinc-900/3 focus-visible:bg-sky-400/10 focus-visible:border-sky-400/50 active:bg-zinc-900/9 cursor-pointer'}
					`}>
						<!-- LABEL -->
						<span 
							class={`max-xs:mx-[3.2vw] mx-4 h-fit`}
						>
							{tag}
						</span>
					</button>
				{/each}
			</div>
		{/if}
	{:else}
		<div class="text-sm font-work-sans font-[400] tracking-tight xs:space-x-2 space-x-[1.6vw] flex items-center outline-none my-2 xs:my-[8px]">
			<div class="font-[600] flex justify-between xs:space-x-2 space-x-[1.6vw] text-nowrap max-xs:text-[2.8vw]"><span>Type</span><span>:</span></div>  
			{#each type  as tag, i}
				<button
				tabindex={tag.label === currentType || tag.disabled ? -1 : 0}
				on:click={(e) => {
					if (tag.label === currentType || tag.disabled) {
						e.preventDefault();
						e.stopPropagation();
						return;
					}
					setType(tag.label);
					page.set(1)
				}}
				class={`  
					flex justify-center items-center
					max-xs:py-[0.8vw] py-1 h-fit
					text-nowrap rounded-full
					border border-zinc-900/15
					outline-none 
					max-xs:text-[2.8vw]
					${tag.label === currentType ? 'text-mainlight bg-zinc-900 pointer-events-none' : 
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
	{/if}


</section>
