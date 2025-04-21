import puppeteer from 'puppeteer';

// TODO:  Right now, this only scrapes the first result page
//        If there are multiple pages, only page 1 is scraped

export async function genericScraper(targetPath, jobClass) {
  
  // Launch browser and open a browser page (chrome)
  const browser = await puppeteer.launch();  // Use param: { headless: false } to see the actual page rendering
  const page = await browser.newPage();

  // Go to a specific job site on workday
  // Example: 'https://earlyaccess.dayforcehcm.com/CandidatePortal/en-US/rossvideo'
  await page.goto(targetPath, {
    waitUntil: 'domcontentloaded',  // wait until DOM loaded
  });

  // Set page size of the browser (wont be visible, but important for consistency)
  await page.setViewport({ width: 1080, height: 1024 });

  // wait for the selector jobclass to be visible
  await page.waitForSelector(jobClass);

  // Grab all elements with that class
  const jobElements = await page.$$(jobClass);

  // Loop over all the elements that were returned
  for (const job of jobElements) {
    // Get the title of each job, as well as the URL to the application page
    const title = await job.evaluate(el => el.textContent?.trim());
    const link = await job.evaluate(el => el.href?.trim());

    // For now, we are only printing to console
    console.log(title);
    console.log(link)
  }

  // close the browser page
  await browser.close();
}