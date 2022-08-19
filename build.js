import { apiPlugin, renderRichText, storyblokInit } from '@storyblok/js'
import fs from 'fs'
import { JSDOM } from 'jsdom'

const { document } = new JSDOM().window
document.documentElement.setAttribute('lang', 'en')
const templatePath = process.env.NETLIFY_DEV === 'true' ? './' : './dist/'

fs.readFile(`${templatePath}index.html`, 'utf8', (error, data) => {
	if (error) {
		console.error(error)
	} else document.documentElement.innerHTML = data
})

const { storyblokApi } = storyblokInit({
	accessToken: process.env.storyblok,
	use: [apiPlugin],
})

async function buildSite() {
	const { data } = await storyblokApi.get('cdn/stories', {
		version: 'published',
	})

	global(data?.stories.filter((story) => story.slug === 'settings')[0])

	data?.stories.forEach((story) => {
		if (story.slug !== 'settings') {
			renderStory(story)
		}
	})
}

function renderBloks(array, target, slot) {
	array.forEach((blok) => {
		if (!blok.component) return

		const tag = `c-${blok.component.toLowerCase()}`
		const el = document.createElement(tag)

		if (slot) el.setAttribute('slot', slot)

		const attrs = Object.keys(blok).filter((key) => !['component', '_uid'].includes(key))

		attrs.forEach((attr) => {
			let value = blok[attr]

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
					if (Array.isArray(value) && value.length === 0) value = null
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

		if (blok.component === 'Code') {
			el.innerHTML = blok.html
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

function renderStory(story) {
	const main = document.querySelector('main')
	renderBloks(story.content.body, main)
	const slug = story.full_slug === 'home' ? '' : story.full_slug + '/'
	write(document.documentElement.outerHTML, slug)
	main.innerHTML = ''
}

function write(html, path) {
	let out = `dist/${path}`

	if (!fs.existsSync(out)) {
		fs.mkdirSync(out, { recursive: true })
	}

	const stream = fs.createWriteStream(out + 'index.html')
	stream.once('open', () => {
		var content = html
		stream.end(content)
	})
}

buildSite()
