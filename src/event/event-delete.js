const eventIdToPath = require('./event-id-to-path')
const fs = require('fs')

module.exports = function deleteEvent(req, res) {
    fs.unlinkSync(eventIdToPath(req.params.eventId))

    res.status(200).send()
}
