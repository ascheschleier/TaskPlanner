// export module
var html = require('choo/html')

module.exports = function (menuEntry) {
    var route = menuEntry.route
    var title = menuEntry.title

  // create html template
  return html`
    <div class="ph3">
      <a class="f6 link dim ph3 pv2 mb2 dib white bg-navy" href="${route}">${title}</a>
    </div>
  `
}