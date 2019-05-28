class Toggler {
	constructor(options = {}) {

		let defaults = {
			toggler: '[data-toggler]',
			togglerClose: '[data-toggler-close]',
			activeClass: '-active'
		}

		if (typeof options === 'object') {
			defaults = Object.assign(defaults, options)
		}

		this.options = defaults

		document.querySelectorAll(this.options.toggler).forEach($el => {
			$el.addEventListener('click', event => {
				event.stopPropagation()
				event.preventDefault()

				let target = $el.dataset.toggler

				document.querySelectorAll(this.options.toggler).forEach($element => {
					let elTarget = $element.dataset.toggler

					if (elTarget !== target) {
						$element.classList.remove(this.options.activeClass)
						document.getElementById(elTarget).classList.remove(this.options.activeClass)
						document.body.classList.remove(`-${elTarget + this.options.activeClass}`)

						window.dispatchEvent(new CustomEvent('togglerClose', {
							bubbles: true,
							detail: $element
						}));
					}
				})

				$el.classList.toggle(this.options.activeClass)
				document.getElementById(target).classList.toggle(this.options.activeClass)
				document.body.classList.toggle(`-${target + this.options.activeClass}`)

				window.dispatchEvent(new CustomEvent('togglerChange', {
					bubbles: true,
					detail: $el
				}))
			})
		})

		document.querySelectorAll(this.options.togglerClose).forEach($el => {
			$el.addEventListener('click', event => {
				event.stopPropagation()
				event.preventDefault()

				let target = $el.dataset.toggler

				$el.classList.remove(this.options.activeClass)
				document.getElementById(target).classList.remove(this.options.activeClass)
				document.body.classList.remove(`-${target + this.options.activeClass}`)

				window.dispatchEvent(new CustomEvent('togglerClose', {
					bubbles: true,
					detail: $el
				}))
			})
		})

		document.addEventListener('click', event => {
			document.querySelectorAll(this.options.toggler).forEach($el => {
				let target = $el.dataset.toggler

				if (event.target.closest(`#${target}`) && event.target.tagName !== 'A') {
					return
				}

				if ($el.classList.contains(this.options.activeClass)) {
					$el.classList.remove(this.options.activeClass)
					document.getElementById(target).classList.remove(this.options.activeClass)
					document.body.classList.remove(`-${target + this.options.activeClass}`)

					window.dispatchEvent(new CustomEvent('togglerClose', {
						bubbles: true,
						detail: $el
					}))
				}
			})
		})

	}
}

export default Toggler