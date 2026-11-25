import { defineField, defineType } from "sanity"

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "tag", title: "Category tag", type: "string", description: "e.g. Engine oil, Steel" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "logo", type: "image" }),
    defineField({
      name: "featured",
      title: "Show as yellow highlight card",
      type: "boolean",
      description: "For special relationships, e.g. a company Tawfiiq co-invests in.",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Position", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "location", media: "logo" } },
})
