import { defineArrayMember, defineField, defineType } from "sanity"

/** One document: contact details and company-wide text used across the site. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "company", title: "Company" },
  ],
  fields: [
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
      group: "contact",
      description: "Digits only, with country code, e.g. 252907090025. Every \"WhatsApp\" button and order goes here.",
      validation: (r) => r.required().regex(/^\d{8,15}$/, { name: "digits only" }),
    }),
    defineField({ name: "phoneDisplay", title: "Phone (as shown)", type: "string", group: "contact", description: "e.g. +252 907 090 025" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact", validation: (r) => r.required().email() }),
    defineField({
      name: "social",
      title: "Social links",
      type: "object",
      group: "contact",
      description: "Leave a link empty to hide it everywhere on the site.",
      fields: [
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok", type: "url" }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Key numbers",
      type: "array",
      group: "company",
      description: "The four number cards on the Home and About pages. The 4th is shown in green.",
      validation: (r) => r.max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Short label (Home)", type: "string" }),
            defineField({ name: "long", title: "Longer label (About)", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "values",
      title: "Company values",
      type: "array",
      group: "company",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "text", type: "string" }),
            defineField({
              name: "tone",
              title: "Accent colour",
              type: "string",
              options: { list: ["green", "yellow", "navy"], layout: "radio", direction: "horizontal" },
              initialValue: "green",
            }),
          ],
          preview: { select: { title: "name", subtitle: "text" } },
        }),
      ],
    }),
    defineField({
      name: "brandChips",
      title: "Brands strip (Home)",
      type: "array",
      group: "company",
      description: "Names shown in the \"Partners & brands we distribute\" row.",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
})
