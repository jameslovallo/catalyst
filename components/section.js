export default {
	component: 'c-section',
	shadow: true,
	props() {
		return {
			color: String,
		}
	},
	template() {
		return /* html */ `<span part="top"></span><slot name="content"></slot>`
	},
	styles() {
		return /* css */ `
			:host {
				--section: var(--${this.color});
				--on-section: var(--on-${this.color});
				background: var(--section);
				color: var(--on-section);
			}
			:host([variant*=full-bleed]) {
				--width: 100vw;
				left: 50%;
				margin-left: calc(-1 * var(--width) / 2);
				position: relative;
				width: var(--width);
			}
			@media (min-width: 1320px) {
				:host([variant*=full-bleed]) {
					--width: 1320px;
				}
			}
			:host([variant*=full-width]) {
				margin-left: calc(-1 * var(--page-padding));
				margin-right: calc(-1 * var(--page-padding));
			}
			:host([variant*=contained]) {
				padding: var(--gap) var(--page-padding);
			}
			:host([variant*=swoop]) {
				--swoop-curve: min(10vw, calc(3 * var(--gap)));
				border-bottom-right-radius: var(--swoop-curve);
				margin-bottom: calc(var(--swoop-curve) - var(--gap));
				margin-top: calc(var(--swoop-curve) - var(--gap));
				position: relative;
			}
			[part=top] {
				display: none;
			}
			:host([variant*=swoop]) [part=top] {
				display: block;
				height: var(--swoop-curve);
				overflow: hidden;
				position: absolute;
				right: 0;
				top: calc(-1 * var(--swoop-curve));
				width: var(--swoop-curve);
			}
			:host([variant*=swoop]) [part=top]:before {
				border-radius: 50%;
				box-shadow: 0 0 0 var(--swoop-curve) var(--section);
				content: "";
				display: block;
				height: calc(2 * var(--swoop-curve));
				position: absolute;
				right: 0;
				top: calc(-1 * var(--swoop-curve));
				width: calc(2 * var(--swoop-curve));
			}
		`
	},
}
