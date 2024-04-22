import '../../css/Dashboard/TopSongsArtistsPanel.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import TopSongsArtistsItem from './TopSongsArtistsItem';


interface TopSongsArtistsPanelInterface
{
    type:string;
}

function TopSongsArtistsPanel({type}:TopSongsArtistsPanelInterface)
{
    const [names, setNames] = useState<any[]>([]);
    const [photos, setPhotos] = useState<any[]>([]);
    useEffect(()=>{
        let token = window.localStorage.getItem("token");
        if(token)
        {
            switch(type)
            {
                case "songs":{
                    axios.get("https://api.spotify.com/v1/me/top/tracks",{
                        headers:{
                            Authorization: `Bearer ${token}`
                        },
                        params:{
                        limit:5
                        }
                    })
                    .then(res=>{
                        let names =[res.data.items[0].name, res.data.items[1].name , res.data.items[2].name, res.data.items[3].name, res.data.items[4].name];
                        setNames(names);
                        let photos = [res.data.items[0].album.images[0].url, res.data.items[1].album.images[0].url, res.data.items[2].album.images[0].url , res.data.items[3].album.images[0].url, res.data.items[4].album.images[0].url];
                        setPhotos(photos);
                    })  
                    break;
                }
                case "artists":{
                    axios.get("https://api.spotify.com/v1/me/top/artists",{
                        headers:{
                            Authorization: `Bearer ${token}`
                        },
                        params:{
                            limit:5
                        }
                    })
                    .then(res=>{
                        let names =[res.data.items[0].name, res.data.items[1].name , res.data.items[2].name, res.data.items[3].name, res.data.items[4].name];
                        setNames(names);
                        let photos = [res.data.items[0].images[0].url, res.data.items[1].images[0].url, res.data.items[2].images[0].url , res.data.items[3].images[0].url, res.data.items[4].images[0].url];
                        setPhotos(photos);
                    })  
                    break;
                }
            }

        }
    },[])

    return(
        <div className="top-songs-artists-panel">
            <div className='top-songs-artists-panel-title'>
                TOP {type.toUpperCase()}:
            </div>
            <div className='top-songs-artists-panel-items-section'>
                <TopSongsArtistsItem number={1} image={photos[0]} name={names[0]} type={type} />
                <TopSongsArtistsItem number={2} image={photos[1]} name={names[1]} type={type} />
                <TopSongsArtistsItem number={3} image={photos[2]} name={names[2]} type={type} />
                <TopSongsArtistsItem number={4} image={photos[3]} name={names[3]} type={type} />
                <TopSongsArtistsItem number={5} image={photos[4]} name={names[4]} type={type} />
            </div>
        </div>
    );
}

export default TopSongsArtistsPanel;