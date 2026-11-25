import { defineField, defineType } from "sanity"

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "department",
      type: "reference",
      to: [{ type: "department" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      description: "Must match one of the department's product categories (e.g. Perfomax), or the filters won't find it.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", type: "string", description: "Leave empty to show \"[PRODUCT NAME]\"." }),
    defineField({ name: "size", title: "Size / pack", type: "string", description: "e.g. 5 L plastic (Caag)", validation: (r) => r.required() }),
    defineField({ name: "price", type: "string", description: "e.g. $12.50 / carton. Leave empty to show \"Price on request\"." }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Position", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { name: "name", size: "size", category: "category", dept: "department.name", media: "image" },
    prepare: ({ name, size, category, dept, media }) => ({
      title: name || `${category} — ${size}`,
      subtitle: [dept, category, name ? size : null].filter(Boolean).join(" · "),
      media,
    }),
  },
})
