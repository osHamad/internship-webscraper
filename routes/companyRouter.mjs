import express from 'express';
import { getAll, addMany, addOne } from '../services/companyService.mjs';

const router = express.Router();

router.post('/add-one', async (req, res) => {
    const company = req.body.company;
    const newCompany = await addOne(company);
    res.json(newCompany);
});

router.post('/add-many', async (req, res) => {
    const companies = req.body.companies;
    const newCompanies = await addMany(companies);
    res.json(newCompanies);
});

router.get('/get-all', async (req, res) => {
    const companies = await getAll();
    res.json(companies)
})

export default router;