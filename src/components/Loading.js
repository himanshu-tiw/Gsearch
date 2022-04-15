import React from 'react'
import {Grid} from 'react-loader-spinner'

export default function Loading(){


    return(
        <div className='flex justify-center items-center'>
            <Grid color="#00BFFF" height = {550} width={100} />
        </div>
    )
}