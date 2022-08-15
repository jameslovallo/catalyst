export default {
	name: 'c-spacer',
	shadow: true,
	props: { height: String },
	template() {
		return `<div style="height: ${this.height}"></div>`
	},
	styles() {
		return `
			:host {
				display: block;
			}
		`
	},
}
