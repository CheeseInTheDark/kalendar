const fs = require('fs')
const eventIdToPath = require('./event-id-to-path')

module.exports = function validateEventExists(req, res, next) {
    const eventPath = eventIdToPath(req.params.eventId)

    if (!fs.existsSync(eventPath)) {
        res.status(404).send()
    } else {
        next()
    }
}