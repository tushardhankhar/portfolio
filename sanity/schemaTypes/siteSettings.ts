import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      initialValue: "Tushar Dhankhar",
    }),
    defineField({
      name: "roles",
      title: "Roles (typewriter)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "heroGreeting",
      title: "Hero Greeting",
      type: "string",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
    }),
    defineField({
      name: "resumeFile",
      title: "Resume File",
      type: "file",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "availabilityStatus",
      title: "Availability Status",
      type: "string",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
