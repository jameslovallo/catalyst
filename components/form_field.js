import responsive from './utils/responsive'

export default {
	component: 'c-formfield',
	shadow: true,
	props() {
		return {
			type: String,
			label: String,
			options: String,
			required: JSON.parse,
			responsive: responsive,
		}
	},
	field_type(type, label, options, required) {
		const tag = type === 'textarea' ? 'textarea' : 'input'
		if (['text', 'tel', 'email', 'textarea'].includes(type)) {
			return `
				<div class="material-input material-input--${type}">
					<${tag}
						name="${label}"
						type="${type}"
						placeholder=" "
						required="${required}"
					>${tag === 'textarea' ? '</textarea>' : ''}
					<div class="material-input-outline">
						<label>
							<span>${label}</span>
						</label>
					</div>
				</div>
			`
		} else if (type === 'select') {
			return `
				<div class="material-input">
					<select name="${label}" required="${required}">
						<option selected disabled></option>
						${options
							.split('\n')
							.map((option) => {
								return `<option>${option}</option>`
							})
							.join('')}
					</select>
					<div class="material-input-outline">
						<label>
							<span>${label}</span>
						</label>
					</div>
					<i></i>
				</div>
			`
		} else if (['checkbox', 'radio'].includes(type)) {
			const check = `
				<svg viewBox="0 0 24 24">
					<path d="M1.73,12.91 8.1,19.28 22.79,4.59" />
				</svg>
			`
			return `
				<fieldset>
					<legend>${label}</legend>
					${options
						.split('\n')
						.map((option) => {
							return `
								<label>
									<input type="${type}" name="${label}" />
									${type === 'radio' ? `<i></i>` : ''}
									${type === 'checkbox' ? check : ''}
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
		this.innerHTML = this.field_type(this.type, this.label, this.options, this.required)
		return '<slot></slot>'
	},
	styles() {
		return `:host { ${this.responsive} }`
	},
}
