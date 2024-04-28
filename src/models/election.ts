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
    admin:{
        type:String,
        required:true,
    }
})

let Election:any;
try {
    Election = mongoose.models.elections || mongoose.model('Election', electionSchema);
} catch (error) {
    
}

export default Election;