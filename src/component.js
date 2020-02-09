import { Template } from './template'
import { Styles } from './styles'

const _root = Symbol('root')
const _dom = Symbol('dom')

export default class Component {
	constructor({
		root,
		template,
		data = {},
		styles = ''
	}) {
		let rootEl = root

		if (typeof root === 'string') {
			rootEl = document.querySelector(root)
		}
		if (root && typeof rootEl === 'undefined') {
			return console.error('unable to find root element')
		}

		const dom = new Template(template, data).data
		
		if (styles) {
			const css = new Styles(styles)
	
			dom.classList.add(css.className)
			dom.appendChild(css.data)
		}

		if (rootEl) {
			rootEl.appendChild(dom)
		}

		this[_root] = rootEl
		this[_dom] = dom
	}

	get root() {
		return this[_root]
	}

	get dom() {
		return this[_dom]
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
