open Html;
open Model;

type state = {
  availableTypes: option(array(typeInfo)),
  pokemon: option(array(pokemonShortInfo)),
  offset: int,
  chosenType: option(string),
};

let initialState = {
  availableTypes: None,
  offset: 0,
  pokemon: None,
  chosenType: None,
};

let paginationLimit = 10;

[@react.component]
let make = () => {
  let (state, setState) = React.useState(() => initialState);
  let setChosenType = (t: string) => {
    let chosenType =
      switch (t) {
      | "" => None
      | _ => Some(t)
      };
    setState(state => {...state, chosenType});
  };
  let onPreviousClicked = (): unit => {
    let newOffset = state.offset == 0 ? 0 : state.offset - paginationLimit;
    setState(state => {...state, offset: newOffset});
    ();
  };
  let onNextClicked = (): unit => {
    switch (state.pokemon) {
    | None => ()
    | Some(arr) =>
      let newOffset =
        state.offset + paginationLimit >= Array.length(arr)
          ? state.offset : state.offset + paginationLimit;
      setState(state => {...state, offset: newOffset});
    };
    ();
  };
  let getVisiblePokemon = (): array(pokemonShortInfo) => {
    switch (state.pokemon) {
    | None => [||]
    | Some(arr) =>
      Js.Array.slice(
        ~start=state.offset,
        ~end_=state.offset + paginationLimit,
        arr,
      )
    };
  };
  let onSearchClicked = (): unit => {
    switch (state.chosenType) {
    | None => ()
    | Some(a) =>
      let _ =
        Axios.get("https://pokeapi.co/api/v2/type/" ++ a)
        |> Js.Promise.then_(value => {
             let unpagedPokemon: unpagedPokemon = value##data;
             let newPokemon =
               Some(
                 Array.map(
                   (a: pokemonWrapper) => a.pokemon,
                   unpagedPokemon.pokemon,
                 ),
               );
             setState(state => {...state, pokemon: newPokemon});
             Js.Promise.resolve();
           });
      ();
    };
  };
  React.useEffect1(
    () => {
      let _ =
        Axios.get("https://pokeapi.co/api/v2/type/")
        |> Js.Promise.then_(value => {
             let a: page(typeInfo) = value##data;
             setState(state => {...state, availableTypes: Some(a.results)});
             Js.Promise.resolve();
           });
      None;
    },
    [||],
  );
  <div className="h-screen max-h-screen flex flex-col ">
    <div className="max-h-screen nes-field container mx-auto  flex flex-1">
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="flex-1 flex-grow flex ">
          <div className="nes-container is-rounded flex-1 flex-grow ">
            <div className="my-3">
              <label htmlFor="success_select"> {text("Pokemon type")} </label>
              <div className="flex">
                <div className="nes-select is-success">
                  <select
                    onChange={e =>
                      setChosenType(ReactEvent.Form.target(e)##value)
                    }
                    required=true
                    id="success_select">
                    <option value="" selected=true>
                      {text("No filter")}
                    </option>
                    {elements(state.availableTypes, (t: typeInfo) => {
                       <option> {text(t.name)} </option>
                     })}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                type_="button"
                onClick={_ => onSearchClicked()}
                className="nes-btn is-success flex-1">
                <img
                  src="assets/glass.png"
                  className="mx-auto"
                  style={ReactDOMRe.Style.make(~maxHeight="30px", ())}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col ml-1">
          <div
            style={ReactDOMRe.Style.unsafeAddProp(
              ReactDOMRe.Style.make(),
              "min-height",
              "min-content",
            )}
            className=" nes-container is-rounded flex flex-col flex-grow overflow-auto">
            {elements(Some(getVisiblePokemon()), (pokemon: pokemonShortInfo) => {
               <button type_="button" className="nes-btn is-primary my-2">
                 {text(pokemon.name)}
               </button>
             })}
          </div>
          <div className="flex flex-row">
            <button
              type_="button"
              onClick={_ => onPreviousClicked()}
              className="flex-1 nes-btn is-primary my-2">
              {text("Previous")}
            </button>
            <button
              type_="button"
              onClick={_ => onNextClicked()}
              className="flex-1 nes-btn is-primary my-2">
              {text("Next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>;
};