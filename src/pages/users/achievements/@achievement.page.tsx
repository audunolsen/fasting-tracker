import { useParams } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function Achievement() {
  const { achievement } = useParams()

  return <div>hfjdkshfjks {achievement}</div>
}

export const config = definePageConfig({})
