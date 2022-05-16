# sortable-table

[![npm (scoped)](https://img.shields.io/npm/v/@qoed/sortable-table?color=d76525)](https://www.npmjs.com/package/@qoed/sortable-table)

## Usage

Example usage is setup in the git repo https://github.com/qoed/sortable-table/blob/main/src/routes/index.svelte

```html
<script lang="ts">
	import { SortableTable, TableFilter } from '@qoed/sortable-table';

	let data = [
		{ name: 'Item 1', description: 'The first item', url: 'https://google.com' },
		{ name: 'Item 2', description: 'The second item', url: 'https://google.com' },
		{ name: 'Item 3', description: 'The third item', url: 'https://google.com' }
	];

	let filteredData = [...data];

	const columns: { label: string; name: string; tooltip?: string }[] = [
		{
			label: 'Name',
			name: 'name'
		},
		{
			label: 'Description',
			name: 'description'
		},
		{
			label: 'URL',
			name: 'url',
			tooltip: 'url'
		}
	];

	let loading = false;

	function loadingDemo() {
		loading = true;
		setTimeout(() => {
			loading = false;
		}, 1000);
	}

	function updateData(e: { detail: { data: any; query: string } }) {
		filteredData = e.detail.data;
		console.log(`query used was: ${e.detail.query}`);
	}

	function handleFirstColClick(row: Record<string, any>): void {
		console.log(row);
	}
</script>

<TableFilter {data} on:query="{updateData}" />
<SortableTable
	data="{filteredData}"
	columns="{columns}"
	initiallySortByColumn="name"
	onFirstColClick="{handleFirstColClick}"
	loading="{loading}"
/>
```
