import { exit } from "process";
import { scraper } from "./scraper.mjs";
import { readFile, writeFile } from 'fs/promises';

// Read the file
const rawData = await readFile('companies.json', 'utf-8');

// Parse JSON
const jsonData = JSON.parse(rawData);

let results = []



const a = await scraper("https://careers-kinaxis.icims.com/jobs/search?ss=1&searchRelation=keyword_all&searchLocation=12955-12964-Ottawa", ".iCIMS_Anchor", ".iCIMS_Anchor h3", "https://careers-kinaxis.icims.com/jobs/search?ss=1&searchRelation=keyword_all&searchLocation=12955-12964-Ottawa&in_iframe=1")

console.log(a)
exit(1)

for (let company of jsonData) {
    let jsonResult = { name: company.name, positions: [] }
    const scraperResults = await scraper(company.jobBoard, company.linkClass, company.titleClass, company.iframeClass)
    jsonResult.positions.push(scraperResults)
    results.push(jsonResult)
}

try {
    await writeFile('output.json', JSON.stringify(results, null, 2), 'utf-8');
    console.log('Data written to output.json');
  } catch (err) {
    console.error('Error writing file:', err);
  }