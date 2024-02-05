import fs from 'node:fs/promises'

async function isDirectoryExist (dirPath) {
  try {
    const dirStats = await fs.stat(dirPath)
    return dirStats.isDirectory()
  } catch (error) {
    return false
  }
}

export default isDirectoryExist
