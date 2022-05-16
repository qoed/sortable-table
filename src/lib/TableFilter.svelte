<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IonFilter from './icons/IonFilter.svelte';

	export let data: Record<string, any>[];
	export let columns: { name: string; label: string }[] = Object.keys(data[0]).map((key) => {
		return { name: key, label: key };
	});
	export let cssVars: Record<string, string> = {};

	$: cssVarStyles = Object.entries(cssVars)
		.map(([key, value]) => `${key}:${value}`)
		.join(';');

	const dispatch = createEventDispatcher();
	let filterInput: HTMLElement;
	let filteredData: Record<string, any>[];
	let filterQuery: string = '';
	let filterTimeoutId: any = null;
	let filterBy = columns[0].name;
	let init = true;

	$: {
		if (init) {
			init = false;
		} else {
			let query = filterQuery.toLowerCase();
			runFilter(query, filterBy);
		}
	}

	function runFilter(query: string, filterBy: string) {
		if (filterTimeoutId) {
			clearTimeout(filterTimeoutId);
		}
		filterTimeoutId = setTimeout(() => {
			if (query.length > 0) {
				filteredData = data.filter((d) => d[filterBy].toLowerCase().includes(query));
			}
			if (query.length === 0) {
				filteredData = [...data];
			}
			dispatch('query', { data: filteredData, query });
			filterTimeoutId = null;
		}, 350);
	}
</script>

<div class="filter-container" style={cssVarStyles}>
	<div on:click={() => filterInput.focus()} style="position: relative; cursor: text;">
		<div style="color:rgb(156 163 175);">
			<div class="filter-icon">
				<IonFilter />
			</div>
			{#if !filterQuery}
				<p class="filter-placeholder">filter</p>
			{/if}
		</div>
		<input bind:this={filterInput} class="filter" type="text" bind:value={filterQuery} />
	</div>

	<div class="filter-by-container">
		{#each columns as col}
			<label class="filter-by-label">
				<input
					class="filter-by"
					type="radio"
					bind:group={filterBy}
					name="filterBy"
					value={col.name}
				/>
				{col.label}
			</label>
		{/each}
	</div>
</div>

<style>
	p {
		margin: 0;
	}
	.filter-container {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.2rem;
	}
	.filter-by-container {
		margin-top: 0.5rem;
	}
	.filter-by-label {
		margin-right: 1rem;
	}
	.filter-icon,
	.filter-placeholder {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.filter-icon {
		left: 0.75rem;
		font-size: 1.25rem /* 20px */;
		display: flex;
	}
	.filter-placeholder {
		left: 2.75rem;
		font: inherit;
		font-size: inherit;
		line-height: inherit;
	}
	.filter {
		font: inherit;
		font-size: inherit;
		line-height: inherit;
		color: var(--font-color, currentColor);
		padding: 0.5rem 1rem 0.5rem 2.5rem;
		border-radius: 50rem;
		border: var(--border-width, 2px) solid var(--border-color, rgba(0, 0, 0, 0.2));
		background-color: var(--query-field-bg, transparent);
	}
	.filter:focus-visible {
		outline: none;
		border-color: var(--outline-color);
		box-shadow: 0 0 0 var(--outline-width) var(--outline-color);
	}
</style>
