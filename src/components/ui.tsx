import { splitProps, type JSX } from "solid-js"

import { cn } from "@/lib/utils"

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "ghost" }

export function Button(props: ButtonProps) {
  const [local, buttonProps] = splitProps(props, ["class", "variant"])
  const variant = () => local.variant ?? "primary"

  return (
    <button
      class={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant() === "primary" && "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:bg-slate-800",
        variant() === "secondary" && "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
        variant() === "danger" && "bg-red-600 text-white shadow-lg shadow-red-600/15 hover:bg-red-700",
        variant() === "ghost" && "bg-transparent text-slate-700 hover:bg-slate-100",
        local.class,
      )}
      {...buttonProps}
    />
  )
}

export function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, divProps] = splitProps(props, ["class"])

  return <div class={cn("rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-xl shadow-slate-950/[0.05] ring-1 ring-slate-100 backdrop-blur", local.class)} {...divProps} />
}

export function Field(props: { children?: JSX.Element; label: string }) {
  return (
    <label>
      <span class="label-text">{props.label}</span>
      {props.children}
    </label>
  )
}

export function EmptyState(props: { action?: JSX.Element; text: string; title: string }) {
  return (
    <div class="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600">
      <h2 class="text-xl font-black text-slate-950">{props.title}</h2>
      <p class="mx-auto mt-2 max-w-md text-sm leading-6">{props.text}</p>
      {props.action ? <div class="mt-5">{props.action}</div> : null}
    </div>
  )
}
