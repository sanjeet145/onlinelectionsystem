import mongoose from "mongoose";
import { type } from "os";

const electionSchema = new mongoose.Schema({
    electionname:{
        type:String,
        required:true,
    },
    enddate:{
        type:Date,
        required:true,
    },
    adminId:{
        type:String,
        required:true,
    },
    electionId:{
        type:String,
        required:true,
    },
    result:{
        type:String,
    }
})

let Election:any;
try {
    Election = mongoose.models.elections || mongoose.model('Election', electionSchema);
} catch (error) {
    
}

export default Election;