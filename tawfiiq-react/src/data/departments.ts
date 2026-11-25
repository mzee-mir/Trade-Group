/* Departments and their products.

   Product: { cat, size, name?, price? }
     name  → product title (defaults to "[PRODUCT NAME]")
     price → e.g. "$12.50 / carton"; leave out to show "Price on request"
   Images live in public/images/departments/<slug>.svg — replace with a photo and
   set `image` to its path (e.g. "/images/departments/engine-oil.jpg"). */

export type Product = { cat: string; size: string; name?: string; price?: string; image?: string }

export type Department = {
  slug: string
  name: string
  /** Title split around the yellow highlight: [before, highlight, after] */
  title: [string, string, string]
  short: string
  intro: string
  icon: "food" | "build" | "oil" | "furniture" | "bakery"
  image: string
  filters: string[]
  products: Product[]
  cards: [string, string][]
}

const p = (cat: string, size: string): Product => ({ cat, size })
const DELIVERY: [string, string] = ["Delivery", "[DELIVERY AREAS AND TERMS — confirm with Tawfiiq]"]

export const DEPARTMENTS: Department[] = [
  {
    slug: "foodstuff-dairy",
    name: "Foodstuff & Dairy",
    title: ["Foodstuff ", "&", " Dairy"],
    short: "Milk, rice and spaghetti — Golden, Jawahir, Amis, Hamza Basmati and more.",
    intro: "Milk, rice and spaghetti from trusted brands — supplied to shops, restaurants and families across Somalia.",
    icon: "food",
    image: "/images/departments/foodstuff-dairy.svg",
    filters: ["Milk", "Spaghetti", "Rice"],
    products: [
      p("Milk", "Milk powder"), p("Milk", "Tin"), p("Milk", "Milk powder"),
      p("Spaghetti", "Pasta"), p("Spaghetti", "Pasta"), p("Spaghetti", "Pasta"),
      p("Rice", "Basmati rice"), p("Rice", "Premium basmati rice"), p("Rice", "Rice"),
    ],
    cards: [
      ["Wholesale prices", "Shops and restaurants get bulk pricing by the carton or sack."],
      DELIVERY,
      ["Need a regular supply?", "Set up a standing weekly or monthly order with our sales team on WhatsApp."],
    ],
  },
  {
    slug: "building-materials",
    name: "Building Materials",
    title: ["Building ", "Materials", ""],
    short: "Supplies for contractors, builders and construction projects.",
    intro: "Paint, timber, ceramic tiles and steel for contractors, builders and home owners — backed by partners like Salalah Steel and Barwaqo Cement.",
    icon: "build",
    image: "/images/departments/building-materials.svg",
    filters: ["Paints", "Wood", "Ceramic", "Steel Bars", "Other"],
    products: [
      p("Paints", "20 L · Smalto enamel for metal"), p("Wood", "Full size"), p("Ceramic", "Ceramic tiles"),
      p("Steel Bars", "Steel for concrete work"), p("Other", "Ask for sizes"),
    ],
    cards: [
      ["Project supply", "Contractors get project pricing and scheduled deliveries to site."],
      DELIVERY,
      ["Not sure what you need?", "Send your bill of quantities on WhatsApp and we will price it for you."],
    ],
  },
  {
    slug: "engine-oil",
    name: "Engine Oil",
    title: ["Engine Oil ", "&", " Lubricants"],
    short: "Speedx and Perfomax oils, hydraulic oil, grease and batteries.",
    intro: "Speedx and Perfomax engine oils for diesel and petrol vehicles, plus hydraulic oil, grease, tuk-tuk oil and batteries. Wholesale and retail across Somalia.",
    icon: "oil",
    image: "/images/departments/engine-oil.svg",
    filters: ["Speedx", "Perfomax", "Tuk-tuk Oil", "Battery", "Grease", "Hydraulic"],
    products: [
      p("Speedx", "4 litres"), p("Speedx", "3 litres"), p("Perfomax", "Tin (Daasad)"), p("Perfomax", "Tin (Daasad)"),
      p("Perfomax", "5 L plastic (Caag)"), p("Perfomax", "5 L plastic (Caag)"), p("Perfomax", "1 L plastic (Caag)"), p("Tuk-tuk Oil", "1.5 litres"),
      p("Battery", "Vehicle battery"), p("Grease", "24 × 1"), p("Hydraulic", "20 litres"), p("Hydraulic", "Transmission fluid"),
    ],
    cards: [
      ["Wholesale prices", "Garages, fleets and shops get bulk pricing by the carton or drum (fuusto)."],
      DELIVERY,
      ["Which oil is right?", "Tell us your vehicle on WhatsApp and our team will recommend the right grade."],
    ],
  },
  {
    slug: "furniture-electronics",
    name: "Furniture & Electronics",
    title: ["Furniture ", "&", " Electronics"],
    short: "Furniture and home appliances for homes, offices and hotels.",
    intro: "Turkish furniture, beds and home appliances for homes, offices and hotels.",
    icon: "furniture",
    image: "/images/departments/furniture-electronics.svg",
    filters: ["Furniture", "Appliances"],
    products: [
      p("Furniture", "Furniture"), p("Furniture", "Furniture"), p("Furniture", "Furniture"), p("Appliances", "Home appliance"),
      p("Appliances", "Ask for models"), p("Appliances", "Home appliance"), p("Appliances", "Home appliance"), p("Appliances", "Home appliance"),
    ],
    cards: [
      ["Hotels and offices", "Furnishing a whole building? Ask for a project quote and bulk pricing."],
      DELIVERY,
      ["See it in person", "Visit our showroom in Bosaso [SHOWROOM ADDRESS] or ask for photos on WhatsApp."],
    ],
  },
  {
    slug: "bakery-sweets",
    name: "Bakery & Sweets",
    title: ["Bakery ", "&", " Sweets"],
    short: "Fresh bakery products and sweets for shops and families.",
    intro: "[SHORT DESCRIPTION OF THE BAKERY AND SWEETS RANGE — confirm with Tawfiiq]",
    icon: "bakery",
    image: "/images/departments/bakery-sweets.svg",
    filters: ["Bakery", "Sweets"],
    products: [
      p("Bakery", "[SIZE]"), p("Bakery", "[SIZE]"), p("Bakery", "[SIZE]"),
      p("Sweets", "[SIZE]"), p("Sweets", "[SIZE]"), p("Sweets", "[SIZE]"),
    ],
    cards: [
      ["Orders for events", "Weddings, Eid and celebrations — order ahead on WhatsApp."],
      DELIVERY,
      ["Fresh daily", "[BAKING SCHEDULE AND PICKUP POINTS]"],
    ],
  },
]

export const getDepartment = (slug?: string) => DEPARTMENTS.find((d) => d.slug === slug)
