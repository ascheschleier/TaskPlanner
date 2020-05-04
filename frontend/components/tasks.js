// export module
var html = require('choo/html')

module.exports = function (task) {
  var type = task.type
  var text = task.text
  var id = task.id

  // create html template
  return html`
    <li class="task_${id}"><span>${task.text}</span> 
    <span class="delete-wrapper">
        <a class="f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib dark-red" href="#0">Delete</a>
    </span>
    </li>
  `
}
