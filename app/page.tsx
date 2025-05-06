import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createPaste } from "@/app/actions"
import { LanguageSelector } from "@/components/language-selector"

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Paste Service</h1>
        <p className="text-muted-foreground">
          Create and share text snippets quickly. Select a language or let us detect it automatically.
        </p>
      </div>

      <form action={createPaste} className="space-y-4">
        <Textarea
          name="content"
          placeholder="Paste your content here..."
          className="min-h-[300px] font-mono text-sm"
          required
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <LanguageSelector />
          <div className="flex items-end">
            <Button type="submit" className="w-full">
              Create Paste
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
