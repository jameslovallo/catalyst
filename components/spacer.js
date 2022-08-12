import css from './utils/css-prop'

export default {
	name: 'c-spacer',
	shadow: true,
	props: { height: (v) => css('height', v + 'px') },
	styles() {
		return `
			:host { 
				${this.height}
				display: block;
			}
		`
	},
}
