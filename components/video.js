import css from './utils/css-prop'
import responsive from './utils/responsive'

export default {
	name: 'c-video',
	shadow: true,
	props: {
		autoplay: String,
		controls: (v) => (v === 'true' ? 'controls' : ''),
		loop: String,
		mute: String,
		plays_inline: String,
		responsive: responsive,
		use_hd_poster: (v) => (v === 'true' ? 'maxresdefault' : 'hqdefault'),
		vertical_alignment: (v) => css('align-self', v),
		video_files: JSON.parse,
		video_poster: JSON.parse,
		youtube_video_id: (v) => v || undefined,
	},
	methods: {
		video() {
			return `
				<video
					autoplay="${this.autoplay}"
					${this.controls}
					loop="${this.loop}"
					muted="${this.mute}"
					playsinline="${this.plays_inline}"
					poster="${this.video_poster.filename + '/m/'}"
					preload="auto"
				>
					${this.video_files.map((src) => `<source src="${src.filename}"/>`).join()}
				</video>
			`
		},
		youtube() {
			if (this.youtube_video_id) {
				import('//unpkg.com/@justinribeiro/lite-youtube')
				return `
					<lite-youtube
						videoid="${this.youtube_video_id}"
						posterquality="${this.use_hd_poster}"
					></lite-youtube>
				`
			} else return false
		},
	},
	template() {
		return this.youtube() || this.video()
	},
	styles() {
		return `
			:host {
				${this.responsive}
				${this.vertical_alignment}
			}
			video { display: block; width: 100%; }
		`
	},
}
