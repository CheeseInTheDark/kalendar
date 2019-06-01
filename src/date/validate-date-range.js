const moment = require('moment')

module.exports = function validateDateRange(req, res, next) {
    const start = moment(req.params.start, "YYYYMMDD")
    const end = moment(req.params.end, "YYYYMMDD")
    if (!start.isValid() || !end.isValid()) {
        res.status(400).send("start and end dates must be of format YYYYMMDD")
    } else if(start.isAfter(end)) {
        res.status(400).send("start date must not be after end date")
    } else {
        next()
    }
}