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

export async function deleteOne(companyId) {
    const deletedCompany = await prisma.company.delete({
        where: {
            id: companyId
        }
    });
    return deletedCompany;
}

export async function updateOne(companyId, name, location, jobBoard, linkClass, titleClass, iframeClass) {
    const updatedCompany = await prisma.company.update({
        where: {
            id: companyId
        },
        data: {
            name: name,
            location: location,
            jobBoard: jobBoard,
            linkClass: linkClass,
            titleClass: titleClass,
            iframeClass: iframeClass
        }
    })
    return updatedCompany;
}