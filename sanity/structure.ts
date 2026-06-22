import type { StructureResolver } from "sanity/structure";

/**
 * Custom desk structure that renders `siteSettings` and `about` as singletons
 * (a single editable document each) and the rest as normal document lists.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .title("About")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("experience").title("Experience"),
      S.documentTypeListItem("skill").title("Skills"),
    ]);
