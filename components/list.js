import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	component: 'c-list',
	shadow: true,
	props() {
		return {
			color: (v) => (v ? v : 'primary'),
			responsive: responsive,
			role: () => 'list',
			show_dividers: (v) => css('--separator', JSON.parse(v) ? '1px' : '0'),
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
				${this.show_dividers}
				--list: var(--${this.color || 'primary'});
				--on-list: var(--on-${this.color || 'primary'});
				align-self: ${this.vertical_alignment};
				list-style: none;
				margin: 0;
				padding: 8px 0;
			}
		`
	},
}
