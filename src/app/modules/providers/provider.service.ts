import { ProviderProfileStatus } from "../../../generated/enums"
import { prisma } from "../../../lib/prisma"

const getAllProviders = async () => {
    return await prisma.providerProfile.findMany({
        include: {
            user: true,
        }
    })
}

const getSingleProvider = async (providerId: string) => {
    const isExistPoriver = await prisma.providerProfile.findFirst({ where: { id: providerId } })
    if (!isExistPoriver) throw new Error("provider is not exists")
    return await prisma.providerProfile.findUnique({
        where: { id: providerId },
        include: { user: true }
    })
}


const createProvider = async (userId: string, businessName: string, phone: string, address: string) => {
    return await prisma.providerProfile.create({
        data: {
            userId,
            businessName,
            phone,
            address
        }
    })
}

const getProviderMeals = async (providerId: string) => {
    const isExistPoriver = await prisma.providerProfile.findFirst({ where: { id: providerId } })
    if (!isExistPoriver) throw new Error("provider is not exists")
    return await prisma.meal.findMany({ where: { providerId } })
}


const updateProviders = async (providerId: string, status: ProviderProfileStatus) => {
    const isExistPoriver = await prisma.providerProfile.findFirst({ where: { id: providerId } })
    if (!isExistPoriver) throw new Error("provider is not exists")

    return await prisma.providerProfile.update({
        where: { id: providerId },
        data: { status },
    })
}

export const providerService = {
    getAllProviders,
    createProvider,
    getSingleProvider,
    getProviderMeals,
    updateProviders,
}