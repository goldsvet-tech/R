import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  tx_id: z.any(),
  winLose: z.any(),
  win: z.any(),
  loss: z.any(),
  game_slug: z.string(),
  game_title: z.string(),
  play_currency: z.string(),
  debit_currency: z.string(),
  outcome: z.string(),
  user: z.string(),
  date: z.any(),
  ts: z.any(),
})

export type Task = z.infer<typeof taskSchema>