import css from './utils/css-prop'
import debounce from './utils/debounce'
import image from './utils/image'
import responsive from './utils/responsive'

export default {
	name: 'c-image',
	shadow: true,
	props: {
		aspect_ratio: String,
		brightness: String,
		contrast: String,
		fit: String,
		grayscale: String,
		image: String,
		responsive: responsive,
		saturation: String,
		vertical_alignment: (v) => css('align-self', v),
	},
	ready() {
		addEventListener(
			'resize',
			debounce(() => {
				this.parts.image.innerHTML = image(this.props, this.clientWidth)
			}, 1000)
		)
	},
	template() {
		return `<div part="image">${image(this.props, this.clientWidth)}</div>`
	},
	styles() {
		return `
			:host {
				${this.responsive}
				${this.vertical_alignment}
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
