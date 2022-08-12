import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	name: 'c-code',
	shadow: true,
	props: {
		css: String,
		html: String,
		javascript: String,
		responsive: responsive,
		vertical_alignment: (v) => css('align-self', v),
	},
	ready() {
		this.innerHTML = `<style>${this.css}</style>` + this.html
		const tag = document.createElement('script')
		tag.type = 'module'
		tag.innerHTML = this.javascript
		this.appendChild(tag)
	},
	template() {
		return '<slot></slot>'
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
