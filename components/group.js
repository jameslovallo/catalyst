import responsive from './utils/responsive'

export default {
	component: 'c-group',
	shadow: true,
	props() {
		return {
			responsive: responsive,
			vertical_alignment: String,
		}
	},
	template() {
		return /* html */ `<slot name="content"></slot>`
	},
	styles() {
		return `
			:host {
				${this.responsive}
				align-self: ${this.vertical_alignment}
			}
		`
	},
}
