// Import node modules
import express from 'express';
import cron from 'node-cron';
import session from 'express-session';

// Import express routers
import companyRouter from './routes/companyRouter.mjs'
import listingRouter from './routes/listingRouter.mjs'
import clientRouter from './routes/clientRouter.mjs'
import adminRouter from './routes/adminRouter.mjs'
import userRouter from './routes/userRouter.mjs'

// Import utils/services/misc
import * as scraperService from './services/scraperService.mjs';
import { __dirname } from './utils/paths.mjs'
import { createMasterUser } from './services/userService.mjs';
import { getEnvOrThrow } from './utils/helpers.mjs';

// Create express server and define env variables
const app = express();
const PORT = process.env.PORT || 3000
const MASTER_EMAIL = getEnvOrThrow(process.env.MASTER_EMAIL)
const MASTER_PASSWORD = getEnvOrThrow(process.env.MASTER_PASSWORD)
const MASTER_USERNAME = getEnvOrThrow(process.env.MASTER_USERNAME)
const SESSION_SECRET = getEnvOrThrow(process.env.SESSION_SECRET)
const NODE_ENV = getEnvOrThrow(process.env.NODE_ENV)

// Configure ejs views
app.set('view engine', 'ejs')

// Use parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up cookie session
app.set('trust proxy', 1)
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: NODE_ENV === 'PRODUCTION' }
}))

// Add a static directory for public files (js, css, etc)
app.use(express.static('public'));

// Add routers
app.use('/user', userRouter)
app.use('/admin', adminRouter);
app.use('/company', companyRouter);
app.use('/listing', listingRouter);
app.use('/', clientRouter);

// REMOVE LATER
app.get('/test', (req, res)=>{res.render('test')})

// Schedule webscrape task
// Runs every day at midnight
cron.schedule('0 0 * * *', async () => {
  const allJobs = await scraperService.scrapeAllJobs();
  const addedJobs = await scraperService.addManyUnique(allJobs);
  console.log('jobs added: ', addedJobs);
})

// Create master admin account
createMasterUser(
  MASTER_USERNAME,
  MASTER_EMAIL,
  MASTER_PASSWORD
)

// Start server
app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
})