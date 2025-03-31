import { createServerFn } from "@tanstack/react-start";
import fs from "fs/promises";
import path from "path";
import registry from "@/registry.json" with { type: "json" };

export const $getComponents = createServerFn().handler(async () => {
  try {
    return registry.items || [];
  } catch (error) {
    console.error("Error reading registry.json:", error);
    return [];
  }
});
