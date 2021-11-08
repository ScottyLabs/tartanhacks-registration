import { combineReducers } from "redux"
import accounts from "./accounts"
import sponsors from "./sponsors"
import application from "./application"
import user from "./user"

export default combineReducers({
  accounts,
  sponsors,
  application,
  user
})
