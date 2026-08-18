import { prisma } from "../../../lib/prisma"
import type { updateCategory as updateCategoryType } from "../../../types/updateCategory";

const createCategory = async (name: string) => {
    const categoryName = name?.trim();
    if (!categoryName) throw new Error("Category name required");
    const existingCategory =
        await prisma.mealCategory.findFirst({
            where: {
                name: {
                    equals: categoryName,
                    mode: "insensitive",
                }
            }
        });
    if (existingCategory) throw new Error("Category already exists");;

    return prisma.mealCategory.create({
        data: { name: categoryName }
    });
};


const getAllCategory = async () => {
    return await prisma.mealCategory.findMany({
        orderBy: { name: "asc" }
    });
}


const getSingleCategory = async (categoryId: string) => {
    const category = await prisma.mealCategory.findUnique({
        where: { id: categoryId }
    })
    if (!category) throw new Error("Category not found");
    return category;
}


const updateCategory = async (categoryId: string, updateData: updateCategoryType) => {
    const isExistCategory = await prisma.mealCategory.findUnique({ where: { id: categoryId } });
    if (!isExistCategory) { throw new Error("selected category is not exists") };
    const name = updateData.name?.trim();
    if (!name) throw new Error("Category name required");

    // prevent duplicate category name
    const duplicateCategory =
        await prisma.mealCategory.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: "insensitive",
                },
                NOT: {
                    id: categoryId,
                }
            }
        })
    if (duplicateCategory) throw new Error("Category already exists");
    return await prisma.mealCategory.update({
        where: { id: categoryId },
        data: { name, }
    })
};

const deleteCategory = async (categoryId: string) => {
    const isExistCategory = await prisma.mealCategory.findUnique({ where: { id: categoryId } });
    if (!isExistCategory) { throw new Error("selected category is not exists") }

    // Check whether meals are using this category
    const mealCount = await prisma.meal.count({ where: { categoryId } })
    if (mealCount > 0) throw new Error(`Cannot delete this category because ${mealCount} meals are using it.`)
    return await prisma.mealCategory.delete({ where: { id: categoryId } })
}


export const categoryService = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
} 