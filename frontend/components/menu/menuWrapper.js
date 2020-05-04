var html = require('choo/html')


var entry = require('./menuEntry')
var badge = require('./userbadge')
var settings_btn = require('./settings_btn')
module.exports = Menu

function Menu (state, emit) {
  
  return html`
    <nav class="dt w-100 border-box pa3 bg-blue">
      <a class="dtc v-mid mid-gray link dim w-25" href="/" title="Home">      
        <img src="../../assets/tl.png" class="dib w2 h2" alt="Site Name">
      </a>      
      ${badge(state, emit)}
      <div class="dtc v-mid w-25 tr">
        ${settings_btn(state, emit)}
      </div>
    </nav>
    `
}