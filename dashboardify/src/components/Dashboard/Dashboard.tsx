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

        </div>
    );
}

export default Dashboard;