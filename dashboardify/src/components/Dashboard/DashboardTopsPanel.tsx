import '../../css/Dashboard/DashboardTopsPanel.css'
import { UserTokenState } from '../../atoms/UserToken';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function DashboardTopsPanel()
{
    const [artist, setArtist] = useState("");
    const [track, setTrack] = useState("");
    const [trackPhoto, setTrackPhoto] = useState("");
    const [artistPhoto, setArtistPhoto] = useState("");
    const [album, setAlbum] = useState("");
    const [albumPhoto, setAlbumPhoto] = useState("");
    const [topsTitle, setTopsTitle] = useState<any[]>([]);
    const [tops, setTops] = useState<any[]>([]);
    const [topsPhotos, setTopsPhotos]= useState<any[]>([]);
    const [iterator, setIterator] = useState(0);
    let timer:any;


    function handleTopsChange()
    {
        timer = setInterval(() => {
            setIterator(prevIterator => (prevIterator+ 1) %3)
          }, 5000)
    }

    useEffect(()=>{
        let token = window.localStorage.getItem("token");
        console.log(token);
        if (token)
        {
            axios.get("https://api.spotify.com/v1/me/top/artists",{
                headers:{
                    Authorization: `Bearer ${token}`
                },
                params:{
                    limit:1
                }
            })
            .then(res=>{
                setArtist(res.data.items[0].name);
                setArtistPhoto(res.data.items[0].images[0].url);
            })   


            axios.get("https://api.spotify.com/v1/me/top/tracks",{
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                limit:1
            }
            })
            .then(res=>{
                setTrack(res.data.items[0].name);
                setTrackPhoto(res.data.items[0].album.images[0].url);    
            })

            axios.get("https://api.spotify.com/v1/me/top/tracks",{
                headers:{
                    Authorization: `Bearer ${token}`
                },
                params:{
                    limit:50
                }
                })
                .then(res=>{
                    
                    let tracks = res.data.items;
                    let albums = new Map();
                    let iterator = 0;
                    let max = 0;

                    tracks.map((item:any)=>{
                        iterator ++;
                        let album_name = item.album.name;
                        if(albums.has(album_name))
                        {
                            let number = albums.get(album_name);
                            let new_number = number + 1/iterator;
                            if(new_number>max)
                            {
                                max=new_number;
                                setAlbum(album_name);
                                setAlbumPhoto(item.album.images[0].url);
                            }
                            albums.set(album_name, new_number);
                        }else
                        {
                            let new_number = 1/iterator;

                            if(new_number>max)
                            {
                                max=new_number;
                                setAlbum(album_name);
                                setAlbumPhoto(item.album.images[0]);
                            }
                            albums.set(album_name,1/iterator);
                        }
                    })
                })

        }
    },[])

    useEffect(()=>{
        console.log(iterator);
        handleTopsChange();
        return () => clearInterval(timer)
    },[iterator])

    useEffect(()=>{
        if(artist!="" && track!="" && album!="")
        {

            let new_album="";
            let new_track="";
            let new_artist="";

            if(album.length>40)  
                new_album=album.substring(0,40) + "...";

            if(track.length>40)
                new_track=track.substring(0,40) + "...";

            if(artist.length>40)
                new_artist=artist.substring(0,40)+"...";
            
            if(new_album!="" && new_artist!="" && new_track!="")
                setTops([new_artist,new_track,new_album]);
            else if(new_album!="" && new_artist!="")
                setTops([new_artist,track,new_album]);
            else if(new_album!="" && new_track)
                setTops([artist,new_track, new_album]);
            else if(new_track && new_artist)
                setTops([new_artist,new_track, album]);
            else if(new_artist!="")
                setTops([new_artist,track,album]);
            else if(new_track!="")
                setTops([artist,new_track,album]);
            else if(new_album!="")
                setTops([artist,track,new_album])
            else
                setTops([artist,track,album]);
            setTopsPhotos([artistPhoto,trackPhoto,albumPhoto]);
            setTopsTitle(["TOP ARTIST", "TOP TRACK", "TOP ALBUM"]);
            setIterator(prevIterator => (prevIterator) %3)

        }
    },[artist,track,album])
    

    return(
        <div className="dashboard-tops-panel">
            <div className='dashboard-tops-text'>
                <div className='dashboard-tops-title'>
                    {topsTitle[iterator]}:
                </div>
                <div className='dashboard-tops-top-text'>
                    {tops[iterator]}
                </div>
            </div>
            <div className='dashboard-tops-image'>
                <img src={topsPhotos[iterator]} style={{borderRadius:(iterator===0)?'50%':'0%'}}></img>
            </div>
        </div>
    );
}

export default DashboardTopsPanel;