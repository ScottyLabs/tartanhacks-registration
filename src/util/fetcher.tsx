import axios, { Method } from "axios"
import { RemoteDispatchAction } from "types/DispatchAction"

/**
 * Create a data fetcher for use with SWR
 * @param method the HTTP method to use
 */
export default function createFetcher<T>(
  method: Method
): (action: RemoteDispatchAction, accessToken: string) => Promise<T> {
  return (action: RemoteDispatchAction, accessToken: string) =>
    axios({
      method,
      url: `${process.env.BACKEND_URL}${action.request.path}`,
      headers: {
        "x-access-token": accessToken
      },
      data: action.request.body ?? undefined
    }).then((res) => res.data)
}

export const getFetcher = createFetcher("get")
export const postFetcher = createFetcher("post")
