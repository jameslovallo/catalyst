import css from './utils/css-prop'

export default {
	name: 'c-section',
	shadow: true,
	props: {
		color: String,
		vertical_alignment: (v) => css('align-self', v),
	},
	template() {
		return `<span part="top"></span><slot name="content"></slot>`
	},
	styles() {
		return `
			:host {
				${this.vertical_alignment}
				--section: var(--${this.color});
				--on-section: var(--on-${this.color});
				background: var(--section);
				color: var(--on-section);
			}
			:host([variant*=full-bleed]) {
				--width: 100vw;
				width: var(--width);
				margin-left: calc(-1 * var(--width) / 2);
				position: relative;
				left: 50%;
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
				position: relative;
				margin-top: calc(var(--swoop-curve) - var(--gap));
				margin-bottom: calc(var(--swoop-curve) - var(--gap));
				border-bottom-right-radius: var(--swoop-curve);
			}
			:host([variant*=swoop]) [part=top] {
				position: absolute;
				top: calc(-1 * var(--swoop-curve));
				right: 0;
				height: var(--swoop-curve);
				width: var(--swoop-curve);
				overflow: hidden;
			}
			:host([variant*=swoop]) [part=top]:before {
				content: "";
				display: block;
				height: calc(2 * var(--swoop-curve));
				width: calc(2 * var(--swoop-curve));
				position: absolute;
				top: calc(-1 * var(--swoop-curve));
				right: 0;
				border-radius: 50%;
				box-shadow: 0 0 0 var(--swoop-curve) var(--section);
			}
		`
	},
}
