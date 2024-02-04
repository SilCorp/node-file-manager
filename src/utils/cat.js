import fs from 'node:fs'
import { pipeline } from 'node:stream/promises'
import path from 'node:path'

async function cat (filePath, currentDirPath) {
  let pathToFile
  if (path.isAbsolute(filePath)) {
    pathToFile = filePath
  } else {
    pathToFile = path.resolve(currentDirPath, filePath)
  }

  const fileStream = fs.createReadStream(pathToFile)

  await pipeline(fileStream, process.stdout, { end: false })
  process.stdout.write('\n')
}

export default cat
