import link from './utils/link'

export default {
	name: 'c-listitem',
	shadow: true,
	props: {
		avatar: JSON.parse,
		icon: JSON.parse,
		link: link,
		role: () => 'listitem',
		secondary_text: (v) => (v ? v : ''),
		text: (v) => (v ? v : ''),
	},
	template() {
		const avatar = () => {
			if (this.icon.icon || this.avatar.filename) {
				return `
					<span part="avatar" aria-hidden="true">
						${this.icon.icon || ''}
						${this.avatar.filename || ''}
					</span>
				`
			} else return ''
		}
		return `
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
		return `
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
				height: 40px;
				place-items: center;
				width: 40px;
			}
			[part=content] { display: block; }
			[part="text"] {
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
