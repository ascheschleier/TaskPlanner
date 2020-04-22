var html = require('choo/html')

// import template
var tasks = require('../components/tasks.js')
var Menu = require('../components/menu/menuWrapper')


var TITLE = 'VIDEO - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  //tasks.bind(null, handleDelete )




  return html`
    <body class="code lh-copy" style="max-width:650px; margin:0 auto;">
      ${Menu(state, emit)}
      <main class="pa3 cf center">
        <section class="fl w-100 pa2">
          <h2>Video</h2>
         
        </section>

        
      </main>
    </body>
  `
 
}
