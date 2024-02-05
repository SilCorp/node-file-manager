import fs from 'node:fs/promises'
import path from 'node:path'

async function add (fileName) {
  const filePath = path.join(process.cwd(), fileName)
  await fs.writeFile(filePath, '')
}

export default add
