import { PokeAPI } from 'pokeapi-types'

export const fetchPokemons = async (page: number): Promise<PokeAPI.NamedAPIResourceList> => {
  try {
    const limit = 10
    const offset = (page - 1) * limit
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon data')
    }

    return response.json()
  } catch {
    throw new Error('Network error while fetching Pokémons data')
  }
}
