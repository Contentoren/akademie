import { createFileRoute } from "@tanstack/solid-router"

import { LearningCoursePage } from "#src/features/learning/ui/LearningCoursePage"
import { LearningLayout } from "#src/features/learning/ui/LearningLayout"

export const Route = createFileRoute("/customers/courses/$courseId/")({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  return (
    <LearningLayout>
      <LearningCoursePage courseId={params().courseId} />
    </LearningLayout>
  )
}
