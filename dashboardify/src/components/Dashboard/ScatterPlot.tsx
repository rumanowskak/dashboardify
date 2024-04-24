import '../../css/Dashboard/ScatterPlot.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter,XAxis, YAxis, ZAxis, Tooltip,  ResponsiveContainer,Cell } from 'recharts';
import { DateRangeState } from '../../atoms/DateRange';
import { useRecoilValue } from 'recoil';

function ScatterPlot()
{
    const [data, setData] = useState<any>();
    const [xAxisData, setXAxisData] = useState("energy");
    const [yAxisData, setYAxisData] = useState("acousticness");
    const [zAxisData, setZAxisData] = useState("danceability");
    const [opacityData, setOpacityData] = useState("instrumentalness");
    const dateRange = useRecoilValue(DateRangeState);


    useEffect(()=>{
        let token = window.localStorage.getItem("token");
        if (token)
        {
            axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${dateRange}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                },
                params:{
                    limit:50
                }
                })
                .then(res=>{
                    let tracks = res.data.items;
                    let data_temp:any=[];

                    axios.get("https://api.spotify.com/v1/audio-features?ids=" + tracks.map((track:any)=>track.id).join(','),{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(res=>{
                        let temp =res.data.audio_features;
                        temp.map((item:any)=>{
                             data_temp.push({
                                 "acousticness": item.acousticness,
                                 "danceability": item.danceability,
                                 "energy": item.energy,
                                 "liveness": item.liveness,
                                 "instrumentalness": item.instrumentalness,
                                 "speechiness": item.speechiness
                             })
                             
                        })
                        console.log(temp);
                        setData(data_temp);
                    })
                })
        }
    },[])

    return(
        <div className="scatter-plot">
            <div className='scatter-plot-chart'>
            {data &&
                <ResponsiveContainer>
                    <ScatterChart>
                        <XAxis type="number" dataKey={xAxisData} name={xAxisData} stroke='hsla(0, 0%, 100%, 0.5)'/>
                        <YAxis type="number" dataKey={yAxisData} name={yAxisData} stroke='hsla(0, 0%, 100%, 0.5)'/>
                        <ZAxis type="number" dataKey={zAxisData} range={[0, 200]} name={zAxisData}/>
                        <Scatter data={data} fill="#DB0444" > 
                        {data.map((item: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={`rgba(219,4,68,${data[index][opacityData]*0.8 + 0.2})`} />
                        ))}
                        </Scatter>
                        <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
                    </ScatterChart>
                </ResponsiveContainer>
            }
            </div>
            <div className="scatter-plot-data-select-section">
                <div className='scatter-plot-data-select'>
                        <div className='scatter-plot-data-select-line'>
                            <div className='scatter-plot-data-select-title'>
                                xAxis:
                            </div>
                            <div className='scatter-plot-select'>
                                <select defaultValue="energy" onChange={(e)=>{setXAxisData(e.target.value)}}> 
                                    <option value="energy">energy</option>
                                    <option value="acousticness">acousticness</option>
                                    <option value="danceability">danceability</option>
                                    <option value="liveness">liveness</option>
                                    <option value="instrumentalness">instrumentalness</option>
                                    <option value="speechiness">speechiness</option>
                                </select>
                            </div>
                        </div>
                        <div className='scatter-plot-data-select-line'>
                            <div className='scatter-plot-data-select-title'>
                                yAxis:
                            </div>
                            <div className='scatter-plot-select'>
                                <select defaultValue="acousticness" onChange={(e)=>{setYAxisData(e.target.value)}}>
                                    <option value="energy">energy</option>
                                    <option value="acousticness">acousticness</option>
                                    <option value="danceability">danceability</option>
                                    <option value="liveness">liveness</option>
                                    <option value="instrumentalness">instrumentalness</option>
                                    <option value="speechiness">speechiness</option>
                                </select>
                            </div>
                        </div>
                        <div className='scatter-plot-data-select-line'>
                            <div className='scatter-plot-data-select-title'>
                                zAxis:
                            </div>
                            <div className='scatter-plot-select'>
                                <select defaultValue="danceability" onChange={(e)=>{setZAxisData(e.target.value)}}>
                                    <option value="energy">energy</option>
                                    <option value="acousticness">acousticness</option>
                                    <option value="danceability">danceability</option>
                                    <option value="liveness">liveness</option>
                                    <option value="instrumentalness">instrumentalness</option>
                                    <option value="speechiness">speechiness</option>
                                </select>
                            </div>
                        </div>
                        <div className='scatter-plot-data-select-line'>
                            <div className='scatter-plot-data-select-title'>
                                Opacity:
                            </div>
                            <div className='scatter-plot-select'>
                                <select defaultValue="instrumentalness" onChange={(e)=>{setOpacityData(e.target.value)}}>
                                    <option value="energy">energy</option>
                                    <option value="acousticness">acousticness</option>
                                    <option value="danceability">danceability</option>
                                    <option value="liveness">liveness</option>
                                    <option value="instrumentalness">instrumentalness</option>
                                    <option value="speechiness">speechiness</option>
                                </select>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default ScatterPlot;