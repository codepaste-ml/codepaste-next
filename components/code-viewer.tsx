"use client"

import { useEffect, useState } from "react"
import Editor from "@monaco-editor/react"
import { Skeleton } from "@/components/ui/skeleton"
import { detectLanguage } from "@/lib/language-detection"

interface CodeViewerProps {
  content: string
  language?: string
  fullHeight?: boolean
}

export function CodeViewer({ content, language, fullHeight = false }: CodeViewerProps) {
  const [mounted, setMounted] = useState(false)
  const [detectedLanguage, setDetectedLanguage] = useState<string | undefined>(language || undefined)

  useEffect(() => {
    setMounted(true)
    if (!language) {
      // Only detect language if not manually specified
      setDetectedLanguage(detectLanguage(content))
    }
  }, [content, language])

  // Show a skeleton loader while the editor is loading
  if (!mounted) {
    return <Skeleton className={`w-full rounded-md ${fullHeight ? "h-[calc(100vh-180px)]" : "h-[300px]"}`} />
  }

  return (
    <div className={fullHeight ? "h-[calc(100vh-180px)]" : "min-h-[300px]"}>
      <Editor
        height="100%"
        defaultValue={content}
        language={detectedLanguage}
        theme="vs-dark"
        options={{
          readOnly: true,
          minimap: { enabled: fullHeight },
          scrollBeyondLastLine: false,
          folding: true,
          lineNumbers: "on",
          wordWrap: "on",
          automaticLayout: true,
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
          },
        }}
        className="border rounded-md overflow-hidden"
      />
    </div>
  )
}
