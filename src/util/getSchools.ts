import axios from "axios"
import parse from "csv-parse"
import { promisify } from "util"

export const getSchools = async (): Promise<string[]> => {
  const response = await axios.get("/schools.csv")
  const schoolMatrix = await promisify(parse)(response.data)
  const schools = schoolMatrix.flat()
  return schools
}
