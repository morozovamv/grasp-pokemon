import { PokeAPI } from 'pokeapi-types'

export const fetchType = async (type: string | number): Promise<PokeAPI.Type> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)

    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon type data')
    }

    return response.json()
  } catch {
    throw new Error('Network error while fetching Pokémon type data')
  }
}
