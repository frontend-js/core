const _getNode = Symbol('getNode')
const _processTemplate = Symbol('_processTemplate')

export class Template {
	constructor(template, data = {}) {
		if (!template) {
			return console.error('component template required')
		}

		if (template instanceof Element) {
			return this[_getNode](template)
		}

		if (typeof template !== 'string') return console.error('invalid template passed in')

		return {
			data: this[_processTemplate](template, data)
		}
	}

	[_getNode](node) {
		if (template.childNodes.length === 1) {
			return template
		} else {
			const wrapper = document.createElement('div')
			return wrapper.append(...node)
		}
	}

	[_processTemplate](template, data) {
		const wrapper = document.createElement('div')
		template = template.replace(/(\r\n|\n|\r)/gm, '')

		Object.keys(data).forEach((key) => {
			template = template.replace(new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}', "gm"), data[key])
		})

		template = template.replace(/\{\{.*?\}\}/gm, '')
		wrapper.innerHTML = template

		return wrapper.childNodes.length > 1 ? wrapper[0] : wrapper.childNodes[0]
	}

	destroy() {
		this[_processTemplate] = undefined
		this[_getNode] = undefined

		_processTemplate = undefined
		_getNode = undefined
	}
}
