// export module
var html = require('choo/html')

module.exports = function (state, emit) {
  if(state.user.loggedIn) {
    return html`
      <div class="userBadge v-mid dtc">Hi ${state.user.username}! <a href="#" onclick="${logout}">logout</a>
    `
  } else {
    return html`
       <div class="userBadge v-mid dtc">Hi, want to <a class="link dim dark-gray" href="/login">login</a> or <a class="link dim dark-gray" href="/register">register</a>?
    `
  }

  

  function logout(){
    emit('user:logout')
  }
}