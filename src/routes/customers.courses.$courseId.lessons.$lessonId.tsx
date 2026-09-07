import { createFileRoute } from "@tanstack/solid-router"

import { LearningLayout } from "#src/features/learning/ui/LearningLayout"
import { LearningLessonPage } from "#src/features/learning/ui/LearningLessonPage"

export const Route = createFileRoute("/customers/courses/$courseId/lessons/$lessonId")({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  return (
    <LearningLayout>
      <LearningLessonPage courseId={params().courseId} lessonId={params().lessonId} />
    </LearningLayout>
  )
}
