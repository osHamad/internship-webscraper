import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('https://nxp.wd3.myworkdayjobs.com/careers', {
  waitUntil: 'domcontentloaded',
});

await page.setViewport({ width: 1080, height: 1024 });

// Wait for at least one element with that class to exist
await page.waitForSelector('.css-19uc56f');

const jobElements = await page.$$('.css-19uc56f');

for (const job of jobElements) {
  const title = await job.evaluate(el => el.textContent?.trim());
  const link = await job.evaluate(el => el.href?.trim());
  console.log(title);
  console.log(link)
}

await browser.close();
