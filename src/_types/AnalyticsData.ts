export type AnalyticsData = {
  total: number
  demographic: {
    gender: Record<string, number>
    schools: Record<
      string,
      {
        submitted: number
        admitted: number
        confirmed: number
        declined: number
      }
    >
    colleges: Record<string, number>
    year: Record<string, number>
  }

  verified: number
  submitted: number
  admitted: number
  confirmed: number
  confirmedCmu: number
  declined: number

  confirmedFemale: number
  confirmedMale: number
  confirmedOther: number
  confirmedNone: number

  shirtSizes: Record<string, number>

  dietaryRestrictions: Record<string, number>

  experiences: Record<string, number>
  wantsHardware: number
  attendance: {
    physical: number
    virtual: number
  }
}
