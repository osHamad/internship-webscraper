import express from 'express';

const router = express.Router();

router.get('/add-company', async (req, res) => {
    res.render('addCompany');
})

router.get('/modify-companies', async (req, res) => {
    res.render('modifyCompanies');
})

export default router;