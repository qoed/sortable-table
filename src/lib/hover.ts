export function tooltip(node: HTMLSpanElement) {
	function calculatePosition(tooltip: HTMLSpanElement) {
		let renderTop;
		// the table data cell this tooltip is rendered for
		const tdRect = tooltip.parentElement!.getBoundingClientRect();
		// tooltip itself
		const tooltipRect = tooltip.getBoundingClientRect();
		// the parent table
		const tableRect = document.querySelector('table')!.getBoundingClientRect();

		const startingPosition = tdRect.top - tooltipRect.height;
		const threshold = 20;

		// controlls if the tooltip renders on top or bottom of the cell, depending on where it fits
		if (startingPosition - threshold < tableRect.top) {
			renderTop = false;
		} else {
			renderTop = true;
		}

		return {
			renderTop
		};
	}

	const handleMouseEnter = () => {
		const tooltipPosition = calculatePosition(node);
		node.dispatchEvent(new CustomEvent('show', { detail: tooltipPosition }));
	};

	const handleMouseLeave = () => {
		node.dispatchEvent(new CustomEvent('hide'));
	};

	// register event listeners on td elements
	node.parentElement!.addEventListener('mouseenter', handleMouseEnter, true);
	node.parentElement!.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			node.parentElement!.removeEventListener('mouseenter', handleMouseEnter);
			node.parentElement!.removeEventListener('mouseleave', handleMouseLeave);
		}
	};
}
