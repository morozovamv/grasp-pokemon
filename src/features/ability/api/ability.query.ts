import { PokeAPI } from 'pokeapi-types'

export const fetchAbility = async (url: string): Promise<PokeAPI.Ability> => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch ability`)
    }

    return response.json()
  } catch {
    throw new Error('Network error while fetching Pokémon ability data')
  }
}
