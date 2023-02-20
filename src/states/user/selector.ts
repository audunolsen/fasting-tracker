import slice from "./slice"

// const handler = {
//   get(target: keyof typeof slice, prop) {
//     return "world"
//   },
// }

const proxied = new Proxy(slice, {
  get(target, property) {
    console.log({ target, property })
  },
})

proxied.name
