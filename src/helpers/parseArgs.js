function parseArgs () {
  const args = process.argv.slice(2)

  return args.reduce((result, argStr) => {
    const parsedArgStr = argStr.split('=')

    if (parsedArgStr.length !== 2) throw new Error(`Unacceptable argument: "${argStr}"`)

    const [arg, value] = parsedArgStr
    result[arg] = value

    return result
  }, {})
}

export default parseArgs
