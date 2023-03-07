import definePageConfig from "~router/define-page-config"

export default function Nested() {
  return (
    <>
      <span style={{ color: "red" }}>projects/nested.page.tsx</span>
      <br />
      This explicit route takes presedence over the splat route:
      <br />
      projects/@page.tsx
    </>
  )
}
