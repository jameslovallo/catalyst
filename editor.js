import { renderRichText } from '@storyblok/js'

const [token, slug] = new URLSearchParams(location.search).values()
window.loaded = false
window.story = {}

// bridge
const bridgeTag = document.createElement('script')
bridgeTag.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js'
document.body.appendChild(bridgeTag)
bridgeTag.addEventListener('load', () => {
	const bridge = new StoryblokBridge({
		preventClicks: true,
	})
	bridge.on(['input', 'change'], (payload) => {
		if (payload.action === 'input') window.story = payload.story
		if (payload.action === 'change') {
			if (window.story.name) localStorage.setItem(slug, JSON.stringify(window.story))
			location.reload()
		}
	})
})

function renderBloks(array, target, slot) {
	array.forEach((blok) => {
		if (!blok.component) return

		const tag = `c-${blok.component.toLowerCase()}`
		const el = document.createElement(tag)

		if (slot) el.setAttribute('slot', slot)

		el.dataset.blokC = blok._editable.match(/{.+}/)[0]
		el.dataset.blokUid = blok._uid
		el.classList.add('storyblok__outline')

		const attrs = Object.keys(blok).filter(
			(key) => !['component', '_uid', '_editable'].includes(key)
		)

		attrs.forEach((attr) => {
			const value = blok[attr]

			if (typeof value === 'boolean') {
				el.setAttribute(attr, value)
			}

			if (typeof value === 'string' && value) {
				if (attr === 'style') attr = 'variant'
				el.setAttribute(attr, value)
			}

			if (typeof value === 'object') {
				if (Array.isArray(value) && value[0]?.component) {
					renderBloks(value, el, attr)
				} else {
					el.setAttribute(attr, JSON.stringify(value))
				}
			}
		})

		if (blok.component === 'TextRich') {
			el.innerHTML = renderRichText(blok.text)
				.replace('{c}', '©')
				.replace('{year}', new Date().getFullYear())
			el.removeAttribute('text')
		}
		target.appendChild(el)
	})
}

function global(story) {
	const { content } = story
	document.head.innerHTML += `
		<link rel="icon" type="image/x-icon" href="${content.favicon?.filename}" />
		<title>${content.SEO.title}</title>
		<meta name="title" content="${content.SEO.title}" />
		<meta name="description" content="${content.SEO.description}" />
		<meta property="og:title" content="${content.SEO.title}" />
		<meta property="og:description" content="${content.SEO.description}" />
		<meta property="og:image" content="${content.SEO_IMAGE?.filename}" />
		<meta property="og:type" content="website" />
		<meta property="twitter:title" content="${content.SEO.title}" />
		<meta property="twitter:description" content="${content.SEO.description}" />
		<meta property="twitter:image" content="${content.SEO_IMAGE?.filename}" />
		<meta property="twitter:card" content="summary_large_image" />
	`
	document.body.innerHTML += `
		<style>
			:root {
				--background: ${content.background};
				--on-background: ${content.on_background};
				--primary: ${content.primary};
				--on-primary: ${content.on_primary};
				--secondary: ${content.secondary};
				--on-secondary: ${content.on_secondary};
				--surface: ${content.surface};
				--on-surface: ${content.on_surface};
				--surface-border: ${content.surface_border};
			}
			${content.custom_css}
		</style>
	`
	const nav = document.querySelector('nav')
	renderBloks(content.drawer_button, nav)
	nav.innerHTML += `<a href="/">${content.app_bar_title}</a>`
	renderBloks(content.app_bar_desktop, nav, 'desktop')
	renderBloks(content.app_bar, nav)
	renderBloks(content.drawer, document.querySelector('c-drawer'))
	renderBloks(content.footer, document.querySelector('footer'))
}

function getGlobal() {
	fetch(`https://api.storyblok.com/v2/cdn/stories/settings?token=${token}&version=draft`)
		.then((res) => res.json())
		.then((json) => {
			global(json.story)
			getStory()
		})
}

function getStory() {
	const main = document.querySelector('main')
	let story = JSON.parse(localStorage.getItem(slug))

	fetch(`https://api.storyblok.com/v2/cdn/stories/${slug || 'home'}?token=${token}&version=draft`)
		.then((res) => res.json())
		.then((json) => {
			if (story) {
				renderBloks(story.content.body, main)
			} else {
				renderBloks(json.story.content.body, main)
			}

			import('./main')
		})
}

getGlobal()
