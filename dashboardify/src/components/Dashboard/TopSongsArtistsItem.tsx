import '../../css/Dashboard/TopSongsArtistsItem.css';
import { useEffect } from 'react';
import { useState } from 'react';

interface TopSongsArtistsItemInterface
{
    number:number;
    image:string;
    name:string;
    type:string;
}
function TopSongsArtistsItem({number,image, name, type}:TopSongsArtistsItemInterface)
{
    const [newName, setNewName] = useState(name);
    useEffect(()=>{
        if(name && name.length > 40)
        {
            setNewName(name.substring(0,40) + '...');
        }
    },[name])
    return(
        <div className="top-songs-artists-item">
            <div className='top-songs-artists-item-number'>
                {number}.
            </div>
            <div className='top-songs-artists-item-image'>
                <img src={image}></img>
            </div>
            <div className='top-songs-artists-item-name'>
                {(newName)?newName:name}
            </div>
        </div>
    );
}
export default TopSongsArtistsItem;