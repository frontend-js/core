export class Styles {
	constructor(styles) {
		const element = document.createElement('style')
		const className = `frontend_${Math.floor(Math.random() * 100000) + 1}`

		styles = styles.replace(/(\r\n|\n|\r)/gm, '')
		styles = styles.replace(/:scope\b/g, '.' + className)

		element.innerText = styles

		return {
			data: element,
			className: className
		}
	}
}
