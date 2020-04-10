'use strict';

var $$Array = require("bs-platform/lib/js/array.js");

function text(prim) {
  return prim;
}

function elements(elements$1, componentFn) {
  var arr = elements$1 !== undefined ? elements$1 : [];
  return $$Array.map(componentFn, arr);
}

exports.text = text;
exports.elements = elements;
/* No side effect */
