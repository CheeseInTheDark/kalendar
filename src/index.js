const express = require("express");
const pad = require("pad-number")
const fs = require("fs")
const path = require("path")
const rmdirForce = require("rimraf")
const moment = require("moment")
const eventIdToPath = require('./event/event-id-to-path')

const app = express()
const port = 3000

const settingsFilePath = process.argv[2]

if (settingsFilePath === undefined) {
    console.log("Please provide path for settings file")
    process.exit()
}

const settings = require('./settings')
settings.useFile(settingsFilePath)

const dateDoc = require('./date/date-doc')
const eventDoc = require('./event/event-doc')
const completeDoc = require('./complete/complete-doc')
const rootDoc = require('./root-doc')

const completeEvent = require('./complete/complete-event')

const getEvent = require('./event/event-get')
const postEvent = require('./event/event-post')
const deleteEvent = require('./event//event-delete')
const validateEventExists = require('./event/validate-event')
const validateEventId = require('./event/validate-event-id')

const getDate = require('./date/date-get')
const deleteDate = require('./date/date-delete')
const getDateRange = require('./date/date-get-range')
const validateDateRange = require('./date/validate-date-range')
const validateDate = require('./date/validate-date')
const validateDateExists = require('./date/validate-date-exists')

app.all('/date', dateDoc)
app.get('/date/:start-:end', validateDateRange, getDateRange)
app.get('/date/:date', validateDate, getDate)
app.delete('/date/:date', validateDate, validateDateExists, deleteDate)

app.all('/event/', eventDoc)
app.get('/event/:eventId', validateEventId, validateEventExists, getEvent)
app.delete('/event/:eventId', validateEventId, validateEventExists, deleteEvent)
app.post('/event/:date', validateDate, express.json(), postEvent)

app.all('/complete', completeDoc)
app.put('/complete/:eventId', validateEventId, validateEventExists, completeEvent)

app.all('/', rootDoc)

app.listen(port, () => console.log('Yo dwag listening yo'))