import express from 'express';
import companyRouter from './routes/companyRouter.mjs'

// Create express server and define env variables
const app = express();
const PORT = process.env.PORT || 3000

// Use required middleware
app.use(express.json());

// Add routers
app.use('/company', companyRouter);

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
})