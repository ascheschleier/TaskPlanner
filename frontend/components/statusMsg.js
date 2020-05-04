// export module
var html = require('choo/html')

module.exports = function (state, emit) {
  if (state.statusMsg && state.statusMsg != '') {
    return html`
      <div class="statusMsg v-mid dtc">${state.statusMsg}</div>
    `
  }

  function logout () {
    emit('user:logout')
  }
}
