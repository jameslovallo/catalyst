import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	name: 'c-card',
	shadow: true,
	props: {
		responsive: responsive,
		variant: 'variant',
		vertical_alignment: (v) => css('align-self', v),
	},
	methods: {
		variant(v) {
			return v === 'outlined'
				? 'box-shadow: 0 0 0 1px var(--surface-border); margin: 1px;'
				: 'box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);'
		},
	},
	template() {
		return `
			<slot name="media"></slot>
			<slot name="content"></slot>
			<slot name="actions"></slot>
		`
	},
	styles() {
		return `
			:host {
				${this.responsive}
				${this.vertical_alignment}
				${this.variant}
				background: var(--surface, white);
				border-radius: 4px;
				color: var(--on-surface);
				display: flex;
				flex-direction: column;
				overflow: hidden;
				position: relative;
			}
			[name=content] {
				flex-grow: 1;
				padding: 16px 16px 0;
			}
			[name=content]:last-child {
				padding-bottom: 16px;
			}
			[name=actions] {
				padding: 8px;
				display: flex;
			}
		`
	},
}
