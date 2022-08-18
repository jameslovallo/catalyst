import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	component: 'c-map',
	shadow: true,
	props() {
		return {
			aspect_ratio: String,
			base_width: String,
			embed: String,
			hide_pins: JSON.parse,
			location: String,
			responsive: responsive,
			satellite: JSON.parse,
			vertical_alignment: (v) => css('align-self', v),
			zoom_level: String,
		}
	},
	iframe() {
		const src = [
			'https://maps.google.com/maps?q=',
			encodeURI(this.location),
			this.satellite ? '&t=k' : '',
			'&z=' + this.zoom_level,
			'&ie=UTF8&output=embed',
		].join('')
		return /* html */ `<iframe src="${src}" frameborder="0">`
	},
	static() {
		const locations = this.location.split('\n').join('|')
		const center = !locations.includes('|') && this.hide_pins ? 'center' : 'markers'
		const [hor, vert] = this.aspect_ratio.split('/')
		const height = Math.round((600 * vert) / hor)
		return [
			'https://maps.googleapis.com/maps/api/staticmap?',
			`${center}=${locations}`,
			this.satellite ? '&maptype=satellite' : '',
			`&size=600x${height}`,
			'&zoom=' + this.zoom_level,
			'&key=AIzaSyCxqAHXuQxKJh84FPydDkFcXyA2x7wIZVA',
		].join('')
	},
	ready() {
		const embed =
			this.embed !== 'null'
				? this.embed.replace(/height=".+"/, '').replace(/width=".+"/, '')
				: this.iframe()
		this.parts.overlay.on('click', () => {
			this.parts.overlay.remove()
			this.parts.image.remove()
			this.DOM.innerHTML += embed
		})
	},
	template() {
		return /* html */ `
			<img part="image" src="${this.static()}">
			<button part="overlay">Tap/Click to Load</button>
		`
	},
	styles() {
		return /* css */ `
			:host {
				${this.responsive}
				${this.vertical_alignment}
				aspect-ratio: ${this.aspect_ratio};
				display: grid;
				overflow: hidden;
			}
			:host > *:not(style) {
				aspect-ratio: ${this.aspect_ratio};
				grid-area: 1/-1;
				height: 100%;
				width: 100%:
			}
			img {
				display: block;
				filter: blur(10px);
				object-fit: cover;
				width: 100%;
			}
			[part=overlay] {
				background: rgba(0,0,0,0.33);
				border: none;
				border-radius: 0;
				color: white;
				cursor: pointer;
				font-size: 1.5rem;
				z-index: 1;
			}
		`
	},
}
