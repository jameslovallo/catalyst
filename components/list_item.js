import link from './utils/link'

export default {
	component: 'c-listitem',
	shadow: true,
	props() {
		return {
			avatar: JSON.parse,
			icon: JSON.parse,
			link: link,
			role: () => 'listitem',
			secondary_text: (v) => (v ? v : ''),
			text: (v) => (v ? v : ''),
		}
	},
	template() {
		const avatar = () => {
			const img = () => /* html */ `
				<img src="${this.avatar.filename || ''}">
			`
			if (this.icon?.icon || this.avatar?.filename) {
				return /* html */ `
					<span part="avatar" aria-hidden="true">
						${this.icon.icon || ''}
						${this.avatar.filename ? img : ''}
					</span>
				`
			} else return ''
		}
		return /* html */ `
			<span part="background"></span>
			<a href="${this.link}">
				${avatar()}
				<span part="content">
					<span part="text">${this.text}</span><br>
					<span part="secondary-text">${this.secondary_text || ''}</span>
				</span>
			</a>
		`
	},
	styles() {
		return /* css */ `
			:host { display: grid }
			:host(:not(:last-of-type)) {
				border-bottom: var(--separator) solid var(--surface-border);
			}
			[part=background] {
				background: var(--list);
				grid-area: 1/-1;
				opacity: 0;
			}
			:host(:hover) [part=background] {
				opacity: var(--hover-opacity);
			}
			:host(:active) [part=background] {
				opacity: var(--active-opacity);
			}
			a {
				align-items: center;
				color: inherit;
				display: flex;
				gap: 1rem;
				grid-area: 1/-1;
				padding: 1rem;
				text-decoration: none;
				z-index: 2;
			}
			[part=avatar] {
				background: var(--list);
				border-radius: 50%;
				display: grid;
				fill: var(--on-list);
				flex-shrink: 0;
				height: 40px;
				place-items: center;
				width: 40px;
			}
			[part=avatar] svg {
				height: 24px;
				width: 24px;
			}
			[part=content] { display: block; }
			[part=text] {
				letter-spacing: .15px;
				line-height: 24px;
			}
			[part=secondary-text] {
				font-size: 14px;
				letter-spacing: .25px;
				line-height: normal;
				opacity: .6;
			}
		`
	},
}
