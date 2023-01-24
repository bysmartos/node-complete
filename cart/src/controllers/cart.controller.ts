import { Cart } from "../models/cart.model";
import { Response, Request } from "express";
import ICart from "../models/interfaces/cart.interface"


const cartCtrl = {
  getCart: async (req: Request, res: Response) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });

      res.status(200).json(cart);
    } catch (err: any) {
      res.status(500).json(err);
    }
  },
  postCart: async (req: Request, res: Response) => {
    try {
      const { userId, item }:ICart = req.body;

      const cart = await Cart.findOne({ userId: userId });

      if (cart) {
        const cartProductIndex: any = cart.products.find(
          (prod) => prod.productId.toString() === item[0].productId.toString()
        );

        if (cartProductIndex) {
          //product exists in the cart, update the quantity
        const productItem = cartProductIndex
        
        productItem.quantity =  item[0].quantity + productItem.quantity;
        console.log(productItem.quantity)
        cart.products[cartProductIndex] = productItem;
        } else {
          cart.products.push({
            productId: new Object(item[0].productId),
            quantity: item[0].quantity,
          });
        }
        const savedCart = await cart.save();
        return res.status(201).send(savedCart);
      } else {
        //no cart for user, create new cart
        const newCart = new Cart({ userId: userId, products: item });
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteProductCart: async (req: Request, res: Response) => {
    try {
      const productId = req.params.productid;
      const userId = req.body.userId
      const cart: any = await Cart.findOne({ userId: userId });
      const updatedCartItems = cart.products.filter((prod: any) => {
         prod.productId.toString() !== productId.toString();
      })
      cart.products = updatedCartItems
      cart.save()
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteCart: async (req: Request, res: Response) => {
    try {
      await Cart.findByIdAndDelete(req.params.cartid);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default cartCtrl;
