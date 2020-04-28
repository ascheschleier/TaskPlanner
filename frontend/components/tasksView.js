var Nanocomponent = require('nanocomponent')
var html = require('nanohtml')

class Tasksview extends Nanocomponent {
  constructor () {
    super()
    this.count = state.taskCount
  }

  createElement (color, text) {
    this.color = color
    this.text = text
    return html`
      <button style="background-color: ${color}">
        ${text}
      </button>
    `
  }

  // Implement conditional rendering
  update (newColor) {
    return newColor !== this.color
  }
}

module.exports = Tasksview