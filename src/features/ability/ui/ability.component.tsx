import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import { PokeAPI } from 'pokeapi-types'

export function Ability({ ability }: { ability: PokeAPI.Ability }) {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography component="span">{ability.name}</Typography>

        <Typography>
          :{' '}
          {(
            ability.effect_entries.find(({ language }) => language.name === 'en') ||
            ability.effect_entries[0]
          )?.short_effect ?? 'unknown description for short effect'}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography>
          {(
            ability.effect_entries.find(({ language }) => language.name === 'en') ||
            ability.effect_entries[0]
          )?.effect ?? 'unknown description for effect'}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
