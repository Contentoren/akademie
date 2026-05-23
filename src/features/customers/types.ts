import type { Doc, Id } from "@convex/_generated/dataModel"

export type Customer = Doc<"customers">
export type TextFile = Doc<"textFiles">
export type ProgressItem = Doc<"progress">
export type CustomerId = Id<"customers">
export type TextFileId = Id<"textFiles">
export type ProgressId = Id<"progress">
export type TextFileKind = TextFile["kind"]
