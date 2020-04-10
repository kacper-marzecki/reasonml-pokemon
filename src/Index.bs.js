'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var PokemonApp$ReasonReactExamples = require("./PokemonApp/PokemonApp.bs.js");

ReactDom.render(React.createElement(PokemonApp$ReasonReactExamples.make, { }), document.getElementById("app"));

/*  Not a pure module */
