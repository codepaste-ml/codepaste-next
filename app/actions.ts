"use server"

import { redirect } from "next/navigation"
import { nanoid } from "nanoid"
import { savePaste, getPaste } from "@/lib/db"

export async function createPaste(formData: FormData) {
  const content = formData.get("content") as string
  const language = formData.get("language") as string

  if (!content || content.trim() === "") {
    throw new Error("Paste content cannot be empty")
  }

  const id = nanoid(10) // Generate a short unique ID

  await savePaste({
    id,
    content,
    created_at: new Date().toISOString(),
    language: language || undefined,
  })

  redirect(`/paste/${id}`)
}

export async function getPasteById(id: string) {
  return getPaste(id)
}
