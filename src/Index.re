// Entry point

[@bs.val] external document: Js.t({..}) = "document";

ReactDOMRe.render(<PokemonApp />, document##getElementById("app"));