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
    description: {
        type: String,
        required: true,
    },
    isRequested: {
        type: Boolean,
        default: false,
    },
    isCandidate: {
        type: Boolean,
        default: false,
    },
})

let Candidate: any;
try {
    Candidate = mongoose.models.Candidate || mongoose.model('Candidate', candidateSchema);
} catch (error) {

}


export default Candidate;