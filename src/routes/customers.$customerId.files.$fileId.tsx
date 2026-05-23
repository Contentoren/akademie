import { createFileRoute } from "@tanstack/react-router"

import { TextFileEditorPage } from "@/features/customers/text-file-editor"

export const Route = createFileRoute("/customers/$customerId/files/$fileId")({
  component: RouteComponent,
})

function RouteComponent() {
  const { fileId } = Route.useParams()

  return <TextFileEditorPage fileId={fileId} />
}
