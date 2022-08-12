export default (l) => {
	l = JSON.parse(l)
	switch (l?.linktype) {
		case 'story':
			if (l?.cached_url) {
				return `/${l?.cached_url === 'home' ? '' : l?.cached_url}`
			} else return undefined
		case 'email':
			return 'mailto:' + l?.email
		default:
			return l?.url
	}
}
