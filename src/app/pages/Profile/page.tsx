
import ProfileNavbar from "./components/navbar"
import ProfileContents from "./components/contents"
import './profile.css';

export default function Candidate(){
    const voter={
            name:"Ram",
            adminid:"admin",    
    }
    return(
        <div className="profile-main">
        <ProfileNavbar/>
        <ProfileContents/>
        </div>
    )
}