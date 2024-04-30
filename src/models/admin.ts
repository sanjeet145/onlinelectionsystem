import mongoose from "mongoose";
import { type } from "os";

const adminSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    adminid:{
        type:String,
        required:true,
        unique:true,
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
    }
})

let Admin:any;
try {
    Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
} catch (error) {
    
}

// const User = mongoose.models.users ||mongoose.model("User", userSchema);

export default Admin;