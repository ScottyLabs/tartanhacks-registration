import axios from "axios"
import parse from "csv-parse"

const parseAsync = (inputStr: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    parse(
      inputStr,
      undefined,
      (err: Error | undefined, records: any | undefined): void => {
        if (err) {
          reject(err)
          return
        }
        resolve(records)
      }
    )
  })
}

export const getSchools = async (): Promise<string[]> => {
  const response = await axios.get("/schools.csv")
  const schoolMatrix: string[] = await parseAsync(response.data)
  const schools = schoolMatrix.flat()
  return schools
}
