const doc = require('../doc')

const docString = 
`/event endpoints:

/event/(eventId)

where eventId is a number which identifies a previously-created event

GET: retrieve the event with the given id.  The response is json formatted as follows:

{
    "eventNote": description of the event,
    "eventId": ID of the event,
    "completed": boolean indicating if event is complete,
    "date": a string in the format YYYYMMDD representing the date of the event
}

DELETE: delete the event.  The response is empty

/event/(date)

where date is a string in the format YYYYMMDD

POST: create a new event on the given date, request body must contain json in the following form:

{
    "eventNote": description of the event
}

the reponse contains the id of the new event as text`

module.exports = doc(docString)