import { defineConfig } from "sanity"
import { structureTool, type StructureResolver } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemaTypes"

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id"
const dataset = process.env.SANITY_STUDIO_DATASET || "production"

// "Site settings" and "Home page" are single documents: it can be edited but not duplicated or deleted.
const SINGLETONS = new Set(["siteSettings", "homePage"])

const structure: StructureResolver = (S) =>
  S.list()
    .title("Tawfiiq content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings")),
      S.listItem()
        .title("Home page")
        .id("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage").title("Home page")),
      S.divider(),
      S.documentTypeListItem("department").title("Departments"),
      S.listItem()
        .title("Products")
        .child(
          S.list()
            .title("Products")
            .items([
              S.listItem()
                .title("By department")
                .child(
                  S.documentTypeList("department")
                    .title("Choose a department")
                    .child((deptId) =>
                      S.documentList()
                        .title("Products")
                        .schemaType("product")
                        .filter('_type == "product" && department._ref == $deptId')
                        .params({ deptId })
                        .initialValueTemplates([S.initialValueTemplateItem("product-in-department", { deptId })]),
                    ),
                ),
              S.documentTypeListItem("product").title("All products"),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("article").title("News"),
      S.documentTypeListItem("office").title("Offices"),
      S.documentTypeListItem("partner").title("Partners"),
      S.documentTypeListItem("teamMember").title("Leadership"),
    ])

export default defineConfig({
  name: "default",
  title: "Tawfiiq Group",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Products created from "By department" start with that department filled in.
    templates: (prev) => [
      ...prev.filter((t) => !SINGLETONS.has(t.schemaType)),
      {
        id: "product-in-department",
        title: "Product in department",
        schemaType: "product",
        parameters: [{ name: "deptId", type: "string" }],
        value: (p: { deptId: string }) => ({ department: { _type: "reference", _ref: p.deptId } }),
      },
    ],
  },
  document: {
    actions: (prev, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? prev.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : prev,
  },
})
