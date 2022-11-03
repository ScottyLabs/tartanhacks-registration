import { postFetcher } from "./fetcher"
import actions from "src/actions"

export async function isAuthenticated(accessToken: string): Promise<boolean> {
  if (accessToken === undefined) {
    return false
  }
  try {
    await postFetcher(actions.auth.loginWithToken(), accessToken)
    return true
  } catch (error) {
    console.error(error)
    //token invalid or expired
    return false
  }
}
