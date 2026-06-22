import type { SchemaTypeDefinition } from "sanity";

import { about } from "./about";
import { experience } from "./experience";
import { project } from "./project";
import { siteSettings } from "./siteSettings";
import { skill } from "./skill";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  about,
  project,
  experience,
  skill,
];
