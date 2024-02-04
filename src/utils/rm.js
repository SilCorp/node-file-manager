import fs from 'node:fs/promises'

async function rm (filePath) {
  await fs.unlink(filePath)
}

export default rm
