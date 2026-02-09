import { PrismaClient } from ".prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import path from "path"

// Use absolute path to database file
const dbPath = path.join(process.cwd(), "prisma", "dev.db")

const adapter = new PrismaLibSql({
  url: `file:${dbPath}`,
})

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
