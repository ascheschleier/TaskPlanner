var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}
app.use(function (state) {
  // initialize state
  state.tasks = [
    {type: 'task',text: "pre filled task 1", id: "1"},
    {type: 'task',text: "pre filled task 2", id: "2"},
  ]
})
//app.use(require('./stores/Tasks'))


app.route('/', require('./views/main'))
app.route('/*', require('./views/404'))

module.exports = app.mount('body')
