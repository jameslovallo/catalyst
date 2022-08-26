import link from './utils/link'

export default {
	component: 'c-button',
	shadow: true,
	props() {
		return {
			color: String,
			icon: JSON.parse,
			label: String,
			link: link,
			trailing_icon: JSON.parse,
		}
	},
	template() {
		const tag = this.link ? 'a' : 'button'
		const icon_only = this.getAttribute('variant') === 'icon'
		return /* html */ `
			<${tag} part="button"
				${this.link ? ` href="${this.link}"` : ''}
				${icon_only ? ` aria-label="${this.label}"` : ''}
			>
				${this.icon?.icon ? this.icon.icon : ''}
				${this.label && !icon_only ? `<span>${this.label}</span>` : ''}
			</${tag}>
		`
	},
	styles() {
		return /* css */ `
			:host {
				--button: var(--${this.color});
				--on-button: var(--on-${this.color});
				border-radius: 4px;
				display: grid;
				height: 36px;
				overflow: hidden;
				width: max-content;
			}

			/* the link itself */

			[part=button] {
				align-items: center;
				background: transparent;
				border: none;
				color: inherit;
				cursor: pointer;
				display: flex;
				font-family: system-ui;
				font-size: 14px;
				font-weight: 500;
				grid-area: 1/-1;
				justify-content: center;
				letter-spacing: 1.25px;
				padding: 0 8px;
				text-decoration: none;
				text-transform: uppercase;
				user-select: none;
			}

			/* background pseudo element */

			:host:before {
				background: var(--button-bg, currentcolor);
				content: '';
				display: flex;
				grid-area: 1/-1;
				opacity: 0;
				pointer-events: none;
			}

			:host(:hover):before {
				opacity: var(--hover-opacity);
			}

			:host(:active):before {
				opacity: var(--active-opacity);
			}

			/* unelevated and raised */

			:host([variant=unelevated]),
			:host([variant=raised]) {
				--button-bg: var(--on-button);
				background: var(--button);
				color: var(--on-button);
			}

			/* raised */

			:host([variant=raised]) {
				box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
					0px 2px 2px 0px rgb(0 0 0 / 14%),
					0px 1px 5px 0px rgb(0 0 0 / 12%)
			}

			/* outlined */

			:host([variant=outlined]) {
				--button-bg: var(--button);
				box-shadow: inset 0 0 0 2px var(--button);
				color: var(--button);
			}

			/* subtle */

			:host([variant=subtle]) {
				--button-bg: var(--button);
				color: var(--button);
			}
			:host([variant=subtle]):before {
				opacity: var(--hover-opacity);
			}
			:host([variant=subtle]:hover):before {
				opacity: calc(2 * var(--hover-opacity));
			}
			:host([variant=subtle]:active):before {
				opacity: calc(2 * var(--active-opacity));
			}

			/* text */

			:host([variant=text]) {
				--button-bg: var(--button);
				color: var(--button);
			}

			/* rounded */

			:host([rounded=true]) {
				border-radius: 18px;
			}

			:host([rounded=true]) [part=button] {
				padding: 0 16px;
			}

			/* stretch */

			:host([stretch=true]) {
				flex-grow: 1;
			}

			svg {
				fill: currentcolor;
				height: 18px;
				width: 18px;
			}
		`
	},
}
