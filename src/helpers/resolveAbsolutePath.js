import { isAbsolute, normalize, resolve } from 'node:path'

/**
 * Resolves an absolute or relative path.
 *
 * @param {string} path - The path to resolve.
 * @param {string} relativeDirPath - The relative directory path.
 * @returns {string} The resolved path.
 * @description This function takes two parameters: `path` (the path to resolve) and `relativeDirPath` (the relative directory path). If the `path` is already absolute, it returns the normalized path. Otherwise, it resolves the `path` relative to the `relativeDirPath`.
 * @example
 * // Example usage:
 * const absolutePath = resolveAbsolutePath('/var/www', 'src');
 * console.log(absolutePath); // Output: '/var/www/src'
 *
 * // Example with a relative path:
 * const relativePath = resolveAbsolutePath('styles/main.css', 'public');
 * console.log(relativePath); // Output: '/var/www/public/styles/main.css'
 */
function resolveAbsolutePath (path, relativeDirPath) {
  if (isAbsolute(path)) {
    return normalize(path)
  }

  return resolve(relativeDirPath, path)
}

export default resolveAbsolutePath
