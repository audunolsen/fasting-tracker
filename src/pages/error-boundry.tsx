import React from "react"
import { useRouteError } from "react-router-dom"

export default function ErrorBoundry() {
  const error = useRouteError()

  React.useEffect(() => {
    console.warn("Route error has occured", error)
  }, [error])

  return <div>a route error has occured</div>
}
