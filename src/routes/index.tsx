import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fa] px-6">
      <div className="max-w-2xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#1a1a2e] sm:text-5xl">
          Akademie
        </h1>
        <p className="text-lg leading-8 text-[#495057]">
          Willkommen bei der Akademie. Inhalte folgen in Kürze.
        </p>
      </div>
    </main>
  )
}
