import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('home');
})

export default router;