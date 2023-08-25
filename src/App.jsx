import { CssBaseline, IconButton, Button,Input } from '@mui/material'
import { Search } from '@mui/icons-material'
import React from 'react'
import {SeasonSection} from './components/SeasonSection/SeasonSection.jsx'
import {ShowCard,getStringedGenre} from './components/ShowCard/ShowCard'
import closeImage from './images/close.png'
import {Carousel} from './components/Carousel/Carousel.jsx'
import './App.css'




export const App = () => {
  /**this is where the data for preview of shows is stored */
  const [showsPreview, setShowsPreview] = React.useState([{}])
  const [isLoading, setIsLoading] = React.useState(true)
   const [showForm, setShowForm] = React.useState(false)
   const [filteredShows, setFilteredShows] = React.useState([{}])
   const[isFiltered,setIsFiltered] = React.useState(false)
   const [isSeasonSelected,setIsSeasonSelected] = React.useState(false)
   const [getSeasonId, setGetSeasonId] =  React.useState([{}])
   const [isPlaying, setIsPlaying] = React.useState(false)
  const [audio, setAudio]= React.useState('')
  React.useEffect(() => {
    const getShowPreviewData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows')
        const data = await response.json()
        
        //adds new stringed array of genre rather than using numbers
        const newData = data.map((mapObject) => ({
          ...mapObject,
          genres: getStringedGenre(mapObject.genres),
        }));
        
        setShowsPreview(newData);
        setTimeout(setIsLoading(false),1000)
      } catch (error) {
        console.log('error has occurred', error)
      }
    }
    getShowPreviewData()
    
  }, [])
  
 
  /**
   * switches from season user interface to the preview show list user interface
  */
  const goBackToShowList = () => setIsSeasonSelected(false)
 /**
  * switches from preview shows list interface to the season user user interface
  * using the individual show id to select which season gets selected
  */
  const fetchSeasonId = (id) =>{
     setGetSeasonId(id)
     setIsSeasonSelected(true)
     
    }
    
    /**
     * this function filters the {@link showsPreview} via a shows title then applies it to {@link filteredShows}
    */
    const submitForm = (event)=>{
      event.preventDefault()//stops the form from resetting
       const formData = new FormData(event.target)//grabs the data to be used to filter
       const data = Object.fromEntries(formData)//turns the formData into an object
       /**where the filtered data is stored */
       const filter =  showsPreview.filter(item=>item.title.trim().toLowerCase().includes(data.title.trim().toLowerCase()))
      setFilteredShows(filter)
     event.target.reset()
     setShowForm(false)
     setIsFiltered(true)
     
    }
    /**
     * will order {@link filteredShows} titles from a to z
     */
    const aToZ=()=>{
      const sorted = [...filteredShows].toSorted((a,b)=>a.title.localeCompare(b.title))
      setFilteredShows(sorted)
      
    }
     /**
     * will order {@link filteredShows} titles from z to a
     */
    const zToA=()=>{
      const sorted = [...filteredShows].toSorted((a,b)=>b.title.localeCompare(a.title))
      setFilteredShows(sorted)
      
    }
    /**
     * filters {@link filteredShows}
     * @param {string} string - is the  genre that it will filter by
     */
    const filterByGenre=(string)=>{
      const sorted = [...filteredShows].filter(item=>item.genres.includes(string))
      setFilteredShows(sorted)
    }
    /**
     * orders function from oldest date to latest
     * @param {string} string - is the  shows update date
     */
   const orderToOldest=()=>{
    const sorted = [...filteredShows].toSorted((a,b)=>new Date(a.updated).getTime() - new Date(b.updated).getTime())
    setFilteredShows(sorted)
   }
    /**
     * orders function from latest date to oldest
     * @param {string} string - is the  shows update date
     */
   const orderToYoungest = () =>{
    const sorted = [...filteredShows].toSorted((a,b)=>new Date(b.updated).getTime() - new Date(a.updated).getTime())
    setFilteredShows(sorted)
   }
  /**grabs audio file to play */
   const toggleIsPlaying=(audioFile)=>{
    setIsPlaying(true)
    
    setAudio(audioFile)
    
   }
   /**closes audio panel */
   const closeAudio =()=>{
     alert('your are about to close audio')
    
    setIsPlaying(false)
   }
   /**
    * turns {@link filteredShows} into usable jsx
   */
   const filterdShowList = filteredShows.map((show)=>{
 
    return( 
            <ShowCard 
            key = {show.id}
        description ={show.description} 
        genres={show.genres}
        id = {show.id}
        image = {show.image}
        isFavourite = {show.isFavourite}
        seasons = {show.seasons}
        title = {show.title}
        updated = {show.updated}
        fetchSeasonId = {fetchSeasonId}
        />
     )

  })
  /**
    * turns {@link showPreview}  into usable jsx
   */
  const showPreviewList = showsPreview.map((show,index)=>{
 
    return( 
            <ShowCard 
            key = {index}
        description ={show.description} 
        genres={show.genres}
        id = {show.id}
        image = {show.image}
        isFavourite = {show.isFavourite}
        seasons = {show.seasons}
        title = {show.title}
        updated = {show.updated}
        fetchSeasonId = {fetchSeasonId}
        />
     )

  })
  /**turns the array below into dynaminc jsx buttons used to filter via genre using the {@link filterByGenre} function */
  const genreButtons = [
    'Personal Growth',
   'True Crime and Investigative Journalism',
   'History',
   'Comedy',
   'Entertainment',
   'Business',
   'Fiction',
  'News',
  'Kids and Family'
  ].map((genre,index)=><Button variant='outlined' key={index} id={genre} onClick={()=>filterByGenre(genre)}>{genre}</Button>)
  
  return (
    <>
      
       <CssBaseline /> 
      {!isSeasonSelected && 
      <>
      <header className='show_preview_header'>
      <h1>PodCast Studio</h1> 
        {showForm && <form className='search_form' onSubmit={submitForm}>
            <div className='input_holder' style={{textAlign:'center'}}><Input type='text' name='title'/></div>
            <div className='button_holder'>
             <Button size="small"variant='contained' type='submit' >Search</Button> 
             <Button size="small" variant='contained' color='error' onClick ={()=>setShowForm(false)} >
              Cancel
            </Button> 
            </div>
        </form>}
        <IconButton onClick ={()=>setShowForm(true)}>
         <Search/>
        </IconButton>
      </header> 
      
       { isLoading && <div>Loading...</div>}
       {!isFiltered && !isLoading && <Carousel showsPreview={showsPreview}/>}
       {isFiltered && <>
       <Button variant='outlined' onClick={aToZ}>A-Z</Button>
       <Button variant='outlined' onClick={zToA}>Z-A</Button>
       <Button variant='outlined' onClick={orderToYoungest}>Recent</Button>
       <Button variant='outlined' onClick={orderToOldest}>Oldest</Button>
       {genreButtons}
      
       </>}
      <div className='shows_holder'>
        {filteredShows.length===0 && <h3 style={{textAlign:'center'}}>
          no shows under this search exist, to get full list of shows again
          just press the search icon then the search button to get the full list of shows
          or search again.
        </h3>}
        {isFiltered ? filterdShowList: showPreviewList}
      
      </div>
      <footer> 
        <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by inkubators - Flaticon</a>
      </footer>
      </>}
      {isSeasonSelected && <SeasonSection getSeasonId={getSeasonId} toggleIsPlaying={toggleIsPlaying} goBackToShowList={goBackToShowList} />}
      {isPlaying && 
      <div className='audio_section'>
        <audio controls>
  <source src={audio} type="audio/mpeg"/>
    Your browser does not support the audio element.
      </audio>
      <img onClick={closeAudio}className='close' src={closeImage} alt="Close Icon"/>
      </div>}
      
    </>
  )
}