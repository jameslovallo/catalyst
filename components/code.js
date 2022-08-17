import css from './utils/css-prop'
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
			vertical_alignment: (v) => css('align-self', v),
		}
	},
	ready() {
		this.innerHTML = `<style>${this.css}</style>` + this.html
		if (this.javascript) {
			const tag = document.createElement('script')
			tag.type = 'module'
			tag.innerHTML = this.javascript
			this.appendChild(tag)
		}
	},
	template() {
		return '<slot></slot>'
	},
	styles() {
		return `
			:host {
				${this.responsive}
				${this.vertical_alignment}
				display: block;
			}
		`
	},
}
