import fs from 'node:fs/promises'

/**
 * Checks if a file exists at the specified path.
 *
 * @param {string} filePath - The path to the file.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the file exists, or `false` otherwise.
 */
async function isFileExist (filePath) {
  try {
    const fileStats = await fs.stat(filePath)
    return fileStats.isFile()
  } catch (error) {
    return false
  }
}

export default isFileExist
