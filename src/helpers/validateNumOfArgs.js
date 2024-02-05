import { lackOfArgsErrorMessage, unknownArgsErrorMessage } from '../constants.js'

function validateNumOfArgs (expectedNumOfArgs, ...args) {
  if (args.length === expectedNumOfArgs) return

  if (args.length < expectedNumOfArgs) {
    throw new Error(lackOfArgsErrorMessage)
  }

  const unknownArgs = Array.prototype.slice.call(args, expectedNumOfArgs)
  throw new Error(`${unknownArgsErrorMessage}: ${unknownArgs}`)
}

export default validateNumOfArgs
