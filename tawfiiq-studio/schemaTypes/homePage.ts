import { defineField, defineType } from "sanity"

/** One document: the Home page hero. Any field left empty keeps the website's built-in text. */
export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero (top of the Home page)",
      type: "object",
      options: { collapsible: false },
      fieldsets: [
        { name: "headline", title: "Headline", description: "Three lines. The middle line is shown in yellow.", options: { columns: 3 } },
        { name: "buttons", title: "Buttons", options: { columns: 2 } },
        { name: "photos", title: "Photos (hidden on phones)" },
        { name: "cards", title: "Cards on the photos", options: { columns: 2 } },
      ],
      fields: [
        defineField({ name: "eyebrow", title: "Small badge above the headline", type: "string", description: "e.g. Trusted across Somalia since 1992" }),
        defineField({ name: "line1", title: "Line 1", type: "string", fieldset: "headline" }),
        defineField({ name: "highlight", title: "Line 2 (yellow)", type: "string", fieldset: "headline" }),
        defineField({ name: "line3", title: "Line 3", type: "string", fieldset: "headline" }),
        defineField({ name: "intro", title: "Introduction", type: "text", rows: 3 }),
        defineField({ name: "primaryLabel", title: "Yellow button text", type: "string", fieldset: "buttons", description: "Scrolls to the departments." }),
        defineField({ name: "whatsappLabel", title: "White button text", type: "string", fieldset: "buttons", description: "Opens WhatsApp." }),
        defineField({
          name: "whatsappMessage",
          title: "WhatsApp message for the white button",
          type: "string",
          fieldset: "buttons",
          description: "Pre-filled text the customer can send, e.g. \"Hello Tawfiiq sales team, I'd like a price list.\"",
        }),
        defineField({
          name: "mainPhoto",
          title: "Large photo",
          type: "image",
          fieldset: "photos",
          description: "Tall photo on the left, e.g. the warehouse or trucks.",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Description", type: "string", description: "For screen readers, e.g. \"Tawfiiq trucks at the Bosaso warehouse\"." })],
        }),
        defineField({
          name: "secondPhoto",
          title: "Small photo",
          type: "image",
          fieldset: "photos",
          description: "Top-right photo, e.g. products on shelves.",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Description", type: "string" })],
        }),
        defineField({ name: "statLabel", title: "Yellow card: small text", type: "string", fieldset: "cards", description: "e.g. Offices in" }),
        defineField({ name: "statValue", title: "Yellow card: big text", type: "string", fieldset: "cards", description: "e.g. 5 countries" }),
        defineField({ name: "badgeTitle", title: "White badge: title", type: "string", fieldset: "cards", description: "e.g. Sole distributor" }),
        defineField({ name: "badgeText", title: "White badge: text", type: "string", fieldset: "cards", description: "e.g. for several leading brands" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
})
