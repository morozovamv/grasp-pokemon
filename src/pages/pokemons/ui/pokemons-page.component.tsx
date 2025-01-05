import { Search } from '../../../features/search/ui/search.component'
import { usePokemonsPageContext } from './pokemons-page.context'
import { Types } from '../../../features/type-filter/ui/types.component'
import { Alert, Container } from '@mui/material'
import { PokemonsTable } from '../../../features/pokemons-table/ui/pokemons-table.component'

export function PokemonsPage() {
  const {
    setPage,
    activePokemonType,
    setActivePokemonType,
    setPokemonName,
    typeQueryResult,
    pokemonsDetailsQueriesResult,
  } = usePokemonsPageContext()

  const handleSearch = (searchValue: string) => {
    setPage(1)
    setPokemonName(searchValue)

    if (searchValue === '') {
      setActivePokemonType(null)
    }
  }

  const handleTypeClick = (type: string | null) => {
    setActivePokemonType(type)
    setPage(1)
    /**
     * TODO: search component should be controlled because when
     * using search first and clicking type - the search input still has value
     * but it is unused and may confuse users
     */
    setPokemonName('')
  }

  const isError =
    typeQueryResult?.isError ||
    pokemonsDetailsQueriesResult?.some(({ isError }) => isError === true)

  return (
    <Container>
      <Search onSearch={handleSearch} helperText={'Use full pokemon name'} />

      <Types onTypeClick={handleTypeClick} activePokemonType={activePokemonType} sx={{ mt: 2 }} />

      {isError ? <Alert severity="error">Failed to load pokemons</Alert> : <PokemonsTable />}
    </Container>
  )
}
