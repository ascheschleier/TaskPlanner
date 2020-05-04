// export module
var html = require('choo/html')

module.exports = function (state, emit) {
  if (state.user.loggedIn) {
    return html`
      <a class="settings_link" href="/settings/${state.user.username}"><img src="../../assets/cog.png" ></a>
    `
  } else {

  }
}
