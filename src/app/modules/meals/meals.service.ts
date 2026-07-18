import { Prisma } from "../../../generated/client";
import { prisma } from "../../../lib/prisma";

const getAllMeals = async (query: any) => {
    const {cuisine, dietary, minPrice, maxPrice, providerId} = query;
    const whereCondition: any  = {}
    if(cuisine) whereCondition.cuisine = cuisine;
    if(dietary) whereCondition.dietary = {hasSome: Array.isArray(dietary) ? dietary : [dietary]};
    if(minPrice || maxPrice){
        whereCondition.price = {};
        if(minPrice) whereCondition.price.gte = Number(minPrice);
        if(maxPrice) whereCondition.price.lte = Number(maxPrice);
    }
    if(providerId) whereCondition.providerId = providerId;
    return await prisma.meal.findMany({
       where: whereCondition,
       include: {
        provider: true,
        category: true,
       }
    });
}

const getMealById = async(id: string) =>{
    return await prisma.meal.findUnique({
        where: {id},
        include: {
            provider: true,
            category: true,
        },
    });
}


const createMeal = async( data: Prisma.MealCreateInput | any, userId:string ) => {
    const provider = await prisma.providerProfile.findUnique({
        where: {userId: userId}
    })
    if(!provider){throw new Error ("provider not found")}

    const result = await prisma.meal.create({
        data: {
            ...(data as any),
            providerId: provider.id,
        }
    })
    return result ;
}

const updateMeal = async (
    mealId: string, 
    data: Prisma.MealUpdateInput | any, 
    userId: string) => {
const provider = await prisma.providerProfile.findUnique({
    where: {userId},
});
if(!provider){
    throw new Error ("provider not found")
}
const meal = await prisma.meal.findUnique({
    where: {id: mealId},
});
if(!meal || meal.providerId !== provider.id){throw new Error ("Unathorized")}

return prisma.meal.update({
    where: {id: mealId},
    data: data,
})
}


const deleteMeal = async (mealId: string, userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: {userId},
    });

    if(!provider) {throw new Error("provider not found")};
    
    const meal = await prisma.meal.findUnique({
        where: {id: mealId},
    });

    if(!meal || meal.providerId !== provider.id){throw new Error("Unauthorized")}

    return prisma.meal.delete({
        where: {id: mealId},
    });

};

const getMyMeals = async (userId: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: {userId},
    });

    if(!provider){throw new Error("provider not found")}

    //total meals of the provider
    const totalMeals = await prisma.meal.count({where: {providerId: provider.id}});
    
    return { 
        totalMeals,
        meals: await prisma.meal.findMany({
            where: {providerId: provider.id},
        }),
     };
    
}


export const mealService = {
    getAllMeals, getMealById, createMeal, updateMeal, deleteMeal, getMyMeals 
}