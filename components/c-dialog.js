import A11yDialog from 'a11y-dialog'
import { lock, unlock } from 'tua-body-scroll-lock'
import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	name: 'c-dialog',
	shadow: true,
	props: {
		heading: String,
		trigger_title: String,
		close_button_text: String,
		responsive: responsive,
		vertical_alignment: (v) => css('align-self', v),
	},
	methods: {
		show() {
			this.dialog.show()
			lock(this.parts.content)
		},
		hide() {
			this.dialog.hide()
			unlock(this.parts.content)
		},
	},
	ready() {
		this.dialog = new A11yDialog(this.parts.container)
		const trigger = this.querySelector('[slot=trigger]')
		trigger.addEventListener('click', () => {
			this.show()
		})
		this.parts.overlay.on('click', this.hide)
		this.parts.hide.on('click', this.hide)
	},
	template() {
		const id = 'dialog-' + this.heading.replaceAll(' ', '-')
		return `
			<slot name="trigger"></slot>
			<div
				part="container"
				id="${id}"
				aria-labelledby="${id}-label"
				aria-hidden="true"
			>
				<div part="overlay"></div>
				<div part="content" role="document">
					<h2 id="${id}-label">${this.heading}</h2>
					<slot name="content"></slot>
					<div part="actions">
						<slot name="secondary_actions"></slot>
						<c-button
							part="hide"
							color="primary"
							label="${this.close_button_text}"
							variant="text"
						></c-button>
					</div>
				</div>
			</div>
		`
	},
	styles() {
		return `
			:host {
				${this.responsive}
				${this.vertical_alignment}
			}

			[part=container] {
				z-index: 99999;
			}

			[part=container][aria-hidden="true"] {
				display: none;
			}
			
			[part=container], [part=overlay] {
				align-items: center;
				bottom: 0;
				display: flex;
				justify-content: center;
				left: 0;
				position: fixed;
				right: 0;
				top: 0;
			}

			[part=overlay] {
				background: black;
				opacity: .33;
			}
			
			[part=content] {
				animation: 0.25s ease 0s 1 normal none running dialog;
				background: var(--surface);
				border-radius: 4px;
				border: 1px solid rgb(204, 204, 204);
				box-shadow: rgb(0 0 0 / 20%) 0px 11px 15px -7px,
					rgb(0 0 0 / 14%) 0px 24px 38px 3px,
					rgb(0 0 0 / 12%) 0px 9px 46px 8px;
				color: var(--on-surface);
				cursor: auto;
				display: flex;
				flex-direction: column;
				height: auto;
				max-height: 80vh;
				max-width: 560px;
				outline: none;
				overflow: auto;
				padding: 0px;
				position: relative;
				width: 90vw;
				z-index: 99999;
			}

			[part=content] h2 {
				font-size: 20px;
				line-height: 2;
				margin: 0;
				padding: 16px 20px;
			}
			
			[name=content] {
				display: block;
				flex-grow: 1;
				overflow-y: auto;
				padding: 0 20px 24px;
			}

			[part=actions] {
				display: flex;
				justify-content: flex-end;
				padding: 8px;
			}
		`
	},
}