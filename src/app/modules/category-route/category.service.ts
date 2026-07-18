import { prisma } from "../../../lib/prisma"
import { updateCategory } from "../../../types/updateCategory";

const createCategory = async(name: string) =>{
    return prisma.mealCategory.create({
        data: {name},
    });
};


const getAllCategory = async() => {
    const categories = await prisma.mealCategory.findMany({});
    const totalCategory= await prisma.mealCategory.count();
    return {
        total: totalCategory,
        data: categories
    }
}


const getSingleCategory = async (categoryId: string) => {
    return await prisma.mealCategory.findUnique({
        where: {id: categoryId}
    })
}


const updateCategoy = async(categoryId: string, updateData: updateCategory) =>{
    const isExistCategory = await prisma.mealCategory.findFirst({where: {id: categoryId}});
    if(!isExistCategory){throw new Error ("selected category is not exists")};
    return await prisma.mealCategory.update({
        where: {id: categoryId},
        data: updateData
    })
}

const deleteCategory = async(categoryId: string) =>{
    const isExistCategory = await prisma.mealCategory.findFirst({where: {id: categoryId}});
    if(!isExistCategory) {throw new Error ("selected category is not exists")}
    return await prisma.mealCategory.delete({where: {id: categoryId}})
}


export const categoryService = {
    createCategory, getAllCategory, getSingleCategory, updateCategoy, deleteCategory, 
} 