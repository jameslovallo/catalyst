import { lock, unlock } from 'tua-body-scroll-lock'

export default {
	component: 'c-drawer',
	shadow: true,
	open_drawer() {
		lock(this.parts.drawer)
		this.parts.drawer.style.display = 'flex'
		this.parts.overlay.style.display = 'block'
		setTimeout(() => {
			this.setAttribute('open', true)
		})
	},
	close_drawer() {
		unlock(this.parts.drawer)
		this.setAttribute('open', false)
		setTimeout(() => {
			this.parts.drawer.style.display = 'none'
			this.parts.overlay.style.display = 'none'
		}, 333)
	},
	ready() {
		this.trigger = document.querySelector('nav > c-button:first-of-type')
		this.trigger.addEventListener('click', () => {
			const state = this.getAttribute('open')
			state === 'false' ? this.open_drawer() : this.close_drawer()
		})
		this.parts.overlay.on('click', () => this.close_drawer())
		this.setAttribute('loaded', '')
	},
	template() {
		return /* html */ `
			<div part="overlay"></div>
			<div part="drawer">
				<slot></slot>
			</div>
		`
	},
	styles() {
		return /* css */ `
			[part=drawer] {
				background: var(--surface);
				bottom: 0;
				box-shadow: 0 8px 10px -5px rgb(0 0 0 / 20%),
					0 16px 24px 2px rgb(0 0 0 / 14%),
					0 6px 30px 5px rgb(0 0 0 / 12%);
				color: var(--on-surface);
				display: none;
				flex-direction: column;
				justify-content: center;
				left: 0;
				overflow-y: auto;
				position: fixed;
				top: 0;
				transform: translate3D(-100%,0,0);
				transition: transform .33s;
				width: 270px;
				width: 300px;
				will-change: transform;
				z-index: 99999;
			}
			:host([open=true]) [part=drawer] {
				transform: translate3D(0,0,0)
			}
			[part=overlay] {
				background: black;
				bottom: 0;
				cursor: pointer;
				display: none;
				left: 0;
				opacity: 0;
				position: fixed;
				right: 0;
				top: 0;
				transition: opacity .33s;
				z-index: 99998;
			}

			:host([open=true]) [part=overlay] {
				opacity: .33;
			}
		`
	},
}
