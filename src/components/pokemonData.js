// Images for all pokemons were available till 1151,
// after that some images were not available with the default img url
export const pokemonCount = 1151;

// "https://pokeapi.co/api/v2/pokemon/{id}/"
const pokemonIdIndex = 34;

export function getPokemonIdFromURL(url) {
  return +url.slice(pokemonIdIndex, -1);
}

export function getPokemonImageURL(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export async function getPokemons(offset = 0, limit = 9) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );

  const result = await response.json();
  return result.results;
}
