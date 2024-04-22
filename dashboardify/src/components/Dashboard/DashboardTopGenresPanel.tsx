import '../../css/Dashboard/DashboardTopGenresPanel.css'
import { PieChart, Pie, Legend, ResponsiveContainer, Sector, Cell} from 'recharts';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios'

function DashboardTopGenresPanel()
{
    const [genres, setGenres] = useState<any[]>([]);
    useEffect(()=>{
        let token = window.localStorage.getItem("token");
        if (token)
        {
            axios.get("https://api.spotify.com/v1/me/top/artists",{
                headers:{
                    Authorization: `Bearer ${token}`
                },
                params:{
                    limit:50
                }
                })
                .then(res=>{
                    let artists = res.data.items;
                    let genres = new Map();
                    let iterator = 0;
                    artists.map((item:any)=>{
                        iterator ++;
                        let genres_tab=item.genres;
                        console.log(item);
                        genres_tab.map((genre:any)=>{
                            if(genres.has(genre))
                            {
                                let number = genres.get(genre);
                                let new_number = number + 1/iterator;
                                genres.set(genre, new_number);
                            }
                            else
                            {
                                let new_number = 1/iterator;
                                genres.set(genre, new_number);
                            }
                        })
                    })
                    console.log(genres);
                    let top_genres=[]
                    for(let i=0;i<5;i++)
                    {
                        const max = Math.max(...genres.values());
                        for (const [key, value] of genres.entries()) { 
                            if (value === max) 
                            {
                                top_genres.push({"key":key, "value":value})
                                genres.delete(key);
                                break;
                            }
                        } 
                    }

                    setGenres(top_genres);
                })
        }
    },[])

    const COLORS = ['#DB0444', '#00DB87', '#FE770F', '#432683', '#720000' ];

    const renderActiveShape = (props:any) => {
        const RADIAN = Math.PI / 180;
        console.log(props);
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
        let genre = payload.key;
        console.log(genre);
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';
      
        return (
          <g>
            <Sector
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={startAngle}
              endAngle={endAngle}
              fill={fill}
            />
            <Sector
              cx={cx}
              cy={cy}
              startAngle={startAngle}
              endAngle={endAngle}
              innerRadius={outerRadius + 6}
              outerRadius={outerRadius + 10}
              fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="white" fontFamily='Inter Bold' fontSize='20px'>{`${genre}`.toUpperCase()}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="white"  fontFamily='Inter Medium' fontSize='15px'>
              {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
          </g>
        );
      };
      const [activeIndex, setActiveIndex] = useState(0);
      const onPieEnter = useCallback(
        (_:any, index:any) => {
          setActiveIndex(index);
        },
        [setActiveIndex]
      );

    return(
        <div className="dashboard-top-genres-panel">
            {genres && <ResponsiveContainer  width="100%" height="100%" >
                <PieChart width={400} height={400} >
                <defs>
                    {genres.map((entry, index) => (
                        <linearGradient id={`myGradient${index}`}>
                    <stop
                    offset="0%"
                    stopColor={COLORS[index % COLORS.length]}
                    />
                    <stop
                    offset="100%"
                    stopColor="black"
                    />
            </linearGradient>
          ))}
        </defs>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        cx="50%"
                        cy="50%"
                        innerRadius={90}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                        stroke="none"
                        data={genres}
                        >
                        {genres.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={`url(#myGradient${index})`} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>}
        </div>
    );
}

export default DashboardTopGenresPanel;