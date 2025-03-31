/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MainImport } from './routes/_main'
import { Route as MainIndexImport } from './routes/_main.index'
import { Route as MainFormTimeExampleImport } from './routes/_main.form-time-example'
import { Route as MainFormExampleImport } from './routes/_main.form-example'

// Create/Update Routes

const MainRoute = MainImport.update({
  id: '/_main',
  getParentRoute: () => rootRoute,
} as any)

const MainIndexRoute = MainIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MainRoute,
} as any)

const MainFormTimeExampleRoute = MainFormTimeExampleImport.update({
  id: '/form-time-example',
  path: '/form-time-example',
  getParentRoute: () => MainRoute,
} as any)

const MainFormExampleRoute = MainFormExampleImport.update({
  id: '/form-example',
  path: '/form-example',
  getParentRoute: () => MainRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_main': {
      id: '/_main'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainImport
      parentRoute: typeof rootRoute
    }
    '/_main/form-example': {
      id: '/_main/form-example'
      path: '/form-example'
      fullPath: '/form-example'
      preLoaderRoute: typeof MainFormExampleImport
      parentRoute: typeof MainImport
    }
    '/_main/form-time-example': {
      id: '/_main/form-time-example'
      path: '/form-time-example'
      fullPath: '/form-time-example'
      preLoaderRoute: typeof MainFormTimeExampleImport
      parentRoute: typeof MainImport
    }
    '/_main/': {
      id: '/_main/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof MainIndexImport
      parentRoute: typeof MainImport
    }
  }
}

// Create and export the route tree

interface MainRouteChildren {
  MainFormExampleRoute: typeof MainFormExampleRoute
  MainFormTimeExampleRoute: typeof MainFormTimeExampleRoute
  MainIndexRoute: typeof MainIndexRoute
}

const MainRouteChildren: MainRouteChildren = {
  MainFormExampleRoute: MainFormExampleRoute,
  MainFormTimeExampleRoute: MainFormTimeExampleRoute,
  MainIndexRoute: MainIndexRoute,
}

const MainRouteWithChildren = MainRoute._addFileChildren(MainRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof MainRouteWithChildren
  '/form-example': typeof MainFormExampleRoute
  '/form-time-example': typeof MainFormTimeExampleRoute
  '/': typeof MainIndexRoute
}

export interface FileRoutesByTo {
  '/form-example': typeof MainFormExampleRoute
  '/form-time-example': typeof MainFormTimeExampleRoute
  '/': typeof MainIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_main': typeof MainRouteWithChildren
  '/_main/form-example': typeof MainFormExampleRoute
  '/_main/form-time-example': typeof MainFormTimeExampleRoute
  '/_main/': typeof MainIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/form-example' | '/form-time-example' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/form-example' | '/form-time-example' | '/'
  id:
    | '__root__'
    | '/_main'
    | '/_main/form-example'
    | '/_main/form-time-example'
    | '/_main/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  MainRoute: typeof MainRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  MainRoute: MainRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_main"
      ]
    },
    "/_main": {
      "filePath": "_main.tsx",
      "children": [
        "/_main/form-example",
        "/_main/form-time-example",
        "/_main/"
      ]
    },
    "/_main/form-example": {
      "filePath": "_main.form-example.tsx",
      "parent": "/_main"
    },
    "/_main/form-time-example": {
      "filePath": "_main.form-time-example.tsx",
      "parent": "/_main"
    },
    "/_main/": {
      "filePath": "_main.index.tsx",
      "parent": "/_main"
    }
  }
}
ROUTE_MANIFEST_END */
