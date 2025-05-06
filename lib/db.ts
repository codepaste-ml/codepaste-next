import { neon } from "@neondatabase/serverless"

// Define the Paste interface
export interface Paste {
  id: string
  content: string
  created_at: string
  language?: string
}

// Create a reusable SQL client
const sql = neon(process.env.DATABASE_URL!)

export async function savePaste(paste: Paste): Promise<void> {
  await sql`
    INSERT INTO pastes (id, content, created_at, language)
    VALUES (${paste.id}, ${paste.content}, ${paste.created_at}, ${paste.language || null})
  `
}

export async function getPaste(id: string): Promise<Paste | null> {
  const results = await sql<Paste[]>`
    SELECT id, content, created_at::text, language
    FROM pastes
    WHERE id = ${id}
  `

  return results.length > 0 ? results[0] : null
}
