import { RouteObject } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function Home() {
  return <div>This is the home page</div>
}

export const config = definePageConfig({})
