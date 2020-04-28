var html = require('choo/html')

// import template
var tasks = require('../components/tasks.js')
var Menu = require('../components/menu/menuWrapper')


var TITLE = 'LOGIN - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  //tasks.bind(null, handleDelete )




  return html`
    <body class="code lh-copy" style="max-width:650px; margin:0 auto;">
      ${Menu(state, emit)}
      <main class="pa3 cf center">
        <section class="fl w-100 pa2">
          <h2>Login</h2>
          <form id="login" onsubmit=${onsubmit}>
            <label for="username">
            username
            </label>
            <input id="username" name="username"
            type="text"
            required
            pattern=".{1,36}"
            title="Username must be between 1 and 36 characters long."
            >
            <label for="password">
            password
            </label>
            <input id="password" name="password"
            type="password"
            required
            >
            <input type="submit" value="Login">
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
            if (!res.ok) return console.log('oh no!')
            console.log('request ok \\o/')
        })
        .catch(err => console.log('oh no!'))
    }
    
}
