var Nanocomponent = require('nanocomponent')
var html = require('nanohtml')

module.exports = class Task extends Nanocomponent {
  constructor (id, state, emit) {
    super(id)
    this.local = state.components[id] = {}
  }

  load (task) {
    this.local.type = task.type
    this.local.text = task.text
    this.local.id = task.id
    console.log('task component loaded: ' + this.local.id)
  }

  view (state, emit) {
    // create html template

    console.log('task view: ' + this.local.id)

    return html`
      <li class="task_${this.local.id}" id="${this.local.id}"><span>${this.local.text}</span> 
      <span class="delete-wrapper">
          <a class="f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib dark-red" onclick="${this.handleDelete}">Delete</a>
      </span>
      </li>
    `

    function handleDelete (e) {
      var id = e.currentTarget.parentNode.parentNode.id
      console.log(id)
      emit('task:remove', id)
    }
  }
}
