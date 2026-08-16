export interface createOrderType{
    userId: string,
    orderData: {
        address: string,
        items: {
            mealId: string,
            quantity: number,
        }[]
    }
}