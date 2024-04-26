import mongoose from "mongoose";
const uri: string = process.env.URI || '';

export async function dbConnect(){
    try{
        mongoose.connect(uri);
        const connected = mongoose.connection;
        connected.on('connected',()=>{
            console.log("mongo connected");
        })
    } catch (e){
        console.log("error connecting db");
    }
}
