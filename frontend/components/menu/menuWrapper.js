var html = require('choo/html')

var entry = require('./menuEntry')
var badge = require('./userbadge')
module.exports = Menu

function Menu (state, emit) {
  
  return html`
    <nav class="dt w-100 border-box pa3 bg-blue">
      <a class="dtc v-mid mid-gray link dim w-25" href="/" title="Home">      
        <img src="../../assets/tl.png" class="dib w2 h2 br-100" alt="Site Name">
      </a>      
      ${badge(state, emit)}
      <div class="dtc v-mid w-25 tr">
        ${entry(state.mainMenuRoutes[1])}
        ${entry(state.mainMenuRoutes[9])}
      </div>
    </nav>
    `
}