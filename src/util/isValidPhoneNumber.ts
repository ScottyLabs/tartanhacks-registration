/**
 * Matches the following formats:
 *   123-456-7890
 *   (123) 456-7890
 *   123 456 7890
 *   123.456.7890
 *   +91 (123) 456-7890
 *   1234567890
 *
 * @param {string} phoneNumber the phone number to check
 * @returns true if the phone number is valid and false otherwise
 */
export default (phoneNumber: string): boolean => {
  return (
    phoneNumber.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) !=
    null
  )
}
