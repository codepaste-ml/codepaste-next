import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center space-y-4">
      <h1 className="text-4xl font-bold">404 - Paste Not Found</h1>
      <p className="text-muted-foreground">The paste you're looking for doesn't exist or has been removed.</p>
      <Button asChild>
        <Link href="/">Create New Paste</Link>
      </Button>
    </div>
  )
}
