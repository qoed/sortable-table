<script lang="ts">
	import Tooltip from '$lib/Tooltip.svelte';
	import IonArrowDownB from '$lib/icons/IonArrowDownB.svelte';
	import IonArrowUpB from '$lib/icons/IonArrowUpB.svelte';
	import LoadingSpinner from '$lib/icons/LoadingSpinner.svelte';
	import type { CSSVars, TableColumn } from '$lib/types';

	export let data: Record<string, any>[];
	export let columns: TableColumn[];
	export let initiallySortByColumn: string;
	export let initialSortDirection: 'asc' | 'desc' = 'asc';
	export let onRowClick: ((row: Record<string, any>) => void) | null = null;
	export let onFirstColClick: ((row: Record<string, any>) => void) | null = null;
	export let cssVars: CSSVars = {};
	export let loading: boolean = false;

	$: cssVarStyles = Object.entries(cssVars)
		.map(([key, value]) => `${key}:${value}`)
		.join(';');

	let sortedData: Record<string, any>[] = [];
	let previouslyClickedColumn = initiallySortByColumn;
	let direction = initialSortDirection;

	$: {
		sortData(data);
	}

	function handleColumnClick(clickedColumn: string) {
		// toggle direction
		if (previouslyClickedColumn === clickedColumn && direction === 'desc') {
			direction = 'asc';
		} else {
			direction = 'desc';
		}
		sortData(data, clickedColumn);

		previouslyClickedColumn = clickedColumn;
	}

	function sortData(dataSet: Record<string, any>[], colName?: string) {
		let col = colName ? colName : previouslyClickedColumn;

		sortedData = [...dataSet].sort((a, b) => {
			if (direction === 'asc') return a[col] > b[col] ? 1 : -1;
			return a[col] > b[col] ? -1 : 1;
		});
	}

	function handleRowClick(row: Record<string, any>) {
		if (onRowClick) {
			onRowClick(row);
		}
	}
	function handleFirstColClick(row: Record<string, any>) {
		if (onFirstColClick) {
			onFirstColClick(row);
		}
	}

	function getValue(row: Record<string, any>, key: string): string {
		const keys = key.split('.');
		const currentKey = keys[0];

		if (keys.length === 1) {
			return row[currentKey];
		}
		return getValue(row[currentKey], keys.slice(1).join('.'));
	}
</script>

<table style={cssVarStyles}>
	<thead>
		<tr class="col-headers">
			{#each columns as col}
				<th on:click={() => handleColumnClick(col.name)}>
					<div class="col-header-container">
						<span>
							{col.label}
						</span>
						{#if previouslyClickedColumn === col.name && direction === 'asc'}
							<IonArrowUpB />
						{:else if previouslyClickedColumn === col.name && direction === 'desc'}
							<IonArrowDownB />
						{/if}
					</div>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#if loading}
			<div style="display:flex;align-items:center">
				<LoadingSpinner />
			</div>
		{:else}
			{#each sortedData as row}
				<tr class="row" on:click={() => handleRowClick(row)}>
					{#each columns as col, i}
						{#if i === 0}
							<td class="first-col" on:click={() => handleFirstColClick(row)}>
								<div>
									{getValue(row, col.name)}
								</div>
								{#if col.tooltip && row[col.tooltip].length > 30}
									<Tooltip text={row[col.tooltip]} />
								{/if}
							</td>
						{:else}
							<td class="data-col">
								<div class="data-col__content">
									{getValue(row, col.name)}
								</div>
								{#if col.tooltip && row[col.tooltip].length > 30}
									<Tooltip text={row[col.tooltip]} />
								{/if}
							</td>
						{/if}
					{/each}
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<style>
	table {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font: inherit;
		width: 100%;
		border-collapse: collapse;
	}
	tbody {
		position: relative;
	}
	td,
	th {
		height: 1rem;
		text-align: left;
		padding: 0.75rem;
	}
	th {
		user-select: none;
		cursor: pointer;
		font-weight: 500;
	}
	/* td {
		overflow-wrap: break-word;
		word-break: break-all;
	} */
	.col-headers {
		border-bottom: 1px solid var(--color-column-header-border, rgba(0, 0, 0, 0.2));
	}
	.col-header-container {
		display: flex;
		align-items: center;
	}
	.row {
		transition: background-color 0.3s;
	}
	.row:nth-child(2n + 2) {
		background-color: var(--color-row, rgb(240, 239, 239));
	}
	.row:hover {
		background-color: var(--color-row-hover, rgb(210, 210, 210));
	}
	.first-col {
		position: relative;
		text-decoration: var(--text-decoration-first-column, none);
		cursor: var(--cursor-first-column, text);
		color: var(--color-first-column, inherit);
	}
	.data-col {
		position: relative;
	}
	.data-col__content {
		min-width: max-content;
	}
</style>
