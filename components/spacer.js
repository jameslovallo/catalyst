export default {
	component: 'c-spacer',
	shadow: true,
	props() {
		return { height: String }
	},
	template() {
		return /* html */ `<div style="height: ${this.height}px"></div>`
	},
}
