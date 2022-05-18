export function tooltip(node: HTMLSpanElement) {
	const td = node.parentElement!;

	function calculatePosition() {
		let renderTop;
		// the table data cell this tooltip is rendered for
		const tdRect = td.getBoundingClientRect();
		// tooltip itself
		const tooltipRect = node.getBoundingClientRect();
		const startingPosition = tdRect.top - tooltipRect.height;

		// controlls if the tooltip renders on top or bottom of the cell, depending on where it fits
		if (startingPosition < 0) {
			renderTop = false;
		} else {
			renderTop = true;
		}

		return {
			renderTop
		};
	}

	const handleMouseEnter = () => {
		const tooltipPosition = calculatePosition();
		node.dispatchEvent(new CustomEvent('show', { detail: tooltipPosition }));
	};

	const handleMouseLeave = () => {
		node.dispatchEvent(new CustomEvent('hide'));
	};

	// register event listeners on td element
	td.addEventListener('mouseenter', handleMouseEnter, true);
	td.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			td.removeEventListener('mouseenter', handleMouseEnter);
			td.removeEventListener('mouseleave', handleMouseLeave);
		}
	};
}
