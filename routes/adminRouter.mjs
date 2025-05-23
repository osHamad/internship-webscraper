import express from 'express';
import { hasPermission, isLoggedOut } from '../middleware/user.mjs';

const router = express.Router();

router.get('/add-company', async (req, res) => {
    res.render('addCompany');
})

router.get('/modify-companies', async (req, res) => {
    res.render('modifyCompanies');
})

router.get('/dashboard', hasPermission("view.dashboard"), (req, res) => {
    res.render('adminDashboard')
})

router.get("/login", isLoggedOut, (req, res) => {
    res.render("adminLogin")
})

router.get("/", hasPermission("view.dashboard"), (req, res) => {
    res.redirect("/admin/dashboard")
})

export default router;