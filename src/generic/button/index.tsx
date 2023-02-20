import { memo, useEffect, type ComponentProps } from "react"

function Button(props: ComponentProps<"button">) {
  console.log("re-rendered")

  // useEffect(() => {
  //   console.log("props.onClick changed")
  // }, [props.onClick])

  return <button {...props} />
}

// export default memo(Button)
export default memo(Button)
