const express = require("express");
const pad = require("pad-number")
const fs = require("fs")
const path = require("path")
const rmdirForce = require("rimraf")
const moment = require("moment")

const app = express()
const port = 3000

const settingsFilePath = process.argv[2]

if (settingsFilePath === undefined) {
    console.log("Please provide path for settings file")
    process.exit()
}

const settings = JSON.parse(fs.readFileSync(settingsFilePath))

function completeEvent(req, res) {
    const event = eventIdToEvent(req.params.eventId)

    fs.writeFileSync(eventIdToPath(req.params.eventId), JSON.stringify({
        eventNote: event.eventNote,
        completed: true
    }))

    res.status(200).send()
}

function getDateRange(req, res) {
    const start = moment(req.params.start, "YYYYMMDD")
    const end = moment(req.params.end, "YYYYMMDD")
    const eventsForAllDates = []

    for (let date = moment(start); date.isSameOrBefore(end); date.add(1, "days")) {
        eventsForAllDates.push(getDateInternal(date.format("YYYYMMDD")))
    }

    res.status(200).send(eventsForAllDates)
}

function validateDateRange(req, res, next) {
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

function getDate(req, res) {
    const events = getDateInternal(req.params.date)
    res.status(200).send(events)
}

function getDateInternal(date) {
    const dateDir = path.join(settings.dataDirectory, date)

    if (fs.existsSync(dateDir)) {
        const eventIds = fs.readdirSync(dateDir).map(fileName => date + fileName)
        const eventsForDate = eventIds.map(eventIdToEvent)

        return { date, events: eventsForDate }
    } else {
        return { date, events: [] }
    }
}

function deleteDate(req, res) {
    const dateDir = path.join(settings.dataDirectory, req.params.date)

    rmdirForce.sync(dateDir)

    res.status(200).send()
}

function postEvent(req, res) {
    const dateDir = path.join(settings.dataDirectory, req.params.date)
    fs.existsSync(dateDir) || fs.mkdirSync(dateDir)

    const nextId = Math.max(fs.readdirSync(dateDir).map(parseInt)) + 1

    const eventFile = path.join(dateDir, `${nextId}`)
    fs.writeFileSync(eventFile, JSON.stringify({
        eventNote: req.body.eventNote,
        completed: false
    }))
    res.status(200).send(`${req.params.date}${nextId}`)
}

function deleteEvent(req, res) {
    fs.unlinkSync(eventIdToPath(req.params.eventId))

    res.status(200).send()
}

function getEvent(req, res) {
    const event = eventIdToEvent((req.params.eventId))

    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(event)
}

function eventIdToEvent(eventId) {
    const event = JSON.parse(fs.readFileSync(eventIdToPath(eventId)).toString())

    return {
        eventId: eventId,
        eventNote: event.eventNote,
        completed: event.completed,
        date: eventId.substr(0, 8)
    }
}

function eventIdToPath(eventId) {
    const dateDirName = eventId.substr(0, 8)
    const dateDir = path.join(settings.dataDirectory, dateDirName)
    return path.join(dateDir, eventId.substr(8))
}

function validateEventExists(req, res, next) {
    const eventPath = eventIdToPath(req.params.eventId)

    if (!fs.existsSync(eventPath)) {
        res.status(404).send()
    } else {
        next()
    }
}

function validateEventId(req, res, next) {
    if (!Number.parseInt(req.params.eventId)) {
        res.status(400).send("event id must be a string that is parseable to a number")
    } else {
        next()
    }
}

function validateDate(req, res, next) {
    if (!moment(req.params.date, "YYYYMMDD").isValid()) {
        res.status(400).send("date must be a string with format YYYYMMDD")
    } else {
        next()
    }
}

function validateDateExists(req, res, next) {
    const dateDir = path.join(settings.dataDirectory, `${req.params.date}`)
    if (!fs.existsSync(dateDir)) {
        res.status(404).send()
    } else {
        next()
    }
}

function doc(docString) {
    return (req, res) => { 
        res.setHeader("Content-Type", "text/plain")
        res.status(200).send(docString) 
    }
}

app.all('/date', doc(require('./date-doc')))
app.get('/date/:start-:end', validateDateRange, getDateRange)
app.get('/date/:date', validateDate, getDate)
app.delete('/date/:date', validateDate, validateDateExists, deleteDate)

app.all('/event', doc(require('./event-doc')))
app.get('/event/:eventId', validateEventId, validateEventExists, getEvent)
app.delete('/event/:eventId', validateEventId, validateEventExists, deleteEvent)
app.post('/event/:date', validateDate, express.json(), postEvent)

app.all('/complete', doc(require('./complete-doc')))
app.put('/complete/:eventId', validateEventId, validateEventExists, completeEvent)

app.all('/', doc(require('./app-doc')))

app.listen(port, () => console.log('Yo dwag listening yo'))