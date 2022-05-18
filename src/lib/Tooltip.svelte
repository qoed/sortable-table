<script lang="ts">
	import { tooltip } from '$lib/hover';

	export let text: string;

	let visible = false;
	let tooltipPosition = {
		renderTop: true
	};

	function handleShow(ev: CustomEvent) {
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
		background-color: #000;
		color: #fff;
		text-align: center;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
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
		top: 98%;
		margin-left: -10px;
		border-width: 10px;
	}

	.position-bottom::after {
		bottom: 98%;
		margin-left: -10px;
		border-width: 10px;
		transform: rotate(180deg);
	}

	/* Tooltip arrow */
	.tooltip-container::after {
		content: '';
		position: absolute;
		left: 10%;
		border-style: solid;
		border-color: #000 transparent transparent transparent;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.visible {
		visibility: visible;
		opacity: 1;
	}
</style>
