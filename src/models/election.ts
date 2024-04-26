import mongoose from "mongoose";
import { type } from "os";

const electionSchema = new mongoose.Schema({
    name:{
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

// const Election = mongoose.models.Elections ||mongoose.model("Election", ElectionSchema);

export default Election;