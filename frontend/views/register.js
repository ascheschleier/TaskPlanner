var html = require('choo/html')

// import templates
var Menu = require('../components/menu/menuWrapper')


var TITLE = 'Register - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy" style="max-width:650px; margin:0 auto;">
      ${Menu(state, emit)}
      <main class="pa3 cf center">
        <div id="temporaryField"></div>
        <section class="fl w-100 pa2">
          <h2>Register</h2>
          <form id="register" onsubmit=${onsubmit}>
            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
              <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="username">
                  username
                </label>
                <input id="username" name="username"
                  type="text"
                  required
                  pattern=".{1,36}"
                  title="Username must be between 1 and 36 characters long."
                  class="pa2 input-reset ba bg-transparent w-100 measure"
                  >
              </div>
              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="email-address">Email address</label>
                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address">
              </div>
              <div class="mt3">
                <label class="db fw4 lh-copy f6" for="password">Password</label>
                <input class="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password">
              </div>
            </fieldset>
            <div class="error-field js-hide f4 fw6 db red"></div>
            <div class="mt3"><input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up"></div>
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
        fetch('/createuser', { method: 'POST', body, headers })              
        .then(res => {
            if (!res.ok){
              if(res.status === 412){
                displayErrors(res.statusText);
                return 
              }
              return console.log('oh no!')
            } 
            console.log('request ok \\o/')
            state.redirect = true
            state.redirectTaget = '/registered'
            emit('user:login', res.statusText)
        })
        .catch(err => console.log('oh no!')+" "+JSON.stringify(err))
    }
    
  function displayErrors(msg){
    var errorField = document.getElementsByClassName('error-field')[0]
    errorField.classList.remove('js-hide');       
    errorField.innerHTML = msg
    console.log('msg') 
  }
}
