'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Axios = require("axios");
var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var Html$ReasonReactExamples = require("../Html.bs.js");

var initialState = {
  availableTypes: undefined,
  pokemon: undefined,
  offset: 0,
  chosenType: undefined
};

function PokemonApp(Props) {
  var match = React.useState((function () {
          return initialState;
        }));
  var setState = match[1];
  var state = match[0];
  var getVisiblePokemon = function (param) {
    var match = state.pokemon;
    if (match !== undefined) {
      return match.slice(state.offset, state.offset + 10 | 0);
    } else {
      return [];
    }
  };
  React.useEffect((function () {
          Axios.get("https://pokeapi.co/api/v2/type/").then((function (value) {
                  var a = value.data;
                  Curry._1(setState, (function (state) {
                          return {
                                  availableTypes: a.results,
                                  pokemon: state.pokemon,
                                  offset: state.offset,
                                  chosenType: state.chosenType
                                };
                        }));
                  return Promise.resolve(/* () */0);
                }));
          return ;
        }), []);
  return React.createElement("div", {
              className: "h-screen max-h-screen flex flex-col "
            }, React.createElement("div", {
                  className: "max-h-screen nes-field container mx-auto  flex flex-1"
                }, React.createElement("div", {
                      className: "flex flex-col md:flex-row flex-grow"
                    }, React.createElement("div", {
                          className: "flex-1 flex-grow flex "
                        }, React.createElement("div", {
                              className: "nes-container is-rounded flex-1 flex-grow "
                            }, React.createElement("div", {
                                  className: "my-3"
                                }, React.createElement("label", {
                                      htmlFor: "success_select"
                                    }, Html$ReasonReactExamples.text("Pokemon type")), React.createElement("div", {
                                      className: "flex"
                                    }, React.createElement("div", {
                                          className: "nes-select is-success"
                                        }, React.createElement("select", {
                                              id: "success_select",
                                              required: true,
                                              onChange: (function (e) {
                                                  var t = e.target.value;
                                                  var chosenType = t === "" ? undefined : t;
                                                  return Curry._1(setState, (function (state) {
                                                                return {
                                                                        availableTypes: state.availableTypes,
                                                                        pokemon: state.pokemon,
                                                                        offset: state.offset,
                                                                        chosenType: chosenType
                                                                      };
                                                              }));
                                                })
                                            }, React.createElement("option", {
                                                  selected: true,
                                                  value: ""
                                                }, Html$ReasonReactExamples.text("No filter")), Html$ReasonReactExamples.elements(state.availableTypes, (function (t) {
                                                    return React.createElement("option", undefined, Html$ReasonReactExamples.text(t.name));
                                                  })))))), React.createElement("div", {
                                  className: "flex"
                                }, React.createElement("button", {
                                      className: "nes-btn is-success flex-1",
                                      type: "button",
                                      onClick: (function (param) {
                                          var match = state.chosenType;
                                          if (match !== undefined) {
                                            Axios.get("https://pokeapi.co/api/v2/type/" + match).then((function (value) {
                                                    var unpagedPokemon = value.data;
                                                    var newPokemon = $$Array.map((function (a) {
                                                            return a.pokemon;
                                                          }), unpagedPokemon.pokemon);
                                                    Curry._1(setState, (function (state) {
                                                            return {
                                                                    availableTypes: state.availableTypes,
                                                                    pokemon: newPokemon,
                                                                    offset: state.offset,
                                                                    chosenType: state.chosenType
                                                                  };
                                                          }));
                                                    return Promise.resolve(/* () */0);
                                                  }));
                                            return /* () */0;
                                          } else {
                                            return /* () */0;
                                          }
                                        })
                                    }, React.createElement("img", {
                                          className: "mx-auto",
                                          style: {
                                            maxHeight: "30px"
                                          },
                                          src: "assets/glass.png"
                                        }))))), React.createElement("div", {
                          className: "flex flex-1 flex-col ml-1"
                        }, React.createElement("div", {
                              className: " nes-container is-rounded flex flex-col flex-grow overflow-auto",
                              style: ReactDOMRe.Style.unsafeAddProp({ }, "min-height", "min-content")
                            }, Html$ReasonReactExamples.elements(getVisiblePokemon(/* () */0), (function (pokemon) {
                                    return React.createElement("button", {
                                                className: "nes-btn is-primary my-2",
                                                type: "button"
                                              }, Html$ReasonReactExamples.text(pokemon.name));
                                  }))), React.createElement("div", {
                              className: "flex flex-row"
                            }, React.createElement("button", {
                                  className: "flex-1 nes-btn is-primary my-2",
                                  type: "button",
                                  onClick: (function (param) {
                                      var newOffset = state.offset === 0 ? 0 : state.offset - 10 | 0;
                                      Curry._1(setState, (function (state) {
                                              return {
                                                      availableTypes: state.availableTypes,
                                                      pokemon: state.pokemon,
                                                      offset: newOffset,
                                                      chosenType: state.chosenType
                                                    };
                                            }));
                                      return /* () */0;
                                    })
                                }, Html$ReasonReactExamples.text("Previous")), React.createElement("button", {
                                  className: "flex-1 nes-btn is-primary my-2",
                                  type: "button",
                                  onClick: (function (param) {
                                      var match = state.pokemon;
                                      if (match !== undefined) {
                                        var newOffset = (state.offset + 10 | 0) >= match.length ? state.offset : state.offset + 10 | 0;
                                        Curry._1(setState, (function (state) {
                                                return {
                                                        availableTypes: state.availableTypes,
                                                        pokemon: state.pokemon,
                                                        offset: newOffset,
                                                        chosenType: state.chosenType
                                                      };
                                              }));
                                      }
                                      return /* () */0;
                                    })
                                }, Html$ReasonReactExamples.text("Next")))))));
}

var paginationLimit = 10;

var make = PokemonApp;

exports.initialState = initialState;
exports.paginationLimit = paginationLimit;
exports.make = make;
/* axios Not a pure module */
