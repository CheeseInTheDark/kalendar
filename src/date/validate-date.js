const moment = require('moment')

module.exports = function validateDate(req, res, next) {
    if (!moment(req.params.date, "YYYYMMDD").isValid()) {
        res.status(400).send("date must be a string with format YYYYMMDD")
    } else {
        next()
    }
}
