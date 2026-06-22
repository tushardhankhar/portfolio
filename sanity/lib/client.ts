import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

/**
 * The Sanity client.
 *
 * Created only when a projectId is configured — calling `createClient` with an
 * empty projectId throws at fetch time, so we guard creation and export `null`
 * when Sanity is not yet set up. The fetch layer checks for this and falls back
 * to the local hardcoded data.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
