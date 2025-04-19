import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language: string
  className?: string
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  return (
    <div className={cn("rounded-md bg-muted p-4 overflow-x-auto", className)}>
      <pre className="text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
