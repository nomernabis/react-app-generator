#!/usr/bin/env node
const { renamePackageJson, copyDirectoryContent, mkDirIfNotExists } = require('./utils')
const CURR_DIR = process.cwd()


let appName = 'default'
if(process.argv.length >= 2){
    appName = process.argv[2]
}


const templateFolder = 'ez-react-app'

const srcPath = `${__dirname}/${templateFolder}`
const dstPath = `${CURR_DIR}/${appName}`



mkDirIfNotExists(dstPath)
copyDirectoryContent(srcPath, dstPath)
renamePackageJson(dstPath, appName)
