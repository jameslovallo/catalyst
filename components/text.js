import responsive from './utils/responsive'

export default {
	component: 'c-textrich',
	shadow: true,
	props() {
		return {
			alignment: String,
			responsive: responsive,
			vertical_alignment: String,
		}
	},
	template() {
		return /* html */ `<slot></slot>`
	},
	styles() {
		return /* css */ `
			:host {
				${this.responsive}
				align-self: ${this.vertical_alignment};
				display: block;
				text-align: ${this.alignment};
			}
		`
	},
}
