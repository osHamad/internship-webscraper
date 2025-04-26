import { scraper } from "../scraper.mjs";
import companyService from "./companyService.mjs";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


// model Listing {
//     id            Int         @id @default(autoincrement())
//     title         String
//     company       String
//     link          String      @unique
//     addedAt       DateTime    @default(now())
//   }


export async function scrapeAllJobs() {
    const allCompanies = await companyService.getAll();
    let listingResult = [];

    for (let company of allCompanies) {
        const scraperResults = await scraper(company.jobBoard, company.linkClass, company.titleClass, company.iframeClass)
        for (let listing in scraperResults) {
            listing.company = company.name;
            listingResult.push(listing);
        }
    }

    return listingResult;
}

export async function addManyUnique(listings) {
    const newListings = await prisma.listing.createMany({
        data: listings,
        skipDuplicates: true
    });
    return newListings;
}
