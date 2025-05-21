export function isLoggedIn(req, res, next) {
    if (!req.session.login) return res.json({ message: "user is logged out"})
    next()
}

export function isLoggedOut(req, res, next) {
    if (req.session.login) return res.json({ message: "user is logged in"})
    next()
}