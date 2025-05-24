import express from 'express';
import * as companyService from '../services/companyService.mjs';
import { hasPermission } from "../middleware/user.mjs"

const router = express.Router();

router.post('/add-one', hasPermission("add.company"), async (req, res) => {
    const company = req.body.company;
    const newCompany = await companyService.addOne(company);
    res.json(newCompany);
});

router.post('/add-many', hasPermission("add.company"), async (req, res) => {
    const companies = req.body;
    const newCompanies = await companyService.addMany(companies);
    res.json(newCompanies);
});

router.get('/get-all', async (req, res) => {
    const companies = await companyService.getAll();
    res.json(companies)
})

router.post('/delete-one', hasPermission("delete.company"), async (req, res) => {
    const companyId = req.body.id;
    const deletedCompany = await companyService.deleteOne(companyId);
    res.json(deletedCompany);
})

router.post('/update-one', hasPermission("update.company"), async (req, res) => {
    const company = req.body;
    const updatedCompany = companyService.updateOne(
        company.id, 
        company.name, 
        company.location, 
        company.jobBoard, 
        company.linkClass, 
        company.titleClass, 
        company.iframeClass
    );
    res.json(updatedCompany);
})

export default router;