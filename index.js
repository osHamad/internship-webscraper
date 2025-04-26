import express from 'express';
import cron from 'node-cron';
import companyRouter from './routes/companyRouter.mjs'
import listingRouter from './routes/listingRouter.mjs'
import * as scraperService from './services/scraperService.mjs';

// Create express server and define env variables
const app = express();
const PORT = process.env.PORT || 3000

// Use required middleware
app.use(express.json());

// Add routers
app.use('/company', companyRouter);
app.use('/listing', listingRouter);

// Schedule webscrape task
// Runs every day at midnight
cron.schedule('0 0 * * *', async () => {
  const allJobs = await scraperService.scrapeAllJobs();
  const addedJobs = await scraperService.addManyUnique(allJobs);
  console.log('jobs added: ', addedJobs);
})

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
})