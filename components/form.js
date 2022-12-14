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
			vertical_alignment: String,
		}
	},
	ready() {
		this.querySelector('c-button').addEventListener('click', () => {
			this.parts.submit.click()
		})
	},
	template() {
		this.setAttribute('style', this.responsive + this.vertical_alignment)
		const css = [
			`--field: var(--${this.color || 'primary'});`,
			`--on-field: var(--on-${this.color || 'primary'});`,
		].join(' ')
		return /* html */ `
			<form 
				action="https://formsubmit.co/${this.recipient}"
				method="POST"
				style="${css}"
			>
				<input type="submit" part="submit" style="display: none">
				${this.innerHTML}
			</form>
		`
	},
	styles() {
		return /* css */ `
			:host {
				align-self: ${this.vertical_alignment};
			}
		`
	},
}
