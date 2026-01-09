import GUI from 'lil-gui'

const gui = new GUI()
gui.show(gui._hidden)

window.addEventListener('keypress', (event) => {
	event.preventDefault()
	if (event.key === 'h') gui.show(gui._hidden)
})

export default gui