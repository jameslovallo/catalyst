import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	component: 'c-form',
	shadow: false,
	props() {
		return {
			color: String,
			recipient: String,
			responsive: responsive,
			subject: String,
			vertical_alignment: (v) => css('align-self', v),
		}
	},
	template() {
		this.setAttribute('style', this.responsive + this.vertical_alignment)
		const css = [
			`--field: var(--${this.color || 'primary'});`,
			`--on-field: var(--on-${this.color || 'primary'});`,
		].join(' ')
		return `
			<form 
				action="https://formsubmit.co/${this.recipient}"
				method="POST"
				style="${css}"
			>
				${this.innerHTML}
			</form>
		`
	},
}
