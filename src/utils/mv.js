import cp from './cp.js'
import rm from './rm.js'

async function mv (srcFilePath, dirPath) {
  await cp(srcFilePath, dirPath)
  await rm(srcFilePath)
}

export default mv
