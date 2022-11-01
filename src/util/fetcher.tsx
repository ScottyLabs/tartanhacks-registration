import axios, { Method } from "axios"

// Retrieve auth token from cookies
const accessToken = window.localStorage.getItem("accessToken")

/**
 * Create a data fetcher for use with SWR
 * @param method the HTTP method to use
 */
export default function createFetcher<T>(
  method: Method
): (path: string) => Promise<T> {
  return (path: string) =>
    axios({
      method,
      url: `${process.env.BACKEND_URL}${path}`,
      headers: {
        "x-access-token": accessToken
      }
    }).then((res) => res.data)
}

export const getFetcher = createFetcher("get")
export const postFetcher = createFetcher("post")
