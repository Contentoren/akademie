/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as auth_googleAuthResult from "../auth/googleAuthResult.js";
import type * as auth_googleCallbackRedirect from "../auth/googleCallbackRedirect.js";
import type * as auth_googleCallbackUrl from "../auth/googleCallbackUrl.js";
import type * as auth_googleOAuthFetch from "../auth/googleOAuthFetch.js";
import type * as auth_googleTokenRequestInit from "../auth/googleTokenRequestInit.js";
import type * as customers from "../customers.js";
import type * as dashboard from "../dashboard.js";
import type * as http from "../http.js";
import type * as progress from "../progress.js";
import type * as requireAuth from "../requireAuth.js";
import type * as textFiles from "../textFiles.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "auth/googleAuthResult": typeof auth_googleAuthResult;
  "auth/googleCallbackRedirect": typeof auth_googleCallbackRedirect;
  "auth/googleCallbackUrl": typeof auth_googleCallbackUrl;
  "auth/googleOAuthFetch": typeof auth_googleOAuthFetch;
  "auth/googleTokenRequestInit": typeof auth_googleTokenRequestInit;
  customers: typeof customers;
  dashboard: typeof dashboard;
  http: typeof http;
  progress: typeof progress;
  requireAuth: typeof requireAuth;
  textFiles: typeof textFiles;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
