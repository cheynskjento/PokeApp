export async function fetchPokemonList(limit = 50) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await res.json();

  const details = await Promise.all(
    data.results.map(p => fetch(p.url).then(r => r.json()))
  );

  return details;
}

export async function fetchPokemonDetail(url) {
  const res = await fetch(url);
  return res.json();
}
