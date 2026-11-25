import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import { Layout } from "@/components/layout/layout"
import { OrderProvider } from "@/components/order/order-context"
import { ContentProvider } from "@/content/content"
import { HomePage } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found"

// Other pages load on demand, so the first visit downloads less.
const AboutPage = lazy(() => import("@/pages/about").then((m) => ({ default: m.AboutPage })))
const PartnersPage = lazy(() => import("@/pages/partners").then((m) => ({ default: m.PartnersPage })))
const NewsPage = lazy(() => import("@/pages/news").then((m) => ({ default: m.NewsPage })))
const ContactPage = lazy(() => import("@/pages/contact").then((m) => ({ default: m.ContactPage })))
const DepartmentPage = lazy(() => import("@/pages/department").then((m) => ({ default: m.DepartmentPage })))

export default function App() {
  return (
    // reducedMotion="user": animations drop their movement when the visitor asks for less motion
    <MotionConfig reducedMotion="user">
      <ContentProvider>
      <OrderProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="partners" element={<PartnersPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="departments/:slug" element={<DepartmentPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </OrderProvider>
      </ContentProvider>
    </MotionConfig>
  )
}
