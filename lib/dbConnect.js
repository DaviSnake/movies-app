import mongoose from "mongoose";

const URI_MONGO = process.env.URI_MONGO

const conectarDB = async() => {
    try {
        await mongoose.connect(URI_MONGO,{
            autoIndex: true
        })
        console.log("MongoDB Conectado")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
} 

export default conectarDB;