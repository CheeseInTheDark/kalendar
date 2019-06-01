const path = require('path')
const fs = require('fs')

module.exports = function validateDateExists(req, res, next) {
    const dateDir = path.join(settings.get().dataDirectory, `${req.params.date}`)
    if (!fs.existsSync(dateDir)) {
        res.status(404).send()
    } else {
        next()
    }
}