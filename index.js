// Import node modules
import express from 'express';
import cron from 'node-cron';
import path from 'path'

// Import express routers
import companyRouter from './routes/companyRouter.mjs'
import listingRouter from './routes/listingRouter.mjs'
import clientRouter from './routes/clientRouter.mjs'
import adminRouter from './routes/adminRouter.mjs'

// Import utils/services/misc
import * as scraperService from './services/scraperService.mjs';
import { __dirname } from './utils/paths.mjs'

// Create express server and define env variables
const app = express();
const PORT = process.env.PORT || 3000

// Configure ejs views
app.set('view engine', 'ejs')

// Use parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a static directory for public files (js, css, etc)
app.use(express.static('public'));

// Add routers
app.use('/admin', adminRouter);
app.use('/company', companyRouter);
app.use('/listing', listingRouter);
app.use('/', clientRouter);

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