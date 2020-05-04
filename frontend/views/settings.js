var html = require('choo/html')

var loggedInCheck = require('../components/loggedInCheck')
var Menu = require('../components/menu/menuWrapper')

var TITLE = 'GCAS - Settings'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  console.log(state.params)
  loggedInCheck(state, emit)

  // createTasks ()
  // tasks.bind(null, handleDelete )

  return html`
    <body class="code lh-copy" style="max-width:650px; margin:0 auto;">
      ${Menu(state, emit)}
      <main class="pa3 cf center">
        <section class="fl w-100 pa2">
          <form class="pa4">
            <fieldset id="favorite_movies" class="bn">
              <legend class="fw7 mb2">Some Dummy Settings</legend>
              <div class="flex items-center mb2">
                <input class="mr2" type="checkbox" id="spacejam" value="spacejam">
                <label for="spacejam" class="lh-copy">Space Jam</label>
              </div>
              <div class="flex items-center mb2">
                <input class="mr2" type="checkbox" id="airbud" value="airbud">
                <label for="airbud" class="lh-copy">Air Bud</label>
              </div>
              <div class="flex items-center mb2">
                <input class="mr2" type="checkbox" id="hocuspocus" value="hocuspocus">
                <label for="hocuspocus" class="lh-copy">Hocus Pocus</label>
              </div>
              <div class="flex items-center mb2">
                <input class="mr2" type="checkbox" id="diehard" value="diehard">
                <label for="diehard" class="lh-copy">Die Hard</label>
              </div>
              <div class="flex items-center mb2">
                <input class="mr2" type="checkbox" id="primer" value="primer">
                <label for="primer" class="lh-copy">Primer</label>
              </div>
              <div class="flex items-center mb2">
                <input class="mr2" type="checkbox" id="proxy" value="proxy">
                <label for="proxy" class="lh-copy">Hudsucker Proxy</label>
              </div>
              <div class="flex items-center mb2">
                <input class="mr2" type="checkbox" id="homealone" value="homealone">
                <label for="homealone" class="lh-copy">Home Alone</label>
              </div>
            </fieldset>
          </form>
        </section>
      </main>
    </body>
  `
}
