import { Typography } from '@mui/material'

type NoDataProps = {
  message?: string
}

const DEFAULT_NO_DATA_MESSAGE = 'No data'

export function NoData({ message }: NoDataProps) {
  return <Typography>{message ? message : DEFAULT_NO_DATA_MESSAGE}</Typography>
}
