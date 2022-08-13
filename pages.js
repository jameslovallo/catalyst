import { apiPlugin, renderRichText, storyblokInit } from '@storyblok/js'
import fs from 'fs'
import { JSDOM } from 'jsdom'
const { document } = new JSDOM().window

const { storyblokApi } = storyblokInit({
	accessToken: process.env.storyblok,
	use: [apiPlugin],
})

let template = ''

fs.readFile('./index.html', 'utf8', (error, data) => {
	if (error) {
		console.error(error)
	} else template = data
})

async function buildSite() {
	const { data } = await storyblokApi.get('cdn/stories', {
		version: 'published',
	})

	data?.stories.forEach((story) => {
		if (story.slug !== 'settings') {
			renderStory(story)
		}
	})
}

const renderBloks = (array, target, slot) => {
	array.forEach((blok) => {
		if (!blok.component) return

		const tag = `c-${blok.component.toLowerCase()}`
		const el = document.createElement(tag)

		if (slot) el.setAttribute('slot', slot)

		const attrs = Object.keys(blok).filter((key) => !['component', '_uid'].includes(key))

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

function renderStory(story) {
	document.body.innerHTML = ''
	renderBloks(story.content.body, document.body)
	const slug = story.full_slug === 'home' ? '' : story.full_slug + '/'
	const html = template.replace('<!-- story -->', document.body.innerHTML)
	write(html, slug)
}

const write = (html, path) => {
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
