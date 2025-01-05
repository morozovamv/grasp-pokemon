import { useQuery } from '@tanstack/react-query'
import { fetchPokemon } from '../../../entities/pokemon/api/pokemon.query'
import { Alert, CircularProgress, Container, Typography } from '@mui/material'
import { useParams } from 'react-router'
import { Stats } from '../../../features/stats/ui/stats.component'
import { NoData } from '../../../shared/ui/no-data.component'
import { PokemonAbilitiesContainer } from '../../../features/ability/container/abilities.container'

export function PokemonDetailsPage() {
  const { pokemonName } = useParams()

  const {
    data: pokemon,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => {
      if (pokemonName) {
        return fetchPokemon(pokemonName)
      }

      throw new Error(`Couldn't find a pokemon name to fetch data`)
    },
  })

  return (
    <Container>
      {error && <Alert severity="error">{error.message}</Alert>}
      {isLoading ? (
        <CircularProgress size="30" />
      ) : pokemon && pokemonName ? (
        <>
          <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
            {pokemon.name}
          </Typography>

          <img
            src={
              pokemon.sprites.other?.['official-artwork']?.front_default ??
              pokemon.sprites.front_default
            }
          />

          <Typography sx={{ mt: 2 }}>Stats</Typography>
          <Stats
            stats={pokemon.stats.map(({ stat, base_stat }) => ({
              name: stat.name,
              value: base_stat,
            }))}
          />

          <Typography sx={{ mt: 2 }}>Abilities</Typography>
          <PokemonAbilitiesContainer pokemonName={pokemonName} abilities={pokemon.abilities} />
        </>
      ) : (
        <NoData />
      )}
    </Container>
  )
}
