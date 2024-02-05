import parseArgs from './src/helpers/parseArgs.js'
import printGreeting from './src/helpers/printGreeting.js'
import printGoodbye from './src/helpers/printGoodbye.js'
import printDirectory from './src/helpers/printDirectory.js'
import promptForUserInput from './src/helpers/promptForUserInput.js'
import {
  inputErrorMessage,
  lackOfArgsErrorMessage,
  operationErrorMessage,
  unknownArgsErrorMessage
} from './src/constants.js'
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
import validateNumOfArgs from './src/helpers/validateNumOfArgs.js'
import hash from './src/utils/hash.js'
import compress from './src/utils/compress.js'
import decompress from './src/utils/decompress.js'

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
      case 'up': {
        validateNumOfArgs(0, ...args)
        currentDirPath = up(currentDirPath)
        break
      }
      case 'cd': {
        const [dirPath] = args
        validateNumOfArgs(1, ...args)
        currentDirPath = await cd(dirPath, currentDirPath)
        break
      }
      case 'ls': {
        validateNumOfArgs(0, ...args)
        await ls(currentDirPath)
        break
      }
      case 'cat': {
        validateNumOfArgs(1, ...args)
        const [filePath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        await cat(absoluteFilePath)
        break
      }
      case 'add': {
        validateNumOfArgs(1, ...args)
        const [fileName] = args
        await add(currentDirPath, fileName)
        break
      }
      case 'rn': {
        validateNumOfArgs(2, ...args)
        const [filePath, fileName] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        await rn(absoluteFilePath, fileName)
        break
      }
      case 'cp': {
        validateNumOfArgs(2, ...args)
        const [srcPath, destPath] = args
        const absoluteSrcPath = resolvePath(srcPath, currentDirPath)
        const absoluteDestPath = resolvePath(destPath, currentDirPath)
        await cp(absoluteSrcPath, absoluteDestPath)
        break
      }
      case 'mv': {
        validateNumOfArgs(2, ...args)
        const [filePath, destPath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        const absoluteDestPath = resolvePath(destPath, currentDirPath)
        await mv(absoluteFilePath, absoluteDestPath)
        break
      }
      case 'rm': {
        validateNumOfArgs(1, ...args)
        const [filePath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        await rm(absoluteFilePath)
        break
      }
      case 'os': {
        validateNumOfArgs(1, ...args)
        const [utilKey] = args
        os(utilKey)
        break
      }
      case 'hash': {
        validateNumOfArgs(1, ...args)
        const [filePath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        await hash(absoluteFilePath)
        break
      }
      case 'compress': {
        validateNumOfArgs(2, ...args)
        const [filePath, destPath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        const absoluteDestPath = resolvePath(destPath, currentDirPath)
        await compress(absoluteFilePath, absoluteDestPath)
        break
      }
      case 'decompress': {
        validateNumOfArgs(2, ...args)
        const [filePath, destPath] = args
        const absoluteFilePath = resolvePath(filePath, currentDirPath)
        const absoluteDestPath = resolvePath(destPath, currentDirPath)
        await decompress(absoluteFilePath, absoluteDestPath)
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

  printDirectory(currentDirPath)
  promptForUserInput()
})
process.on('SIGINT', () => {
  process.stdout.write('\n')
  process.exit()
})
process.on('exit', () => printGoodbye(userName))
