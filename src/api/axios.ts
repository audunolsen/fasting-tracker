import axios, {
  type AxiosRequestConfig,
  type AxiosResponseTransformer,
} from "axios"

import * as z from "zod"
import URLS from "./urls"

interface Config<T extends z.Schema> extends AxiosRequestConfig {
  schema?: T | ((zod: typeof z) => T)
}

/**
 * Axios wrapper which accepts zod-schema to validate
 * response data and return schema's inferred output type.
 * Schema validations happens in last `config.transformResponse`,
 * meaning that failed validations are able to be intercepted.
 *
 * Accepts url callback w/ app url constants
 *
 * Otherwise signature near indentical to that of native Axios
 */
export default async function wrapper<T extends z.Schema>(
  url: string | ((urls: typeof URLS) => string),
  config: Config<T> = {}
) {
  const { schema = z.unknown(), transformResponse = [], ...rest } = config
  const transformers: AxiosResponseTransformer[] = [transformResponse].flat()

  const finalizedUrl = typeof url === "function" ? url(URLS) : url
  const finalizedSchema = typeof schema === "function" ? schema(z) : schema

  return await axios<z.output<T>>(finalizedUrl, {
    ...rest,

    transformResponse: [
      ...transformers,

      (data) => {
        const toParse = typeof data === "string" ? JSON.parse(data) : data
        return finalizedSchema.parse(toParse, {
          errorMap: ({}, context) => ({
            message: `${context.defaultError} (${finalizedUrl})`,
          }),
        })
      },
    ],
  })
}
