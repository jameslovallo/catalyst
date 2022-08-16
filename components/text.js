import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	component: 'c-textrich',
	shadow: true,
	props() {
		return {
			alignment: (v) => css('text-align', v),
			responsive: responsive,
			vertical_alignment: (v) => css('align-self', v),
		}
	},
	template() {
		return `<slot></slot>`
	},
	styles() {
		return `
			:host {
				${this.responsive}
				${this.vertical_alignment}
				${this.alignment}
			}
		`
	},
}
