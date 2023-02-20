import * as z from "zod"

const schema = z.object({
  name: z.string(),
  children: z.array(
    z.object({
      age: z.number(),
    })
  ),

  job: z.object({
    title: z.string(),
    salary: z.number(),
  }),
})

async function getPerson() {
  const res = await fetch("")
    .then((e) => e.json())
    .catch((e) => e)

  return schema.parse(res)
}

async function usePersonData() {
  const person = await getPerson()

  console.log(person.name, person.children[2]?.age)
}

type User = z.infer<typeof schema>
