import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	name: 'c-list',
	shadow: true,
	props: {
		color: (v) => (v ? v : 'primary'),
		responsive: responsive,
		role: () => 'list',
		show_dividers: (v) => css('--separator', JSON.parse(v) ? '1px' : '0'),
		vertical_alignment: (v) => css('align-self', v),
	},
	template() {
		return `<slot name="content"></slot>`
	},
	styles() {
		return `
			:host {
				${this.responsive}
				${this.show_dividers}
				${this.vertical_alignment}
				--list: var(--${this.color});
				--on-list: var(--on-${this.color});
				list-style: none;
				margin: 0;
				padding: 8px 0;
			}
		`
	},
}
