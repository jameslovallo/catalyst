import responsive from './utils/responsive'

export default {
	component: 'c-list',
	shadow: true,
	props() {
		return {
			color: (v) => (v ? v : 'primary'),
			responsive: responsive,
			role: () => 'list',
			show_dividers: JSON.parse,
			vertical_alignment: String,
		}
	},
	template() {
		return /* html */ `<slot name="content"></slot>`
	},
	styles() {
		return /* css */ `
			:host {
				${this.responsive}
				--separator: ${this.show_dividers ? '1px' : '0'};
				--list: var(--${this.color || 'primary'});
				--on-list: var(--on-${this.color || 'primary'});
				align-self: ${this.vertical_alignment};
				display: block;
				padding: 8px 0;
			}
		`
	},
}
