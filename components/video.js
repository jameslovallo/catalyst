import '@justinribeiro/lite-youtube'
import responsive from './utils/responsive'

export default {
	component: 'c-video',
	shadow: true,
	props() {
		return {
			autoplay: String,
			controls: (v) => (v === 'true' ? 'controls' : ''),
			loop: String,
			mute: String,
			plays_inline: String,
			responsive: responsive,
			use_hd_poster: (v) => (v === 'true' ? 'maxresdefault' : 'hqdefault'),
			vertical_alignment: String,
			video_files: JSON.parse,
			video_poster: JSON.parse,
			youtube_video_id: (v) => v || undefined,
		}
	},
	video() {
		return /* html */ `
				<video
					autoplay="${this.autoplay}"
					${this.controls}
					loop="${this.loop}"
					muted="${this.mute}"
					playsinline="${this.plays_inline}"
					poster="${this.video_poster?.filename + '/m/'}"
					preload="auto"
				>
					${this.video_files?.map((src) => /* html */ `<source src="${src?.filename}"/>`).join()}
				</video>
			`
	},
	youtube() {
		if (this.youtube_video_id) {
			return /* html */ `
					<lite-youtube
						videoid="${this.youtube_video_id}"
						posterquality="${this.use_hd_poster}"
					></lite-youtube>
				`
		} else return false
	},
	template() {
		return this.youtube() || this.video()
	},
	styles() {
		return /* css */ `
			:host {
				${this.responsive}
				align-self: ${this.vertical_alignment};
				aspect-ratio: 16/9;
			}
			video { display: block; width: 100%; }
		`
	},
}
