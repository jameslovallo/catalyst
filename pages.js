import { renderRichText } from '@storyblok/js'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'

const token = process.env.storyblok
let template = ''

fs.readFile('./index.html', 'utf8', (error, data) => {
	if (error) {
		console.error(error)
	} else template = data
})

const getPages = () => {
	const url = [
		'https://api.storyblok.com/v1/cdn/links/',
		`?token=${token}`,
		'&version=published',
	].join('')

	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			Object.keys(json.links).forEach((key) => {
				const link = json.links[key]
				link.slug !== 'settings' && writePage(link.real_path)
			})
		})
}

const writePage = (slug) => {
	const { document } = new JSDOM().window

	const renderBloks = (array, target, slot) => {
		array.forEach((blok) => {
			if (!blok.component) return

			const tag = `c-${blok.component.toLowerCase()}`
			const el = document.createElement(tag)

			if (slot) el.setAttribute('slot', slot)

			const attrs = Object.keys(blok).filter(
				(key) => !['component', '_uid'].includes(key)
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

	const write = (html, path) => {
		let out = `dist/${path}`
		if (out.startsWith('dist/home')) out = out.replace('/home', '')

		if (!fs.existsSync(out)) {
			fs.mkdirSync(out, { recursive: true })
		}

		const stream = fs.createWriteStream(out + '/index.html')
		stream.once('open', () => {
			var content = html
			stream.end(content)
		})
	}

	const url = [
		`https://api.storyblok.com/v2/cdn/stories${slug}`,
		`?token=${token}`,
		'&version=published',
	].join('')

	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			const { story } = json
			const body = story?.content?.body

			if (body) {
				renderBloks(body, document.body)
				const storyMarkup = document.body.innerHTML
					.replaceAll('\n', '')
					.replaceAll('\t', '')
				write(
					template.replace('<!-- story -->', `<main>${storyMarkup}</main>`),
					story.full_slug
				)
			}
		})
}

getPages()
