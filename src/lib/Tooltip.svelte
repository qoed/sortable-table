<script lang="ts">
	import { browser } from '$app/env';
	import { tooltip } from '$lib/hover';

	export let text: string;

	let visible = false;
	let tooltipPosition = {
		renderTop: true
	};

	function handleShow(ev: CustomEvent) {
		// doesTooltipFit(tooltipEl);
		tooltipPosition = ev.detail;
		visible = true;
	}
	function handleHide() {
		visible = false;
	}
</script>

<span
	use:tooltip
	on:show={handleShow}
	on:hide={handleHide}
	class="tooltip-container"
	class:visible
	class:position-bottom={!tooltipPosition.renderTop}
	class:position-top={tooltipPosition.renderTop}
>
	{text}
</span>

<style>
	.tooltip-container {
		position: absolute;
		left: 0;
		visibility: hidden;
		background-color: #555;
		color: #fff;
		text-align: center;
		padding: 5px 8px;
		border-radius: 6px;
		z-index: 1;
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
	.tooltip-container::after {
		content: '';
		position: absolute;
		left: 10%;
		border-style: solid;
		border-color: #555 transparent transparent transparent;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.visible {
		visibility: visible;
		opacity: 1;
	}
</style>
