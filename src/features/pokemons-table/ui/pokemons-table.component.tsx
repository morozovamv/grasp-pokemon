import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material'
import { useNavigate } from 'react-router'
import { usePokemonsPageContext } from '../../../pages/pokemons/ui/pokemons-page.context'

export function PokemonsTable() {
  const navigate = useNavigate()

  const {
    page,
    pokemonsDetails,
    setPage,
    pokemonsQueryResult,
    isSearchEmpty,
    activePokemonType,
    typeQueryResult,
  } = usePokemonsPageContext()

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage + 1)
  }

  const getPaginationItemsCount = () => {
    if (!isSearchEmpty) {
      return pokemonsDetails?.length ?? 0
    }

    if (activePokemonType !== null) {
      return typeQueryResult?.data?.pokemon.length ?? 0
    }

    return pokemonsQueryResult?.data?.count ?? 0
  }

  return (
    <>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell padding="none" sx={{ padding: 2 }}>
              ID
            </TableCell>
            <TableCell padding="none" align="right">
              Name
            </TableCell>
            <TableCell padding="none" align="right">
              Type
            </TableCell>
            <TableCell padding="none" align="right">
              Image
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonsDetails?.length === 0 ? (
            <TableRow>
              <TableCell>No data</TableCell>
            </TableRow>
          ) : (
            pokemonsDetails?.map(({ name, id, image, type }) => (
              <TableRow key={name} onClick={() => navigate(`/${name}`)} hover={true}>
                <TableCell padding="none" sx={{ padding: 2 }}>
                  {id}
                </TableCell>
                <TableCell padding="none" align="right">
                  {name}
                </TableCell>
                <TableCell padding="none" align="right">
                  {type}
                </TableCell>
                <TableCell padding="none" align="right">
                  <img src={image} alt={name} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={getPaginationItemsCount()}
        rowsPerPage={10}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
        disabled={!isSearchEmpty}
      />
    </>
  )
}
