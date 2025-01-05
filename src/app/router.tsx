import { Route, Routes } from 'react-router'
import { PokemonDetailsPage } from '../pages/pokemon-details/ui/pokemon-details-page.component'
import { PokemonsPage } from '../pages/pokemons/ui/pokemons-page.component'
import { PokemonsPageProvider } from '../pages/pokemons/ui/pokemons-page.context'
import { NavigationPanel } from './navigation-panel.component'
import { ErrorBoundary } from 'react-error-boundary'
import { Typography } from '@mui/material'

export function Router() {
  return (
    <Routes>
      <Route element={<NavigationPanel />}>
        <Route
          path="/"
          element={
            <ErrorBoundary
              fallback={<Typography>Something went wrong, try to reload the page</Typography>}
            >
              <PokemonsPageProvider>
                <PokemonsPage />
              </PokemonsPageProvider>
            </ErrorBoundary>
          }
        />
        <Route path=":pokemonName" element={<PokemonDetailsPage />} />
      </Route>
    </Routes>
  )
}
