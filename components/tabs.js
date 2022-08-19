import '@snappywc/tabs'
import css from './utils/css-prop'
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
			variant: this.set_variant,
			vertical_alignment: (v) => css('align-self', v),
		}
	},
	set_variant(v) {
		return v === 'outlined'
			? 'box-shadow: 0 0 0 1px var(--surface-border); margin: 1px;'
			: 'box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);'
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
					<div part="background"></div>
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
				${this.variant}
				${this.vertical_alignment}
				background: var(--surface);
				border-color: var(--surface-border);
				border-radius: 4px;
				color: var(--on-surface);
			}
		`
	},
}
