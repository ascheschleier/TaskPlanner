var html = require('choo/html')

// import template
var tasks = require('../components/tasks.js')
var Menu = require('../components/menu/menuWrapper')



var TITLE = 'TaskPlaner - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  //tasks.bind(null, handleDelete )




  return html`
    <body class="code lh-copy" style="max-width:650px; margin:0 auto;">
      ${Menu(state, emit)}
      <main class="pa3 cf center">
        <section class="fl w-100 pa2">
          <h2>1.</h2>
          <p>
            <input id="task_input" value="" type="text" placeholder="Type a Task" /> 
            <button class="dim ph3 ba bw1 pv2 b--black pointer bg-white"
                onclick=${handleClick}>
                Add
            </button>

            eine zeile text
          </p>

          <p> 
            Tasks: <br>
        
            ${state.tasks.map(tasks)}

          </p>
          <p>
            You're now in control of your own Choo app. The moment you decide to
            deploy it, it'll work offline and on any device.
          </p>

          <br>
        </section>

        
      </main>
    </body>
  `

  function handleClick () {
    var task = document.getElementById("task_input").value
    emit('task:add', task)
  }


  function handleDelete (task) {
    emit('task:remove', task)
  }
 
}
