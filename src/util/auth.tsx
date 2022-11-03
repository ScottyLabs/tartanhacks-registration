import { postFetcher } from "./fetcher"
import actions from "src/actions"

/**
 * check if a user is authenticated
 * @param accessToken User's accessToken cookie
 * @returns true if the user is authenticated, false otherwiser
 */
export async function isAuthenticated(accessToken: string): Promise<boolean> {
  if (accessToken === undefined) {
    return false
  }
  try {
    await postFetcher(actions.auth.loginWithToken(), accessToken)
    return true
  } catch (error) {
    //token invalid or expired
    return false
  }
}
