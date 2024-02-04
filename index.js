import parseArgs from './src/helpers/parseArgs.js'
import printGreeting from './src/helpers/printGreeting.js'
import printGoodbye from './src/helpers/printGoodbye.js'
import printDirectory from './src/helpers/printDirectory.js'
import promptForUserInput from './src/helpers/promptForUserInput.js'
import { inputErrorMessage, operationErrorMessage } from './src/constants.js'
import { homedir } from 'node:os'
import up from './src/utils/up.js'
import cd from './src/utils/cd.js'
import ls from './src/utils/ls.js'
import cat from './src/utils/cat.js'
import add from './src/utils/add.js'
import rn from './src/utils/rn.js'
import resolvePath from './src/helpers/resolvePath.js'
import cp from './src/utils/cp.js'
import rm from './src/utils/rm.js'
import mv from './src/utils/mv.js'
import os from './src/utils/os.js'
import validateArguments from './src/helpers/validateArguments.js'
import hash from './src/utils/hash.js'

const { '--username': userName } = parseArgs()
let currentDirPath = homedir()

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
      case 'cd': {
        const [dirPath] = args
        currentDirPath = await cd(dirPath, currentDirPath)
        break
      }
      case 'ls':
        await ls(currentDirPath)
        break
      case 'cat': {
        const [filePath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        await cat(absoluteFilePath)
        break
      }
      case 'add': {
        const [fileName] = args
        await add(currentDirPath, fileName)
        break
      }
      case 'rn': {
        const [filePath, fileName] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        await rn(absoluteFilePath, fileName)
        break
      }
      case 'cp': {
        const [srcPath, destPath] = args
        const absoluteSrcPath = resolvePath(srcPath, currentDirPath)
        const absoluteDestPath = resolvePath(destPath, currentDirPath)
        await cp(absoluteSrcPath, absoluteDestPath)
        break
      }
      case 'mv': {
        const [filePath, destPath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        const absoluteDestPath = resolvePath(destPath, currentDirPath)
        await mv(absoluteFilePath, absoluteDestPath)
        break
      }
      case 'rm': {
        const [filePath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        await rm(absoluteFilePath)
        break
      }
      case 'os':
        validateArguments(1, ...args)
        os(...args)
        break
      case 'hash': {
        const [filePath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        await hash(absoluteFilePath)
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
