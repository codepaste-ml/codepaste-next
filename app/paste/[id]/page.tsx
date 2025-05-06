import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getPasteById } from "@/app/actions"
import { CopyButton } from "@/components/copy-button"
import { formatDate } from "@/lib/utils"
import { CodeViewer } from "@/components/code-viewer"
import { languages } from "@/lib/languages"

export default async function PastePage({ params }: { params: { id: string } }) {
  const paste = await getPasteById(params.id)

  if (!paste) {
    notFound()
  }

  // Get the language name for display
  const languageName = paste.language
    ? languages.find((lang) => lang.id === paste.language)?.name || paste.language
    : "Auto-detected"

  return (
    <div className="container mx-auto max-w-5xl py-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Paste {params.id}</h1>
          <div className="flex flex-col sm:flex-row sm:gap-2 text-sm text-muted-foreground">
            <span>Created {formatDate(paste.created_at)}</span>
            <span className="hidden sm:inline">•</span>
            <span>Language: {languageName}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton value={paste.content} label="Copy Content" />
          <CopyButton value={`${process.env.NEXT_PUBLIC_APP_URL}/paste/${params.id}`} label="Copy URL" />
          <Button variant="outline" asChild>
            <a href="/">New Paste</a>
          </Button>
        </div>
      </div>

      <CodeViewer content={paste.content} language={paste.language} fullHeight={true} />
    </div>
  )
}
