import '../../css/Dashboard/Dashboard.css'
import { useEffect, useState } from "react";
import DashboardTopsPanel from './DashboardTopsPanel';
import { UserTokenState } from '../../atoms/UserToken';
import { useRecoilState } from 'recoil';
import TopSongsArtistsPanel from './TopSongsArtistsPanel';
import TopAlbumsGallery from './TopAlbumsGallery';
import DashboardTopGenresPanel from './DashboardTopGenresPanel';
import ScatterPlot from './ScatterPlot';
import { DateRangeState } from '../../atoms/DateRange';
import SpotifyIcon from '../../assets/images/Spotify_Logo_RGB_Green.png'

function Dashboard()
{
    const [token, setToken] = useRecoilState(UserTokenState);
    const [dateRange, setDateRange] = useRecoilState(DateRangeState);
    const [button1Class, setButton1Class] = useState("unclicked-class");
    const [button2Class, setButton2Class] = useState("clicked-class");
    const [button3Class, setButton3Class] = useState("unclicked-class");


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

    function handleShortTermButtonClicked()
    {
        setDateRange("short_term");
        if(button1Class === "unclicked-class")
        {
            setButton1Class("clicked-class");
            setButton2Class("unclicked-class");
            setButton3Class("unclicked-class");
        }else
            setButton1Class("unclicked-class");
    }
    function handleMediumTermButtonClicked()
    {
        setDateRange("medium_term");
        if(button2Class === "unclicked-class")
        {
            setButton2Class("clicked-class");
            setButton1Class("unclicked-class");
            setButton3Class("unclicked-class");
        }else
            setButton2Class("unclicked-class");
    }
    function handleLongTermButtonClicked()
    {
        setDateRange("long_term");
        if(button3Class === "unclicked-class")
        {
            setButton3Class("clicked-class");
            setButton1Class("unclicked-class");
            setButton2Class("unclicked-class");
        }else
            setButton3Class("unclicked-class");
    }


    return(
        <div className="dashboard">
            <div className='dashboard-header dashboard-header-blur'>
                <div className='dashboard-header-header'>
                    <div className='dashboard-header-header-section'>
                        <button className={button1Class} onClick={handleShortTermButtonClicked}>
                            Month
                        </button>
                        <button className={button2Class} onClick={handleMediumTermButtonClicked}>
                            6 months
                        </button>
                        <button className={button3Class} onClick={handleLongTermButtonClicked}>
                            1 year
                        </button>
                    </div>
                    <div className='spotify-logo'>
                        <img src={SpotifyIcon}></img>
                    </div>
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
            <div className='dashboard-top-genres-section dashboard-top-genres-section-blur'>
                <div className='dashboard-top-genres-section-title'>
                    TOP GENRES:
                </div>
                <div className='dashboard-top-genres-chart-section'>
                    <DashboardTopGenresPanel/>
                </div>
            </div>
            <div className='dashboard-scatter-plot-section'>
                <ScatterPlot/>
            </div>
            <div className='dashboard-footer-section dashboard-footer-section-blur'>
                <div className='footer'>
                    &copy; Katarzyna Rumanowska 2024
                </div>
            </div>
        </div>
    );
}

export default Dashboard;