import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
import {connectDB} from "./utils/db.js"
import userRouter from "./routes/user.routes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB();

//routes
app.get("/", (req, res) => {  
    res.json({ message: "Welcome to the application." });
});
app.use("/api/v1/user",userRouter);





