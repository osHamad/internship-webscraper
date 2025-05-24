import { PrismaClient } from "@prisma/client"
import { verifyToken } from "../utils/jwts.mjs"

const prisma = new PrismaClient()

export function isLoggedIn(req, res, next) {
    if (!req.session.login) {
        switch (req.method) {
            case "POST":
                return res.json({ message: "user is logged out"})

            case "GET":
                return res.send("you are logged out")
        }
    }
    next()
}

export function isLoggedOut(req, res, next) {
    if (req.session.login) {
        switch (req.method) {
            case "POST":
                return res.json({ message: "user is already logged in"})

            case "GET":
                return res.redirect("/")
        }
    }
    next()
}

export function hasPermission(permission) {
    return async function(req, res, next) {
        if (!req.session.login) {
            switch (req.method) {
                case "POST":
                    return res.json({ message: "user is not logged in" })
            
                case "GET":
                    return res.redirect("/admin/login")

                default:
                    return
            }
        }

        const permissions = {
            "MASTER": new Set(["view.admin-pages", "add.company", "delete.company", "update.company"]),
            "ADMIN": new Set(["view.admin-pages", "add.company", "delete.company", "update.company"]),
            "USER": new Set([])
        }

        const verifiedToken = verifyToken(req.session.login.token)

        const user = await prisma.user.findUnique({
            where: {
                id: verifiedToken.userId
            }
        })

        const role = user.role

        if (!permissions[role].has(permission)) {
            switch (req.method) {
                case "POST":
                    return res.json({message: "user is not authorized"})

                case "GET":
                    return res.send("403 ERROR: restricted")
            
                default:
                    break;
            }
        }
        
        next()
    }
}