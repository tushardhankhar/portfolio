import { defineField, defineType } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "Frontend" },
          { title: "Backend", value: "Backend" },
          { title: "AI/ML", value: "AI/ML" },
          { title: "DevOps", value: "DevOps" },
          { title: "Tools", value: "Tools" },
        ],
      },
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency",
      type: "number",
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
});
