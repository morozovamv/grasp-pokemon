import { PokeAPI } from 'pokeapi-types'

// TODO: validate that data matches expected type (use zod, io-ts, or custom type guards)
export const fetchTypes = async (): Promise<PokeAPI.NamedAPIResourceList> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type?limit=21`)

    if (!response.ok) {
      const errorStatus = response.status
      const statusText = response.statusText
      throw new Error(`Failed to fetch Pokémon types data: ${errorStatus} - ${statusText}`)
    }

    return response.json()
  } catch {
    throw new Error('Network error while fetching Pokémon types data')
  }
}
