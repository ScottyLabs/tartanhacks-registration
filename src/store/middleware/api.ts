import axios, { AxiosError } from "axios"
import { DispatchAction } from "types/DispatchAction"
import { RequestStatus } from "enums/RequestStatus"
import { Middleware } from "redux"

/**
 * Inject URL parameters into a URL for GET requests with "body" parameters specified.
 * This looks for any instances of {key} (including curly braces) in the URL, for every key specified in the body.
 * It then replaces {key} with the corresponding value
 * @param path path to transform
 * @param method  HTTP method
 * @param body dictionary of URL params (string keys to string values) to replace in the path
 * @returns transformed path, if possible
 */
const transformPath = (
  path: string,
  method: string,
  body: { [key: string]: string }
): string => {
  if (method == "GET" && body != null) {
    for (const key of Object.keys(body)) {
      path = path.replaceAll(`{${key}}`, body[key])
    }
  }
  return path
}

/**
 * Middleware to send calls to the backend from DispatchActions, as necessary
 */
const apiMiddleware: Middleware<any, any> =
  ({ dispatch }) =>
  (next) =>
  async (action: DispatchAction): Promise<void> => {
    const { type, useAPI, request } = action
    if (!useAPI) {
      next(action)
      return
    }

    if (!request) {
      throw new Error("Missing request in dispatch for " + type)
    }

    // Start API call. Mark request as pending
    dispatch({ type, status: RequestStatus.PENDING })

    // Initialize request params
    const { method, body } = request
    const path = transformPath(request.path, method, body)
    const url = `${process.env.BACKEND_URL}${path}`
    const accessToken = window.localStorage.getItem("accessToken")

    const options = {
      url,
      method,
      headers: {
        "x-access-token": accessToken
      },
      data: body
    }

    try {
      // Send request
      const response = await axios(options)
      const { data } = response
      // Mark request status as success with resolved data
      dispatch({ type, status: RequestStatus.SUCCESS, data })
    } catch (err: any) {
      // Mark request status as error
      if (axios.isAxiosError(err)) {
        const message = (err as AxiosError).message || err
        dispatch({ type, status: RequestStatus.ERROR, data: message })
      } else {
        console.error(err)
        dispatch({ type, status: RequestStatus.ERROR, data: err })
      }
    }
  }

export default apiMiddleware
