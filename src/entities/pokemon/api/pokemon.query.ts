import { PokeAPI } from 'pokeapi-types'

export const fetchPokemon = async (nameOrId: string | number): Promise<PokeAPI.Pokemon> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon data for ${nameOrId}`)
    }

    return response.json()
  } catch {
    throw new Error('Network error while fetching Pokémon data')
  }
}
