"use client"

import Elections from "./elections";

export default async function ProfileContents(){
    // const elections = await fetch('/api/elections');

    return(
        <div className="contents-section">
            <Elections/>
            
        </div>
    )
}