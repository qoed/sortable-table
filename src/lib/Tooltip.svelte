<script lang="ts">
	import { browser } from '$app/env';

	import { onDestroy, onMount } from 'svelte';

	export let text: string;

	let tooltipEl: HTMLSpanElement;
	let visible = false;
	let renderLeft = true;
	let tooltipHorizontalPosition = 0;
	let tooltipArrowHorizontalPosition = 0;
	let renderTop = true;

	function doesTooltipFit(tooltip: HTMLSpanElement) {
		if (tooltip) {
			// the element this tooltip is rendered for
			const parentRect = tooltip.parentElement!.getBoundingClientRect();
			// tooltip itself
			const tooltipRect = tooltip.getBoundingClientRect();
			// the parent table
			const tableRect = document.querySelector('table')!.getBoundingClientRect();

			const startingPosition = parentRect.top - tooltipRect.height;
			const threshold = 20;

			// controlls if the tooltip renders to the left of the cell depending on if it fits
			if (tooltipRect.left < 0) {
				tooltipHorizontalPosition = tooltipRect.width / 2;
				tooltipArrowHorizontalPosition = 10;
				renderLeft = false;
			} else {
				tooltipArrowHorizontalPosition = 50;
				renderLeft = true;
			}
			// controlls if the tooltip renders on top or bottom of the cell, depending on where it fits
			if (startingPosition - threshold < tableRect.top) {
				renderTop = false;
			} else {
				renderTop = true;
			}
		}
	}

	function handleMouseEnter(ev: MouseEvent) {
		doesTooltipFit(tooltipEl);
		visible = true;
	}
	function handleMouseLeave(ev: MouseEvent) {
		visible = false;
		tooltipHorizontalPosition = 0;
	}

	function tooltipCheck(element: HTMLSpanElement, destroy: boolean = false) {
		if (element) {
			if (!destroy) {
				element.parentElement!.addEventListener('mouseenter', handleMouseEnter);
				element.parentElement!.addEventListener('mouseleave', handleMouseLeave);
				return;
			}

			element.parentElement!.removeEventListener('mouseenter', handleMouseEnter);
			element.parentElement!.removeEventListener('mouseleave', handleMouseLeave);
		}
	}

	onMount(() => {
		if (browser) {
			tooltipCheck(tooltipEl);
		}
	});

	onDestroy(() => {
		if (browser) {
			tooltipCheck(tooltipEl, true);
		}
	});
</script>

<span
	bind:this={tooltipEl}
	style={`--tooltipHorizontalPosition: ${tooltipHorizontalPosition}px; --tooltipArrowHorizontalPosition: ${tooltipArrowHorizontalPosition}%;`}
	class="tooltip-text"
	class:visible
	class:position-bottom={!renderTop}
	class:position-top={renderTop}
	class:position-left={renderLeft}
	class:position-right={!renderLeft}
>
	{text}
</span>

<style>
	.tooltip-text {
		visibility: hidden;
		background-color: #555;
		color: #fff;
		text-align: center;
		padding: 5px 8px;
		border-radius: 6px;

		/* Position the tooltip text */
		position: absolute;
		z-index: 1;

		/* left: 2rem; */

		transform: translateX(-50%);

		/* Fade in tooltip */
		opacity: 0;
		transition: opacity 0.3s;
	}
	.position-top {
		bottom: 100%;
	}

	.position-bottom {
		top: 100%;
	}

	.position-left {
		left: 2rem;
	}

	.position-right {
		left: var(--tooltipHorizontalPosition);
	}

	.position-top::after {
		top: 100%;
		margin-left: -5px;
		border-width: 5px;
	}

	.position-bottom::after {
		bottom: 100%;
		margin-left: -5px;
		border-width: 5px;
		transform: rotate(180deg);
	}

	/* Tooltip arrow */
	.tooltip-text::after {
		content: '';
		position: absolute;

		left: var(--tooltipArrowHorizontalPosition);

		border-style: solid;
		border-color: #555 transparent transparent transparent;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.visible {
		visibility: visible;
		opacity: 1;
	}
</style>
