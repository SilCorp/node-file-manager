import path from 'node:path'

function up (dirPath) {
  return path.resolve(dirPath, '..')
}

export default up
