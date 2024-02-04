import zlib from 'node:zlib'
import { pipeline } from 'node:stream/promises'
import fs from 'node:fs'

async function decompress (filePath, destPath) {
  const brotli = zlib.createBrotliDecompress()

  await pipeline(
    fs.createReadStream(filePath),
    brotli,
    fs.createWriteStream(destPath)
  )
}

export default decompress
