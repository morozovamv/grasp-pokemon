import { CircularProgress } from '@mui/material'
import { useQueries } from '@tanstack/react-query'
import { PokeAPI } from 'pokeapi-types'
import { fetchAbility } from '../api/ability.query'
import { Ability } from '../ui/ability.component'

type PokemonAbilitiesContainerProps = {
  pokemonName: string
  abilities: PokeAPI.PokemonAbility[]
}

export function PokemonAbilitiesContainer({
  pokemonName,
  abilities,
}: PokemonAbilitiesContainerProps) {
  const abilityQueries = useQueries({
    queries: abilities.map(({ ability }) => ({
      queryKey: ['ability', pokemonName, ability.name],
      queryFn: () => fetchAbility(ability.url),
    })),
  })

  const isLoading = abilityQueries.some(({ isLoading }) => isLoading)
  const loadedAbilities = abilityQueries
    .filter(({ isError, isFetched }) => isFetched && !isError)
    .filter(queriesResult => queriesResult.data !== undefined)

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        loadedAbilities.map(({ data }) => <Ability ability={data} key={data.id} />)
      )}
    </div>
  )
}
