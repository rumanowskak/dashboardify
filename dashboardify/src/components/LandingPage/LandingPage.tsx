import '../../css/LandingPage/LandingPage.css'
import LandingPageAlbumGallery from './LandingPageAlbumGallery';

function LandingPage()
{
    const CLIENT_ID = "459ea90b3d094609983b430183312838";
    const REDIRECTED_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    return(
        <div className="landing-page">
            <div className='landing-page-title-and-button'>
               <div className='landing-page-title'>
                    Dashboardify
               </div>
               <div className='landing-page-button'>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECTED_URI}&response_type=${RESPONSE_TYPE}`}>
                <button><span>sign up with spotify</span></button>
                </a>
               </div>
            </div>
            <div className='landing-page-album-gallery-container'>
                <LandingPageAlbumGallery/>
            </div>
        </div>
    );
}


export default LandingPage;