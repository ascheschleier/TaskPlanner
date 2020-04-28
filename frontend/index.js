var css = require('sheetify')
var choo = require('choo')
var html = require('choo/html')

//require('./mainMenuViews')

var loginView = require('./views/login')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}
app.use(function (state, emitter) {
  // initialize state
  state.tasks = [
    {type: 'task',text: "pre filled task 1", id: "1"},
    {type: 'task',text: "pre filled task 2", id: "2"},
  ]

  state.mainMenuRoutes = [
    {route: '/',active: false, title: 'Home'},
    {route: '/login',active: false, title: 'Login' },
    {route: '/video',active: false, title: 'Video Chat' },
  ]
 
  emitter.on('navigate', () => {               
    console.log(`Navigated to ${state.route}`) 

    for(let entry of state.mainMenuRoutes) {
        var calledRoute = '/'+state.route
        calledRoute.toString()
        var entryRoute = entry.route
        entryRoute.toString()
        //console.log(`Matching with ${entry.route}`) 
        if(calledRoute === entry.route) {
            //console.log(`Match found, setting ${entry.route} active`) 
            entry.active = true
        } else {
            //console.log(`${calledRoute} does not match ${entry.route}`)
            entry.active = false
        }
    }
  })
})

app.use(require('./stores/Tasks'))

/* Main menu routes */
app.route('/', require('./views/main'))
app.route('/login', require('./views/login'))
app.route('/video', require('./views/video'))

/* Main menu routes */
app.route('/', require('./views/main'))
app.route('/login', require('./views/login'))
/*
app.route('/login', (state, emit) => {  
    //passport.authenticate('local', { successRedirect: '/', failureRedirect: '/fail', failureFlash: true })
    return loginView
})
*/
app.route('/video', require('./views/video'))
//app.route('/dashboard', require('./views/dashboard'))


app.route('/*', require('./views/404'))


module.exports = app.mount('body')
