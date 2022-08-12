import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	name: 'c-tabs',
	shadow: false,
	props: {
		desktop_format: String,
		heading_level: String,
		mobile_format: String,
		responsive: responsive,
		tablet_format: String,
		variant: String,
		vertical_alignment: (v) => css('align-self', v),
	},
	ready() {
		const tabs = [...this.children]
			.filter((tab) => tab.tagName === 'C-TAB')
			.map((tab) => {
				tab.removeAttribute('slot')
				return `
					<h${this.heading_level} class="spicy__heading">
						${tab.getAttribute('label')}
					</h${this.heading_level}>
					${tab.outerHTML}
				`
			})
			.join('')

		this.DOM.innerHTML = `
			<style>${this.styles()}</style>
			<spicy-sections class="${this.variant}" style=
				"--const-mq-affordances: [(max-width: 480px)] ${this.mobile_format} |
					[(min-width: 480px) and (max-width: 1024px)] ${this.tablet_format} |
					[(min-width: 1024px)] ${this.desktop_format}"
			>
				${tabs}
			</spicy-sections>
		`
		import('./utils/spicy-sections'), 1000
	},
	styles() {
		return `
			spicy-sections {
				${this.responsive}
				${this.vertical_alignment}
			}
		`
	},
}
