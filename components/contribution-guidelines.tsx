import ReactMarkdown from "react-markdown"

interface ContributionGuidelinesProps {
  guidelines: string
}

export function ContributionGuidelines({ guidelines }: ContributionGuidelinesProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown>{guidelines}</ReactMarkdown>
    </div>
  )
}
