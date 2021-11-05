import { combineReducers } from "redux"
import accounts from "./accounts"
import teams from "./teams"
import user from "./user"

export default combineReducers({
  accounts,
  teams,
  user
})
