import ardi from 'ardi'
import './scss/index.scss'
const components = import.meta.glob('./components/*.js')

for (const path in components) {
	components[path]().then((component) => {
		ardi(component.default)
	})
}
