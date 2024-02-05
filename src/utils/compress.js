import zlib from 'node:zlib'
import { pipeline } from 'node:stream/promises'
import fs from 'node:fs'

async function compress (filePath, destPath) {
  const brotli = zlib.createBrotliCompress()

  await pipeline(
    fs.createReadStream(filePath),
    brotli,
    fs.createWriteStream(destPath)
  )
}

export default compress
