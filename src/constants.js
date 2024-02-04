import os from 'node:os'

const homeDir = os.homedir()

const inputErrorMessage = 'Invalid input'
const operationErrorMessage = 'Operation failed'

export {
  homeDir,
  inputErrorMessage,
  operationErrorMessage
}
