import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./Db/db.js";
import userRoutes from "./Routes/user.routes.js"
import productRoutes from "./Routes/product.routes.js";
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


connect();

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/users",userRoutes)
app.use("/product",productRoutes)
export default app