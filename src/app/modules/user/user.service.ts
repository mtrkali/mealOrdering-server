
import { Prisma } from "../../../generated/client";
import { UserStatus } from "../../../generated/enums";
import { prisma } from "../../../lib/prisma"

const getAllUsers = async() => {
   const users = await prisma.user.findMany();
   const totalUsers = await prisma.user.count();
   return {total: totalUsers, data: users}
}

const getSingleUser = async(id: string) =>{
    return await prisma.user.findUnique({where: {id}})
}

const updateUser = async(id: string, updateData: Prisma.UserUpdateInput) =>{
    const isExistUser = await prisma.user.findFirst({where: {id}})
    if(!isExistUser) {throw new Error ("user is not exists")}

    return await prisma.user.update({
        where: {id},
        data: updateData,
    })
}

const deleteUser = async(id: string) =>{
    const isExistUser = await prisma.user.findUnique({where: {id}})
    if(!isExistUser) {throw new Error("user is not exist in DB")}
    return await prisma.user.delete({where: {id}})
}


export const userService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
}