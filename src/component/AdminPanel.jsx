import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import $ from 'jquery'
import Addsong from './Addsong'
import AdminLeft from './AdminLeft'
import AddArtist from './AddArtist'

const AdminPanel = () => {
    const [isvis, setisvis] = useState(false);
    const [Comp,setComp]=useState("addArtist")
    useEffect(() => {
        const md = sessionStorage.getItem('theme')
        document.body.className = md
    }, [])

    if(Comp==="addSong")
    {

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='mt-3 bar'>
                        <i className='fa fa-bars' id="barr" onClick={() => {
                            if (isvis) { $('.leftnav').css("display", "none"); setisvis(false); }
                            else { $('.leftnav').css("display", "block"); setisvis(true); }
                        }}></i>
                    </div>
                    <AdminLeft></AdminLeft>
                    <div className='col-md-10 rightnav'>
                        <Navbar></Navbar>
                    <div className='container-fluid'>
                        <Addsong></Addsong>
                    </div> </div>  </div> </div>
        </>
    )
    }

    //add artist
    if(Comp==="addArtist")
    {
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='mt-3 bar'>
                        <i className='fa fa-bars' id="barr" onClick={() => {
                            if (isvis) { $('.leftnav').css("display", "none"); setisvis(false); }
                            else { $('.leftnav').css("display", "block"); setisvis(true); }
                        }}></i>
                    </div>
                    <AdminLeft></AdminLeft>
                    <div className='col-md-10 rightnav'>
                        <Navbar></Navbar>
                    <div className='container-fluid'>
                        <AddArtist></AddArtist>
                    </div> </div>  </div> </div>
        </>
    )
    }
}

export default AdminPanel