import mongoose from "mongoose";
import { type } from "os";

const adminSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    adminId:{
        type:String,
        // required:true,
        // unique:true,
    },
    pass:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    token:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:true,
    },
    Voted: [
        {
            electionid: {
                type: String, 
                required: true,
            },
            votedCandidateid:{
                type:String,
            },
            isVoted: {
                type: Boolean,
                default: false,
            },
        }
    ],
})

let Admin:any;
try {
    Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
} catch (error) {
    
}

// const User = mongoose.models.users ||mongoose.model("User", userSchema);

export default Admin;