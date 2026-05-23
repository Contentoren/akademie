import { cn } from "@/lib/utils"

export function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:bg-slate-800",
        variant === "secondary" && "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
        variant === "danger" && "bg-red-600 text-white shadow-lg shadow-red-600/15 hover:bg-red-700",
        variant === "ghost" && "bg-transparent text-slate-700 hover:bg-slate-100",
        className,
      )}
      {...props}
    />
  )
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-xl shadow-slate-950/[0.05] ring-1 ring-slate-100 backdrop-blur", className)} {...props} />
}

export function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <label>
      <span className="label-text">{label}</span>
      {children}
    </label>
  )
}

export function EmptyState({ action, text, title }: { action?: React.ReactNode; text: string; title: string }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6">{text}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
