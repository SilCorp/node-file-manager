import isDirectoryExist from '../helpers/isDirectoryExist.js'
import path from 'node:path'

async function cd (dirPath, currentPath) {
  const newPath = path.resolve(currentPath, dirPath)

  const isDirectoryNotExist = !(await isDirectoryExist(newPath))

  if (isDirectoryNotExist) {
    throw new Error(`No such directory: ${newPath}`)
  }

  return newPath
}

export default cd
