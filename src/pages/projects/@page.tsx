import * as React from "react"
import { useParams, defer, useLoaderData, Await } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function Project() {
  let { id, "*": splat } = useParams()

  return (
    <>
      <div>
        <span style={{ color: "red" }}>projects/@page.tsx</span>
        <br />
        This is a splat route. currently viewed splat: {splat}
      </div>
    </>
  )
}
