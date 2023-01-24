import { Order } from "../models/order.model";
import { Response, Request } from "express";


const orderController = {
  getUserOrders: async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
  },

  postOrder: async (req: Request, res: Response) => {
    const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
  }
};

export default orderController;
