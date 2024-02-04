import parseArgs from './src/helpers/parseArgs.js'
import printGreeting from './src/helpers/printGreeting.js'
import printGoodbye from './src/helpers/printGoodbye.js'
import printDirectory from './src/helpers/printDirectory.js'
import promptForUserInput from './src/helpers/promptForUserInput.js'
import { inputErrorMessage, operationErrorMessage } from './src/constants.js'
import os from 'node:os'
import up from './src/utils/up.js'

const { '--username': userName } = parseArgs()
let currentDirPath = os.homedir()

printGreeting(userName)
printDirectory(currentDirPath)
promptForUserInput()
process.stdin.on('data', (input) => {
  const stringifiedInput = input.toString().trim()
  if (stringifiedInput === '.exit') process.exit()

  const [utilName, ...args] = stringifiedInput.split(' ')

  try {
    switch (utilName) {
      case 'up':
        currentDirPath = up(currentDirPath)
        break

      default:
        console.error(inputErrorMessage)
        return
    }
  } catch (e) {
    console.error(operationErrorMessage)
    return
  }

  printDirectory(currentDirPath)
  promptForUserInput()
})
process.on('SIGINT', () => process.exit())
process.on('exit', () => printGoodbye(userName))
