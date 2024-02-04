import parseArgs from './src/helpers/parseArgs.js'
import printGreeting from './src/helpers/printGreeting.js'
import printGoodbye from './src/helpers/printGoodbye.js'
import printDirectory from './src/helpers/printDirectory.js'
import promptForUserInput from './src/helpers/promptForUserInput.js'
import { inputErrorMessage, operationErrorMessage } from './src/constants.js'
import os from 'node:os'
import up from './src/utils/up.js'
import cd from './src/utils/cd.js'
import ls from './src/utils/ls.js'
import cat from './src/utils/cat.js'
import add from './src/utils/add.js'
import rn from './src/utils/rn.js'
import resolveAbsolutePath from './src/helpers/resolveAbsolutePath.js'
import cp from './src/utils/cp.js'

const { '--username': userName } = parseArgs()
let currentDirPath = os.homedir()

printGreeting(userName)
printDirectory(currentDirPath)
promptForUserInput()
process.stdin.on('data', async (input) => {
  const stringifiedInput = input.toString().trim()
  if (stringifiedInput === '.exit') process.exit()

  const [utilName, ...args] = stringifiedInput.split(' ')

  try {
    switch (utilName) {
      case 'up':
        currentDirPath = up(currentDirPath)
        break

      case 'cd':
        currentDirPath = await cd(...args, currentDirPath)
        break

      case 'ls':
        await ls(currentDirPath)
        break

      case 'cat':
        await cat(...args, currentDirPath)
        break

      case 'add':
        await add(currentDirPath, ...args)
        break

      case 'rn': {
        const [filePath, fileName] = args
        const absoluteFilePath = resolveAbsolutePath(filePath, currentDirPath)
        await rn(absoluteFilePath, fileName)
        break
      }

      case 'cp': {
        const [srcPath, destPath] = args
        const absoluteSrcPath = resolveAbsolutePath(srcPath, currentDirPath)
        const absoluteDestPath = resolveAbsolutePath(destPath, currentDirPath)
        await cp(absoluteSrcPath, absoluteDestPath)
        break
      }

      default:
        console.error(inputErrorMessage)
    }
  } catch (e) {
    console.error(operationErrorMessage)
  }

  printDirectory(currentDirPath)
  promptForUserInput()
})
process.on('SIGINT', () => {
  process.stdout.write('\n')
  process.exit()
})
process.on('exit', () => printGoodbye(userName))
