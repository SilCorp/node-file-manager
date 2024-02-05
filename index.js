import parseArgs from './src/helpers/parseArgs.js'
import printGreeting from './src/helpers/printGreeting.js'
import printGoodbye from './src/helpers/printGoodbye.js'
import printCurrentDirectory from './src/helpers/printCurrentDirectory.js'
import promptForUserInput from './src/helpers/promptForUserInput.js'
import {
  inputErrorMessage,
  lackOfArgsErrorMessage,
  operationErrorMessage,
  unknownArgsErrorMessage
} from './src/constants.js'
import { homedir } from 'node:os'
import ls from './src/utils/ls.js'
import cat from './src/utils/cat.js'
import add from './src/utils/add.js'
import rn from './src/utils/rn.js'
import cp from './src/utils/cp.js'
import rm from './src/utils/rm.js'
import mv from './src/utils/mv.js'
import os from './src/utils/os.js'
import validateNumOfArgs from './src/helpers/validateNumOfArgs.js'
import hash from './src/utils/hash.js'
import compress from './src/utils/compress.js'
import decompress from './src/utils/decompress.js'

const { '--username': userName } = parseArgs()

process.chdir(homedir())
printGreeting(userName)
printCurrentDirectory()
promptForUserInput()
process.stdin.on('data', async (input) => {
  const stringifiedInput = input.toString().trim()
  if (stringifiedInput === '.exit') process.exit()

  const [utilName, ...args] = stringifiedInput.split(' ')

  try {
    switch (utilName) {
      case 'up': {
        validateNumOfArgs(0, ...args)
        process.chdir('..')
        break
      }
      case 'cd': {
        validateNumOfArgs(1, ...args)
        process.chdir(...args)
        break
      }
      case 'ls': {
        validateNumOfArgs(0, ...args)
        await ls()
        break
      }
      case 'cat': {
        validateNumOfArgs(1, ...args)
        await cat(...args)
        break
      }
      case 'add': {
        validateNumOfArgs(1, ...args)
        await add(...args)
        break
      }
      case 'rn': {
        validateNumOfArgs(2, ...args)
        await rn(...args)
        break
      }
      case 'cp': {
        validateNumOfArgs(2, ...args)
        await cp(...args)
        break
      }
      case 'mv': {
        validateNumOfArgs(2, ...args)
        await mv(...args)
        break
      }
      case 'rm': {
        validateNumOfArgs(1, ...args)
        await rm(...args)
        break
      }
      case 'os': {
        validateNumOfArgs(1, ...args)
        os(...args)
        break
      }
      case 'hash': {
        validateNumOfArgs(1, ...args)
        await hash(...args)
        break
      }
      case 'compress': {
        validateNumOfArgs(2, ...args)
        await compress(...args)
        break
      }
      case 'decompress': {
        validateNumOfArgs(2, ...args)
        await decompress(...args)
        break
      }
      default:
        console.error(inputErrorMessage)
    }
  } catch (e) {
    if (e.message === lackOfArgsErrorMessage || e.message.startsWith(unknownArgsErrorMessage)) {
      console.error(inputErrorMessage)
    } else {
      console.error(operationErrorMessage)
    }
  }

  printCurrentDirectory()
  promptForUserInput()
})
process.on('SIGINT', () => {
  process.stdout.write('\n')
  process.exit()
})
process.on('exit', () => printGoodbye(userName))
