import express from 'express';
import { hasPermission, isLoggedOut } from '../middleware/user.mjs';

const router = express.Router();

router.get('/add-company', hasPermission("view.admin-pages"), (req, res) => {
    res.render('addCompany');
})

router.get('/modify-companies', hasPermission("view.admin-pages"), (req, res) => {
    res.render('modifyCompanies');
})

router.get('/dashboard', hasPermission("view.admin-pages"), (req, res) => {
    res.render('adminDashboard')
})

router.get("/login", isLoggedOut, (req, res) => {
    res.render("adminLogin")
})

router.get("/", hasPermission("view.admin-pages"), (req, res) => {
    res.redirect("/admin/dashboard")
})

export default router;