
import { Response, Request } from "express";
import { Cart } from "../models/cart.model";
import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

const userCtrl = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userid })

      if (!user) return res.status(400).json({ msg: "El usuario no existe" });
      res.json({ user });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { username, email, password, isAdmin } =
        req.body;
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "La contraseña debe tener 6 caracteres como mínimo" });
      const passwordHash = await bcrypt.hash(password, 13);
      const newUsername = username.toLowerCase().replace(/ /g, "");



      await User.findOneAndUpdate(
        { _id: req.params.userid},
        {
          username, email,
          password: passwordHash,
          isAdmin
        }
      );

      res.json({ msg: "Updated" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await User.deleteOne({ _id: req.params.userid });
      await Cart.deleteOne({ user: req.params.id });
      await Order.deleteMany({ user: req.params.userid });
      if (!user) return res.status(400).json({ msg: "This user does not exist" });

      res.json({ msg: "Delete" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default userCtrl;
