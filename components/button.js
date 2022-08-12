import css from './utils/css-prop'
import link from './utils/link'

export default {
	name: 'c-button',
	shadow: true,
	props: {
		color: (v) => (v ? v : 'primary'),
		icon: JSON.parse,
		label: String,
		link: link,
		rounded: (v) => css('border-radius', JSON.parse(v) ? '18px' : '4px'),
		stretch: JSON.parse,
		trailing_icon: JSON.parse,
		variant: 'variant',
	},
	methods: {
		variant(v) {
			const invert = '--background: transparent; --color: var(--button);'
			switch (v) {
				case 'icon':
					return ``
				case 'outlined':
					return `
						:host { 
							${invert}
							box-shadow: 0 0 0 1px var(--button);
							margin: 1px; 
						}
					`
				case 'raised':
					return `
						:host { 
							box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
								0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
						}
					`
				case 'subtle':
					return `
						:host { color: var(--button); background: transparent; }
						[part=background] {
							opacity: 0.1;
							--hover-opacity: 0.2;
							--active-opacity: 0.3;
						}
					`
				case 'text':
					return `:host { ${invert} --padding: 0 8px; }`
			}
		},
	},
	template() {
		return `
			<span part="background"></span>
			<a href="${this.link}">
				${this.icon?.icon ? this.icon.icon : ''}
				${this.label ? `<span>${this.label}</span>` : ''}
			</a>
		`
	},
	styles() {
		return `
			:host {
				${this.rounded}
				${css('flex-grow', this.stretch ? 1 : 0)}
				--button: var(--${this.color});
				--on-button: var(--on-${this.color});
				--background: var(--button);
				--color: var(--on-button);
				background: var(--background);
				color: var(--color);
				display: inline-grid;
				min-height: 36px;
				overflow: hidden;
			}
			[part=background] {
				background: currentcolor;
				opacity: 0;
			}
			:host(:hover) [part=background] {
				opacity: var(--hover-opacity);
			}
			:host(:active) [part=background] {
				opacity: var(--active-opacity);
			}
			[part=background], a {
				grid-area: 1/-1;
			}
			a {
				${css('flex-direction', this.trailing_icon ? 'row-reverse' : undefined)}
				${css('justify-content', this.stretch ? 'space-between' : 'center')}
				align-items: center;
				color: inherit;
				cursor: pointer;
				display: flex;
				font-family: var(--ui-family);
				font-size: 14px;
				font-weight: 500;
				gap: 8px;
				justify-content: center;
				letter-spacing: 1.25px;
				padding: var(--padding, 0 16px);
				text-decoration: none;
				text-transform: uppercase;
				user-select: none;
				z-index: 1;
			}
			svg {
				fill: currentcolor;
				height: 18px;
				width: 18px;
			}
			${this.variant}
		`
	},
}
