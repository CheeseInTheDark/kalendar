const fs = require('fs')

let settings

function useFile(filePath) {
    settings = JSON.parse(fs.readFileSync(filePath))
}

const get = () => Object.assign({}, settings)

module.exports = { useFile, get }