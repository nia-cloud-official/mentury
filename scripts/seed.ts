const { PrismaClient } = require('@prisma/client')
const database = new PrismaClient()

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Engineering" },
                { name: "Business" },
                { name: "Arts" },
                { name: "Science" },
                { name: "Mathematics" },
                { name: "Social Science" },
                { name: "Computer Science" },
                { name: "Programming" },
            ]
        })
        console.info("Categories seeded successfully")
    } catch (error) {
        console.info("Error seedin the database categories", error)
    } finally {
        await database.$disconnect()    
    }
}

main()