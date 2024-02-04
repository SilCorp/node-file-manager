import { createReadStream } from 'node:fs'
import crypto from 'node:crypto'
import { pipeline } from 'node:stream/promises'

async function hash (filePath) {
  const readStream = createReadStream(filePath)
  const hash = crypto.createHash('sha256')
  hash.setEncoding('hex')

  await pipeline(readStream, hash, process.stdout, { end: false })
  process.stdout.write('\n')
}

export default hash
