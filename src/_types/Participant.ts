import { Status } from "enums/Status"

export interface Participant {
  _id: string
  admin: boolean
  company?: string
  email: string
  password: string
  status: Status
}
