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
import type * as auth_authRandomStringCreate from "../auth/authRandomStringCreate.js";
import type * as auth_authSha256Create from "../auth/authSha256Create.js";
import type * as auth_authTokenCreate from "../auth/authTokenCreate.js";
import type * as auth_authTokenVerify from "../auth/authTokenVerify.js";
import type * as auth_googleAuthHttpHandler from "../auth/googleAuthHttpHandler.js";
import type * as auth_googleAuthResult from "../auth/googleAuthResult.js";
import type * as auth_googleCallbackUrl from "../auth/googleCallbackUrl.js";
import type * as auth_passwordHashCreate from "../auth/passwordHashCreate.js";
import type * as auth_passwordHashVerify from "../auth/passwordHashVerify.js";
import type * as auth_safeReturnToCreate from "../auth/safeReturnToCreate.js";
import type * as customers from "../customers.js";
import type * as dashboard from "../dashboard.js";
import type * as http from "../http.js";
import type * as legacyConvexAuthTables from "../legacyConvexAuthTables.js";
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
  "auth/authRandomStringCreate": typeof auth_authRandomStringCreate;
  "auth/authSha256Create": typeof auth_authSha256Create;
  "auth/authTokenCreate": typeof auth_authTokenCreate;
  "auth/authTokenVerify": typeof auth_authTokenVerify;
  "auth/googleAuthHttpHandler": typeof auth_googleAuthHttpHandler;
  "auth/googleAuthResult": typeof auth_googleAuthResult;
  "auth/googleCallbackUrl": typeof auth_googleCallbackUrl;
  "auth/passwordHashCreate": typeof auth_passwordHashCreate;
  "auth/passwordHashVerify": typeof auth_passwordHashVerify;
  "auth/safeReturnToCreate": typeof auth_safeReturnToCreate;
  customers: typeof customers;
  dashboard: typeof dashboard;
  http: typeof http;
  legacyConvexAuthTables: typeof legacyConvexAuthTables;
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
