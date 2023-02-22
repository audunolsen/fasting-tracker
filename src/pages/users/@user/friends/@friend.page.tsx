import {
  Await,
  defer,
  Outlet,
  useLoaderData,
  useParams,
} from "react-router-dom"
import definePageConfig from "~router/define-page-config"

export default function User() {
  const { friend } = useParams()

  const data = useLoaderData() as any

  return (
    <>
      <Await resolve={data.promise} errorElement="shiiiiit…">
        {(friends) => <p>Your friends: {friends}</p>}
      </Await>
      <h2>Currently viewed friend {friend}</h2>
    </>
  )
}

export const config = definePageConfig({
  loader: () => {
    const promise = new Promise((res) => setTimeout(() => res("Jlrgen"), 3000))

    return defer({
      friends: promise,
    })
  },
})
