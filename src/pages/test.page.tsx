import { z } from "zod"
import type { Objects, Pipe, Strings, Tuples } from "~types/utils/hotscript"
import { KebabCase } from "~types/utils/hotscript/internals/helpers"
export {}

export default function Test() {
  return "Hello from design page"
}

const snakeCaseSchema = z
  .object({
    full_name: z.string(),
    friend_list: z.array(
      z.object({
        friend_id: z.number(),
        chat_messages: z.object({
          chat_message_one: z.literal("Why are u gaeh"),
        }),
      })
    ),
  })
  .transform(
    (val): Pipe<typeof val, [Objects.CamelCaseDeep]> => ({
      fullName: "",
      friendList: [],
    })
  )

// type Prettify<T> = { [K in keyof T]: T[K] } & {}
// type prettify = { K }

type Schema = z.infer<typeof snakeCaseSchema>

// type kebabCaseSchema = Pipe<Schema, [Objects.CamelCaseDeep]>
// const strings = ["Hello_", "World"] as const
// type joined = Pipe<typeof strings, Tuples.Join<",", typeof strings>>
