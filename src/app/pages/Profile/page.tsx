
import ProfileNavbar from "./components/navbar"
import ProfileContents from "./components/contents"
import './profile.css';

export default function Candidate(){
   
    return(
        <div className="profile-main">
        <ProfileNavbar/>
        <ProfileContents/>
        </div>
    )
}