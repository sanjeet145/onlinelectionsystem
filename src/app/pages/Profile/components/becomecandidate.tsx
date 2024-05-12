import { useState } from "react"
import { useRouter } from "next/navigation";

export default function BecomeCandidate() {
    const router = useRouter();
    const [form, setForm] = useState({
        electionid: "",
        partyname: "",
        partysymbol: "",
        description: "",
        candidateimage: null,
    });

    const [loading, setloading] = useState(false);

    const inputEvent = (event: any) => {
        const { name, value, files } = event.target;
        if (files) {
            setForm(prevValue => ({
                ...prevValue,
                [name]: files[0]
            }));
        } else {
            setForm(prevValue => ({
                ...prevValue,
                [name]: value,
            }));
        }
    };

    const onsubmit = async (event: any) => {
        setloading(!loading);
        event.preventDefault();
        try {
            if (!form.electionid || !form.description) {
                alert("Please fill all the fields");
            }
            else {
                const formData = new FormData();
                formData.append('electionid', form.electionid);
                formData.append('partyname', form.partyname);
                formData.append('partysymbol', form.partysymbol);
                formData.append('description', form.description);
                if (form.candidateimage) {
                    formData.append('candidateimage', form.candidateimage);
                }

                const response = await fetch("/api/image", {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (data) {
                    alert(data.message);
                }
                // if(data.success){
                //     router.push('/login');
                // }
            }

        } catch (e: any) {
            alert("Something went wrong");
        }
        finally {
            setloading(false);
        }
    };


    return (
        <>
            <form onSubmit={onsubmit}>

                <div>
                    <p>Election Id</p>
                    <input
                        type="text"
                        name="electionid"
                        onChange={inputEvent}
                        value={form.electionid}
                    />
                </div>
                <div>
                    <p>Party Name</p>
                    <input
                        type="text"
                        name="partyname"
                        onChange={inputEvent}
                        value={form.partyname}
                    />
                </div>
                <div>
                    <p>Party Symbol</p>
                    <input
                        type="text"
                        name="partysymbol"
                        onChange={inputEvent}
                        value={form.partysymbol}
                    />
                </div>
                <div className="textarea">
                    <p>Description</p>
                    <textarea name="description"
                        onChange={inputEvent}
                        value={form.description} cols={30} rows={5}></textarea>
                </div>
                <div>
                    <p>Canidate Image</p>
                    <input
                        type="file"
                        name="candidateimage"
                        onChange={inputEvent}
                        accept="image/*"
                    />
                </div>
                <button className="Btn" type="submit">Submit</button>
            </form>
        </>
    )
}