import { PrismaClient } from "@prisma/client"
import { verifyToken } from "../utils/jwts.mjs"

const prisma = new PrismaClient()

export function isLoggedIn(req, res, next) {
    if (!req.session.login) return res.json({ message: "user is logged out"})
    next()
}

export function isLoggedOut(req, res, next) {
    if (req.session.login) return res.json({ message: "user is logged in"})
    next()
}

export function hasPermission(permission) {
    return async function(req, res, next) {
        if (!req.session.login) return res.json({ message: "user is not authorized" })

        const permissions = {
            "MASTER": new Set([]),
            "ADMIN": new Set([]),
            "USER": new Set([])
        }

        const verifiedToken = verifyToken(req.session.login.token)

        const user = await prisma.user.findUnique({
            where: {
                id: verifiedToken.userId
            }
        })

        const role = user.role

        if (!permissions[role].has(permission)) return res.json({message: "user is not authorized"})
        
        next()
    }
}