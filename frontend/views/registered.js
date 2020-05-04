var html = require('choo/html')

var loggedInCheck = require('../components/loggedInCheck')
var Menu = require('../components/menu/menuWrapper')

var TITLE = 'GCAS - Thanks for registering!'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  loggedInCheck(state, emit)

  // createTasks ()
  // tasks.bind(null, handleDelete )

  return html`
    <body class="code lh-copy" style="max-width:650px; margin:0 auto;">
      ${Menu(state, emit)}
      <main class="pa3 cf center">
        <section class="mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
          <h1 class="mt0">Successfully registered.</h1>
          <p class="lh-copy measure">
            Thanks for making an account, ${state.user.username}. Welcome!
          </p>
        </section>   
      </main>
    </body>
  `
}
