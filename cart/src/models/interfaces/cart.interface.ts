export default interface ICart {
    userId: string
    item: [{ productId: string, quantity: number }]
}