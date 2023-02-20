import definePageConfig from "~router/define-page-config"
import { useLoaderData } from "react-router-dom"
import * as React from "react"

export default function Settings() {
  const data = useLoaderData()

  React.useEffect(() => {
    console.log("Weather data!!!!", data)
  }, [data])

  return (
    <React.Suspense fallback="Loading settings data…">
      <div>This is the settings page, {String(data)}</div>
    </React.Suspense>
  )
}

export const config = definePageConfig({
  auth: true,

  loader: () => {
    console.log("Loader triggered!!")
    return new Promise((res) => setTimeout(() => res("resolved"), 5000))
  },
})

// loader: () => {
//   return fetch(
//     "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"
//   ).then((resp) => new Promise((res) => setTimeout(() => res(resp), 5000)))
// },
