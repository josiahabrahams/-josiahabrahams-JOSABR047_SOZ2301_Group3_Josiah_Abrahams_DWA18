import React, { useEffect } from 'react'
import {Button} from '@mui/material'
import './SeasonSection.css'
/**
 * @callback emptyFunction
 */
/**
 * @typedef {object} Props 
 * @prop {string} getSeasonId - is a a sting used to fetch the season object from the 
 * @prop {emptyFunction} goBackToShowList
 * @prop {emptyFunction} toggleIsPlaying
 */
/**
 * @param {Props} props 
 * @returns getSeasonId
 */
export const SeasonSection =(props)=>{
    const [seasonData, setSeasonData] = React.useState([{}])
    const [individualSeason, setIndividualSeason] = React.useState([{}])
    const [individualSeasonSelected, setIndividualSeasonSelected] = React.useState(false)
    if(!props.getSeasonId){
      throw new Error('props.get season does not exist')
    }
    
    useEffect(()=>{
   const getSeason =  async() =>{
    try {
     const response =  await fetch(`https://podcast-api.netlify.app/id/${props.getSeasonId}`)  
     const data = await response.json()
     setSeasonData(data) 
    } catch (error) {
       console.log('failed to get resources please refresh or come back later') 
    }
    
   }
   getSeason()
    },[props.getSeasonId])

     const getIndividualSeason =(id)=>{
        const sorted = seasonData.seasons[id-1]
        setIndividualSeason(sorted)
        setIndividualSeasonSelected(true)
     }
    

    const seasonList = seasonData.seasons && seasonData.seasons.map(( season,index) => {
       return(
        <li key={index} className='season_li'>
         <div onClick={()=>getIndividualSeason(season.season)}>
            <img src={season.image} />
           <div className='preview_info'> 
           <h3>{season.title} </h3> 
           <p>Episodes: {season.episodes.length}</p> 
          </div>
         </div>
         
        </li>
       )
    });
    
    const episodeList = individualSeason.episodes && individualSeason.episodes.map((episode,index)=>{
        return(
            <li key={index} className='episode_info' onClick={()=>props.toggleIsPlaying(episode.file)}>
                <div>
                    <h4>{episode.title}</h4>
                    <p className='line-clamp'>{episode.description}</p>
                </div>
            </li>
        )

    })
    console.log(individualSeason)
    return(
        <>
        <header>
            <div className="navbar">
                <Button  color="error"onClick={props.goBackToShowList}>Back</Button>
                <Button color='success' style ={{color:'blue'}}>Favourites</Button>
            </div>
            <div className="info">
                <img src={seasonData.image}  />
                <h2>{seasonData.title}</h2>
                 <p className='line-clamp '>{seasonData.description}</p>
            </div>
            
        </header>
       {!individualSeasonSelected && <ol className='season_ol'>
          {seasonList}
        </ol>}
        {individualSeasonSelected && 
        <>
        <div>
            <Button onClick={()=>setIndividualSeasonSelected(false)}>back</Button>
            <div className='individual_season_info'>
                <h2>{individualSeason.title}</h2>
                <img src={individualSeason.image}/>
            </div>
            <ol>
             {episodeList}
            </ol>
        </div>
        </>
        }
        
        </>
    )
}