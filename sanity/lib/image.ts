import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, isSanityConfigured, projectId } from "../env";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/**
 * Resolves a Sanity image source to a plain URL string.
 *
 * Returns an empty string when Sanity is not configured or the source is
 * missing, so components always receive a string and never crash.
 */
export function urlForImage(source: SanityImageSource | null | undefined): string {
  if (!builder || !source) return "";
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return "";
  }
}
