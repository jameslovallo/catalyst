import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	component: 'c-group',
	shadow: true,
	props() {
		return {
			responsive: responsive,
			vertical_alignment: (v) => css('align-self', v),
		}
	},
	template() {
		return `<slot name="content"></slot>`
	},
	styles() {
		return `
			:host {
				${this.responsive}
				${this.vertical_alignment}
			}
		`
	},
}
