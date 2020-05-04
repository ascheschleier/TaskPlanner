var html = require('choo/html')

var loggedInCheck = require('../components/loggedInCheck')
var Menu = require('../components/menu/menuWrapper')
var mainLink = require('../components/mainLink')

var TITLE = 'GCAS - App'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy" style="max-width:650px; margin:0 auto;">
      ${Menu(state, emit)}
      <main class="pa3 cf center">
        <section class="mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
          <h1 class="mt0">Main Section</h1>
          <p class="lh-copy measure">
            Choose your path:
          </p>
            ${mainLink(state.mainMenuRoutes[1])}
            ${mainLink(state.mainMenuRoutes[9])}
            ${mainLink(state.mainMenuRoutes[3])}
        </section>   
      </main>
    </body>
  `
}
