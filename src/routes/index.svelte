<script lang="ts">
	import { SortableTable } from '@qoed/sortable-table';

	let data = [
		{ name: 'Item 1', description: 'The first item', url: 'https://google.com' },
		{ name: 'Item 2', description: 'The second item', url: 'https://google.com' },
		{ name: 'Item 3', description: 'The third item', url: 'https://google.com' }
	];

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
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button type="button" on:click={loadingDemo}>Demo loading state</button>
<SortableTable
	{columns}
	{data}
	initiallySortByColumn="name"
	onFirstColClick={(row) => {
		console.log(row);
	}}
	{loading}
/>
