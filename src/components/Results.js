import React ,{ useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'
// import ResultContextProvider from '../context/ResultContextProvider'
import { useResultContext } from '../context/ResultContextProvider'
import  Loading  from './Loading'

export default function Results(){
    
    const {results, isLoading, getResults, searchTerm } = useResultContext()
    const location = useLocation()
    useEffect(()=>{
        // console.log(searchTerm)
        if(searchTerm!== ''){
            // if(location.pathname ==='/video'){
            //     getResults(`/search/q=${searchTerm}`)
            // }
            // // } else if(location.pathname === '/image'){
            // //     getResults(`${location.pathname}/q=${searchTerm}`)
            // // }
            // // else if(location.pathname === '/search'){
            // //     getResults(`${searchTerm}`)
            // // }
            // else {
            //     getResults(`${location.pathname}/q=${searchTerm}`)
            // }

            getResults(`${location.pathname}/q=${searchTerm}&len=40`)
        }
        
},[searchTerm, location.pathname])

    

    if(isLoading) return <Loading />

    // console.log(location.pathname)
    // console.log(results)
    switch (location.pathname) {
        case '/search':
            return (
                <div>
                {searchTerm ? 
                <div className="flex flex-wrap w-full space-y-6 lg:pl-56 sm:pl-36 sm:pr-5">
                
                            {results?.map((result,index)=>(
                                <div className='md:w-4/5 w-full' key={index}>
                                    
                                <a href={result?.link} target="_blank" rel="noreferrer">
                                    <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">{result?.title}</p>
                                </a>
                                {/* <p className="text-sm">{result?.link}</p> */}
                                    <p className='text-sm text-justify  dark:text-white'>
                                            {result?.description?.length>200 ? result?.description.substring(0,150) : result?.description}
                                    </p>
                                </div>
                            ))

                            }
                </div>
                 : <div className='text-center text-5xl w-full h-20 truncate  my-64 text-gray-500'>Google Anything...</div> }
                </div>
            )
            
        

            case '/image':
                return (
                <div>
                    {searchTerm ? 
                  <div className="flex flex-wrap justify-center items-center">
                 
                    {results?.map(({ image, link: { href, title } }, index) => (
                      <a href={href} target="_blank" key={index} rel="noreferrer" className="sm:p-3 p-5">
                        <img src={image?.src} alt={title} loading="lazy" />
                        <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
                      </a>
                    ))}
                  </div>
                   : <div className='text-center text-5xl w-full h-20 truncate  my-64 text-gray-500'>Google Anything...</div> }
                   </div>
                ); 
                

            case '/news':
            return (
                <div>
                    {searchTerm ? 
                <div className="flex flex-wrap w-full space-y-10 md:ml-16 lg:pl-50 sm:pl-36 sm:pr-5">
                            {results?.map(({id, summary, link, title,clean_url,media},index)=>(
                            <div key={index} className='relative flex flex-wrap w-4/5 justify-around flex-row border-2  rounded p-3 dark:border dark:border-gray-600'>
                                <div className='md:w-3/5 w-full' key={id}>
                                    <a href={link} target="_blank" rel="noferrer" className='hover:underline'>
                                        <p className='text-lg dark:text-blue-300 text-blue-700'>
                                            {title}
                                        </p>
                                    </a>
                                    <div className='flex flex-wrap '>
                                            <a href={clean_url} target="_blank" rel="noreferrer" >
                                                {summary?.length>200?summary.substring(0,200)+"...":summary}
                                            </a>
                                    </div>
                                    
                                </div>
                                <img src={media} alt="img" loading="lazy" className=' w-24 h-24 rounded  md:block hidden'/>
                            </div>
                                
                            ))

                            }
                </div>
                 : <div className='text-center text-5xl w-full h-20 truncate  my-64 text-gray-500'>Google Anything...</div> }
                 </div>
            )

        // case '/news':
        //     return (
                
        //         <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
        //                     {results?.map(({links, link, title, id},index)=>(
        //                         <div className='md:w-2/5 w-full' key={id}>
        //                             <a href={links?.[0].href} target="_blank" rel="noferrer" className='hover:underline'>
        //                                 <p className='text-lg dark:text-blue-300 text-blue-700'>
        //                                     {title}
        //                                 </p>
        //                             </a>
        //                             <div className='flex gap-4'>
        //                                     <a href={link} target="_blank" rel="noreferrer">
        //                                         {link}
        //                                     </a>
        //                             </div>
        //                         </div>
        //                     ))

        //                     }
        //         </div>
        //     )

        case '/video':
            return (
                <div>
                    {searchTerm ? 
                
                <div className='flex flex-wrap'>
                    {results.map((video,index)=>
                        <div className='p-2' key={index}>
                           { video?.additional_links?.[0]?.href  && <ReactPlayer url={video.additional_links?.[0].href} controls={true} width="355px" height="200px" />}
                        </div>
                    )}
                </div>
                : <div className='text-center text-5xl w-full h-20 truncate  my-64 text-gray-500'>Google Anything...</div> }
                   </div>
            )

        
    
        default:
            return "Error"
    }
    
}