import { PrismaClient, Role } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../src/config/env";
import { hashPassword } from "../src/utils/password"

const adapter = new PrismaPg({
    connectionString: env.DATABASE_URL
})

const prisma = new PrismaClient({
    adapter
});

async function main() {
    const password = await hashPassword("password123")

    await prisma.user.upsert({
        where: { username: "superadmin"},
        update: {},
        create: {
            name: "Super Admin",
            username: "superadmin",
            passwordHash: String(password),
            role: Role.SUPER_ADMIN,
        }
    });

    await prisma.user.upsert({
        where: { username: "depahead"},
        update: {},
        create: {
            name: "Deparment Head",
            username: "depahead",
            passwordHash: String(password),
            role: Role.DEPARTMENT_HEAD
        }
    });

    await prisma.user.upsert({
        where: { username: "teamleader"},
        update: {},
        create: {
            name: "Team Leader",
            username: "teamleader",
            passwordHash: String(password),
            role: Role.TEAM_LEADER
        }
    });

    await prisma.user.upsert({
        where: { username: "member"},
        update: {},
        create: {
            name: "Team Member",
            username: "member",
            passwordHash: String(password),
            role: Role.MEMBER
        }
    });
    
    await prisma.responseTeam.upsert({
        where: { team_id: "00000000-0000-0000-0000-000000000001"},
        update: {},
        create: {
            team_id: "00000000-0000-0000-0000-000000000001",
            team_name: "Alpha Team"
        }
    })

    console.log("Seed data created successfully")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })