import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
      <p className="mt-4 text-lg text-gray-600">Analyzing property documents...</p>
      <p className="text-sm text-gray-500 mt-2">This may take a minute or two</p>
    </div>
  )
}
