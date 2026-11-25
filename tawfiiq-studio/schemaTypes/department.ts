import { defineArrayMember, defineField, defineType } from "sanity"

export const department = defineType({
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: "Used in the link: /departments/<this>",
      options: { source: "name", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Position", type: "number", description: "Lower numbers come first.", initialValue: 10 }),
    defineField({
      name: "title",
      title: "Page heading",
      type: "object",
      description: "The heading is split so one part can be shown in yellow, e.g. \"Engine Oil \" + \"&\" + \" Lubricants\".",
      fields: [
        defineField({ name: "before", type: "string" }),
        defineField({ name: "highlight", title: "Highlighted (yellow)", type: "string" }),
        defineField({ name: "after", type: "string" }),
      ],
    }),
    defineField({ name: "short", title: "Card text (Home)", type: "text", rows: 2 }),
    defineField({ name: "intro", title: "Page introduction", type: "text", rows: 3 }),
    defineField({
      name: "icon",
      type: "string",
      options: {
        list: [
          { title: "Food (bowl)", value: "food" },
          { title: "Building (bricks)", value: "build" },
          { title: "Oil (drop)", value: "oil" },
          { title: "Furniture (sofa)", value: "furniture" },
          { title: "Bakery (cake)", value: "bakery" },
        ],
      },
      initialValue: "food",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      description: "Card background on Home and the header of the department page. Landscape works best.",
      options: { hotspot: true },
    }),
    defineField({
      name: "filters",
      title: "Product categories",
      type: "array",
      description: "The filter buttons on the department page. Products choose one of these.",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "cards",
      title: "Info cards",
      type: "array",
      description: "Up to three cards under the products (green, white, yellow).",
      validation: (r) => r.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "infoCard",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "text", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "slug.current", media: "image" } },
})
