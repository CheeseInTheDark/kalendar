module.exports = function validateEventId(req, res, next) {
    if (!Number.parseInt(req.params.eventId)) {
        res.status(400).send("event id must be a string that is parseable to a number")
    } else {
        next()
    }
}