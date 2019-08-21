const fs = require('fs')
const path = require('path')

function mkDirIfNotExists(dir){
    if(!fs.existsSync(dir)) fs.mkdirSync(dir)
}

function copy(src, dst){
    const stat = fs.lstatSync(src)
    if(stat.isDirectory()){
        const dirName = path.basename(src)
        mkDirIfNotExists(dst + '/' + dirName)
        const content = fs.readdirSync(src)
        content.forEach(f => copy(src + '/' + f, dst + '/' + dirName))
    } else {
        const fileName = path.basename(src)
        fs.copyFileSync(src, `${dst}/${fileName}`)
    }
}

const copyDirectoryContent = (templatePath, appPath) => {
    const content = fs.readdirSync(templatePath)
    content.forEach(file => {
        copy(`${templatePath}/${file}`, `${appPath}`)
    })
}

const renamePackageJson = (dst, name) => {
    const files = fs.readdirSync(dst)
    const p = files.find(f => f === 'package.json')
    const filePath = dst + '/' + p
    const file = JSON.parse(fs.readFileSync(filePath).toString())
    file.name = name
    fs.writeFileSync(filePath, JSON.stringify(file, null, '    '))
    console.log(JSON.parse(fs.readFileSync(dst + '/' + p).toString()))
}


module.exports = {
    mkDirIfNotExists, copy, renamePackageJson, copyDirectoryContent
}