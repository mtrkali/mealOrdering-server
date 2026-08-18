import { Prisma } from "../../../generated/client";
import { prisma } from "../../../lib/prisma";

const getAllMeals = async (query: any) => {
    const { cuisine, dietary, minPrice, maxPrice, providerId } = query;
    const whereCondition: any = {}
    if (cuisine) whereCondition.cuisine = cuisine;
    if (dietary) whereCondition.dietary = { hasSome: Array.isArray(dietary) ? dietary : [dietary] };
    if (minPrice || maxPrice) {
        whereCondition.price = {};
        if (minPrice) whereCondition.price.gte = Number(minPrice);
        if (maxPrice) whereCondition.price.lte = Number(maxPrice);
    }
    if (providerId) whereCondition.providerId = providerId;
    return await prisma.meal.findMany({
        where: whereCondition,
        include: {
            provider: true,
            category: true,
        }
    });
}

const getMealById = async (id: string) => {
    return await prisma.meal.findUnique({
        where: { id },
        include: {
            provider: true,
            category: true,
        },
    });
}


const createMeal = async (data: Prisma.MealCreateInput | any, userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId }
    })
    if (!provider) { throw new Error("provider not found") }

    // request body data validation
    const { providerId, id, createdAt, updatedAt, ...mealData } = data;

    if (!mealData.title) throw new Error("Meal title is required");
    if (mealData.price === undefined || Number(mealData.price) < 0) throw new Error("valid meal price required");
    if (!mealData.categoryId) throw new Error("Category is required");


    const result = await prisma.meal.create({
        data: {
            ...mealData,
            price: Number(mealData.price),
            providerId: provider.id,
        }
    })
    return result;
}

const updateMeal = async (
    mealId: string,
    data: Prisma.MealUpdateInput | any,
    userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });
    if (!provider) throw new Error("provider not found")
    const meal = await prisma.meal.findUnique({ where: { id: mealId } });
    if (!meal) throw new Error("Meal not found");
    if (meal.providerId !== provider.id) throw new Error("your are not authorized to update this meal");

    const { providerId, id, createdAt, updatedAt, ...mealData } = data;
    if (mealData.price !== undefined && Number(mealData.price) < 0) throw new Error("price cannot be negative");

    return prisma.meal.update({
        where: { id: mealId },
        data: {
            ...mealData,
            ...(mealData.price !== undefined && { price: Number(mealData.price), }),
        },
    })
}


const deleteMeal = async (mealId: string, userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });

    if (!provider) { throw new Error("provider not found") };

    const meal = await prisma.meal.findUnique({
        where: { id: mealId },
    });

    if (!meal) {
        throw new Error("Meal not found");
    }

    if (meal.providerId !== provider.id) {
        throw new Error(
            "You are not authorized to delete this meal"
        );
    }

    return prisma.meal.delete({
        where: { id: mealId },
    });

};

const getMyMeals = async (userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });

    if (!provider) { throw new Error("provider not found") }

    //total meals of the provider
    return await prisma.meal.findMany({
            where: { providerId: provider.id },
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });
}


export const mealService = {
    getAllMeals,
    getMealById, 
    createMeal, 
    updateMeal, 
    deleteMeal, 
    getMyMeals
}