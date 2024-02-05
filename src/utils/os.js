import osModule from 'node:os'
import { unknownArgsErrorMessage } from '../constants.js'

function os (param) {
  switch (param) {
    case '--EOL':
      console.log(getEOL())
      break
    case '--cpus':
      console.log(getCpus())
      break
    case '--homedir':
      console.log(getHomeDir())
      break
    case '--username':
      console.log(getUserName())
      break
    case '--architecture':
      console.log(getArch())
      break
    default:
      throw new Error(`${unknownArgsErrorMessage}: ${param}`)
  }
}

function getEOL () {
  return JSON.stringify(osModule.EOL)
}
function getCpus () {
  return osModule.cpus().map((cpu) => ({
    model: cpu.model,
    clock_rate: `${(cpu.speed / 1000).toFixed(2)}GHz`
  }))
}
function getHomeDir () {
  return osModule.homedir()
}
function getUserName () {
  return osModule.userInfo().username
}
function getArch () {
  return osModule.arch()
}

export default os
