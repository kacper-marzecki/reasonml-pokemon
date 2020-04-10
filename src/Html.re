let text = React.string;

let elements =
    (elements: option(array('a)), componentFn: 'a => React.element)
    : React.element => {
  let arr =
    switch (elements) {
    | None => [||]
    | Some(e) => e
    };
  ReasonReact.array(Array.map(componentFn, arr));
};
