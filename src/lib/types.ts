export interface CSSVars {
	'--color-column-header-border'?: string;
	'--color-row'?: string;
	'--color-row-hover'?: string;
	'--color-first-column'?: string;
	'--text-decoration-first-column'?: string;
	'--cursor-first-column'?: string;
}

export interface TableColumn {
	name: string;
	label: string;
	tooltip?: string;
}
