
import { Prisma } from "../../../generated/client";
import { prisma } from "../../../lib/prisma"

const getAllUsers = async () => {
    return await prisma.user.findMany();

}

const getSingleUser = async (id: string) => {
    return await prisma.user.findUnique({ where: { id } })
}

const updateUser = async (id: string, updateData: Prisma.UserUpdateInput) => {
    const isExistUser = await prisma.user.findFirst({ where: { id } })
    if (!isExistUser) { throw new Error("user is not exists") }


    return await prisma.user.update({
        where: { id },
        data: updateData,
    })
}

const deleteUser = async (id: string) => {
    const isExistUser = await prisma.user.findUnique({ where: { id } })
    if (!isExistUser) { throw new Error("user is not exist in DB") }

    const orderCount = await prisma.order.count({
        where: { userId: id }
    })

    if (orderCount) {
        throw new Error(
            "This user cannot be deleted because they have existion orders. Please Inactive the user instead"
        )
    }

    return await prisma.user.delete({ where: { id } })
}


export const userService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}