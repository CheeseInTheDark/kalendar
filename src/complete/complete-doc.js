const doc = require('../doc')

const docString =
`/complete endpoints:

/complete/(eventId)

where eventId is a number which identifies a previously-created event

PUT: Marks the given event as completed.  The reponse is empty`

module.exports = doc(docString)