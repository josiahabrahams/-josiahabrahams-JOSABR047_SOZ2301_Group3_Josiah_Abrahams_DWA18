import React, { useEffect } from 'react'
import {Button, IconButton} from '@mui/material'
import {Delete, ThumbDown,ThumbUp} from'@mui/icons-material'
import './SeasonSection.css'
import {supabase, formalDate} from'../utils/utils.js'

  
 
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
    const [favouritesData, setFavouritesData] = React.useState([{}])
    const [UpdateFavourites,setUpdateFavourites] = React.useState(false)
    const [isFavouriteSectionSelected, setIsFavouriteSectionSelected] = React.useState(false)
    if(!props.getSeasonId){
      throw new Error('props.get season does not exist')
    }
    useEffect(()=>{
       const getSupaBaseData = async() =>{
        try {
          const {data, error} = await supabase.from('favourite').select()  
          
          setFavouritesData(data)
        } catch (error) {
            console.log(error)
        }
        
       }
       getSupaBaseData()
    },[UpdateFavourites])
    
    useEffect(() => {
        const getSeason = async () => {
          try {
            const response = await fetch(`https://podcast-api.netlify.app/id/${props.getSeasonId}`);
            const data = await response.json();
            
            const transformedData = {
              ...data,
              seasons: data.seasons.map((season) => ({
                ...season,
                episodes: season.episodes.map((episode) => ({
                  ...episode,
                  isFavourite: false
                }))
              }))
            };
      
            setSeasonData(transformedData);
          } catch (error) {
            console.log('failed to get resources please refresh or come back later');
          }
        }
      
        getSeason();
      }, [props.getSeasonId]);
      
      const toggleIsFaviorite = async (episodeId, title,episodeNum,showTitle,description,seasonTitle) => {
        setSeasonData((prevSeasonData) => {
          const newSeasonData = { ...prevSeasonData };
          const episode = newSeasonData.seasons[individualSeason.season - 1].episodes[episodeId];
          episode.isFavourite = !episode.isFavourite;
          return newSeasonData;
        });
        /**object containing data to add to the subabase favouritre table*/
        const newRow = {
          
          created_at: new Date(),
          showTitle: showTitle,
          title: title,
          description1:description,
          episode:episodeNum.toString(),
          seasonTitle: seasonTitle
      }
    
      try {
          const { data, error } = await supabase.from('favourite').insert([newRow]).select();
          if (data) {
              alert(`${title} was added to favourites`)
          }
          if (error) {
              alert('Error:', error);
          }
          setUpdateFavourites(oldBoolean=>!oldBoolean)
      } catch (error) {
          console.log('An error occurred:', error);
      }

      };
  
    
     const getIndividualSeason =(id)=>{
        const sorted = seasonData.seasons[id-1]
        setIndividualSeason(sorted)
        setIndividualSeasonSelected(true)
     }
    
     const removeFavourite = async(id)=>{
      try {
        const { data, error } = await supabase
      .from('favourite')
      .delete()
      .eq('id', id); 
      setUpdateFavourites(oldBoolean=>!oldBoolean)
      } catch (error) {
        alert('error', error)
      }
     
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
    
  const episodeList = individualSeason.episodes && individualSeason.episodes.map((episode, index) => {
    return (
      <li key={index} className='episode_info'>
        <div>
          <h4>{episode.title}</h4>
          <p className='line-clamp'>{episode.description}</p>
          {episode.isFavourite ? (
            <IconButton  ><ThumbUp/></IconButton>
          ) : (
           <IconButton onClick={() => toggleIsFaviorite(index,episode.title,episode.episode,seasonData.title,episode.description,individualSeason.title)}><ThumbDown/></IconButton>
          )}
         <Button  onClick={() => props.toggleIsPlaying(episode.file)}>Play</Button>
        </div>
      </li>
    );
  });
    
  const favouriteEpisodeList = favouritesData.map((favouriteEpisode, index)=> {
  return ( 
 <div key={index} className='favourite_episode'>
   <h4>Episode: {favouriteEpisode.title}, episode {favouriteEpisode.episode}</h4>
   <h4>Show: {favouriteEpisode.showTitle}</h4>
    <h4>Season: {favouriteEpisode.seasonTitle}</h4>
    <h5>selected as favourite: {formalDate(favouriteEpisode.created_at)}</h5>
    <div>
    <p className='line-clamp'>{favouriteEpisode.description1}</p>
     <IconButton onClick={()=>removeFavourite(favouriteEpisode.id)}><Delete/></IconButton>
   </div>
  </div>
  )
})
    return(
        <>
      {  !isFavouriteSectionSelected &&
      <>
        <header>
            <div className="navbar">
                <Button  color="error"onClick={props.goBackToShowList}>Back</Button>
                <Button color='success' style ={{color:'blue'}} onClick={()=>setIsFavouriteSectionSelected(true)}>Favourites</Button>
            </div>
            <div className="info">
                <img src={seasonData.image}/>
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
        }
        {isFavouriteSectionSelected &&
        <>
         <header className='favourite_header'>
          <div>
           <Button color='error' onClick={()=>setIsFavouriteSectionSelected(false)}>Back</Button>
           <h1>Favourite Episodes</h1>
          </div>
         </header>
        { favouriteEpisodeList}
         </>
         }
        </>
    )
}