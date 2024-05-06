import { LoadingSpinner } from '@/components/ui/spinner.tsx'

export default function Loading() {
  return (
    <div className="mb-4 mt-4 flex justify-center">
      <LoadingSpinner />
    </div>
  )
}
