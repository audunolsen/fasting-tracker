import * as React from "react"
import { useParams, defer, useLoaderData, Await } from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function Project() {
  let { id, "*": splat } = useParams()
  const data = useLoaderData() as any

  React.useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <Await resolve={data.packageLocation}>
        {(newData) => (
          <>
            <div>
              Your currently yasssss selecteddd project ???? {id} {splat}
            </div>
            <div>{String(newData)}</div>
          </>
        )}
      </Await>
    </>
  )
}

export const config = definePageConfig({
  splat: true,
  loader,
})

function loader() {
  const packageLocationPromise = new Promise((res) => {
    setTimeout(() => res("Lorem Ipsum Dolor Sit Ametttt"), 0)
  })

  return defer({
    packageLocation: packageLocationPromise,
  })
}
