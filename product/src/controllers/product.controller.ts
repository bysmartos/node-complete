
import { Response, Request } from "express";
import { Product } from "../models/product.model";

const productController = {
  getProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.find();

      return res.status(200).json({
        msg: "Products finded",
        products,
      });
    } catch (err:any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getProduct: async (req: Request, res: Response) => {
    try {
      const id = req.params.productid;
      console.log(id)
      const product = await Product.findById(id);

      return res.status(200).json({
        msg: "Product finded",
        product,
      });
    } catch (err:any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default productController;