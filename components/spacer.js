export default {
	component: 'c-spacer',
	shadow: true,
	props() {
		return { height: String }
	},
	template() {
		return `<div style="height: ${this.height}"></div>`
	},
	styles() {
		return `:host { display: block }`
	},
}
