import { createRoot } from "react-dom/client"
import type { ReactNode } from "react"
import * as React from "react"
import "./styles/global.scss"
import { routes } from "~router"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useMount } from "~hooks"

import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyDLx5ZCQUs4XakzIkwoBqPsOiXNCwfDfT8",
  authDomain: "fasting-tracker-a7467.firebaseapp.com",
  projectId: "fasting-tracker-a7467",
  storageBucket: "fasting-tracker-a7467.appspot.com",
  messagingSenderId: "384830729401",
  appId: "1:384830729401:web:d1bde7e6fd187798eaff68",
}

const app = initializeApp(firebaseConfig)

// const routes = createRoutes()

console.log({ routes })

const router = createBrowserRouter(routes)

console.log({ routes, router })

function App() {
  useMount(() => {
    console.log("[APP] mount")
  })

  return (
    <Layout>
      <React.Suspense fallback="Loading route…">
        <RouterProvider router={router} />
      </React.Suspense>
    </Layout>
  )
}

interface LayoutProps {
  children: ReactNode
}

function Layout(props: LayoutProps) {
  return (
    <>
      <main>{props.children}</main>
      <footer>Testing testing…</footer>
    </>
  )
}

createRoot(document.getElementById("root")!).render(<App />)
