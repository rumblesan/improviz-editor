const Handlebars = require("handlebars/runtime");
Handlebars.registerHelper("setSelected", function (value, currentValue) {
  if (value == currentValue) {
    return "selected";
  } else {
    return "";
  }
});
module.exports = Handlebars;
