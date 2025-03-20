import mongoose from "mongoose"

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Successfully Connected to MongoDB")
    })
    .catch(()=>{
        console.log("Error connecting to MongoDB");
    })
}






