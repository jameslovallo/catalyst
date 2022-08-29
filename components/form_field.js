import responsive from './utils/responsive'

export default {
	component: 'c-formfield',
	shadow: true,
	props() {
		return {
			label: String,
			options: String,
			required: JSON.parse,
			responsive: responsive,
			type: String,
		}
	},
	field_type() {
		const tag = this.type === 'textarea' ? 'textarea' : 'input'
		if (['text', 'tel', 'email', 'textarea'].includes(this.type)) {
			return /* html */ `
				<div class="material-input material-input--${this.type}">
					<${tag}
						name="${this.label}"
						type="${this.type}"
						placeholder=" "
						required="${this.required}"
					>${tag === 'textarea' ? '</textarea>' : ''}
					<div class="material-input-outline">
						<label>
							<span>${this.label}</span>
						</label>
					</div>
				</div>
			`
		} else if (this.type === 'select') {
			return /* html */ `
				<div class="material-input">
					<select name="${this.label}" required="${this.required}">
						<option selected disabled></option>
						${this.options
							.split('\n')
							.map((option) => /* html */ `<option>${option}</option>`)
							.join('')}
					</select>
					<div class="material-input-outline">
						<label>
							<span>${this.label}</span>
						</label>
					</div>
					<i></i>
				</div>
			`
		} else if (['checkbox', 'radio'].includes(this.type)) {
			const check = /* html */ `
				<svg viewBox="0 0 24 24">
					<path d="M1.73,12.91 8.1,19.28 22.79,4.59" />
				</svg>
			`
			return /* html */ `
				<fieldset>
					<legend>${this.label}</legend>
					${this.options
						.split('\n')
						.map((option) => {
							return /* html */ `
								<label>
									<input type="${this.type}" name="${this.label}" />
									${this.type === 'radio' ? `<i></i>` : ''}
									${this.type === 'checkbox' ? check : ''}
									${option}
								</label>
							`
						})
						.join('')}
				</fieldset>
			`
		}
	},
	format_phone(e) {
		const target = e.target
		let numbers = target.value.match(/[0-9]+/g)
		if (numbers) {
			numbers = numbers.join('')
			numbers =
				numbers.charAt(0) === '0' || numbers.charAt(0) === '1' ? numbers.substring(1) : numbers
			let first =
				numbers.length >= 3 ? '(' + numbers.substr(0, 3) + ') ' : '(' + numbers.substr(0, 3)
			let second = numbers.substr(3, 3)
			let third = numbers.length > 6 ? '-' + numbers.substr(6, 4) : ''
			target.value = `${first}${second}${third}`.substr(0, 14)
		}
	},
	ready() {
		const phone = this.querySelector('[type=tel]')
		if (phone) phone.addEventListener('input', (e) => this.format_phone(e))
		const textareaWrapper = this.querySelector('.material-input--textarea')
		const textarea = this.querySelector('textarea')
		if (textareaWrapper && textarea) {
			textarea.addEventListener('input', () => {
				textareaWrapper.dataset.replicatedValue = textarea.value
			})
		}
	},
	template() {
		this.innerHTML = this.field_type()
		return /* html */ `<slot></slot>`
	},
	styles() {
		return /* css */ `:host { ${this.responsive} }`
	},
}
