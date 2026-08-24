import { updateUser } from "better-auth/api";
import { Prisma } from "../../../generated/client";
import { prisma } from "../../../lib/prisma";

const createProviderApplication = async (applicantData: Prisma.providerApplicationCreateInput) => {
    const userId = applicantData.user?.connect?.id;
    if (!userId) { throw new Error("Missing user connection id") }
    const isExistUser = await prisma.user.findFirst({ where: { id: userId } });
    if (!isExistUser) { throw new Error("your provided userId is not exist in user collection") }

    // user can have only one application 
    const existingApplication =
        await prisma.providerApplication.findUnique({ where: { userId } })
    if (existingApplication) throw new Error("provider application already exist")
    return await prisma.providerApplication.create({
        data: applicantData
    })
}
const getAllProviderApplications = async () => {
    return await prisma.providerApplication.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}



const approveBeProviderApplication = async (applicationId: string) => {
    return await prisma.$transaction(async (tx) => {

        // Find application
        const application =
            await tx.providerApplication.findUnique({
                where: { id: applicationId }
            })
        if (!application) throw new Error("provider application not found");

        // Application must be pending
        if (application.status !== "PENDING") throw new Error(`Applicaton is already ${application.status.toLowerCase()}`)

        // Check user
        const user = await tx.user.findUnique({ where: { id: application.userId } })

        if (!user) throw new Error("User not found");

        // User is already provider
        if (user.role === "PROVIDER") throw new Error("provider profile already exists");

        // Change user role
        const updatedUser = await tx.user.update({
            where: { id: application.userId },
            data: { role: "PROVIDER" }
        })

        // create provider profile 
        const providerProfile =
            await tx.providerProfile.create({
                data: {
                    userId: application.userId,
                    businessName: application.businessName,
                    phone: application.phone,
                    address: application.address,
                }
            });
        // Mark application as approved
        const updateApplication =
            await tx.providerApplication.update({
                where: { id: application.id },
                data: { status: "APPROVED" }
            })
        return {
            user: updateUser,
            providerProfile,
            application: updateApplication,
        }
    })
}

export const providerApplicationService = {
    createProviderApplication,
    approveBeProviderApplication,
    getAllProviderApplications,
}