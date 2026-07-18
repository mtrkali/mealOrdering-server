import { Prisma } from "../../../generated/client";
import { prisma } from "../../../lib/prisma";
import { ProviderInput } from "../../../types/providerInput.type";

const createProviderApplication = async(applicantData: Prisma.providerApplicationCreateInput)=>{
    const userId = applicantData.user?.connect?.id;
    if (!userId) {throw new Error("Missing user connection id")}
    const isExistUser = await prisma.user.findFirst({ where: { id: userId } });
    if(!isExistUser) {throw new Error ("your provided userId is not exist in user collection")}
    return await prisma.providerApplication.create({
        data: applicantData
    })
}


const approveBeProviderApplication = async(providerData: ProviderInput)=> { 
    return await prisma.$transaction(async(tx) =>{
        const userId = providerData.userId as string
        if (typeof userId !== "string" || userId.trim().length === 0) { throw new Error("Missing userId")}
        const user = await tx.user.update({
            where: { id: userId },
            data: { role: "PROVIDER"}
        })
    
    const isExistProfile = await tx.providerProfile.findFirst({where: {userId}})
    if(isExistProfile){throw new Error ("provider already in exists")}
    const providerProfile = await tx.providerProfile.create({
       data: {
         userId,
        ...providerData
       }
    })
    return {
        user,
        providerProfile,
    }

    })
}
export const providerApplicationService = {
    createProviderApplication,
    approveBeProviderApplication,
}