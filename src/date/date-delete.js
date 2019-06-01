const path = require('path')
const rmdirForce = require('rimraf')
const settings = require('../settings')

module.exports = function deleteDate(req, res) {
    const dateDir = path.join(settings.get().dataDirectory, req.params.date)

    rmdirForce.sync(dateDir)

    res.status(200).send()
}