import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Artists = () => {
    const [artist,setartist]=useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/getartist").then((res) => {

            setartist(res.data);
        }).catch((err) => {
            console.log(err);
        })

        const md = sessionStorage.getItem('theme')
        document.body.className = md
    }, [artist])
    return (
        <> 
            <div className='mt-3 my-3 row row-cols-1 row-cols-md-5 g-4'>
                {
                    artist.map((data) => {
                        let url = `http://localhost:8000/getSong/${data.Img}`
                       
                        let send = `/Artistpanel/${data.Img}/${data.Name}/${data.Bio}`
                        return (
                            <div className='col' key={data._id}>
                                
                                <div className='card text-center xyz' style={{"border":"none"}}>
                                    <div>
                                        <a href={send}><img src={url} className="artsogimg"></img></a>
                                         <h6 className="mt-2">{data.Name}</h6>
                                    </div>                    
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </>
    )
}

export default Artists
