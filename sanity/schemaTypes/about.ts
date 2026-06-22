import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "About Me",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "availableForWork",
      title: "Available For Work",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "availabilityTags",
      title: "Availability Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "funFacts",
      title: "Fun Facts",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "philosophy",
      title: "Philosophy",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return { title: "About" };
    },
  },
});
