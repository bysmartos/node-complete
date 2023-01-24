import dotenv from "dotenv"

dotenv.config();

export const accesTokenSecret = process.env.ACCESTOKENSECRET
export const refreshTokenSecret = process.env.REFRESHTOKENSECRET
export const mongoUri = process.env.MONGO_URI || ""
