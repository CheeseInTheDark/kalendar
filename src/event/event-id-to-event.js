const fs = require('fs')
const eventIdToPath = require('./event-id-to-path')

module.exports = function eventIdToEvent(eventId) {
    const event = JSON.parse(fs.readFileSync(eventIdToPath(eventId)).toString())

    return {
        eventId: eventId,
        eventNote: event.eventNote,
        completed: event.completed,
        date: eventId.substr(0, 8)
    }
}