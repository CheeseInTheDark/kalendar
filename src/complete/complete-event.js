const eventIdToPath = require('../event/event-id-to-path')
const fs = require('fs')
const eventIdToEvent = require('../event/event-id-to-event')

module.exports = function completeEvent(req, res) {
    const event = eventIdToEvent(req.params.eventId)

    fs.writeFileSync(eventIdToPath(req.params.eventId), JSON.stringify({
        eventNote: event.eventNote,
        completed: true
    }))

    res.status(200).send()
}