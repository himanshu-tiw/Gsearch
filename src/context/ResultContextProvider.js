import React, {createContext, useContext, useState} from 'react' 

const ResultContext = createContext()
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1"
 
export default function ResultContextProvider({ children }){
    
    const [results,setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const getResults = async (type)=>{
        
        setIsLoading(true)
        
        let response

        if(type.includes('/news')){
             response = await fetch(`https://free-news.p.rapidapi.com/v1/search?q=${searchTerm}&lang=en`,{
                method: 'GET',
                headers: {
                    'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
                    'X-RapidAPI-Key': '8565a443e4mshfb164d8e462c3f0p1acd35jsn26843ba972b7'
                }
            })

        }
       else {
        response = await fetch(`${baseUrl}${type}&num=40&lang=en`,{
            method: 'GET',
	        headers: {
            'X-User-Agent': 'desktop',
            'X-Proxy-Location': 'EU',
            'X-RapidAPI-Host': 'google-search3.p.rapidapi.com',
            'X-RapidAPI-Key': '9c70d1a31bmshd5c763635c28351p137bd1jsnb0b45ef82701'
	    }
        }
        )}
        // else if (type.includes('/image')){
        //     response = await fetch(`https://google-search55.p.rapidapi.com${type}&safe=false`,{
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Host': 'google-search55.p.rapidapi.com',
        //         'X-RapidAPI-Key': '8565a443e4mshfb164d8e462c3f0p1acd35jsn26843ba972b7'
        //     }
        // }
        // )

        // }

        // else {

        // }
    

        const data = await response.json()
        console.log(data)
        if(type.includes('/news')){
            setResults(data.articles)
        } else if(type.includes('/image')){
            setResults(data.image_results)
        } else {
            setResults(data.results)
        }
        
        // console.log(data)
        setIsLoading(false)

    }
    return(
        <ResultContext.Provider value={{getResults, results, isLoading, searchTerm, setSearchTerm}}>
            {children}
        </ResultContext.Provider>
    )

}

export const useResultContext = () =>useContext(ResultContext)