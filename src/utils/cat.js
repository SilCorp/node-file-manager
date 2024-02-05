import fs from 'node:fs'
import { pipeline } from 'node:stream/promises'

async function cat (filePath) {
  const fileStream = fs.createReadStream(filePath)

  await pipeline(fileStream, process.stdout, { end: false })
  process.stdout.write('\n')
}

export default cat
