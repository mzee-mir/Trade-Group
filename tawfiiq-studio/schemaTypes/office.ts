import { defineField, defineType } from "sanity"

export const office = defineType({
  name: "office",
  title: "Office",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Anchor",
      type: "slug",
      description: "Used in links to this office card: /contact#office-<this>",
      options: { source: "name", maxLength: 40 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "country", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "sourcing",
      title: "Sourcing office",
      type: "boolean",
      description: "Sourcing offices appear in the curved photo band on the Home page.",
      initialValue: false,
    }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      description: "Used for the Home page photo band (sourcing offices only). 16:9 works best.",
      options: { hotspot: true },
      hidden: ({ document }) => !document?.sourcing,
    }),
    defineField({ name: "order", title: "Position", type: "number", initialValue: 10 }),
  ],
  orderings: [{ title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", country: "country", sourcing: "sourcing", media: "image" },
    prepare: ({ title, country, sourcing, media }) => ({ title, subtitle: `${country}${sourcing ? " · Sourcing" : ""}`, media }),
  },
})
