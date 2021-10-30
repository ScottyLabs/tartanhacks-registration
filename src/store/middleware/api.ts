import axios, { AxiosError } from "axios"
import { DispatchAction } from "types/DispatchAction"
import { RequestStatus } from "enums/RequestStatus"
import { Middleware } from "redux"

/**
 * Middleware to send calls to the backend from DispatchActions, as necessary
 */
const apiMiddleware: Middleware<any, any> =
  ({ dispatch }) =>
    (next) =>
      async (action: DispatchAction): Promise<any> => {
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
        const { path, method, body } = request
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
          return Promise.resolve({ type, status: RequestStatus.SUCCESS, data })
        } catch (err: any) {
          // Mark request status as error
          if (axios.isAxiosError(err)) {
            const message = (err as AxiosError).response?.data?.message || err
            const action: DispatchAction = { type, useAPI: false, status: RequestStatus.ERROR, data: message }
            dispatch(action)
            return Promise.reject(action)
          } else {
            console.error(err)
            const action: DispatchAction = { type, useAPI: false, status: RequestStatus.ERROR, data: err }
            dispatch(action)
            return Promise.reject(action)
          }
        }
      }

export default apiMiddleware
