import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcrypt';
import { generateToken } from '../utils/jwts.mjs';

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

export async function login(usernameOrEmail, password) {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: usernameOrEmail },
                { username: usernameOrEmail }
            ]
        }
    })

    if (!user) {console.log("404");return { error: 404 };}

    const samePassword = await compare(password, user.password)
    if (!samePassword) {console.log("403");return { error: 403 }}


    const token = generateToken({ userId: user.id });

    return { token: token }
}
