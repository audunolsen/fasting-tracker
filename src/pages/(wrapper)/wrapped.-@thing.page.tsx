import { useParams } from "react-router-dom"

export default function WrappedDynamicThing() {
  const { thing } = useParams()

  return (
    <>
      {thing}
      fdjhkshfsdkj
    </>
  )
}
