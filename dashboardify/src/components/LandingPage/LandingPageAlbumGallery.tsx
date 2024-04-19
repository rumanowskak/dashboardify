import '../../css/LandingPage/LandingPageAlbumGallery.css'
import { useState } from 'react';
import PlayIcon from '../../assets/images/Play.svg'
import PauseIcon from '../../assets/images/Pause.svg'
import FastForwardIcon from '../../assets/images/FastForward.svg'
import FastBackwardsIcon from '../../assets/images/FastBackwards.svg'
import BlondAlbumCover from '../../assets/images/blond.jpg'
import MileyCyrusAlbumCover from '../../assets/images/miley_cyrus.png'
import NickiMinajAlbumCover from '../../assets/images/nicki_minaj.png'
import TaylorSwiftAlbumCover from '../../assets/images/taylor_midnights.png'
import RihannaAlbumCover from '../../assets/images/rihanna.png'
import TylerAlbumCover from '../../assets/images/tyler.png'
import WeekendAlbumCover from '../../assets/images/weekend_after_hours.jpg'

function LandingPageAlbumGallery()
{

    const albumCovers = [WeekendAlbumCover, TaylorSwiftAlbumCover, NickiMinajAlbumCover, RihannaAlbumCover, TylerAlbumCover, BlondAlbumCover, MileyCyrusAlbumCover];
    const [currentAlbumCover, setCurrentAlbumCover] = useState(albumCovers[0]);
    const [index, setIndex] = useState(0);
    const [playPauseButton, setPlayPauseButton] = useState(PlayIcon);
    const [intervalId, setIntervalId]:any = useState();


    function handlePlayButton()
    {
        if(playPauseButton === PlayIcon)
        {

            setPlayPauseButton(PauseIcon)
            let currentindex=index;
            let intId = setInterval(()=>{
                if(currentindex===(albumCovers.length-1))
                {
                    currentindex=0;
                }
                else
                {
                    currentindex+=1;
                }
                setCurrentAlbumCover(albumCovers[currentindex])
                setIndex(currentindex);
            },3000);
            setIntervalId(intId);
        }
        else
        {

            setPlayPauseButton(PlayIcon)
            clearInterval(intervalId);
            setIntervalId(null);
        }

    }

    function handleFastForwardButton()
    {
        let currentindex=index;
        if(index===(albumCovers.length-1))
        {
            setIndex(0);
            currentindex=0;
        }
        else
        {
            setIndex(index+1);
            currentindex+=1;
        }
        setCurrentAlbumCover(albumCovers[currentindex])

    }

    function handleFastBackwardsButton()
    {
        let currentindex=index;

        if(index===0)
        {
            setIndex(albumCovers.length-1);
            currentindex=albumCovers.length-1;

        }
        else
        {
            setIndex(index-1);
            currentindex-=1;

        }
        setCurrentAlbumCover(albumCovers[currentindex]);

    }

    return(
        <div className="landing-page-album-gallery">
            <div className='landing-page-album-covers'>
                <img src={currentAlbumCover} ></img>
            </div>
            <div className='landing-page-buttons'>
                <button className='fast-backwards-button' onClick={handleFastBackwardsButton}>
                    <img src={FastBackwardsIcon}></img>
                </button>
                <button className='play-button' onClick={handlePlayButton}>
                    <div className='play-button-circle'>
                        <img src={playPauseButton}></img>
                    </div>
                </button>
                <button className='fast-forward-button' onClick={handleFastForwardButton}>
                    <img src={FastForwardIcon}></img>
                </button>
            </div>
        </div>
    );
}

export default LandingPageAlbumGallery;