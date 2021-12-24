export interface Participant {
  _id: string
  admin: boolean
  company?: string
  email: string
  password: string
  status: {
    verified: boolean
    completedProfile: boolean
    admitted: boolean
    confirmed: boolean
    admittedBy: string
  }
}