import '../../css/Dashboard/Dashboard.css'
import { useState } from "react";
import { useEffect } from "react";

function Dashboard()
{
    const [token, setToken] = useState("");

    useEffect(()=>{
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
        if(!token && hash)
        {
            let tmp = hash.substring(1).split("&").find(elem=>elem.startsWith("access_token"))
            if (tmp !== undefined)
            {
                token = tmp.split("-")[1];
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
        </div>
    );
}

export default Dashboard;