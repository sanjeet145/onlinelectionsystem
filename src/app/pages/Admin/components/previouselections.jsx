import { useEffect, useState } from "react";

export default function PreviousElections() {


    const [elections, setelections] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/elections');
                const data = await response.json();
                setelections(data.elections);
            } catch (error) {
                console.error('Error fetching voters:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="main-content">
        <div className="pending">
            <h1 className="lists-head">Previous Elections</h1>
            <div className="flex-container">
                {elections ?
                    <>
                        {
                            elections.map(election => (
                                <div className="prev-card" key={election.id}>
                                    <h1>Election Name: <a>{election.electionname}</a></h1>
                                    <h1>Election Date: <a>{new Date(election.enddate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}</a></h1>
                                    <h1>Election Id: <a>{election.electionId}</a></h1>
                                    {election.result?
                                    <h1><a>{election.result}</a> Wining/Won</h1>
                                    :<></>}
                                </div>
                            ))
                        }
                    </>
                    : <>
                        <h2>loading...</h2>
                    </>
                }
            </div>
        </div>
        </div>
    )
}