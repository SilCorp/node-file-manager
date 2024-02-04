import resolvePath from '../helpers/resolvePath.js'
import isDirectoryExist from '../helpers/isDirectoryExist.js'

async function cd (dirPath, currentPath) {
  const newPath = resolvePath(dirPath, currentPath)

  const isDirectoryNotExist = !(await isDirectoryExist(newPath))

  if (isDirectoryNotExist) {
    throw new Error(`No such directory: ${newPath}`)
  }

  return newPath
}

export default cd
