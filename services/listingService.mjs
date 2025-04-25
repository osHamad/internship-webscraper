import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function addMany(listings) {
    const newListings = await prisma.listing.createMany({
        data: listings
    });
    return newListings;
}

export async function getAll() {
    const listings = await prisma.listing.findMany();
    return listings;
}

export async function getByCompany(name) {
    const listings = await prisma.listing.findMany({
        where: {
            name: name
        }
    });
    return listings;
}

export async function getByDate(date) {
    const listings = await prisma.listing.findMany({
        where: {
            addedAt: {
                gt: new Date(date)
            }
        }
    });
    return listings;
}

export async function getByCompanyAndDate(name, date) {
    const listings = await prisma.listing.findMany({
        where: {
            name: name,
            addedAt: {
                gt: new Date(date)
            }
        }
    });
    return listings;
}