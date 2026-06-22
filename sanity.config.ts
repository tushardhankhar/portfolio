"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

/**
 * `defineConfig` requires a non-empty projectId at module load. When the env
 * var is not yet set we use a "placeholder" so the module (and the /studio
 * route) still load — the Studio simply won't connect until a real projectId
 * is provided in `.env.local`.
 */
export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
