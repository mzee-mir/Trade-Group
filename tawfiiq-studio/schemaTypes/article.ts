import { defineArrayMember, defineField, defineType } from "sanity"

export const article = defineType({
  name: "article",
  title: "News article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Link name",
      type: "slug",
      description: "The article opens at /news#article-<this>.",
      options: { source: "title", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "category", type: "string", description: "e.g. Engine Oil, Products" }),
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "summary", type: "text", rows: 2, description: "Shown on the card and as the opening line." }),
    defineField({
      name: "body",
      title: "Full article",
      type: "array",
      of: [defineArrayMember({ type: "block", styles: [{ title: "Paragraph", value: "normal" }], lists: [], marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }], annotations: [] } })],
    }),
    defineField({
      name: "related",
      title: "Related page button",
      type: "object",
      fields: [
        defineField({ name: "href", title: "Link", type: "string", description: "e.g. /departments/engine-oil" }),
        defineField({ name: "label", title: "Button text", type: "string" }),
      ],
    }),
  ],
  orderings: [{ title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "date", media: "image" } },
})
