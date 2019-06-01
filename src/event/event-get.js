const eventIdToEvent = require('./event-id-to-event')

module.exports = function getEvent(req, res) {
    const event = eventIdToEvent(req.params.eventId)

    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(event)
}