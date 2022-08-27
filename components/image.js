import debounce from './utils/debounce'
import image from './utils/image'
import responsive from './utils/responsive'

export default {
	component: 'c-image',
	shadow: true,
	props() {
		return {
			aspect_ratio: String,
			brightness: String,
			contrast: String,
			fit: String,
			grayscale: String,
			image: JSON.parse,
			responsive: responsive,
			saturation: String,
			vertical_alignment: String,
		}
	},
	sbImg() {
		if (image) {
			return {
				aspect_ratio: this.aspect_ratio,
				fit: this.fit,
				image: this.image,
			}
		}
	},
	ready() {
		addEventListener(
			'resize',
			debounce(() => {
				this.parts.image.innerHTML = image(this.sbImg(), this.clientWidth)
			}, 1000)
		)
	},
	template() {
		return /* html */ `<div part="image">${image(this.sbImg(), this.clientWidth)}</div>`
	},
	styles() {
		return /* css */ `
			:host {
				${this.responsive}
				align-self: ${this.vertical_alignment};
			}
			img {
				aspect-ratio: ${this.aspect_ratio};
				bottom: 0;
				display: block;
				height: auto;
				max-height: 100%;
				width: 100%;
			}
		`
	},
}
