import { combineReducers } from "redux"
import accounts from "./accounts"
import sponsors from "./sponsors"
import application from "./application"

export default combineReducers({
  accounts,
  sponsors,
  application
})
