import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'

async function cp (srcFilePath, dirPath) {
  const fileName = path.basename(srcFilePath)
  const destPath = path.join(dirPath, fileName)

  await pipeline(
    fs.createReadStream(srcFilePath),
    fs.createWriteStream(destPath)
  )
}

export default cp
