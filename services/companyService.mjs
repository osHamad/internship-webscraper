import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function addOne(company) {
    const newCompany = await prisma.company.create({
        data: company
    });
    return newCompany;
}

export async function addMany(companies) {
    const newCompanies = await prisma.company.createMany({
        data: companies,
        skipDuplicates: true
    });
    return newCompanies;
}

export async function getAll() {
    const companies = await prisma.company.findMany();
    return companies;
}