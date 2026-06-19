import { createFileRoute } from "@tanstack/solid-router"

import { TextFileEditorPage } from "@/features/customers/text-file-editor"

export const Route = createFileRoute("/customers/$customerId/files/$fileId")({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  return <TextFileEditorPage fileId={params().fileId} />
}
