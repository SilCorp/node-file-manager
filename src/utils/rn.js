import fs from 'node:fs/promises'
import path from 'node:path'
import isFileExist from '../helpers/isFileExist.js'

async function rn (filePath, fileName) {
  const isNotFile = !(await isFileExist(filePath))

  if (isNotFile) throw new Error(`Not a file: ${filePath}`)

  const fileDirPath = path.dirname(filePath)

  const newFilePath = path.join(fileDirPath, fileName)

  await fs.rename(filePath, newFilePath)
}

export default rn
