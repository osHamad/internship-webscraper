import express from 'express';

const router = express.Router();

router.get('/add-company', async (req, res) => {
    res.render('addCompany');
})

export default router;