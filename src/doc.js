module.exports = function doc(docString) {
    return (req, res) => { 
        res.setHeader("Content-Type", "text/plain")
        res.status(200).send(docString) 
    }
}