# sortable-table

[![npm (scoped)](https://img.shields.io/npm/v/@qoed/sortable-table?color=d76525)](https://www.npmjs.com/package/@qoed/sortable-table)

A sortable table component for SvelteKit apps.

## Overview

- 🔑 Built with TypeScript
- 🖌️ Configurable styles using css variables
- 🔍 Table filter
- 🔧 Sortable columns
- ℹ️ Tooltips

## Install

```
npm install @qoed/sortable-table
```

## Usage

Example usage is setup in the git repo https://github.com/qoed/sortable-table/blob/main/src/routes/index.svelte

```html
<script lang="ts">
	import type { CSSVars, TableColumn } from '@qoed/sortable-table';
	import { SortableTable, TableFilter } from '@qoed/sortable-table';

	let data = [
		{
			name: 'Item 1',
			description: 'The first item',
			url: 'https://kit.svelte.dev/docs/introduction'
		},
		{ name: 'Item 2', description: 'The second item', url: 'https://google.com' },
		{ name: 'Item 3', description: 'The third item', url: 'https://google.com' }
	];

	let filteredData = [...data];

	const columns: TableColumn[] = [
		{
			label: 'Name',
			name: 'name',
			tooltip: 'url'
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

	let cssVars: CSSVars = {
		'--color-first-column': 'RoyalBlue',
		'--text-decoration-first-column': 'underline',
		'--cursor-first-column': 'pointer'
	};

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

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button type="button" on:click="{loadingDemo}">Demo loading state</button>

<TableFilter {data} on:query="{updateData}" />
<SortableTable
	data="{filteredData}"
	{columns}
	initiallySortByColumn="name"
	onFirstColClick="{handleFirstColClick}"
	{loading}
	{cssVars}
/>
```

## Configuration

### Props

#### data: Record<string, any>[]

The data to display in the table.

#### columns: TableColumn[]

The columns to display, should match field names from the _data_. The interface is exposed and can be imported in your app:

```javascript
import type { TableColumn } from '@qoed/sortable-table';
```

#### initiallySortByColumn: string

Should be a field name from the _data_, will be used to select a column that the data is initially sorted by.

#### initialSortDirection: asc|desc

Optional, defaults to 'asc', can be set to 'desc'. Controlls the initial sort direction.

#### onRowClick: (row: Record<string, any>) => void

Optional, use this if you want to execute some logic when a table row is clicked. The row itself is passed as the first argument to the function.

#### onFirstColClick: (row: Record<string, any>) => void

Optional, use this if you want to execute some logic when the first column of a table row is clicked. The row itself is passed as the first argument to the function.

#### cssVars: CSSVars

Optional, use this to style elements of the table. The interface is exposed and can be imported in your app:

```javascript
import type { CSSVars } from '@qoed/sortable-table';
```

#### loading: boolean

Optional, use this to display a loading spinner while table content is loading.
