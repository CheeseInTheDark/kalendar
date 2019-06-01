const getEventsForDate = require('../event/events-for-date')
const moment = require('moment')

module.exports = function getDateRange(req, res) {
    const start = moment(req.params.start, "YYYYMMDD")
    const end = moment(req.params.end, "YYYYMMDD")
    const eventsForAllDates = []

    for (let date = moment(start); date.isSameOrBefore(end); date.add(1, "days")) {
        eventsForAllDates.push(getEventsForDate(date.format("YYYYMMDD")))
    }

    res.status(200).send(eventsForAllDates)
}
