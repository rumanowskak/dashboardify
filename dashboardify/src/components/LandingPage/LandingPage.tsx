import { useEffect, useState } from 'react';
import $ from "jquery";
import '../../css/LandingPage/LandingPage.css'
import LandingPageAlbumGallery from './LandingPageAlbumGallery';

function LandingPage()
{
    // --- START GRADIENT SCRIPT ---

    const [gradientStyle, setGradientStyle] = useState<string>("")

    var colorsLeft = new Array([63,94,251], [251,63,130], [131,58,180], [255,162,0],[240,99,169], [108,255,147]);
    var colorsRight = new Array([252,70,107], [252,144,19], [255,70,14], [91,0,237],[171,228,141], [0,95,115]);
    var nColors = colorsLeft.length;
      
    var step = 0;
    // color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    // var colorIndices = [0,1,2,3];
    var colorIndices = [0, 1];
      
    //transition speed
    var gradientSpeed = .0015;
      
    function updateGradient()
    {
        var c0_0 = colorsLeft[colorIndices[0]];
        var c0_1 = colorsLeft[colorIndices[1]];
        var c1_0 = colorsRight[colorIndices[0]];
        var c1_1 = colorsRight[colorIndices[1]];
    
        var istep = 1 - step;
        var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        var color1 = ((r1 << 16) | (g1 << 8) | b1).toString(16);
        while (color1.length != 6)
        {
            color1 = "0" + color1;
        }
        color1 = '#' + color1;
    
        var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        var color2 = ((r2 << 16) | (g2 << 8) | b2).toString(16);
        while (color2.length != 6)
        {
            color2 = "0" + color2;
        }
        color2 = '#' + color2;
    
        $('#gradient').css({background: "-webkit-radial-gradient(center, circle cover, "+color1+","+color2+")"});
        // setGradientStyle("-webkit-radial-gradient(center, circle cover, "+color1+","+color2+")");
        
        step += gradientSpeed;
        if ( step >= 1 )
        {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            
            //pick two new target color indices
            //do not pick the same as the current one
            colorIndices[1] = (colorIndices[1] + 1) % nColors;
            // colorIndices[1] = (colorIndices[1] + Math.floor( 1 + Math.random() * (nColors - 1))) % nColors;
            
        }

        console.log(timers);
    }

    // --- END GRADIENT SCRIPT ---

    var timers: any = [];
    useEffect(()=> {
        timers.push(setInterval(updateGradient, 10));
    }, []);


    const CLIENT_ID = "459ea90b3d094609983b430183312838";
    const REDIRECTED_URI = "http://localhost:3000/dashboard/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    return(
        // style={{'background': gradientStyle}}
        <div className="landing-page" id="gradient">
            <div className='landing-page-title-and-button'>
               <div className='landing-page-title'>
                    Dashboardify
               </div>
               <div className='landing-page-button'>
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECTED_URI}&response_type=${RESPONSE_TYPE}`}>
                <button><span>sign up &nbsp; with spotify</span></button>
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