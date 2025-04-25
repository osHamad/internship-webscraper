import { scraper } from "../scraper.mjs";
import { readFile, writeFile } from 'fs/promises';
import { getAll } from "./companyService.mjs";


// model Listing {
//     id            Int         @id @default(autoincrement())
//     title         String
//     company       String
//     link          String      @unique
//     addedAt       DateTime    @default(now())
//   }


export async function scrapeAllJobs() {
    const allCompanies = await getAll();

    for (let company of allCompanies) {
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
}
