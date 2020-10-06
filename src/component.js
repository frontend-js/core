import { Template } from './template'
import { Styles } from './styles'

const _name = Symbol('name')
const _root = Symbol('root')
const _dom = Symbol('dom')
const _components = Symbol('components')
const _options = Symbol('options')

export default class Component {
	constructor(options) {
		const {
			root,
			template,
			name = '',
			data = {},
			styles = '',
			components = {}
		} = options

		let rootEl = root

		if (typeof root === 'string') {
			rootEl = document.querySelector(root)
		}
		if (root && typeof rootEl === 'undefined') {
			return console.error('unable to find root element')
		}

		const childComponents = {}
		Object.keys(components).forEach(objKey => {
			const comp = components[objKey]
			const key = comp.name || objKey
			childComponents[key] = Component.duplicate(comp)
		})

		const dom = new Template(template, data, childComponents).data
		
		if (styles) {
			const css = new Styles(styles)
	
			dom.classList.add(css.className)
			dom.appendChild(css.data)
		}

		if (rootEl) {
			rootEl.appendChild(dom)
		}

		this[_name] = name
		this[_root] = rootEl
		this[_dom] = dom
		this[_components] = childComponents
		this[_options] = options
	}

	static duplicate(component) {
		return new Component(component.options)
	}

	get options() {
		return this[_options]
	}

	get name() {
		return this[_name]
	}

	get root() {
		return this[_root]
	}

	get dom() {
		return this[_dom]
	}

	get components() {
		return this[_components]
	}

	appendChild(child) {
		if (child instanceof Component) {
			child = child.dom
		}

		if (typeof child === 'string') {
			child = new Template(child, data).data
		}

		if (this[_dom]) {
			this[_dom].appendChild(child)
		}
	}

	replace(dom, data) {
		if (typeof dom === 'string') {
			dom = new Template(dom, data).data
		}

		if (!dom) return console.error('dom element is required when replacing')

		this[_dom].innerHTML = ''
		this[_dom].append(dom)
	}

	destroy(removeDom) {
		if (removeDom) {
			this[_dom].outerHTML = ''
		}

		this[_dom] = undefined
		this[_root] = undefined
	}
}
