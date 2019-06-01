const path = require('path')
const fs = require('fs')
const settings = require('../settings')
const eventIdToEvent = require('./event-id-to-event')

module.exports = function getEventsForDate(date) {
    const dateDir = path.join(settings.get().dataDirectory, date)

    if (fs.existsSync(dateDir)) {
        const eventIds = fs.readdirSync(dateDir).map(fileName => date + fileName)
        const eventsForDate = eventIds.map(eventIdToEvent)

        return { date, events: eventsForDate }
    } else {
        return { date, events: [] }
    }
}