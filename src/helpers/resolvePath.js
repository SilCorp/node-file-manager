import { isAbsolute, join, normalize } from 'node:path'

/**
 * Resolves an absolute or relative path based on the input path and relative directory path.
 *
 * @param {string} path - The input path (either absolute or relative).
 * @param {string} relativeDirPath - The relative directory path.
 * @returns {string} - The normalized path.
 */
function resolvePath (path, relativeDirPath) {
  let newPath

  if (isAbsolute(path)) {
    newPath = path
  } else {
    newPath = join(relativeDirPath, path)
  }

  return normalize(newPath)
}

export default resolvePath
