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
		return /* html */ `<slot></slot>`
	},
	styles() {
		return /* css */ `
			:host {
				${this.responsive}
				${this.vertical_alignment}
				${this.alignment}
				display: block;
			}
		`
	},
}
