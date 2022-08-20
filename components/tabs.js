import '@snappywc/tabs'
import responsive from './utils/responsive'

export default {
	component: 'c-tabs',
	shadow: true,
	props() {
		return {
			breakpoint: Number,
			heading_level: String,
			layout: String,
			responsive: responsive,
			vertical_alignment: String,
		}
	},
	template() {
		return `
			<style>${this.styles()}</style>
			<slot></slot>
		`
	},
	breakpointAttr() {
		return this.breakpoint > 0 && this.layout === 'responsive'
			? `breakpoint="${this.breakpoint}px"`
			: ''
	},
	typeAttr() {
		return `type="${this.layout}"`
	},
	tabs() {
		return [...this.children]
			.filter((tab) => tab.tagName === 'C-TAB')
			.map((tab, i) => {
				tab.removeAttribute('slot')
				return /* html */ `
					<h${this.heading_level}
						slot="tab"
						style="font: inherit; color: var(--on-surface);">
						${tab.getAttribute('label')}
					</h${this.heading_level}>
					<div slot="panel">
						${tab.outerHTML}
					</div>
				`
			})
			.join('')
	},
	ready() {
		const attrs = [this.breakpointAttr(), this.typeAttr()].join(' ')
		this.innerHTML = /* html */ `
			<snappy-tabs ${attrs}>
				${this.tabs()}
			</snappy-tabs>
		`
	},
	styles() {
		return /* css */ `
			:host {
				${this.responsive}
				align-self: ${this.vertical_alignment};
			}
		`
	},
}
