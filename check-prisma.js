
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const dmmf = await prisma._getDmmf()
    const transactionModel = dmmf.datamodel.models.find(m => m.name === 'Transaction')
    const proofField = transactionModel.fields.find(f => f.name === 'proof')

    if (proofField) {
        console.log('✅ Field "proof" exists in Transaction model')
    } else {
        console.error('❌ Field "proof" DOES NOT exist in Transaction model')
        process.exit(1)
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
