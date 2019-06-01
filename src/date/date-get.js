const getEventsForDate = require('../event/events-for-date')

module.exports = function getDate(req, res) {
    const events = getEventsForDate(req.params.date)
    res.status(200).send(events)
}