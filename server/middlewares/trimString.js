function trimString(req, res, next) {
    if (req.body && typeof req.body === 'object') {
        for (let key in req.body) {
            const el = req.body[key]
            if (typeof el === 'string') {
                req.body[key] = el.trim()
            }
        }
    }
    next()
}

module.exports = trimString