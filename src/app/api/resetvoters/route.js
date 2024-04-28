
import { dbConnect } from "@/db/dbConn";
import Election from "@/models/election";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req){
    await dbConnect();
    const reqBody = await req.json();
        // const { electionname,enddate,admin } = reqBody.form;
        console.log(reqBody);
        // const election=new Election({electionname,enddate,admin});
        // await election.save();
        return NextResponse.json({
            message:"details registered"
        })
}
// // Connect to MongoDB
// connectDB();

// // Function to update isVoted field of all voters to false
// async function resetVoters() {
//     try {
//         // Find all elections whose end date has passed
//         const pastElections = await Election.find({ enddate: { $lt: new Date() } });

//         // Iterate through each past election
//         for (const election of pastElections) {
//             // Update isVoted field of all voters to false
//             await Voter.updateMany({ election_id: election._id }, { $set: { isVoted: false } });
//         }
//         console.log('Voter statuses reset successfully.');
//     } catch (error) {
//         console.error('Error resetting voter statuses:', error);
//     }
// }

// // Run the function periodically (e.g., every day)
// setInterval(resetVoters, 24 * 60 * 60 * 1000); // Run every 24 hours

// // Optionally, you can also call the function once at startup
// resetVoters();

// // Export an empty default function to satisfy Next.js API route requirements
// export default function handler(req, res) {
//     // This function can be left empty since the reset logic is executed at startup
// }
