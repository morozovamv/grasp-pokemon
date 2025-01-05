import { TextField } from '@mui/material'
import { useRef } from 'react'
import { SxProps, Theme } from '@mui/material/styles'

type PokemonSearchProps = {
  onSearch?: (searchValue: string) => void
  sx?: SxProps<Theme>
  helperText?: React.ReactNode
}

export function Search({ onSearch, sx, helperText }: PokemonSearchProps) {
  const textFieldRef = useRef<HTMLInputElement | null>(null)

  const handleEnterKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchValue = textFieldRef.current?.value ?? ''
      onSearch?.(searchValue)
    }
  }

  return (
    <>
      <TextField
        inputRef={textFieldRef}
        onKeyDown={handleEnterKeydown}
        size="small"
        sx={[...(Array.isArray(sx) ? sx : [sx])]}
        helperText={helperText}
      />
    </>
  )
}
