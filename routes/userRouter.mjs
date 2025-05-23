import express from 'express';
import * as userService from '../services/userService.mjs'
import { isLoggedIn, isLoggedOut } from '../middleware/user.mjs';

const router = express.Router();

router.post('/login', isLoggedOut, async (req, res) => {
    const usernameOrEmail = req.body.usernameOrEmail
    const password = req.body.password

    const userToken = await userService.login(usernameOrEmail, password);

    if (!userToken.error) {
        req.session.login = userToken

        res.json({ message: "logged in" })

    } else {
        res.status(400).json({ message: "incorrect password or username/email" })
    }

})

router.post('/logout', isLoggedIn, async (req, res) => {
    if (!req.session.login) return res.json({ message: "user already logged out"})

    req.session.destroy()
    res.clearCookie("connect.sid")
    res.json({ message: "logged out" })
})

export default router