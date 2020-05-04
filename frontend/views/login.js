var html = require('choo/html')

// import components
var tasks = require('../components/tasks.js')
var Menu = require('../components/menu/menuWrapper')
var statusMsg = require('../components/statusMsg')

var TITLE = 'LOGIN - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  // tasks.bind(null, handleDelete )

  return html`
    <body class="code lh-copy" style="max-width:650px; margin:0 auto;">
      ${Menu(state, emit)}
      <main class="pa3 cf center">
        ${statusMsg(state, emit)}
        <section class="fl w-100 pa2">
          <h2 class="measure center">Login</h2>

          <form id="login" onsubmit=${onsubmit}>
            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="username">
                  username
                </label>
              </div>
              <div class="mt3">
              <input id="username" 
                name="username"
                type="text"
                required
                pattern=".{1,36}"
                title="Username must be between 1 and 36 characters long."
                class="pa2 input-reset ba bg-transparent w-100 measure"
                >
              </div>             
              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="password">Password</label>
                <input class="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password">
              </div>            
            </fieldset>
            <div class="">
              <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in">
            </div>
            <div class="lh-copy mt3">
              <a href="/register" class="f6 link dim black db">Register</a>
              
            </div>
          </form>
        </section>
      </main>
    </body>
    `

  function onsubmit (e) {
    e.preventDefault()
    var form = e.currentTarget
    var data = new FormData(form)
    var headers = new Headers({ 'Content-Type': 'application/json' })
    var body = {}
    for (var pair of data.entries()) body[pair[0]] = pair[1]
    body = JSON.stringify(body)
    fetch('/login', { method: 'POST', body, headers })
      .then(res => {
        if (!res.ok) return console.log('oh no! ' + res.headers.statusMessage)
        console.log('request ok \\o/')
        // console.log(res.headers["msg"])
        // console.log(res.headers["usr"])
        // ToDo: get the username back as statusMessage, quick workaround:
        var name = JSON.parse(body)
        emit('user:login', name.username)
      })
      .catch(err => console.log('oh no!'))
  }
}
