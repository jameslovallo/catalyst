export default (p, w) => {
	const i = p.image
	const { filename } = i
	const dimensions = i.filename.split('/')[5]
	const contain = p.fit === 'contain' ? '/fit-in' : ''
	const smart = p.fit === 'smart' ? '/smart' : ''
	const focus = i.focus ? `:focal${i.focus})` : ''
	let [width, height] = dimensions.split('x')

	let [hor, vert] = [0, 0]
	if (p.aspect_ratio.match(/[0-9]+\/[0-9]+/)) {
		;[hor, vert] = p.aspect_ratio.split('/')
	}

	const src = (elWidth) => {
		// dynamic height/width
		if (elWidth) {
			height = Math.round((height / width) * elWidth)
			width = Math.round(elWidth)
		}
		if (hor && vert) height = Math.round((width * vert) / hor)
		// src out
		return [
			filename,
			'/m',
			contain,
			'/',
			width,
			'x',
			height,
			smart,
			'/filters:quality(80):fill(transparent)',
			focus,
		].join('')
	}

	w = Math.round(w / 100) * 100 * devicePixelRatio

	if (!filename.endsWith('svg')) {
		return /* html */ `
			<img
				src="${src(w)}"
				alt="${i.alt}"
				height="${height}px"
				width="${width}px"
			>
		`
	} else return /* html */ `<img src="${filename}" alt="${i.alt}">`
}
