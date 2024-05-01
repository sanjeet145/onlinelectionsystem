import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    voterid: {
        type: String,
        required: true,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    adminId: {
        type: String,
        required: true,
    },
    Voted: [
        {
            electionid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'election', // Assuming you have an Election model
                required: true,
            },
            isVoted: {
                type: Boolean,
                default: false,
            },
        }
    ],
    
    isCandidate: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
    }
})

let User: any;
try {
    User = mongoose.models.User || mongoose.model('User', userSchema);
} catch (error) {

}


export default User;