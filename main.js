import composer from '@snappywc/composer'
const components = import.meta.glob('./components/*.js')
import './scss/index.scss'

for (const path in components) {
	components[path]().then((component) => {
		composer(component.default)
	})
}
