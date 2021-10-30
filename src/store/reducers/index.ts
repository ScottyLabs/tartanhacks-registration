import { combineReducers } from "redux"
import accounts from "./accounts"
import sponsors from "./sponsors"

export default combineReducers({
  accounts,
  sponsors
})
