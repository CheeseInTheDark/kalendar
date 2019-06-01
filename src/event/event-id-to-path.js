const path = require('path')
const settings = require('../settings')

module.exports = function eventIdToPath(eventId) {
    const dateDirName = eventId.substr(0, 8)
    const dateDir = path.join(settings.get().dataDirectory, dateDirName)
    return path.join(dateDir, eventId.substr(8))
}