import responsive from './utils/responsive'

export default {
	component: 'c-code',
	shadow: true,
	props() {
		return {
			css: String,
			html: String,
			javascript: String,
			responsive: responsive,
			vertical_alignment: String,
		}
	},
	ready() {
		this.innerHTML += /* html */ `<style>${this.css}</style>`
		if (this.javascript) {
			const tag = document.createElement('script')
			tag.type = 'module'
			tag.innerHTML = this.javascript
			this.appendChild(tag)
		}
	},
	template() {
		return /* html */ `<slot></slot>`
	},
	styles() {
		return /* css */ `
			:host {
				${this.responsive}
				align-self: ${this.vertical_alignment}
				display: block;
			}
		`
	},
}
