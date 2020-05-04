const css = require('sheetify')

module.exports = function () {
 return css`
    .settings_link {
      max-width: 30px;
      display: inline-block;
      text-align: right;
      margin-right: 10px;
    }

    .error-field {

    }
    
    .error-field.js-hide {
      display:none;
    }
  `
}