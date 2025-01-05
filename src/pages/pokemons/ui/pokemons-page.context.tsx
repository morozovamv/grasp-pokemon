import { keepPreviousData, useQueries, useQuery, UseQueryResult } from '@tanstack/react-query'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { fetchPokemon } from '../../../entities/pokemon/api/pokemon.query'
import { fetchPokemons } from '../api/pokemons.query'
import { PokeAPI } from 'pokeapi-types'
import { fetchType } from '../../../features/type-filter/api/type.query'

type PokemonDetails = {
  name: string
  id: number | undefined
  type: string | undefined
  image: string | undefined
}

type SearchContext = {
  pokemonsDetails: PokemonDetails[] | null
  pokemonsQueryResult?: UseQueryResult<PokeAPI.NamedAPIResourceList, Error>
  typeQueryResult?: UseQueryResult<PokeAPI.Type | null, Error>
  pokemonsDetailsQueriesResult?: UseQueryResult<PokeAPI.Pokemon, Error>[]
  activePokemonType: string | null
  setActivePokemonType: (type: string | null) => void
  page: number
  setPage: (page: number) => void
  isSearchEmpty: boolean
  setPokemonName: (name: string) => void
}

const initialState: SearchContext = {
  pokemonsDetails: null,
  activePokemonType: null,
  setActivePokemonType: () => {},
  page: 0,
  setPage: () => {},
  isSearchEmpty: true,
  setPokemonName: () => {},
}

const context = createContext(initialState)

export function PokemonsPageProvider({ children }: PropsWithChildren) {
  const [pokemonName, setPokemonName] = useState('')
  const [activePokemonType, setActivePokemonType] = useState<string | null>(null)

  /**
   * INFO: when search input is not empty => use its value as data source
   * to request data for the pokemons table
   */
  const isSearchEmpty = pokemonName === ''

  const [page, setPage] = useState(1)

  const typeQueryResult = useQuery({
    queryKey: ['type', activePokemonType],
    queryFn: () => (activePokemonType ? fetchType(activePokemonType) : null),
  })

  const pageSize = 10

  const paginatedNames =
    typeQueryResult.data?.pokemon
      .slice((page - 1) * pageSize, page * pageSize)
      .map(({ pokemon }) => pokemon.name) ?? []

  const pokemonsQueryResult = useQuery({
    queryKey: ['pokemons', page],
    // TODO: add page size (limit) as a variable?
    queryFn: () => fetchPokemons(page),
    placeholderData: keepPreviousData,
  })

  const pokemonsToRequestDetails = !isSearchEmpty
    ? [pokemonName]
    : activePokemonType !== null
      ? paginatedNames
      : (pokemonsQueryResult.data?.results.map(({ name }) => name) ?? [])

  const pokemonsDetailsQueriesResult = useQueries({
    queries: pokemonsToRequestDetails.map(name => ({
      queryKey: ['pokemon', name],
      queryFn: () => fetchPokemon(name),
    })),
  })

  const pokemonsDetails = pokemonsDetailsQueriesResult
    .map(({ data }) => (data ? mapToPokemonDetails(data) : null))
    .filter(details => details !== null)

  return (
    <context.Provider
      value={{
        pokemonsDetails,
        pokemonsQueryResult,
        activePokemonType,
        setActivePokemonType,
        page,
        setPage,
        setPokemonName,
        isSearchEmpty,
        pokemonsDetailsQueriesResult,
        typeQueryResult,
      }}
    >
      {children}
    </context.Provider>
  )
}

export function usePokemonsPageContext(): SearchContext {
  const searchContext = useContext(context)

  if (searchContext === initialState) {
    throw new Error(
      `No PokemonsPageContext available. You might still need to wrap the application with the ${PokemonsPageProvider.name}.`
    )
  }

  return searchContext
}

const mapToPokemonDetails = (pokemon: PokeAPI.Pokemon): PokemonDetails => {
  const { id, name, types, sprites } = pokemon

  return {
    name,
    id,
    type: types.map(({ type: { name } }) => name).join(', '),
    image: sprites.front_default,
  }
}
