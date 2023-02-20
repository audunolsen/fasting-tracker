import { useParams } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function Friend() {
  let { friend } = useParams()

  return <div>Your currently viewed friend is {friend}</div>
}

export const config = definePageConfig({})
