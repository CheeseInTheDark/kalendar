module.exports = 
`/date endpoints:

/date/(date)

where date is a string in the format YYYYMMDD

GET: retrieve the events on the given date.  The response is json formatted as follows:

{
    "events": [{
        "eventNote": description of the event,
        "eventId": ID of the event,
        "complete": boolean indicating if event is complete,
        "date": a string in the format YYYYMMDD representing the date of the event
    }, ... ],
    "date": the date string sent with the request in the format YYYYMMDD
}

DELETE: delete the events for the given date.  The response is empty

/date/(start date)-(end date)

where start date and end date are strings in the format YYYYMMDD

GET: retrieve the events for the given date range, inclusive of start and end dates.  The response is json formatted as follows:

[{
    "events": [{
        "eventNote": description of the event,
        "eventId": ID of the event,
        "complete": boolean indicating if event is complete,
        "date": a string in the format YYYYMMDD representing the date of the event
    }, ... ],
    "date": the date string for this grouping of events in YYYYMMDD
}, ... ]`