import React,{ useEffect, useState} from 'react'
import { useDebounce } from 'use-debounce'
import { useResultContext } from '../context/ResultContextProvider'
import {  Links } from './Links'

export default function(){
    const [text, setText] = useState('')
    const [text1, setText1] = useState('')
    const {setSearchTerm , searchTerm} = useResultContext();
    const [debounceValue] = useDebounce(text, 300);

    useEffect(()=>{
        // if(debounceValue) setSearchTerm(debounceValue)
        setSearchTerm(text1)
    },[text1])

   


    return(
        <div className='relative sm:ml-48 md:ml-50 sm:-mt-10 mt-5 md:w-3/5 sm:w-2/4'>
            <input 
                id="search"
                value={text}
                type="text"
                placeholder='Search...'
                className="w-full h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
                onChange={(event)=>setText(event.target.value)}
                onKeyPress={event => {
                if (event.key === 'Enter') {
                  setText1(event.target.value)
                  console.log("clicked")
                }
              }}
            />
            {text && (
                <button type="button" className='absolute top-1.5 right-4 text-2xl text-gray-500' onClick={()=>setText("")}>
                    X
                </button>
            )}
            {searchTerm && <Links />}
        </div>

    )
}