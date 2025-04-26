import express from 'express';
import * as listingService from '../services/listingService.mjs'

const router = express.Router();

router.get('/get-all', async (req, res) => {
    const listings = await listingService.getAll();
    res.json(listings)
})

router.get('/get-by-company', async (req, res) => {
    const company = req.params.company
    const listings = await listingService.getByCompany(company);
    res.json(listings)
})

router.get('/get-by-date', async (req, res) => {
    const date = req.params.date
    const listings = await listingService.getByDate(date);
    res.json(listings)
})

router.get('/get-by-company-and-date', async (req, res) => {
    const company = req.params.company
    const date = req.params.date
    const listings = await listingService.getByCompanyAndDate(company, date);
    res.json(listings)
})

export default router;