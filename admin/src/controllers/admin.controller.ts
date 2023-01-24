import { Cart } from "../models/cart.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { User } from "../models/user.model";
import { Response, Request, NextFunction } from "express";
import IProduct from "../models/interfaces/product.interface"

const adminController = {

  //POST  create new product
  postProduct: async (req: Request, res: Response) => {
    try {
      const { title, desc, img, price }: IProduct = req.body;
      const newProduct = new Product({
        title: title,
        desc: desc,
        img: img,
        price: price,
      });
      await newProduct.save();

      return res.status(200).json({
        msg: "Product saved",
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },


  //PUT  edit product
  editProduct: async (req: Request, res: Response) => {
    try {
      const { title, desc, img, price }: IProduct = req.body;

      const product = await Product.findOneAndUpdate(
        { _id: req.params.productid },
        {
          title,
          desc,
          img,
          price,
        }
      );

      return res.status(200).json({
        msg: "Product update",
        newPost: product,
      });
    } catch (err:any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //DELETE product
  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const prodId= req.params.productid
      const post = await Product.findOneAndDelete({
        _id: prodId,
      });
     const carts =await Cart.find()
     carts.forEach(cart => {
      const cartWithProduct=cart.products.find(p => p.productId.toString() === prodId.toString() )
      if (cartWithProduct) {
       const updatedCart = cart.products.filter(p => p.productId.toString() !== prodId.toString())
        cart.products = updatedCart;
        return cart.save()
      } else {
        next()
      }
     })
        

      return res.json({
        msg: "Product deleted",
      });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  
  //PUT edit order
  putOrder: async (req: Request, res: Response) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.orderid,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err: any) {
      res.status(500).json(err);
    }
  },
  
  //DELETE order
  deleteOrder: async (req: Request, res: Response) => {
    try {
      await Order.findByIdAndDelete(req.params.orderid);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  
  //GET users
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET orders
  getOrders: async (req: Request, res: Response) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET carts
  getCarts: async (req: Request, res: Response) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

export default adminController;
