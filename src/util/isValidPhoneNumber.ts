/**
 * Matches the following formats:
 * 18005551234
 * 1 800 555 1234
 * +1 800 555-1234
 * +86 800 555 1234
 * 1-800-555-1234
 * 1 (800) 555-1234
 * (800)555-1234
 * (800) 555-1234
 * (800)5551234
 * 800-555-1234
 * 800.555.1234
 * 800 555 1234x5678
 * 8005551234 x5678
 * 1    800    555-1234
 * 1----800----555-1234
 *
 * @param {string} phoneNumber the phone number to check
 * @returns true if the phone number is valid and false otherwise
 */
export default (phoneNumber: string): boolean => {
  return (
    phoneNumber.match(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    ) != null
  )
}
