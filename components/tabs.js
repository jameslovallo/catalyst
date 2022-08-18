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
	ready() {
		const breakpoint =
			this.breakpoint > 0 && this.layout === 'responsive' ? `breakpoint="${this.breakpoint}px"` : ''
		const type = this.breakpoint > 0 && this.layout !== 'responsive' ? '' : `type="${this.layout}"`
		const tabs = [...this.children]
			.filter((tab) => tab.tagName === 'C-TAB')
			.map((tab, i) => {
				tab.removeAttribute('slot')
				return /* html */ `
					<details ${i === 0 ? 'open' : ''}>
						<summary>
							<div part="background"></div>
							<h${this.heading_level}>
								${tab.getAttribute('label')}
							</h${this.heading_level}>
						</summary>
						${tab.outerHTML}
					</details>
				`
			})
			.join('')
		this.innerHTML = /* html */ `
			<snappy-tabs ${[breakpoint, type].join(' ')}>
				${tabs}
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
