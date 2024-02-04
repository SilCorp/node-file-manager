import path from 'node:path'
import fs from 'node:fs/promises'

async function cd (dirPath, currentPath) {
  let newPath

  if (path.isAbsolute(dirPath)) {
    newPath = dirPath
  } else {
    newPath = path.join(currentPath, dirPath)
  }

  newPath = path.normalize(newPath)

  const isDirectoryExist = (await fs.stat(newPath, {})).isDirectory()

  if (!isDirectoryExist) {
    throw new Error(`No such directory: ${newPath}`)
  }

  return newPath
}

export default cd
