type page('a) = {
  count: int,
  next: string,
  previous: string,
  results: array('a),
};

type typeInfo = {
  name: string,
  url: string,
};

type pokemonShortInfo = {
  name: string,
  url: string,
};

type pokemonWrapper = {pokemon: pokemonShortInfo};

type unpagedPokemon = {pokemon: array(pokemonWrapper)};