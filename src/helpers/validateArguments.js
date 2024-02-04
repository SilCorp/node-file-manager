function validateArguments (numOfArgs, ...args) {
  if (args.length === numOfArgs) return

  if (args.length < numOfArgs) {
    throw new Error('Lack of arguments')
  }

  const unknownArgs = Array.prototype.slice.call(args, numOfArgs)
  throw new Error(`Unknown arguments: ${unknownArgs}`)
}

export default validateArguments
