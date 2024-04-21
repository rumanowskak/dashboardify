import '../../css/Dashboard/Dashboard.css'
import { useEffect } from "react";
import DashboardTopsPanel from './DashboardTopsPanel';
import { UserTokenState } from '../../atoms/UserToken';
import { useRecoilState } from 'recoil';
import TopSongsArtistsPanel from './TopSongsArtistsPanel';
import TopAlbumsGallery from './TopAlbumsGallery';

function Dashboard()
{
    const [token, setToken] = useRecoilState(UserTokenState);

    useEffect(()=>{
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
        if(hash)
        {
            let tmp = hash.substring(1).split("&").find(elem=>elem.startsWith("access_token"));
            if (tmp !== undefined)
            {
                token = tmp.split("=")[1];
                window.location.hash="";
                window.localStorage.setItem("token",token);
                setToken(token);
            }
        }
    },[])
    return(
        <div className="dashboard">
            <div className='dashboard-header dashboard-header-blur'>
                <div className='dashboard-header-header'>

                </div>
                <div className='dashboard-main-header'>
                    <div className='dashboard-header-tops'>
                        <DashboardTopsPanel/>
                    </div>
                    <div className='dashboard-header-text'>
                        <div className='dashboard-header-text-line'>
                            <div className='dashboard-header-text-main your-text'>
                                YOUR
                            </div>
                            <div className='dashboard-header-text-sub current-text'>
                                CURRENT
                            </div>
                        </div>
                        <div className='dashboard-header-text-line'>
                            <div className='dashboard-header-text-sub custom-text'>
                                CUSTOM
                            </div>
                            <div className='dashboard-header-text-main spotify-text'>
                                SPOTIFY
                            </div>
                        </div>
                        <div className='dashboard-header-text-line'>
                            <div className='dashboard-header-text-main dashboard-text'>
                                DASHBOARD
                            </div>
                            <div className='dashboard-header-text-sub dashboardify-text'>
                                DASHBOARDIFY
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dashboard-top-songs-artists-section dashboard-top-songs-artists-section-blur'>
                <div className='dashboard-top-songs-artists-section-text'>
                    <div className='dashboard-tops-songs-artists-section-text-left-side'>
                        <div className='dashboard-tops-songs-artists-section-text-left-side-first-line'>
                            YOUR TOP
                        </div>
                        <div className='dashboard-tops-songs-artists-section-text-left-side-rest'>
                            <div className='dashboard-tops-songs-artists-section-text-left-side-line songs-text'>
                                SONGS,
                            </div>
                            <div className='dashboard-tops-songs-artists-section-text-left-side-line artists-text'>
                                ARTISTS,
                            </div>
                            <div className='dashboard-tops-songs-artists-section-text-left-side-line albums-text'>
                                ALBUMS,
                            </div>
                            <div className='dashboard-tops-songs-artists-section-text-left-side-line genres-text'>
                                GENRES
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-tops-songs-artists-section-text-number'>
                        5
                    </div>
                </div>
                <div className='dashboard-top-songs-artists-section-tops'>
                    <TopSongsArtistsPanel type="songs"/>
                    <TopSongsArtistsPanel type="artists"/>
                </div>
            </div>
            <div className='dashboard-top-albums-section'>
                <div className='dashboard-top-albums-section-title'>
                    TOP ALBUMS:
                </div>
                <div className='dashboard-top-albums-gallery-section dashboard-top-albums-gallery-section-blur'>
                    <TopAlbumsGallery/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;