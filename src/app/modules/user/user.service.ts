
import { Prisma } from "../../../generated/client";
import { UserUpdateInput } from "../../../generated/models";
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


const getMyProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            role: true,
            status: true,
            createdAt: true,
        }
    })
    if (!user) throw new Error("user not found!")
    return user;
}

const updateMyProfile = async (
    userId: string,
    updateData: {
        name: string,
        phone: string,
        image: string
    }) => {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error("user not found!");
    const data: UserUpdateInput = {}
    if (updateData.name !== undefined) {
        const name = updateData.name.trim();
        if (!name) throw new Error("Name connot empty")
        data.name = name;
    }
    if (updateData.phone !== undefined) data.phone = updateData.phone.trim();
    if (updateData.image !== undefined) data.image = updateData.image.trim();

    return await prisma.user.update({
        where: { id: userId },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            role: true,
            status: true,
        }
    })
}

export const userService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    updateMyProfile,
    getMyProfile,
}