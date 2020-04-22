// export module
var html = require('choo/html')

module.exports = function (menuEntry) {
    var route = menuEntry.route
    var title = menuEntry.title
    var active = menuEntry.active

  // create html template
  return html`
    <a class="link dim dark-gray f6 f5-ns dib mr3 mr4-ns ${setActive(active)}" href="${route}">${title}</a>
  `

  function setActive(bool){
    if(bool){ return "menu-item-active"}
  }
}