// export module
var html = require('choo/html')

module.exports = function (state, emit) {
  console.log("loggin check, baby!")
  if(!state.user.loggedIn) {
    state.statusMsg = "You need to be logged in to access this page"
    state.redirect = true
    state.redirectTarget = state.href    
    emit('needToLogIn')
    return
  } 
}