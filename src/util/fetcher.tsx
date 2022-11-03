import axios, { Method } from "axios"
import { RemoteDispatchAction } from "types/DispatchAction"

/**
 * Create a data fetcher
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

/**
 * fetcher for get requests
 * @param action details of the request
 * @param accessToken the user's accessToken cookie
 */
export const getFetcher = createFetcher("get")
/**
 * fetcher for post requests
 * @param action details of the request
 * @param accessToken the user's accessToken cookie
 */
export const postFetcher = createFetcher("post")
