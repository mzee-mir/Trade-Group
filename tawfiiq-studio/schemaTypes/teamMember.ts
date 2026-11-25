import { defineField, defineType } from "sanity"

/** "The people behind Tawfiiq" on the About page. */
export const teamMember = defineType({
  name: "teamMember",
  title: "Leadership",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / title", type: "string", description: "e.g. Chief Executive Officer" }),
    defineField({
      name: "photo",
      type: "image",
      description: "A portrait works best (slightly wider than tall). Use the hotspot to keep the face in frame.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Description", type: "string", description: "For screen readers, e.g. \"Portrait of Ahmed Ali\". Leave empty to use the person's name." }),
      ],
    }),
    defineField({ name: "order", title: "Position", type: "number", description: "Lower numbers come first.", initialValue: 10 }),
  ],
  orderings: [{ title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
})
