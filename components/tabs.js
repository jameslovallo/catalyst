import '@snappywc/tabs'
import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	name: 'c-tabs',
	shadow: true,
	props: {
		desktop_format: String,
		heading_level: String,
		mobile_format: String,
		responsive: responsive,
		tablet_format: String,
		variant: String,
		vertical_alignment: (v) => css('align-self', v),
	},
	template() {
		const tabs = [...this.children]
			.filter((tab) => tab.tagName === 'C-TAB')
			.map((tab, i) => {
				tab.removeAttribute('slot')
				return `
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
		return `
			<style>${this.styles()}</style>
			<snappy-tabs type="tabs">${tabs}</snappy-tabs>
		`
	},
	styles() {
		return `
			:host {
				${this.responsive}
				${this.vertical_alignment}
			}
			snappy-tabs {
				background: var(--surface);
				border-color: var(--surface-border);
				color: var(--on-surface);
			}
			snappy-tabs::part(tab) {
				border-color: var(--surface-border);
				font-family: var(--ui-family);
				font-size: 14px;
				font-weight: 500;
				letter-spacing: 1.25px;
				text-align: center;
				text-transform: uppercase;
				user-select: none;
			}
			snappy-tabs::part(background) {
				background: var(--primary);
				bottom: 0;
				left: 0;
				opacity: 0;
				position: absolute;
				right: 0;
				top: 0;
			}
			snappy-tabs::part(background):hover {
				opacity: var(--hover-opacity);
			}
			snappy-tabs::part(background):active {
				opacity: var(--active-opacity);
			}
			snappy-tabs::part(indicator) {
				background: var(--primary);
			}
		`
	},
}
