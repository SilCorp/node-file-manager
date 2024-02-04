import fs from 'node:fs/promises'
import path from 'node:path'

async function add (currentDirPath, fileName) {
  const filePath = path.join(currentDirPath, fileName)
  await fs.writeFile(filePath, '')
}

export default add
