import { createClient } from "@supabase/supabase-js";
  
  export const supabase = createClient('https://pauulvrdqwqvmjineupq.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhdXVsdnJkcXdxdm1qaW5ldXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3MDA4NDEsImV4cCI6MjAwODI3Njg0MX0.TkPTp4_flCdXTDzBtrZgw0nbmSywGFQbWX1w9_TWzLU");
 
    /**
    * this function returns a stringed date
    * @param {*} date - is the date
    * @returns {string}
    */
   
    export const formalDate =(date)=>{
   
   
      const months =[
     'January', 
     'febuary', 
     'March' , 
     'April', 
     'May', 
     'June', 
     'July', 
     'August', 
     'September', 
     'October', 
     'November', 
     'December'
  ]
      const day = new Date(date).getDate()
      const year = new Date(date).getFullYear()
      const month = new Date(date).getMonth()
      
      const sentence =` ${day} ${months[month-1]}, ${year} `
      return sentence
  }