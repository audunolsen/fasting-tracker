import axios from "~/api/axios"
import { RouteObject } from "react-router-dom"
import definePageConfig from "~router/define-page-config"
import * as z from "zod"
import coerceError from "~utils/coerce-error"
import { useMount } from "~hooks"
import { useState } from "react"

const schema = z.object({ fact: z.string() })

export default function Home() {
  const [fact, setFact] = useState("loading cat fact…")

  useMount(async () => {
    const res = await axios("https://catfact.ninja/fact", {
      schema,
    }).catch(coerceError)

    if (res instanceof Error) {
      return
    }

    setFact(String(res.data.fact))
  })

  return (
    <div>
      This is the home page <br />
      {fact}
    </div>
  )
}
