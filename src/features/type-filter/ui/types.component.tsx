import { useQuery } from '@tanstack/react-query'
import { fetchTypes } from '../api/types.query'
import { Alert, Chip, CircularProgress, Stack } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { NoData } from '../../../shared/ui/no-data.component'

type PokemonTypesProps = {
  activePokemonType: string | null
  onTypeClick?: (type: string | null) => void
  sx?: SxProps<Theme>
}

export function Types({ activePokemonType, onTypeClick, sx }: PokemonTypesProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon-types'],
    queryFn: fetchTypes,
  })

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  }

  return data ? (
    <Stack direction="row" flexWrap="wrap" rowGap={'4px'} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {data.results.map(({ name }) => (
        <Chip
          key={name}
          variant={activePokemonType === name ? 'filled' : 'outlined'}
          label={name}
          clickable={true}
          onClick={event => {
            const text = event.currentTarget.textContent

            if (text) {
              onTypeClick?.(text)
            }
          }}
          component="div"
          sx={{ mr: 1 }}
        />
      ))}

      <Chip
        variant={activePokemonType === null ? 'filled' : 'outlined'}
        label="All"
        clickable={true}
        onClick={() => {
          onTypeClick?.(null)
        }}
        component="div"
      />
    </Stack>
  ) : (
    <NoData message="Types list is empty." />
  )
}
