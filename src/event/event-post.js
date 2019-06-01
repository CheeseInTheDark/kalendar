const fs = require('fs')
const path = require('path')
const settings = require('../settings')

module.exports = function postEvent(req, res) {
    const dateDir = path.join(settings.get().dataDirectory, req.params.date)
    fs.existsSync(dateDir) || fs.mkdirSync(dateDir)

    const nextId = Math.max(fs.readdirSync(dateDir).map(parseInt)) + 1

    const eventFile = path.join(dateDir, `${nextId}`)
    fs.writeFileSync(eventFile, JSON.stringify({
        eventNote: req.body.eventNote,
        completed: false
    }))
    res.status(200).send(`${req.params.date}${nextId}`)
}