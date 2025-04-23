import { scraper } from "./scraper.mjs";
import { readFile, writeFile } from 'fs/promises';

// Read the file
const rawData = await readFile('companies.json', 'utf-8');

// Parse JSON
const jsonData = JSON.parse(rawData);

let results = []



// const a = await scraper("https://fa-evmr-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/jobs?keyword=intern&lastSelectedFacet=TITLES&location=Ottawa%2C+Ontario%2C+Canada&locationId=100000018991137&locationLevel=city&mode=location&radius=25&radiusUnit=MI&selectedTitlesFacet=TRA", ".search-results > a", ".job-tile__title")

// console.log(a)

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