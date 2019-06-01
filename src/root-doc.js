const doc = require('./doc')

const docString = 
`The following endpoints are available:

/event
/complete
/date

Navigate to them for documentation`

module.exports = doc(docString)