import './ShowCard.css'
import {formalDate} from '../utils/utils.js'


/**
 * this function converts number value (less than 9) in an array to specified
 * string 
 * @param {Array<number>} array 
 * @returns {Array<string>}
 */

export const getStringedGenre = (array) =>{
    return array.map(arrayItem=>{
     if(arrayItem>9) {
      throw new Error("array's number value is greater than 9")
    }
      if(typeof arrayItem !== 'number') {
        throw new Error('the array consits of other types not just numbers')
      }
      const genre = [
        'Personal Growth',
       'True Crime and Investigative Journalism',
       'History',
       'Comedy',
       'Entertainment',
       'Business',
       'Fiction',
      'News',
      'Kids and Family'
      ]
      const value = arrayItem-1
      return genre[value]
    })
 }

 /**
  * @callback SeasonFunction - is used to get and set the seasonId to be used in a fetch request
  */
/**
 * @typedef {object} Props 
 * @prop {string} description - the podcast descritiopn
 * @prop {Array<string>} genres 
 * @prop {string} id
 * @prop {string} image
 * @prop {boolean} isFavourite
 * @prop {number} seasons
 * @prop {string} title
 * @prop {string} updated
 * @prop {SeasonFunction} fetchSeasonId
 */

/**
 * this function is the individual previewshow  component
 * 
 * @param {Props} props 
 * @returns 
 */
export const ShowCard = (props) => {


const genreList = props.genres && props.genres.map((genre, index) => <li key={index}>{genre}</li>);


  return (
 <div className = 'shows_list' onClick={()=>props.fetchSeasonId(props.id)}>
       <img src = {props.image}/>
        <h2>{props.title}</h2>
        <p className='line-clamp'>{props.description}</p>
        <p> Seasons: {props.seasons}</p> 
        <p>Updated:{formalDate(props.updated)}</p>
          
           
          <div className='genre_holder'>
            <p style={{marginRight:'4rem'}}>Genres:</p>
          <ul className='ul'>
            {genreList}
          </ul> 
      </div>    
     </div>
  )
  
}