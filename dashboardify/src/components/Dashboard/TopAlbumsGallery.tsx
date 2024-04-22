import '../../css/Dashboard/TopAlbumsGallery.css'
import LeftArrowIcon from '../../assets/images/LeftArrow.svg';
import RightArrowIcon from '../../assets/images/RightArrow.svg'
import axios from 'axios';
import { useEffect, useState } from 'react';


function TopAlbumsGallery()
{

    const [albums, setAlbums] = useState<any[]>([]);
    const [albumsPhotos, setAlbumsPhotos] = useState<any[]>([]);

    useEffect(()=>{
        let token = window.localStorage.getItem("token");
        if(token)
        {
            
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
                    let albumsPhotos = new Map();

                    tracks.map((item:any)=>{
                        iterator ++;
                        let album_name = item.album.name;
                        if(albums.has(album_name))
                        {
                            let number = albums.get(album_name);
                            let new_number = number + 1/iterator;
                            albums.set(album_name, new_number);
                            albumsPhotos.set(album_name, item.album.images[0].url);
                        }else
                        {
                            let new_number = 1/iterator;
                            albums.set(album_name, new_number);
                            albumsPhotos.set(album_name, item.album.images[0].url);
                        }
                    })
                    let top_albums=[]
                    let top_albums_photos=[]
                    for(let i=0;i<5;i++)
                    {
                        const max = Math.max(...albums.values());
                        for (const [key, value] of albums.entries()) { 
                            if (value === max) 
                            {
                                top_albums.push(key);
                                top_albums_photos.push(albumsPhotos.get(key));
                                albums.delete(key);
                                break;
                            }
                        } 
                    }

                    setAlbums(top_albums);
                    setAlbumsPhotos(top_albums_photos);
                    setLeftBackgroundPhoto(top_albums_photos[top_albums_photos.length-1]);
                    setRightBackgroundPhoto(top_albums_photos[1]);
                    setMainPhoto(top_albums_photos[0]);
                    setLeftBackgroundPhotoName(top_albums[top_albums.length-1]);
                    setRightBackgroundPhotoName(top_albums[1]);
                    setMainPhotoName(top_albums[0]);
                    setLeftBackgroundPhotoNumber(top_albums.length);
                    setMainPhotoNumber(1);
                    setRightBackgroundPhotoNumber(2);

                })
        }

    },[])

    const [leftBackgroundPhoto, setLeftBackgroundPhoto] = useState(albumsPhotos[albumsPhotos.length-1]);
    const [mainPhoto, setMainPhoto] = useState(albumsPhotos[0]);
    const [rightBackgroundPhoto, setRightBackgroundPhoto] = useState(albumsPhotos[1]);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [leftBackgroundPhotoName, setLeftBackgroundPhotoName] = useState(albums[albums.length-1]);
    const [mainPhotoName, setMainPhotoName] = useState(albums[0]);
    const [rightBackgroundPhotoName, setRightBackgroundPhotoName] = useState(albums[1]);
    const [leftBackgroundPhotoNumber, setLeftBackgroundPhotoNumber] = useState(albums.length);
    const [rightBackgroundPhotoNumber, setRightBackgroundPhotoNumber] = useState(2);
    const [mainPhotoNumber, setMainPhotoNumber] = useState(1); 

    function handleLeftArrowClick()
    {
        setRightBackgroundPhoto(mainPhoto);
        setMainPhoto(leftBackgroundPhoto);
        setRightBackgroundPhotoName(mainPhotoName);
        setMainPhotoName(leftBackgroundPhotoName);
        setRightBackgroundPhotoNumber(mainPhotoNumber);
        setMainPhotoNumber(leftBackgroundPhotoNumber);
        if(currentIndex === 0)
        {
            setLeftBackgroundPhoto(albumsPhotos[albumsPhotos.length-2]);
            setLeftBackgroundPhotoName(albums[albums.length-2]);
            setLeftBackgroundPhotoNumber(4);
        }
        else if(currentIndex === 1)
        {
            setLeftBackgroundPhoto(albumsPhotos[albumsPhotos.length-1]);
            setLeftBackgroundPhotoName(albums[albums.length-1]);
            setLeftBackgroundPhotoNumber(5);
        }
        else
        {
            setLeftBackgroundPhoto(albumsPhotos[currentIndex - 2]);
            setLeftBackgroundPhotoName(albums[currentIndex - 2]);
            setLeftBackgroundPhotoNumber(currentIndex-1);
        }
        
        if(currentIndex === 0)
            setCurrentIndex(albumsPhotos.length-1);
        else
            setCurrentIndex(currentIndex-1);
    }

    function handleRightArrowClick()
    {

        setLeftBackgroundPhoto(mainPhoto);
        setMainPhoto(rightBackgroundPhoto);
        setLeftBackgroundPhotoName(mainPhotoName);
        setMainPhotoName(rightBackgroundPhotoName);
        setLeftBackgroundPhotoNumber(mainPhotoNumber);
        setMainPhotoNumber(rightBackgroundPhotoNumber);

        if(currentIndex === (albumsPhotos.length - 2) )
        {
            setRightBackgroundPhoto(albumsPhotos[0]);
            setRightBackgroundPhotoName(albums[0]);
            setRightBackgroundPhotoNumber(1);
        }
        else if(currentIndex === (albumsPhotos.length -1))
        {
            setRightBackgroundPhoto(albumsPhotos[1]);
            setRightBackgroundPhotoName(albums[1]);
            setRightBackgroundPhotoNumber(2);

        }
        else
        {
            setRightBackgroundPhoto(albumsPhotos[currentIndex+2]);
            setRightBackgroundPhotoName(albums[currentIndex+2]);
            setRightBackgroundPhotoNumber(currentIndex+3);
        }

        if(currentIndex === (albumsPhotos.length-1))
            setCurrentIndex(0);
        else
            setCurrentIndex(currentIndex+1);
    }

    return(
        <div className="top-albums-gallery-section">
            <div className='left-arrow'>
                <img src={LeftArrowIcon} onClick={handleLeftArrowClick}></img>
            </div>
            <div className='top-albums-gallery'>
                <div className='top-albums-gallery-items'>
                <div className='left-background-photo'>
                    <img className="left-background-img" src={leftBackgroundPhoto}></img>
                </div>
                <div className='left-background-photo-text'>
                        {leftBackgroundPhotoNumber}. {leftBackgroundPhotoName}
                </div>
                <div className='main-photo'>
                    <img className="main-img" src={mainPhoto}></img>
                </div>
                <div className='main-photo-text'>
                    {mainPhotoNumber}. {mainPhotoName}
                </div>
                <div className='right-background-photo'>
                    <img className="right-background-img" src={rightBackgroundPhoto}></img>
                </div>
                <div className='right-background-photo-text'>
                    {rightBackgroundPhotoNumber}. {rightBackgroundPhotoName}
                </div>
                </div>

            </div>
            <div className='right-arrow'>
                <img src={RightArrowIcon} onClick={handleRightArrowClick}></img>
            </div>
        </div>
    );
}

export default TopAlbumsGallery;