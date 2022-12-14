import responsive from './utils/responsive'

export default {
	component: 'c-card',
	shadow: true,
	props() {
		return {
			responsive: responsive,
			vertical_alignment: String,
		}
	},
	template() {
		return /* html */ `
			<slot name="media"></slot>
			<slot name="content"></slot>
			<slot name="actions"></slot>
		`
	},
	styles() {
		return /* css */ `
			:host {
				${this.responsive}
				align-self: ${this.vertical_alignment};
				background: var(--surface, white);
				border-radius: 4px;
				box-shadow: 0 0 0 1px var(--surface-border);
				color: var(--on-surface);
				display: flex;
				flex-direction: column;
				overflow: hidden;
				position: relative;
			}
			[name=content] {
				display: block;
				flex-grow: 1;
				padding: 16px 16px 0;
			}
			[name=content]:last-child {
				padding-bottom: 16px;
			}
			[name=actions] {
				display: flex;
				padding: 8px;
			}
			:host([content=null]) [name=content],
			:host([actions=null]) [name=actions] {
				display: none;
			}
			:host([variant=elevated]) {
				box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
					0px 1px 1px 0px rgb(0 0 0 / 14%),
					0px 1px 3px 0px rgb(0 0 0 / 12%);
			}
		`
	},
}
