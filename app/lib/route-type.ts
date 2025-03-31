// Do not alter this file it is used to gather type information about routes.
import { FileRoutesByPath } from "@tanstack/react-router";

// Helper type to check if an object type has any keys
// Define RouteDetail type
type RouteDetail<R> = R extends {
  preLoaderRoute: { types: { allParams: infer P; searchSchemaInput: infer Q } };
  fullPath: infer F;
}
  ? [keyof P] extends [never]
    ? [keyof Q] extends [never]
      ? { to: F }
      : { to: F; search: NonNullable<Q> }
    : [keyof Q] extends [never]
      ? { to: F; params: NonNullable<P> }
      : { to: F; params: NonNullable<P>; search: NonNullable<Q> }
  : R extends {
        preLoaderRoute: { types: { allParams: infer P } };
        fullPath: infer F;
      }
    ? [keyof P] extends [never]
      ? { to: F }
      : { to: F; params: NonNullable<P> }
    : R extends {
          preLoaderRoute: { types: { searchSchemaInput: infer Q } };
          fullPath: infer F;
        }
      ? [keyof Q] extends [never]
        ? { to: F }
        : { to: F; search: NonNullable<Q> }
      : never;

// Adjusted utility type without Simplify or Prettify
type RouteDetailsFromFileRoutes<Routes extends { [key: string]: any }> = {
  [K in keyof Routes]: RouteDetail<Routes[K]>;
}[keyof Routes];

// Example usage
export type RouteDetails = RouteDetailsFromFileRoutes<FileRoutesByPath>;
