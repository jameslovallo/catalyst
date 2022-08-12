import catalyst from '@snappywc/catalyst'
const components = import.meta.glob('./components/*.js')
import './scss/index.scss'

for (const path in components) {
	components[path]().then((component) => {
		catalyst(component.default)
	})
}
