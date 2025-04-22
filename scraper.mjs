import puppeteer from 'puppeteer';

// TODO:  Right now, this only scrapes the first result page
//        If there are multiple pages, only page 1 is scraped

// targetPath: the web page where the job listings are
// linkClass: the name of the css class that contains the url to the application
// titleClass: the name of the css class that contains the title of the position. null by default. if null, then use linkClass for both
export async function scraper(targetPath, linkClass, titleClass=null, iframeClass=null) {
  
  // Launch browser and open a browser page (chrome)
  const browser = await puppeteer.launch();  // Use param: { headless: false } to see the actual page rendering
  let page = await browser.newPage();

  // Go to a specific job site on workday
  // Example: 'https://earlyaccess.dayforcehcm.com/CandidatePortal/en-US/rossvideo'
  await page.goto(targetPath, {
    waitUntil: 'domcontentloaded',  // wait until DOM loaded
  });

  // Set page size of the browser (wont be visible, but important for consistency)
  await page.setViewport({ width: 1080, height: 1024 });

  // If content is stored in an iframe, redirect the page to be the iframe
  if (iframeClass) {
    await page.waitForSelector(iframeClass)
    const elementHandle = await page.$(`iframe${iframeClass}`);
    page = await elementHandle.contentFrame();
  }

  // wait for the selector jobclass to be visible
  await page.waitForSelector(linkClass);
  const jobLinks = await page.$$(linkClass);

  let jobTitles;
  if (titleClass) {
    await page.waitForSelector(titleClass);
    jobTitles = await page.$$(titleClass); 
  } else {
    jobTitles = jobLinks
  }


  // Loop over all the elements that were returned
  for (let i = 0; i < jobLinks.length; i++) {
    // Get the title of each job, as well as the URL to the application page
    const title = await jobTitles[i].evaluate(el => el.textContent?.trim());
    const link = await jobLinks[i].evaluate(el => el.href?.trim());

    // For now, we are only printing to console
    console.log("This is a title: ", title);
    console.log("This is a link: ", link)
  }

  // close the browser page
  await browser.close();
}