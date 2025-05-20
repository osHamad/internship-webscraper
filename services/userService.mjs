import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt';

const prisma = new PrismaClient()

export async function createMasterUser(username, email, password) {
    await prisma.user.deleteMany({
        where: { role: "MASTER" }
    })

    const hashedPassword = await hash(password, 12)

    const newMaster = await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: hashedPassword,
            role: "MASTER"
        }
    });

    return newMaster;
}