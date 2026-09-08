#!/usr/bin/env bun

import { publicCourseCatalogCliRun } from "./index.js"

process.exitCode = publicCourseCatalogCliRun(Bun.argv.slice(2))
