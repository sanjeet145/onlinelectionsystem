import mongoose from "mongoose";
import { type } from "os";

const candidateSchema = new mongoose.Schema({
    voterid: {
        type: String,
        required: true,
        unique: true,
    },
    electionId: {
        type: String,
        required: true,
    },
    adminId: {
        type: String,
        required: true,
    },
    partyname:{
        type: String,
        required:true
    },
    partysymbol:{
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true,
    },
    imgurl:{
        type:String,
    },
    isRequested: {
        type: Boolean,
        default: false,
    },
    isCandidate: {
        type: Boolean,
        default: false,
    },
    totalVotes:{
        type:Number,
        default:0
    }
})

let Candidate: any;
try {
    Candidate = mongoose.models.Candidate || mongoose.model('Candidate', candidateSchema);
} catch (error) {

}


export default Candidate;