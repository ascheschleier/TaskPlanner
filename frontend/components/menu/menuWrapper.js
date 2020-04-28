var html = require('choo/html')

var entry = require('./menuEntry')

module.exports = Menu

function Menu (state, emit) {
  
  return html`
    <nav class="dt w-100 border-box pa3 bg-blue">
      <a class="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
        <img src="../../../assets/icon.png" class="dib w2 h2 br-100" alt="Site Name">
      </a>
      <div class="dtc v-mid w-75 tr">
       ${state.mainMenuRoutes.map(entry)}
      </div>
    </nav>
    `
}