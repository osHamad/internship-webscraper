import express from 'express';
import * as companyService from '../services/companyService.mjs';

const router = express.Router();

router.post('/add-one', async (req, res) => {
    const company = req.body.company;
    const newCompany = await companyService.addOne(company);
    res.json(newCompany);
});

router.post('/add-many', async (req, res) => {
    const companies = req.body.companies;
    const newCompanies = await companyService.addMany(companies);
    res.json(newCompanies);
});

router.get('/get-all', async (req, res) => {
    const companies = await companyService.getAll();
    res.json(companies)
})

export default router;