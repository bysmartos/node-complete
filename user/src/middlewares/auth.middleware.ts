
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { Response, Request, NextFunction } from "express";


export const verifyTokenAndAuthorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(500).json({ msg: "not valid" });

    const decoded: any = jwt.verify(token, "" + process.env.ACCESSTOKENSECRET);
    if (!decoded) return res.status(500).json({ msg: "not valid" });
    console.log(token)

    const user = await User.findOne({ _id: decoded.id });
    console.log(user?._id.toString())
    console.log(req.params.userid)
   
    if ((user?._id.toString() === req.params.userid) || (user?.isAdmin === true)) {
      next();
    } else {
      return res.status(500).json({ msg: "Acces denied" });
    }

  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};