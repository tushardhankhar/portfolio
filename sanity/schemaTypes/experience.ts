import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "companyUrl",
      title: "Company URL",
      type: "url",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "start",
      title: "Start",
      type: "string",
      description: 'e.g. "Jan 2023"',
    }),
    defineField({
      name: "end",
      title: "End",
      type: "string",
      description: 'Leave empty for "Present"',
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "Full-time" },
          { title: "Contract", value: "Contract" },
          { title: "Internship", value: "Internship" },
          { title: "Freelance", value: "Freelance" },
        ],
      },
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "tech",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "color",
      title: "Accent Color",
      type: "string",
      initialValue: "#864797",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: { role: "role", company: "company" },
    prepare({ role, company }) {
      return { title: `${role} @ ${company}` };
    },
  },
});
