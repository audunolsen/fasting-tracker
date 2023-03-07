import axios from "~/api/axios"
import { RouteObject } from "react-router-dom"
import definePageConfig from "~router/define-page-config"
import * as z from "zod"
import coerceError from "~utils/coerce-error"
import { useMount } from "~hooks"
import { useState } from "react"
import { Link } from "~router"

const schema = z.object({ fact: z.string() })

export default function Home() {
  const [fact, setFact] = useState("loading cat fact…")

  // useMount(async () => {
  //   const res = await axios((urls) => urls.catFacts, {
  //     schema, HMR??
  //   }).catch(coerceError)
  //   if (res instanceof Error) {
  //     return
  //   }
  //   setFact(String(res.data.fact))
  // })

  return (
    <div>
      <nav>
        <Link
          to="users/:user/friends/:friend"
          params={{ user: "Lorem", friend: "Ipsum" }}
        >
          Go friend page
        </Link>
      </nav>
      This is the home page <br />
      {fact}
    </div>
  )
}
