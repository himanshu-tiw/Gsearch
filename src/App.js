import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Routes from './components/Routes'

export default function App(){

    const [darkTheme, setDarkTheme] = React.useState(false)
    function toggle(){
        setDarkTheme(prevValue=>!prevValue)
    }
    return(
        <div className={darkTheme?"dark":""}>
            <div className='bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen'>
            <Navbar darkTheme={darkTheme} toggle={toggle}/>
            <Routes />
            <Footer />
            </div>
        </div>
    )
}