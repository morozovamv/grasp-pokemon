import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

type StatsProps = {
  stats: { name: string; value: number }[]
}

export function Stats({ stats }: StatsProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {stats.map(({ name, value }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
