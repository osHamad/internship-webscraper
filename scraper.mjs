import puppeteer from 'puppeteer';

// targetPath: the web page where the job listings are
// linkClass: the name of the css class that contains the url to the application
// titleClass: the name of the css class that contains the title of the position. null by default. if null, then use linkClass for both
// iframeClass: the name of the iframe's css class/id, if there is one. This is only required if an iframe is used (like in iCIMS) 
export async function scraper(targetPath, linkClass, titleClass=null, iframeClass=null) {
  let browser = null
  try {
    
    // Launch browser and open a browser page (chrome)
    browser = await puppeteer.launch({ headless: "new" });  // Use param: { headless: false } to see the actual page rendering
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
    await page.waitForSelector(linkClass, { timeout: 5000 });
    const jobLinks = await page.$$(linkClass);

    let jobTitles;
    if (titleClass) {
      await page.waitForSelector(titleClass);
      jobTitles = await page.$$(titleClass); 
    } else {
      jobTitles = jobLinks
    }


    // Store results into an array
    let results = []

    // Loop over all the elements that were returned
    for (let i = 0; i < jobLinks.length; i++) {
      // Get the title of each job, as well as the URL to the application page
      const title = await jobTitles[i].evaluate(el => el.textContent?.trim());
      const link = await jobLinks[i].evaluate(el => el.href?.trim());

      // Add to result
      results.push({ title: title, link: link })
    }

    console.log('successfully scraped: ', targetPath)
    return results
  
  } catch(e) {
    console.log(`Error occured while scraping (${targetPath}): ${e}`)
  } finally {
    // close browser
    if (browser) await browser.close();
  }
}