import fs from 'node:fs/promises'

async function ls (dirPath) {
  const direntsArr = await fs.readdir(dirPath, { withFileTypes: true })
  direntsArr.sort((a, b) => {
    const lowerCaseA = a.name.toLowerCase()
    const lowerCaseB = b.name.toLowerCase()
    if (lowerCaseA < lowerCaseB) return -1
    if (lowerCaseA > lowerCaseB) return 1
    return 0
  })

  const foldersArr = []
  const filesArr = []

  direntsArr.forEach(dirent => {
    const obj = {
      Name: dirent.name,
      Type: undefined
    }

    if (dirent.isDirectory()) {
      obj.Type = 'directory'
      foldersArr.push(obj)
    }

    if (dirent.isFile()) {
      obj.Type = 'file'
      filesArr.push(obj)
    }
  })

  console.table(foldersArr.concat(filesArr))
}

export default ls
